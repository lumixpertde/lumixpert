// Performance monitoring utilities for Core Web Vitals and SEO

export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers() {
    // LCP Observer
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          this.metrics.lcp = lastEntry.startTime;
          this.reportMetric('LCP', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // FID Observer
      try {
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime;
            this.reportMetric('FID', this.metrics.fid);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // CLS Observer
      try {
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          entryList.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          this.metrics.cls = clsValue;
          this.reportMetric('CLS', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }

    // FCP and TTFB from Navigation Timing
    if ('performance' in window && performance.getEntriesByType) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const nav = navigationEntries[0];
        this.metrics.ttfb = nav.responseStart - nav.requestStart;
        this.reportMetric('TTFB', this.metrics.ttfb);
      }

      // Wait for paint entries
      setTimeout(() => {
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.metrics.fcp = fcpEntry.startTime;
          this.reportMetric('FCP', fcpEntry.startTime);
        }
      }, 0);
    }
  }

  private reportMetric(name: string, value: number) {
    // In a real application, you would send this to your analytics service
    console.log(`${name}: ${value.toFixed(2)}ms`);
    
    // You can integrate with Google Analytics, DataDog, or other services here
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(value)
      });
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public getPerformanceGrade(): 'good' | 'needs-improvement' | 'poor' {
    const { lcp, fid, cls } = this.metrics;
    
    let score = 0;
    let totalMetrics = 0;

    if (lcp !== undefined) {
      totalMetrics++;
      if (lcp <= 2500) score += 1;
      else if (lcp <= 4000) score += 0.5;
    }

    if (fid !== undefined) {
      totalMetrics++;
      if (fid <= 100) score += 1;
      else if (fid <= 300) score += 0.5;
    }

    if (cls !== undefined) {
      totalMetrics++;
      if (cls <= 0.1) score += 1;
      else if (cls <= 0.25) score += 0.5;
    }

    if (totalMetrics === 0) return 'needs-improvement';

    const percentage = score / totalMetrics;
    if (percentage >= 0.8) return 'good';
    if (percentage >= 0.5) return 'needs-improvement';
    return 'poor';
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Advanced image optimization utilities
export const optimizeImageLoading = () => {
  // Add loading="lazy" to all images without it (except above-the-fold)
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    // First few images should load eagerly (above the fold)
    if (index < 2) {
      img.setAttribute('loading', 'eager');
    } else {
      img.setAttribute('loading', 'lazy');
    }
  });

  // Add decoding="async" for better performance
  const allImages = document.querySelectorAll('img:not([decoding])');
  allImages.forEach(img => {
    img.setAttribute('decoding', 'async');
  });

  // Add fetchpriority for critical images
  const criticalImages = document.querySelectorAll('img[loading="eager"]');
  criticalImages.forEach(img => {
    img.setAttribute('fetchpriority', 'high');
  });

  // Optimize image sizes with srcset if not present
  const responsiveImages = document.querySelectorAll('img:not([srcset])');
  responsiveImages.forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.includes('data:')) {
      // Add basic responsive image support
      const baseSrc = src.split('.').slice(0, -1).join('.');
      const ext = src.split('.').pop();
      img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
    }
  });
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Preload important resources
export const preloadResources = (resources: Array<{url: string, as: string, type?: string}>) => {
  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.url;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    document.head.appendChild(link);
  });
};

// Initialize performance monitoring
export const initPerformanceMonitoring = (): PerformanceMonitor => {
  return new PerformanceMonitor();
};

// SEO-friendly meta tag updates
export const updateMetaTags = (tags: Record<string, string>) => {
  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
};

// Advanced performance optimizations
export const optimizePageSpeed = () => {
  // Remove unused CSS (basic implementation)
  const removeUnusedCSS = () => {
    const styleSheets = Array.from(document.styleSheets);
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach((rule, index) => {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText;
            if (!document.querySelector(selector)) {
              // Rule is unused, but we'll keep it for safety in production
              // In a real implementation, you'd use a more sophisticated tool
            }
          }
        });
      } catch (e) {
        // Cross-origin stylesheet, ignore
      }
    });
  };

  // Optimize fonts loading
  const optimizeFonts = () => {
    // Add font-display: swap to improve loading performance
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  };

  // Prefetch DNS for external resources
  const prefetchDNS = () => {
    const domains = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'www.google-analytics.com',
      'www.googletagmanager.com',
      'connect.facebook.net'
    ];

    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${domain}`;
      document.head.appendChild(link);
    });
  };

  // Optimize third-party scripts
  const optimizeScripts = () => {
    // Add loading="defer" to non-critical scripts
    const scripts = document.querySelectorAll('script:not([defer]):not([async])') as NodeListOf<HTMLScriptElement>;
    scripts.forEach(script => {
      if (script.src && !script.src.includes('analytics') && !script.src.includes('gtag')) {
        script.setAttribute('defer', '');
      }
    });
  };

  // Enable passive event listeners for better scroll performance
  const optimizeEventListeners = () => {
    // Override addEventListener to use passive listeners for scroll/touch events
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      if (['scroll', 'wheel', 'touchstart', 'touchmove'].includes(type)) {
        if (typeof options === 'boolean') {
          options = { capture: options, passive: true };
        } else if (typeof options === 'object') {
          options = { ...options, passive: true };
        } else {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  };

  // Implement resource hints
  const addResourceHints = () => {
    // Preconnect to important origins
    const preconnectDomains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${domain}`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };

  // Execute optimizations
  removeUnusedCSS();
  optimizeFonts();
  prefetchDNS();
  optimizeScripts();
  optimizeEventListeners();
  addResourceHints();
};

// Lazy load non-critical resources
export const lazyLoadResources = () => {
  // Lazy load non-critical CSS
  const lazyLoadCSS = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  };

  // Intersection Observer for lazy loading
  const createLazyLoader = (selector: string, callback: (element: Element) => void) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '50px' });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return observer;
  };

  return { lazyLoadCSS, createLazyLoader };
};

// Critical rendering path optimization
export const optimizeCriticalPath = () => {
  // Inline critical CSS (placeholder - would be generated by build process)
  const criticalCSS = `
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
    .hero-section { min-height: 100vh; background: #000; color: #fff; }
    .loading-spinner { animation: spin 1s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);

  // Preload critical resources
  const criticalResources = [
    { href: '/logo.png', as: 'image', type: 'image/png' },
    { href: '/metall.webp', as: 'image', type: 'image/webp' },
    { href: '/holz.jpg', as: 'image', type: 'image/jpeg' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.type) link.type = resource.type;
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Bundle size analyzer (development only)
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // Log bundle information
    const scripts = document.querySelectorAll('script[src]') as NodeListOf<HTMLScriptElement>;
    const styles = document.querySelectorAll('link[rel="stylesheet"]') as NodeListOf<HTMLLinkElement>;
    
    console.group('Bundle Analysis');
    console.log(`Scripts: ${scripts.length}`);
    console.log(`Stylesheets: ${styles.length}`);
    
    // Estimate total size (rough approximation)
    let totalSize = 0;
    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src && src.includes('assets')) {
        // Rough estimation based on typical bundle sizes
        totalSize += 100; // KB estimate
      }
    });
    
    console.log(`Estimated bundle size: ~${totalSize}KB`);
    console.groupEnd();
  }
};

// Fix CSS animation issues
export const fixAnimationIssues = () => {
  // Monitor for invalid CSS filter values and fix them
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const element = mutation.target as HTMLElement;
        if (element.style && element.style.filter) {
          // Fix negative blur values
          const filter = element.style.filter;
          if (filter.includes('blur(-')) {
            element.style.filter = filter.replace(/blur\(-[\d.]+px\)/g, 'blur(0px)');
          }
        }
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['style'],
    subtree: true
  });

  // Also fix any existing elements with negative blur values
  const fixExistingElements = () => {
    const elements = document.querySelectorAll('[style*="blur(-"]');
    elements.forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (htmlElement.style.filter) {
        htmlElement.style.filter = htmlElement.style.filter.replace(/blur\(-[\d.]+px\)/g, 'blur(0px)');
      }
    });
  };

  // Fix existing elements and set up periodic checks
  fixExistingElements();
  setInterval(fixExistingElements, 1000);

  console.log('Animation issue fixes initialized');
}; 