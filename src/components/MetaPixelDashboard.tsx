import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, Eye, MousePointer, Download, Shield, AlertCircle, CheckCircle, ExternalLink, TestTube } from 'lucide-react';
import { metaPixel } from '../utils/metaPixel';

interface MetaPixelData {
  pageViews: number;
  uniqueUsers: number;
  buttonClicks: number;
  conversions: number;
  topEvents: Array<{ event: string; count: number }>;
  reachEstimate: number;
}

const MetaPixelDashboard: React.FC = () => {
  const [pixelData, setPixelData] = useState<MetaPixelData>({
    pageViews: 0,
    uniqueUsers: 0,
    buttonClicks: 0,
    conversions: 0,
    topEvents: [],
    reachEstimate: 0
  });
  
  const [pixelStatus, setPixelStatus] = useState(metaPixel.getStatus());
  const [pixelId, setPixelId] = useState(pixelStatus.pixelId);
  const [testEventCode, setTestEventCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [verificationStatus, setVerificationStatus] = useState<'unknown' | 'verified' | 'failed'>('unknown');

  useEffect(() => {
    loadPixelData();
    const interval = setInterval(loadPixelData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadPixelData = () => {
    // Simulate loading Meta Pixel data (in real app, this would come from Meta API)
    setIsLoading(true);
    
    setTimeout(() => {
      setPixelData({
        pageViews: Math.floor(Math.random() * 500) + 200,
        uniqueUsers: Math.floor(Math.random() * 150) + 75,
        buttonClicks: Math.floor(Math.random() * 50) + 25,
        conversions: Math.floor(Math.random() * 10) + 5,
        topEvents: [
          { event: 'PageView', count: Math.floor(Math.random() * 100) + 50 },
          { event: 'CTAClick', count: Math.floor(Math.random() * 30) + 15 },
          { event: 'Contact', count: Math.floor(Math.random() * 15) + 8 },
          { event: 'ViewContent', count: Math.floor(Math.random() * 20) + 10 }
        ],
        reachEstimate: Math.floor(Math.random() * 1000) + 500
      });
      setLastUpdated(new Date().toLocaleTimeString('de-DE'));
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdatePixelId = () => {
    if (pixelId.trim()) {
      metaPixel.setPixelId(pixelId.trim());
      setPixelStatus(metaPixel.getStatus());
      
      // Save to localStorage for persistence
      localStorage.setItem('meta_pixel_id', pixelId.trim());
    }
  };

  const handleUpdateTestEventCode = () => {
    if (testEventCode.trim()) {
      metaPixel.setTestEventCode(testEventCode.trim());
      localStorage.setItem('meta_test_event_code', testEventCode.trim());
    }
  };

  const handleInitializePixel = async () => {
    setIsLoading(true);
    try {
      await metaPixel.initialize();
      setPixelStatus(metaPixel.getStatus());
      setVerificationStatus('verified');
    } catch (error) {
      console.error('Failed to initialize Meta Pixel:', error);
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestPixel = () => {
    // Send test events
    metaPixel.trackPageView({ test_event: true });
    metaPixel.trackCTAClick('Test Button', 'admin_dashboard');
    
    alert('Test events sent! Check Meta Events Manager for verification.');
  };

  const downloadReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      period: 'Last 30 days',
      data: pixelData,
      pixelStatus,
      verificationStatus
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lumixpert-meta-pixel-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const openMetaEventsManager = () => {
    window.open('https://business.facebook.com/events_manager', '_blank');
  };

  const openPixelHelper = () => {
    window.open('https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc', '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Meta Pixel Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="mr-2" />
          Meta (Facebook) Pixel Konfiguration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Pixel ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={pixelId}
                onChange={(e) => setPixelId(e.target.value)}
                placeholder="000000000000000"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <motion.button
                onClick={handleUpdatePixelId}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Speichern
              </motion.button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Event Code (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testEventCode}
                onChange={(e) => setTestEventCode(e.target.value)}
                placeholder="TEST12345"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <motion.button
                onClick={handleUpdateTestEventCode}
                className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TestTube className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pixelStatus.initialized 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {pixelStatus.initialized ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {pixelStatus.initialized ? 'Initialisiert' : 'Nicht initialisiert'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verifikation
            </label>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              verificationStatus === 'verified' 
                ? 'bg-green-100 text-green-700' 
                : verificationStatus === 'failed'
                ? 'bg-red-100 text-red-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {verificationStatus === 'verified' ? (
                <CheckCircle className="w-4 h-4" />
              ) : verificationStatus === 'failed' ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <AlertCircle className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">
                {verificationStatus === 'verified' ? 'Verifiziert' : 
                 verificationStatus === 'failed' ? 'Fehlgeschlagen' : 'Unbekannt'}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            {!pixelStatus.initialized && (
              <motion.button
                onClick={handleInitializePixel}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Initialisiere...' : 'Initialisieren'}
              </motion.button>
            )}
            
            {pixelStatus.initialized && (
              <motion.button
                onClick={handleTestPixel}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Test Senden
              </motion.button>
            )}
          </div>
        </div>

        {/* Privacy and Compliance Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Datenschutz-Features aktiviert:</span>
          </div>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• Consent Management implementiert</li>
            <li>• Tracking nur mit Marketing-Zustimmung</li>
            <li>• GDPR-konforme Datenverarbeitung</li>
            <li>• Benutzer-Löschfunktion verfügbar</li>
          </ul>
        </div>
      </div>

      {/* Meta Pixel Analytics Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Eye className="mr-2" />
            Meta Pixel Übersicht
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Letzte Aktualisierung: {lastUpdated}
            </span>
            <motion.button
              onClick={loadPixelData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Aktualisieren
            </motion.button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Seitenaufrufe</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pixelData.pageViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Eindeutige Besucher</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pixelData.uniqueUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <MousePointer className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Button Klicks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pixelData.buttonClicks.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Konversionen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pixelData.conversions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Events */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Events</h4>
          <div className="space-y-2">
            {pixelData.topEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{event.event}</span>
                <span className="font-medium text-gray-900">{event.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Queued Events */}
        {pixelStatus.queuedEvents > 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-4 h-4" />
              <span className="font-medium">
                {pixelStatus.queuedEvents} Events in der Warteschlange
              </span>
            </div>
            <p className="text-sm text-yellow-700 mt-1">
              Diese Events werden gesendet, sobald der Benutzer Marketing-Cookies akzeptiert.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={downloadReport}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Bericht herunterladen
          </motion.button>
          
          <motion.button
            onClick={openMetaEventsManager}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            Events Manager öffnen
          </motion.button>
          
          <motion.button
            onClick={openPixelHelper}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-4 h-4" />
            Pixel Helper installieren
          </motion.button>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Meta Pixel Setup Anweisungen</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>1.</strong> Erstellen Sie ein Meta Pixel in Ihrem Facebook Business Manager</p>
          <p><strong>2.</strong> Kopieren Sie die Pixel ID (15-stellige Nummer)</p>
          <p><strong>3.</strong> Fügen Sie die ID oben ein und klicken Sie "Speichern"</p>
          <p><strong>4.</strong> Klicken Sie "Initialisieren" um das Pixel zu aktivieren</p>
          <p><strong>5.</strong> Installieren Sie den Meta Pixel Helper für Chrome zur Verifikation</p>
          <p><strong>6.</strong> Testen Sie das Pixel mit "Test Senden" und prüfen Sie den Events Manager</p>
          <p><strong>7.</strong> Alle Events werden nur mit Marketing-Zustimmung des Benutzers gesendet</p>
        </div>
      </div>
    </div>
  );
};

export default MetaPixelDashboard; 