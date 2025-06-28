// Meta (Facebook) Pixel integration for LumiXpert
// Privacy-respecting implementation with GDPR compliance and event tracking

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
    _fbq: (...args: any[]) => void;
  }
}

export interface MetaPixelConfig {
  pixelId: string;
  enableDevelopment: boolean;
  enableAdvancedMatching: boolean;
  enableAutomaticMatching: boolean;
  enableFirstPartyData: boolean;
  testEventCode?: string;
}

export interface MetaPixelEvent {
  eventName: string;
  parameters?: Record<string, any>;
  customData?: Record<string, any>;
}

export class MetaPixel {
  private config: MetaPixelConfig;
  private isInitialized: boolean = false;
  private consentGiven: boolean = false;
  private queuedEvents: MetaPixelEvent[] = [];
  private static instance: MetaPixel | null = null;

  constructor(config: Partial<MetaPixelConfig> = {}) {
    // Prevent multiple instances
    if (MetaPixel.instance) {
      // Return the existing instance but don't actually return in constructor
      console.warn('Meta Pixel: Instance already exists, using existing instance');
    }

    this.config = {
      pixelId: '', // Will be set during initialization
      enableDevelopment: process.env.NODE_ENV === 'development',
      enableAdvancedMatching: true,
      enableAutomaticMatching: true,
      enableFirstPartyData: true,
      ...config
    };

    if (!MetaPixel.instance) {
      MetaPixel.instance = this;
    }
  }

  // Initialize Meta Pixel
  async initialize(pixelId?: string): Promise<void> {
    // Validate pixel ID
    if (!pixelId && !this.config.pixelId) {
      console.warn('Meta Pixel: No valid pixel ID provided, skipping initialization');
      return;
    }

    if (pixelId) {
      this.config.pixelId = pixelId;
    }

    // Validate pixel ID format (should be numeric and reasonable length)
    if (!/^\d{15,16}$/.test(this.config.pixelId)) {
      console.warn('Meta Pixel: Invalid pixel ID format, skipping initialization');
      return;
    }

    if (this.isInitialized) {
      console.warn('Meta Pixel already initialized');
      return;
    }

    try {
      // Load Meta Pixel script
      await this.loadPixelScript();
      
      // Configure Meta Pixel
      this.configurePixel();
      
      // Set up privacy settings
      this.setupPrivacySettings();
      
      this.isInitialized = true;
      console.log('Meta Pixel initialized successfully with ID:', this.config.pixelId);
      
      // Process queued events
      this.processQueuedEvents();
      
    } catch (error) {
      console.error('Failed to initialize Meta Pixel:', error);
    }
  }

  // Load the Meta Pixel script dynamically
  private loadPixelScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      if (document.querySelector(`script[src*="connect.facebook.net"]`)) {
        resolve();
        return;
      }

      // Initialize fbq function only if it doesn't exist
      if (!window.fbq) {
        window.fbq = function() {
          (window.fbq as any).callMethod ? 
          (window.fbq as any).callMethod.apply(window.fbq, arguments) : 
          (window.fbq as any).queue.push(arguments);
        };
        (window.fbq as any).queue = [];
        (window.fbq as any).loaded = false;
      }
      
      if (!(window.fbq as any).loaded) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://connect.facebook.net/en_US/fbevents.js';
        
        script.onload = () => {
          (window.fbq as any).loaded = true;
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Meta Pixel script'));
        
        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  // Configure Meta Pixel with privacy settings
  private configurePixel(): void {
    if (!window.fbq || !this.config.pixelId) {
      console.warn('Meta Pixel: fbq not available or no pixel ID');
      return;
    }

    const initOptions: Record<string, any> = {};

    // Advanced matching for better attribution
    if (this.config.enableAdvancedMatching) {
      initOptions.em = 'hashed_email';
      initOptions.fn = 'hashed_first_name';
      initOptions.ln = 'hashed_last_name';
    }

    // Automatic matching
    if (this.config.enableAutomaticMatching) {
      initOptions.automatic_matching = true;
    }

    // First-party data
    if (this.config.enableFirstPartyData) {
      initOptions.first_party_data = true;
    }

    try {
      // Test event code for development
      if (this.config.testEventCode && this.config.enableDevelopment) {
        window.fbq('init', this.config.pixelId, initOptions, {
          test_event_code: this.config.testEventCode
        });
      } else {
        window.fbq('init', this.config.pixelId, initOptions);
      }

      // Set agent for tracking (only if pixel is properly initialized)
      window.fbq('set', 'agent', 'lumixpert-website', this.config.pixelId);
    } catch (error) {
      console.error('Meta Pixel configuration error:', error);
    }
  }

  // Set up privacy-respecting settings
  private setupPrivacySettings(): void {
    // Set default consent state (denied until user consents)
    window.fbq('consent', 'revoke');

    // Check for existing consent
    const consent = this.getStoredConsent();
    if (consent && consent.marketing) {
      this.updateConsent(consent);
    }
  }

  // Update user consent for Meta Pixel
  updateConsent(consent: {
    marketing: boolean;
    analytics?: boolean;
    functionality?: boolean;
  }): void {
    this.consentGiven = consent.marketing;

    if (consent.marketing) {
      window.fbq('consent', 'grant');
      
      // Track PageView if consent is given
      if (this.isInitialized) {
        this.trackPageView();
      }
    } else {
      window.fbq('consent', 'revoke');
    }

    // Store consent preference
    this.storeConsent(consent);
    
    console.log('Meta Pixel consent updated:', consent);
  }

  // Track page views
  trackPageView(customData?: Record<string, any>): void {
    if (!this.isInitialized || !this.consentGiven) {
      console.warn('Meta Pixel not initialized or consent not given');
      return;
    }

    const pageData = {
      content_name: document.title,
      content_category: this.getContentCategory(),
      ...customData
    };

    window.fbq('track', 'PageView', pageData);
    console.log('Meta Pixel PageView tracked:', pageData);
  }

  // Track standard events
  trackStandardEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized || !this.consentGiven) {
      this.queueEvent({ eventName, parameters });
      return;
    }

    window.fbq('track', eventName, parameters);
    console.log('Meta Pixel standard event tracked:', eventName, parameters);
  }

  // Track custom events
  trackCustomEvent(eventName: string, parameters?: Record<string, any>): void {
    if (!this.isInitialized || !this.consentGiven) {
      this.queueEvent({ eventName, parameters });
      return;
    }

    window.fbq('trackCustom', eventName, parameters);
    console.log('Meta Pixel custom event tracked:', eventName, parameters);
  }

  // Track CTA clicks
  trackCTAClick(ctaName: string, location: string): void {
    this.trackCustomEvent('CTAClick', {
      cta_name: ctaName,
      cta_location: location,
      content_category: 'Call to Action'
    });
  }

  // Track contact form submission
  trackContact(formName: string = 'contact_form'): void {
    this.trackStandardEvent('Contact', {
      content_name: formName,
      content_category: 'Form Submission'
    });
  }

  // Track lead generation
  trackLead(parameters?: Record<string, any>): void {
    this.trackStandardEvent('Lead', {
      content_name: 'Contact Form',
      content_category: 'Lead Generation',
      currency: 'EUR',
      ...parameters
    });
  }

  // Track gallery interactions
  trackGalleryView(materialName: string, productCount: number = 0): void {
    this.trackStandardEvent('ViewContent', {
      content_type: 'gallery_material',
      content_name: materialName,
      content_category: 'Gallery',
      num_items: productCount
    });
  }

  // Queue events when pixel is not ready
  private queueEvent(event: MetaPixelEvent): void {
    this.queuedEvents.push(event);
    console.log('Meta Pixel event queued:', event);
  }

  // Process queued events
  private processQueuedEvents(): void {
    if (!this.consentGiven) return;

    this.queuedEvents.forEach(event => {
      if (event.eventName.startsWith('track')) {
        this.trackStandardEvent(event.eventName.replace('track', ''), event.parameters);
      } else {
        this.trackCustomEvent(event.eventName, event.parameters);
      }
    });

    this.queuedEvents = [];
  }

  // Get content category based on current page
  private getContentCategory(): string {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    if (path === '/' && hash.includes('#about')) return 'About';
    if (path === '/' && hash.includes('#gallery')) return 'Gallery';
    if (path === '/' && hash.includes('#contact')) return 'Contact';
    if (path.includes('/admin')) return 'Admin';
    if (path.includes('/services')) return 'Services';
    return 'Home';
  }

  // Store consent in localStorage
  private storeConsent(consent: any): void {
    try {
      localStorage.setItem('meta_pixel_consent', JSON.stringify({
        ...consent,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Failed to store Meta Pixel consent:', error);
    }
  }

  // Get stored consent
  private getStoredConsent(): any {
    try {
      const stored = localStorage.getItem('meta_pixel_consent');
      if (stored) {
        const consent = JSON.parse(stored);
        // Check if consent is not older than 1 year
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (Date.now() - consent.timestamp < oneYear) {
          return consent;
        }
      }
    } catch (error) {
      console.warn('Failed to get stored Meta Pixel consent:', error);
    }
    return null;
  }

  // Update pixel ID
  setPixelId(pixelId: string): void {
    this.config.pixelId = pixelId;
  }

  // Set test event code for development
  setTestEventCode(testEventCode: string): void {
    this.config.testEventCode = testEventCode;
  }

  // Clear all Meta Pixel data (for GDPR compliance)
  clearPixelData(): void {
    // Clear localStorage
    localStorage.removeItem('meta_pixel_consent');
    
    // Revoke consent
    if (this.isInitialized) {
      window.fbq('consent', 'revoke');
    }
    
    this.consentGiven = false;
    this.queuedEvents = [];
    
    console.log('Meta Pixel data cleared');
  }

  // Get pixel status
  getStatus(): {
    initialized: boolean;
    consentGiven: boolean;
    pixelId: string;
    queuedEvents: number;
  } {
    return {
      initialized: this.isInitialized,
      consentGiven: this.consentGiven,
      pixelId: this.config.pixelId,
      queuedEvents: this.queuedEvents.length
    };
  }
}

// Default Meta Pixel instance
export const metaPixel = new MetaPixel();

// Utility functions for easy use
export const initializeMetaPixel = (pixelId?: string, testEventCode?: string) => {
  if (testEventCode) {
    metaPixel.setTestEventCode(testEventCode);
  }
  return metaPixel.initialize(pixelId);
};

export const trackMetaPageView = (customData?: Record<string, any>) => {
  metaPixel.trackPageView(customData);
};

export const trackMetaCTAClick = (ctaName: string, location: string) => {
  metaPixel.trackCTAClick(ctaName, location);
};

export const trackMetaContact = (formName?: string) => {
  metaPixel.trackContact(formName);
};

export const trackMetaLead = (parameters?: Record<string, any>) => {
  metaPixel.trackLead(parameters);
};

export const giveMetaConsent = (consent: { marketing: boolean; analytics?: boolean }) => {
  metaPixel.updateConsent(consent);
};

export const clearMetaPixelData = () => {
  metaPixel.clearPixelData();
}; 