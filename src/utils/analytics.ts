// Google Analytics (GA4) integration for LumiXpert
// Privacy-respecting implementation with IP anonymization and GDPR compliance

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface GAConfig {
  measurementId: string;
  enableDevelopment: boolean;
  anonymizeIp: boolean;
  enableAdvertisingFeatures: boolean;
  cookieExpires: number;
  enableUserDeletion: boolean;
}

export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

export interface GAPageView {
  page_title: string;
  page_location: string;
  page_path: string;
  content_group1?: string;
  custom_map?: Record<string, any>;
}

export class GoogleAnalytics {
  private config: GAConfig;
  private isInitialized: boolean = false;
  private consentGiven: boolean = false;

  constructor(config: Partial<GAConfig> = {}) {
    this.config = {
      measurementId: 'G-5HL6NC6N30', // Default measurement ID
      enableDevelopment: false,
      anonymizeIp: true,
      enableAdvertisingFeatures: false,
      cookieExpires: 63072000, // 2 years in seconds
      enableUserDeletion: true,
      ...config
    };
  }

  // Initialize Google Analytics
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('Google Analytics already initialized');
      return;
    }

    try {
      // Load gtag script
      await this.loadGtagScript();
      
      // Configure gtag
      this.configureGtag();
      
      // Set up privacy settings
      this.setupPrivacySettings();
      
      this.isInitialized = true;
      console.log('Google Analytics (GA4) initialized successfully');
      
    } catch (error) {
      console.error('Failed to initialize Google Analytics:', error);
    }
  }

  // Load the gtag script dynamically
  private loadGtagScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
        resolve();
        return;
      }

      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      // Set initial timestamp
      window.gtag('js', new Date());

      // Create and load script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.measurementId}`;
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google Analytics script'));
      
      document.head.appendChild(script);
    });
  }

  // Configure gtag with privacy settings
  private configureGtag(): void {
    const configParams: Record<string, any> = {
      // Privacy settings
      anonymize_ip: this.config.anonymizeIp,
      allow_google_signals: this.config.enableAdvertisingFeatures,
      allow_ad_personalization_signals: this.config.enableAdvertisingFeatures,
      
      // Cookie settings
      cookie_expires: this.config.cookieExpires,
      cookie_update: true,
      cookie_flags: 'SameSite=None;Secure',
      
      // Data collection settings
      send_page_view: false, // We'll handle page views manually
      transport_type: 'beacon',
      
      // Development settings
      debug_mode: this.config.enableDevelopment,
    };

    window.gtag('config', this.config.measurementId, configParams);
  }

  // Set up privacy-respecting settings
  private setupPrivacySettings(): void {
    // Set default consent state (denied until user consents)
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    });

    // Check for existing consent
    const consent = this.getStoredConsent();
    if (consent) {
      this.updateConsent(consent);
    }
  }

  // Update user consent
  updateConsent(consent: {
    analytics: boolean;
    marketing?: boolean;
    functionality?: boolean;
  }): void {
    this.consentGiven = consent.analytics;

    window.gtag('consent', 'update', {
      'analytics_storage': consent.analytics ? 'granted' : 'denied',
      'ad_storage': consent.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.marketing ? 'granted' : 'denied',
      'functionality_storage': consent.functionality !== false ? 'granted' : 'denied'
    });

    // Store consent preference
    this.storeConsent(consent);
    
    console.log('GA4 consent updated:', consent);
  }

  // Track page views
  trackPageView(pageData: Partial<GAPageView> = {}): void {
    if (!this.isInitialized || !this.consentGiven) {
      console.warn('GA4 not initialized or consent not given');
      return;
    }

    const pageView: GAPageView = {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      content_group1: this.getContentGroup(),
      ...pageData
    };

    window.gtag('event', 'page_view', pageView);
    console.log('GA4 Page view tracked:', pageView);
  }

  // Track custom events
  trackEvent(event: GAEvent): void {
    if (!this.isInitialized || !this.consentGiven) {
      console.warn('GA4 not initialized or consent not given');
      return;
    }

    const eventData = {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.customParameters
    };

    window.gtag('event', event.action, eventData);
    console.log('GA4 Event tracked:', event.action, eventData);
  }

  // Track CTA button clicks
  trackCTAClick(buttonName: string, location: string, additionalData: Record<string, any> = {}): void {
    this.trackEvent({
      action: 'cta_click',
      category: 'engagement',
      label: buttonName,
      customParameters: {
        button_location: location,
        page_section: this.getCurrentSection(),
        ...additionalData
      }
    });
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean = true): void {
    this.trackEvent({
      action: success ? 'form_submit_success' : 'form_submit_error',
      category: 'form',
      label: formName,
      value: success ? 1 : 0,
      customParameters: {
        form_name: formName,
        page_path: window.location.pathname
      }
    });
  }

  // Track file downloads
  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent({
      action: 'file_download',
      category: 'download',
      label: fileName,
      customParameters: {
        file_type: fileType,
        file_name: fileName
      }
    });
  }

  // Track gallery interactions
  trackGalleryInteraction(action: string, materialName: string, productName?: string): void {
    this.trackEvent({
      action: `gallery_${action}`,
      category: 'gallery',
      label: materialName,
      customParameters: {
        material_name: materialName,
        product_name: productName,
        interaction_type: action
      }
    });
  }

  // Track scroll depth
  trackScrollDepth(percentage: number): void {
    this.trackEvent({
      action: 'scroll',
      category: 'engagement',
      label: `${percentage}%`,
      value: percentage,
      customParameters: {
        scroll_depth: percentage,
        page_path: window.location.pathname
      }
    });
  }

  // Track time on page
  trackTimeOnPage(timeInSeconds: number): void {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      value: timeInSeconds,
      customParameters: {
        time_seconds: timeInSeconds,
        page_path: window.location.pathname
      }
    });
  }

  // Get content group based on current page
  private getContentGroup(): string {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (path === '/' && hash.includes('#about')) return 'About';
    if (path === '/' && hash.includes('#gallery')) return 'Gallery';
    if (path === '/' && hash.includes('#contact')) return 'Contact';
    if (path.includes('/admin')) return 'Admin';
    if (path.includes('/services')) return 'Services';
    return 'Home';
  }

  // Get current page section
  private getCurrentSection(): string {
    const hash = window.location.hash;
    if (hash) return hash.substring(1);
    return 'top';
  }

  // Store consent in localStorage
  private storeConsent(consent: any): void {
    try {
      localStorage.setItem('ga_consent', JSON.stringify({
        ...consent,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to store consent:', error);
    }
  }

  // Get stored consent
  private getStoredConsent(): any {
    try {
      const stored = localStorage.getItem('ga_consent');
      if (stored) {
        const consent = JSON.parse(stored);
        // Check if consent is not older than 1 year
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (Date.now() - consent.timestamp < oneYear) {
          return consent;
        }
      }
    } catch (error) {
      console.warn('Failed to get stored consent:', error);
    }
    return null;
  }

  // Remove all GA data (for GDPR compliance)
  deleteUserData(): void {
    // Clear localStorage
    localStorage.removeItem('ga_consent');
    
    // Clear GA cookies
    this.clearGACookies();
    
    // Revoke consent
    this.updateConsent({
      analytics: false,
      marketing: false,
      functionality: false
    });
    
    console.log('GA4 user data deleted');
  }

  // Clear GA cookies
  private clearGACookies(): void {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_gat')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
      }
    });
  }

  // Update measurement ID
  setMeasurementId(measurementId: string): void {
    this.config.measurementId = measurementId;
  }

  // Get analytics status
  getStatus(): {
    initialized: boolean;
    consentGiven: boolean;
    measurementId: string;
  } {
    return {
      initialized: this.isInitialized,
      consentGiven: this.consentGiven,
      measurementId: this.config.measurementId
    };
  }
}

// Default analytics instance
export const analytics = new GoogleAnalytics();

// Utility functions for easy use
export const initializeAnalytics = (measurementId?: string) => {
  if (measurementId) {
    analytics.setMeasurementId(measurementId);
  }
  return analytics.initialize();
};

export const trackPageView = (pageData?: Partial<GAPageView>) => {
  analytics.trackPageView(pageData);
};

export const trackEvent = (event: GAEvent) => {
  analytics.trackEvent(event);
};

export const trackCTAClick = (buttonName: string, location: string) => {
  analytics.trackCTAClick(buttonName, location);
};

export const giveConsent = (consent: { analytics: boolean; marketing?: boolean }) => {
  analytics.updateConsent(consent);
};

export const deleteAnalyticsData = () => {
  analytics.deleteUserData();
}; 