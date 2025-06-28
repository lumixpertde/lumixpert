import React, { useEffect, useState } from 'react';
import { TrendingUp, Eye, Search, Users, ExternalLink } from 'lucide-react';

interface SEOMetrics {
  pageViews: number;
  organicTraffic: number;
  averagePosition: number;
  clickThroughRate: number;
  bounceRate: number;
  topKeywords: string[];
}

const SEOAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pageViews: 0,
    organicTraffic: 0,
    averagePosition: 0,
    clickThroughRate: 0,
    bounceRate: 0,
    topKeywords: []
  });

  const [seoScore, setSeoScore] = useState(0);

  useEffect(() => {
    // Simulate loading SEO metrics (in real app, this would come from Google Analytics/Search Console)
    const loadMetrics = () => {
      setMetrics({
        pageViews: 1250,
        organicTraffic: 890,
        averagePosition: 12.5,
        clickThroughRate: 3.2,
        bounceRate: 45.8,
        topKeywords: ['Lasergravur', 'Metallgravur', 'Holzgravur', 'Personalisierung', 'Gravur Service']
      });
      setSeoScore(78);
    };

    loadMetrics();
  }, []);

  const seoChecklist = [
    { item: 'Meta Title optimiert', status: true },
    { item: 'Meta Description vorhanden', status: true },
    { item: 'H1-H6 Struktur korrekt', status: true },
    { item: 'Alt-Tags für Bilder', status: false },
    { item: 'Strukturierte Daten', status: true },
    { item: 'Mobile Optimierung', status: true },
    { item: 'Page Speed optimiert', status: false },
    { item: 'SSL Zertifikat', status: true }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2" />
          SEO Performance Dashboard
        </h3>
        
        {/* SEO Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">SEO Score</span>
            <span className="text-sm text-gray-500">{seoScore}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${seoScore}%` }}
            ></div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Seitenaufrufe</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.pageViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Organischer Traffic</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.organicTraffic.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Durchschn. Position</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.averagePosition}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">CTR</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.clickThroughRate}%</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <ExternalLink className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Absprungrate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.bounceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Top Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {metrics.topKeywords.map((keyword, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* SEO Checklist */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">SEO Checklist</h4>
          <div className="space-y-2">
            {seoChecklist.map((check, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-3 ${check.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm ${check.status ? 'text-gray-700' : 'text-red-600'}`}>
                  {check.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOAnalytics; 