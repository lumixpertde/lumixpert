import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import SEOHead from './components/SEOHead';
import CookieConsent from './components/CookieConsent';
import AdminPage from './pages/AdminPage';
import ErrorBoundary from './components/ErrorBoundary';
import { seoConfigs } from './utils/seo';
import { 
  initPerformanceMonitoring, 
  optimizeImageLoading, 
  optimizePageSpeed, 
  optimizeCriticalPath,
  lazyLoadResources,
  registerServiceWorker,
  analyzeBundleSize,
  fixAnimationIssues
} from './utils/performance';
import { initializeAnalytics, trackPageView } from './utils/analytics';
import { initializeMetaPixel, trackMetaPageView } from './utils/metaPixel';
import { initializeScrollTracking } from './utils/scrollTracking';

// Component to track page views
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPageView({
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname + location.search + location.hash,
      content_group1: location.pathname === '/admin' ? 'Admin' : 'Home'
    });
    
    // Track Meta Pixel page view
    trackMetaPageView({
      content_name: document.title,
      content_category: location.pathname === '/admin' ? 'Admin' : 'Home'
    });
  }, [location]);

  return null;
};

const HomePage = () => {
  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <SEOHead {...seoConfigs.home} />
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export function App() {
  useEffect(() => {
    // Critical path optimization (runs first)
    optimizeCriticalPath();
    
    // Fix CSS animation issues
    fixAnimationIssues();
    
    // Initialize performance monitoring
    const performanceMonitor = initPerformanceMonitoring();
    
    // Comprehensive page speed optimizations
    optimizePageSpeed();
    
    // Optimize image loading
    optimizeImageLoading();
    
    // Register service worker for caching
    registerServiceWorker();
    
    // Analyze bundle size in development
    analyzeBundleSize();
    
    // Initialize scroll tracking
    const cleanupScrollTracking = initializeScrollTracking();
    
    // Initialize lazy loading utilities
    const { lazyLoadCSS, createLazyLoader } = lazyLoadResources();
    
    // Lazy load non-critical components
    createLazyLoader('.lazy-section', (element) => {
      element.classList.add('loaded');
    });
    
    // Initialize Google Analytics
    const initAnalytics = async () => {
      try {
        // Check if measurement ID is stored
        const storedId = localStorage.getItem('ga_measurement_id');
        await initializeAnalytics(storedId || undefined);
      } catch (error) {
        console.warn('Analytics initialization failed:', error);
      }
    };
    
    // Initialize Meta Pixel
    const initMetaPixel = async () => {
      try {
        // Check if pixel ID is stored and valid
        const storedPixelId = localStorage.getItem('meta_pixel_id');
        const storedTestCode = localStorage.getItem('meta_test_event_code');
        
        // Only initialize if we have a valid pixel ID
        if (storedPixelId && storedPixelId !== 'null' && storedPixelId !== '' && /^\d{15,16}$/.test(storedPixelId)) {
          await initializeMetaPixel(storedPixelId, storedTestCode || undefined);
        } else {
          console.log('Meta Pixel: No valid pixel ID found, skipping initialization');
        }
      } catch (error) {
        console.warn('Meta Pixel initialization failed:', error);
      }
    };
    
    // Delay analytics initialization to not block critical rendering
    setTimeout(() => {
      initAnalytics();
      initMetaPixel();
    }, 100);
    
    // Cleanup on unmount
    return () => {
      performanceMonitor.cleanup();
      cleanupScrollTracking();
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <PageTracker />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
          <CookieConsent />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  );
}