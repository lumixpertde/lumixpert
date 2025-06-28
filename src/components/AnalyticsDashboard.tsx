import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, Clock, MousePointer, Download, Settings, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface AnalyticsData {
  pageViews: number;
  uniqueUsers: number;
  averageTimeOnPage: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  realTimeUsers: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueUsers: 0,
    averageTimeOnPage: 0,
    bounceRate: 0,
    topPages: [],
    topEvents: [],
    realTimeUsers: 0
  });
  
  const [gaStatus, setGaStatus] = useState(analytics.getStatus());
  const [measurementId, setMeasurementId] = useState(gaStatus.measurementId);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadAnalyticsData();
    const interval = setInterval(loadAnalyticsData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadAnalyticsData = () => {
    // Simulate loading analytics data (in real app, this would come from GA4 API)
    setIsLoading(true);
    
    setTimeout(() => {
      setAnalyticsData({
        pageViews: Math.floor(Math.random() * 1000) + 500,
        uniqueUsers: Math.floor(Math.random() * 300) + 150,
        averageTimeOnPage: Math.floor(Math.random() * 180) + 120, // seconds
        bounceRate: Math.floor(Math.random() * 30) + 35, // percentage
        topPages: [
          { page: '/', views: Math.floor(Math.random() * 200) + 100 },
          { page: '/#gallery', views: Math.floor(Math.random() * 150) + 75 },
          { page: '/#about', views: Math.floor(Math.random() * 100) + 50 },
          { page: '/#contact', views: Math.floor(Math.random() * 80) + 40 }
        ],
        topEvents: [
          { event: 'cta_click', count: Math.floor(Math.random() * 50) + 25 },
          { event: 'gallery_view', count: Math.floor(Math.random() * 40) + 20 },
          { event: 'form_submit', count: Math.floor(Math.random() * 20) + 10 },
          { event: 'file_download', count: Math.floor(Math.random() * 15) + 5 }
        ],
        realTimeUsers: Math.floor(Math.random() * 10) + 1
      });
      setLastUpdated(new Date().toLocaleTimeString('de-DE'));
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateMeasurementId = () => {
    if (measurementId.trim()) {
      analytics.setMeasurementId(measurementId.trim());
      setGaStatus(analytics.getStatus());
      
      // Save to localStorage for persistence
      localStorage.setItem('ga_measurement_id', measurementId.trim());
    }
  };

  const handleInitializeAnalytics = async () => {
    setIsLoading(true);
    try {
      await analytics.initialize();
      setGaStatus(analytics.getStatus());
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const downloadReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      period: 'Last 30 days',
      data: analyticsData,
      gaStatus
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lumixpert-analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* GA4 Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Settings className="mr-2" />
          Google Analytics Konfiguration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GA4 Measurement ID
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={measurementId}
                onChange={(e) => setMeasurementId(e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <motion.button
                onClick={handleUpdateMeasurementId}
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
              Status
            </label>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                gaStatus.initialized 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {gaStatus.initialized ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {gaStatus.initialized ? 'Initialisiert' : 'Nicht initialisiert'}
                </span>
              </div>
              
              {!gaStatus.initialized && (
                <motion.button
                  onClick={handleInitializeAnalytics}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? 'Initialisiere...' : 'Initialisieren'}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Datenschutz-Features aktiviert:</span>
          </div>
          <ul className="mt-2 text-sm text-blue-700 space-y-1">
            <li>• IP-Anonymisierung aktiviert</li>
            <li>• Consent Management implementiert</li>
            <li>• GDPR-konforme Datenverarbeitung</li>
            <li>• Benutzer-Löschfunktion verfügbar</li>
          </ul>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="mr-2" />
            Analytics Übersicht
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Letzte Aktualisierung: {lastUpdated}
            </span>
            <motion.button
              onClick={loadAnalyticsData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BarChart3 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
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
                  {analyticsData.pageViews.toLocaleString()}
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
                  {analyticsData.uniqueUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Ø Verweildauer</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(analyticsData.averageTimeOnPage)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <MousePointer className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Absprungrate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.bounceRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Users */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-gray-900">
              {analyticsData.realTimeUsers} Benutzer gerade online
            </span>
          </div>
        </div>

        {/* Top Pages and Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Seiten</h4>
            <div className="space-y-2">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{page.page}</span>
                  <span className="font-medium text-gray-900">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Events</h4>
            <div className="space-y-2">
              {analyticsData.topEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{event.event}</span>
                  <span className="font-medium text-gray-900">{event.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <motion.button
            onClick={downloadReport}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Bericht herunterladen
          </motion.button>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">GA4 Setup Anweisungen</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>1.</strong> Erstellen Sie eine GA4-Property in Google Analytics</p>
          <p><strong>2.</strong> Kopieren Sie die Measurement ID (G-XXXXXXXXXX)</p>
          <p><strong>3.</strong> Fügen Sie die ID oben ein und klicken Sie "Speichern"</p>
          <p><strong>4.</strong> Klicken Sie "Initialisieren" um Analytics zu aktivieren</p>
          <p><strong>5.</strong> Besucher werden automatisch um Cookie-Zustimmung gebeten</p>
          <p><strong>6.</strong> Alle Daten werden GDPR-konform und anonymisiert verarbeitet</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 