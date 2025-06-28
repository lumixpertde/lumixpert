import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, Settings, X, Check } from 'lucide-react';
import { giveConsent, deleteAnalyticsData, analytics } from '../utils/analytics';
import { giveMetaConsent, clearMetaPixelData, metaPixel } from '../utils/metaPixel';

interface CookieConsentProps {
  onConsentChange?: (consent: { analytics: boolean; marketing: boolean; functional: boolean }) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false,
    functional: true
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    try {
      const existingConsent = localStorage.getItem('ga_consent');
      if (!existingConsent) {
        setShowBanner(true);
      } else {
        const parsed = JSON.parse(existingConsent);
        const newConsent = {
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
          functional: parsed.functionality !== false
        };
        setConsent(newConsent);
        setShowBanner(false);
      }
    } catch (error) {
      console.warn('Error reading consent:', error);
      setShowBanner(true);
    }
  }, []);

  const processConsent = useCallback(async (newConsent: { analytics: boolean; marketing: boolean; functional: boolean }) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Update local state first
      setConsent(newConsent);
      
      // Store in localStorage
      localStorage.setItem('ga_consent', JSON.stringify({
        analytics: newConsent.analytics,
        marketing: newConsent.marketing,
        functionality: newConsent.functional,
        timestamp: Date.now()
      }));

      // Give consent to analytics (with retry)
      try {
        await giveConsent(newConsent);
      } catch (error) {
        console.warn('Analytics consent error:', error);
      }

      // Give consent to Meta Pixel (with retry)
      try {
        await giveMetaConsent(newConsent);
      } catch (error) {
        console.warn('Meta Pixel consent error:', error);
      }

      // Call callback
      onConsentChange?.(newConsent);
      
      console.log('Cookie consent processed successfully:', newConsent);
    } catch (error) {
      console.error('Error processing consent:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onConsentChange]);

  const handleAcceptAll = useCallback(async () => {
    const newConsent = {
      analytics: true,
      marketing: true,
      functional: true
    };
    
    await processConsent(newConsent);
    setShowBanner(false);
  }, [processConsent]);

  const handleRejectAll = useCallback(async () => {
    const newConsent = {
      analytics: false,
      marketing: false,
      functional: true
    };
    
    await processConsent(newConsent);
    setShowBanner(false);
  }, [processConsent]);

  const handleSaveSettings = useCallback(async () => {
    await processConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  }, [consent, processConsent]);

  const handleToggleConsent = useCallback((type: 'analytics' | 'marketing' | 'functional') => {
    if (type === 'functional' || isProcessing) return; // Functional cookies are required
    
    setConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  }, [isProcessing]);

  const handleDeleteData = useCallback(async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Clear analytics data
      await deleteAnalyticsData();
      
      // Clear Meta Pixel data
      await clearMetaPixelData();
      
      // Clear localStorage
      localStorage.removeItem('ga_consent');
      localStorage.removeItem('meta_pixel_consent');
      
      const newConsent = {
        analytics: false,
        marketing: false,
        functional: true
      };
      
      setConsent(newConsent);
      setShowBanner(false);
      setShowSettings(false);
      onConsentChange?.(newConsent);
      
      console.log('All cookie data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, onConsentChange]);

  if (!showBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        {/* Banner */}
        <motion.div
          className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full border border-gray-200"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <Cookie className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Cookie-Einstellungen
                </h3>
                
                <p className="text-gray-600 mb-4">
                  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und anonyme Nutzungsstatistiken zu sammeln. 
                  Ihre Privatsphäre ist uns wichtig - alle Daten werden anonymisiert und IP-Adressen werden gekürzt.
                </p>

                {!showSettings ? (
                  // Simple banner
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      onClick={handleAcceptAll}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      <Check className="w-4 h-4" />
                      {isProcessing ? 'Wird gespeichert...' : 'Alle akzeptieren'}
                    </motion.button>
                    
                    <motion.button
                      onClick={handleRejectAll}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      {isProcessing ? 'Wird gespeichert...' : 'Alle ablehnen'}
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setShowSettings(true)}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      <Settings className="w-4 h-4" />
                      Einstellungen
                    </motion.button>
                  </div>
                ) : (
                  // Detailed settings
                  <div className="space-y-4">
                    {/* Functional Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Funktionale Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Erforderlich für die Grundfunktionen der Website. Diese können nicht deaktiviert werden.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className="ml-2 text-sm text-green-600 font-medium">Erforderlich</span>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Analyse-Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Helfen uns zu verstehen, wie die Website genutzt wird. Alle Daten werden anonymisiert.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleConsent('analytics')}
                        disabled={isProcessing}
                        className="flex items-center disabled:cursor-not-allowed"
                      >
                        <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          consent.analytics ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                        } ${isProcessing ? 'opacity-50' : ''}`}>
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          consent.analytics ? 'text-blue-600' : 'text-gray-500'
                        } ${isProcessing ? 'opacity-50' : ''}`}>
                          {consent.analytics ? 'Aktiviert' : 'Deaktiviert'}
                        </span>
                      </button>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">Marketing-Cookies</h4>
                        <p className="text-sm text-gray-600">
                          Ermöglichen personalisierte Werbung und Remarketing-Funktionen.
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggleConsent('marketing')}
                        disabled={isProcessing}
                        className="flex items-center disabled:cursor-not-allowed"
                      >
                        <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          consent.marketing ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'
                        } ${isProcessing ? 'opacity-50' : ''}`}>
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          consent.marketing ? 'text-blue-600' : 'text-gray-500'
                        } ${isProcessing ? 'opacity-50' : ''}`}>
                          {consent.marketing ? 'Aktiviert' : 'Deaktiviert'}
                        </span>
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <motion.button
                        onClick={handleSaveSettings}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      >
                        <Check className="w-4 h-4" />
                        {isProcessing ? 'Wird gespeichert...' : 'Einstellungen speichern'}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setShowSettings(false)}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      >
                        Zurück
                      </motion.button>
                      
                      <motion.button
                        onClick={handleDeleteData}
                        disabled={isProcessing}
                        className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:bg-red-50 disabled:cursor-not-allowed transition-colors font-medium"
                        whileHover={!isProcessing ? { scale: 1.02 } : {}}
                        whileTap={!isProcessing ? { scale: 0.98 } : {}}
                      >
                        <X className="w-4 h-4" />
                        {isProcessing ? 'Wird gelöscht...' : 'Alle Daten löschen'}
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Privacy info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>
                      Ihre Daten werden anonymisiert und IP-Adressen gekürzt. 
                      Sie können Ihre Einstellungen jederzeit ändern.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent; 