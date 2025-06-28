import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, Globe, FileText, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import { SitemapGenerator, generateLumiXpertSitemap, generateRobotsTxt, pingSearchEngines } from '../utils/sitemap';

interface SitemapManagerProps {
  galleryItems?: any[];
}

const SitemapManager: React.FC<SitemapManagerProps> = ({ galleryItems = [] }) => {
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');
  const [stats, setStats] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string>('');
  const [pingStatus, setPingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    generateSitemap();
  }, [galleryItems]);

  const generateSitemap = () => {
    setIsGenerating(true);
    
    try {
      // Generate sitemap XML
      const xml = generateLumiXpertSitemap(galleryItems);
      setSitemapXml(xml);

      // Generate robots.txt
      const robots = generateRobotsTxt();
      setRobotsTxt(robots);

      // Generate statistics
      const generator = new SitemapGenerator();
      generator.addMainPages();
      if (galleryItems.length > 0) {
        generator.addGalleryPages(galleryItems);
      }
      generator.addServicePages();
      
      const statistics = generator.getStats();
      setStats(statistics);
      setLastGenerated(new Date().toLocaleString('de-DE'));
      
    } catch (error) {
      console.error('Error generating sitemap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePingSearchEngines = async () => {
    setIsPinging(true);
    setPingStatus('idle');
    
    try {
      await pingSearchEngines('https://lumixpert.de/sitemap.xml');
      setPingStatus('success');
    } catch (error) {
      console.error('Error pinging search engines:', error);
      setPingStatus('error');
    } finally {
      setIsPinging(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Globe className="mr-2" />
            Sitemap Management
          </h3>
          <motion.button
            onClick={generateSitemap}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generiere...' : 'Neu Generieren'}
          </motion.button>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Gesamt URLs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUrls}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Letzte Generierung</p>
                  <p className="text-sm font-bold text-gray-900">{lastGenerated}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-sm font-bold text-green-600">Aktiv</p>
                </div>
              </div>
            </div>
          </div>
        )}



        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.button
            onClick={() => downloadFile(sitemapXml, 'sitemap.xml', 'application/xml')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Sitemap.xml herunterladen
          </motion.button>

          <motion.button
            onClick={() => downloadFile(robotsTxt, 'robots.txt', 'text/plain')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-4 h-4" />
            Robots.txt herunterladen
          </motion.button>
        </div>

        {/* Ping Search Engines */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-900">Suchmaschinen benachrichtigen</h4>
              <p className="text-sm text-gray-600">Informiere Google und Bing über Sitemap-Updates</p>
            </div>
            <motion.button
              onClick={handlePingSearchEngines}
              disabled={isPinging}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Globe className={`w-4 h-4 ${isPinging ? 'animate-pulse' : ''}`} />
              {isPinging ? 'Sende...' : 'Ping Senden'}
            </motion.button>
          </div>

          {pingStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="w-4 h-4" />
              Suchmaschinen erfolgreich benachrichtigt!
            </div>
          )}

          {pingStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              Fehler beim Benachrichtigen der Suchmaschinen.
            </div>
          )}
        </div>
      </div>

      {/* Sitemap Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Sitemap Vorschau</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* XML Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-700">sitemap.xml</h5>
              <button
                onClick={() => copyToClipboard(sitemapXml)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Kopieren
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-64 border">
              {sitemapXml.substring(0, 1000)}
              {sitemapXml.length > 1000 && '...'}
            </pre>
          </div>

          {/* Robots.txt Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-gray-700">robots.txt</h5>
              <button
                onClick={() => copyToClipboard(robotsTxt)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Kopieren
              </button>
            </div>
            <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-64 border">
              {robotsTxt}
            </pre>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Setup Anweisungen</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>1.</strong> Lade die generierten Dateien herunter</p>
          <p><strong>2.</strong> Platziere <code>sitemap.xml</code> und <code>robots.txt</code> im Root-Verzeichnis deiner Website</p>
          <p><strong>3.</strong> Teste die URLs: <code>https://lumixpert.de/sitemap.xml</code> und <code>https://lumixpert.de/robots.txt</code></p>
          <p><strong>4.</strong> Reiche die Sitemap in der Google Search Console ein</p>
          <p><strong>5.</strong> Verwende den "Ping Senden" Button nach wichtigen Updates</p>
        </div>
      </div>
    </div>
  );
};

export default SitemapManager;