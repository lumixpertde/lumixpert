# Meta (Facebook) Pixel Setup Guide for LumiXpert

## Overview
This guide provides complete instructions for setting up Meta (Facebook) Pixel on the LumiXpert website with privacy-respecting configurations, GDPR compliance, and comprehensive event tracking.

## Features Implemented

### ✅ Core Meta Pixel Integration
- **Dynamic Script Loading**: Meta Pixel script loads asynchronously without blocking page performance
- **Privacy-First Configuration**: Consent management and GDPR compliance built-in
- **Standard Event Tracking**: PageView, Contact, Lead, ViewContent events
- **Custom Event Tracking**: CTA clicks, button interactions, gallery views
- **Advanced Matching**: Enhanced attribution with user data matching
- **Test Event Support**: Development testing with test event codes

### ✅ Privacy & GDPR Compliance
- **Cookie Consent Integration**: Integrated with existing consent management
- **Marketing Consent Required**: Pixel only fires with explicit marketing consent
- **Data Deletion**: GDPR-compliant user data deletion functionality
- **Consent Revocation**: Users can revoke consent and stop tracking
- **Event Queueing**: Events queued until consent is given, then sent

### ✅ Event Tracking
- **Page Views**: Automatic page view tracking with content categorization
- **CTA Button Clicks**: Track "Angebot anfordern" and navigation clicks
- **Form Submissions**: Contact form submission tracking as Lead and Contact events
- **Gallery Interactions**: Material clicks tracked as ViewContent events
- **Custom Events**: Extensible custom event tracking system
- **Conversion Tracking**: Lead generation and contact form conversions

### ✅ Admin Dashboard
- **Configuration Management**: Set and update Meta Pixel ID and test event codes
- **Analytics Overview**: Simulated metrics display (pageviews, users, conversions)
- **Privacy Status**: Monitor consent status and data collection compliance
- **Test Functionality**: Send test events to verify pixel installation
- **External Links**: Direct access to Meta Events Manager and Pixel Helper

## Setup Instructions

### 1. Create Meta Pixel in Facebook Business Manager

1. **Go to Facebook Business Manager**: Visit [business.facebook.com](https://business.facebook.com)
2. **Access Events Manager**: Navigate to Events Manager in the left menu
3. **Create Pixel**: 
   - Click "Connect Data Sources" → "Web" → "Facebook Pixel"
   - Enter "LumiXpert" as pixel name
   - Enter website URL: `https://lumixpert.de`
   - Choose "Manually install the code yourself"
4. **Get Pixel ID**: Copy the 15-digit Pixel ID (e.g., 123456789012345)
5. **Optional - Create Test Event Code**: For development testing, create a test event code

### 2. Configure LumiXpert Website

1. **Access Admin Panel**: Navigate to `https://lumixpert.de/admin`
2. **Login**: Use password `lumixpert2025`
3. **Go to Meta Pixel Tab**: Click on "Meta Pixel" in the admin navigation
4. **Enter Pixel ID**: Paste your Meta Pixel ID (15-digit number)
5. **Enter Test Event Code**: (Optional) Paste test event code for development
6. **Click "Speichern"**: Save the configuration
7. **Click "Initialisieren"**: Initialize Meta Pixel

### 3. Verify Installation

1. **Install Meta Pixel Helper**: Install the Chrome extension from the admin dashboard
2. **Test Website**: Visit your website and navigate through different sections
3. **Check Pixel Helper**: The extension should show green checkmark and active events
4. **Test Events**: Use "Test Senden" button in admin panel
5. **Verify in Events Manager**: Check Meta Events Manager for real-time events
6. **Test with Different Consent States**: Test with marketing cookies accepted/rejected

## Privacy Configuration

### Cookie Consent Integration
- **Automatic Integration**: Meta Pixel respects existing cookie consent banner
- **Marketing Consent Required**: Only fires when user accepts marketing cookies
- **Event Queueing**: Events are queued and sent when consent is given
- **Data Deletion**: Integrated with "Delete All Data" functionality

### GDPR Compliance Features
- **Default Denied**: All tracking disabled until user consents to marketing
- **Consent Storage**: User preferences remembered across sessions
- **Data Deletion**: Users can delete all collected pixel data
- **Consent Expiry**: Consent expires after 1 year, requiring renewal

## Event Tracking Details

### Automatically Tracked Events

#### Page Views
```javascript
// Automatically tracked on route changes
{
  content_name: "LumiXpert - Premium Lasergravur",
  content_category: "Home"
}
```

#### CTA Clicks (Custom Event)
```javascript
// Tracked when users click call-to-action buttons
{
  cta_name: "Angebot anfordern",
  cta_location: "hero_section",
  content_category: "Call to Action"
}
```

#### Contact Form Submissions
```javascript
// Contact Event
{
  content_name: "contact_form",
  content_category: "Form Submission"
}

// Lead Event
{
  content_name: "Contact Form Submission",
  content_category: "Lead Generation",
  currency: "EUR",
  value: 1
}
```

#### Gallery Interactions (ViewContent)
```javascript
// Tracked when users click on materials
{
  content_type: "gallery_material",
  content_name: "Metall",
  content_category: "Gallery",
  num_items: 5
}
```

### Custom Tracking (Developer Use)

```javascript
import { metaPixel, trackMetaCTAClick, trackMetaContact } from './utils/metaPixel';

// Track custom events
metaPixel.trackCustomEvent('CustomAction', {
  custom_parameter: 'value',
  content_category: 'User Interaction'
});

// Track standard events
metaPixel.trackStandardEvent('Purchase', {
  value: 99.99,
  currency: 'EUR'
});

// Track CTA clicks
trackMetaCTAClick('Button Name', 'section_name');

// Track contact forms
trackMetaContact('newsletter_signup');
```

## Meta Pixel Dashboard Features

### Configuration Panel
- **Pixel ID Management**: Update Meta Pixel tracking ID
- **Test Event Code**: Set test event code for development
- **Initialization Status**: Monitor connection status
- **Privacy Settings**: View enabled privacy features

### Metrics Overview (Simulated)
- **Page Views**: Total page views tracked by pixel
- **Users**: Unique visitors and conversions
- **Button Clicks**: CTA and button interaction tracking
- **Conversions**: Lead generation and contact form submissions
- **Top Events**: Most triggered events with frequencies

### Tools & Verification
- **Test Events**: Send test events to verify pixel functionality
- **Meta Events Manager**: Direct link to Facebook Events Manager
- **Pixel Helper**: Link to install Chrome extension for verification
- **Report Downloads**: Export pixel data for analysis

## Technical Implementation

### Core Files
- `src/utils/metaPixel.ts`: Main Meta Pixel integration and tracking functions
- `src/components/CookieConsent.tsx`: GDPR-compliant consent with Meta Pixel integration
- `src/components/MetaPixelDashboard.tsx`: Admin panel Meta Pixel interface
- `src/App.tsx`: Main app integration and initialization

### Privacy Features
- **Consent Management**: Integrated with existing cookie consent system
- **Event Queueing**: Events stored until consent is given
- **Data Deletion**: GDPR-compliant user data removal
- **Consent Revocation**: Users can revoke consent at any time

### Performance Optimizations
- **Async Loading**: Non-blocking script loading
- **Error Handling**: Graceful fallbacks for tracking failures
- **Minimal Impact**: Optimized for Core Web Vitals
- **Queue Management**: Efficient event queuing and processing

## Troubleshooting

### Common Issues

#### Meta Pixel Not Tracking
1. **Check Pixel ID**: Ensure correct 15-digit Pixel ID format
2. **Verify Initialization**: Look for "Meta Pixel initialized successfully" in browser console
3. **Check Consent**: Ensure user has accepted marketing cookies
4. **Test Real-time**: Use Meta Events Manager real-time view to verify data flow

#### Pixel Helper Not Showing Events
1. **Install Extension**: Install Meta Pixel Helper Chrome extension
2. **Check Console**: Look for JavaScript errors in browser console
3. **Verify Consent**: Ensure marketing consent is granted
4. **Test Manually**: Use admin panel "Test Senden" button

#### Events Not Appearing in Events Manager
1. **Check Pixel ID**: Verify correct Pixel ID in admin panel
2. **Test Events**: Use test event code for development verification
3. **Wait Time**: Events may take 15-30 minutes to appear in Events Manager
4. **Verify Domain**: Ensure domain is verified in Facebook Business Manager

### Debug Mode
Enable debug mode by setting `enableDevelopment: true` in Meta Pixel configuration:

```javascript
const metaPixel = new MetaPixel({
  pixelId: '123456789012345',
  enableDevelopment: true,  // Enable debug logging
  testEventCode: 'TEST12345'  // Add test event code
});
```

## Best Practices

### Data Collection
- **Minimal Data**: Only collect necessary marketing data
- **User Privacy**: Always prioritize user privacy and consent
- **Regular Audits**: Review collected data and tracking implementation
- **Documentation**: Keep tracking documentation up to date

### Performance
- **Async Loading**: Always load Meta Pixel script asynchronously
- **Error Handling**: Implement proper error handling for tracking failures
- **Batch Events**: Group related events when possible
- **Monitor Impact**: Regularly check Core Web Vitals impact

### Compliance
- **Regular Updates**: Keep consent management up to date with regulations
- **Clear Communication**: Provide clear information about data collection
- **User Control**: Give users full control over their data
- **Documentation**: Maintain compliance documentation

## Facebook Business Manager Setup

### Domain Verification
1. **Go to Business Settings**: In Facebook Business Manager
2. **Brand Safety**: Navigate to Brand Safety → Domains
3. **Add Domain**: Add `lumixpert.de` and verify ownership
4. **DNS Verification**: Follow DNS verification process

### Conversions API (Advanced)
For enhanced tracking and iOS 14.5+ compatibility:
1. **Set up Conversions API**: In Events Manager
2. **Server-side Tracking**: Implement server-side event sending
3. **Event Matching**: Configure event deduplication
4. **Enhanced Measurement**: Improve attribution accuracy

## Support & Maintenance

### Regular Tasks
- **Monthly**: Review Meta Pixel data and adjust tracking as needed
- **Quarterly**: Update privacy policy and consent mechanisms
- **Annually**: Audit data collection practices and compliance

### Contact Information
For technical support or questions about the Meta Pixel implementation:
- **Developer**: Available through admin panel
- **Documentation**: This guide and inline code comments
- **Meta Support**: [business.facebook.com/help](https://business.facebook.com/help)

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Compliance**: GDPR, CCPA, ePrivacy Directive  
**Platform**: Meta (Facebook) Business 