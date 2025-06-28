import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  TrendingUp, 
  Activity, 
  Gauge, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Trash2
} from 'lucide-react';
import { PerformanceMonitor, PerformanceMetrics } from '../utils/performance';

interface PerformanceDashboardProps {
  performanceMonitor?: PerformanceMonitor;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({ performanceMonitor }) => {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [grade, setGrade] = useState<'good' | 'needs-improvement' | 'poor'>('needs-improvement');
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Get cache size
    getCacheSize();

    if (performanceMonitor) {
      // Get initial metrics
      const currentMetrics = performanceMonitor.getMetrics();
      setMetrics(currentMetrics);
      setGrade(performanceMonitor.getPerformanceGrade());

      // Set up periodic updates
      const interval = setInterval(() => {
        const currentMetrics = performanceMonitor.getMetrics();
        setMetrics(currentMetrics);
        setGrade(performanceMonitor.getPerformanceGrade());
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [performanceMonitor]);

  const getCacheSize = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        const messageChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage(
          { type: 'GET_CACHE_SIZE' },
          [messageChannel.port2]
        );
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data.cacheSize) {
            setCacheSize(event.data.cacheSize);
          }
        };
      } catch (error) {
        console.warn('Could not get cache size:', error);
      }
    }
  };

  const clearCache = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        const messageChannel = new MessageChannel();
        navigator.serviceWorker.controller.postMessage(
          { type: 'CLEAR_CACHE' },
          [messageChannel.port2]
        );
        
        messageChannel.port1.onmessage = (event) => {
          if (event.data.success) {
            setCacheSize(0);
            alert('Cache cleared successfully!');
          }
        };
      } catch (error) {
        console.warn('Could not clear cache:', error);
      }
    }
  };

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    // Trigger a page reload to get fresh metrics
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const getMetricStatus = (metric: number | undefined, thresholds: { good: number; fair: number }) => {
    if (metric === undefined) return 'unknown';
    if (metric <= thresholds.good) return 'good';
    if (metric <= thresholds.fair) return 'fair';
    return 'poor';
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getGradeIcon = (grade: string) => {
    switch (grade) {
      case 'good': return <CheckCircle className="w-5 h-5" />;
      case 'needs-improvement': return <AlertTriangle className="w-5 h-5" />;
      case 'poor': return <XCircle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const performanceRecommendations = [
    {
      title: 'Image Optimization',
      description: 'Use WebP format and lazy loading for better performance',
      status: 'implemented',
      impact: 'high'
    },
    {
      title: 'Code Splitting',
      description: 'Split JavaScript bundles for faster initial load',
      status: 'implemented',
      impact: 'high'
    },
    {
      title: 'Service Worker Caching',
      description: 'Cache static assets for offline functionality',
      status: 'implemented',
      impact: 'medium'
    },
    {
      title: 'CSS Minification',
      description: 'Minify CSS files to reduce bundle size',
      status: 'implemented',
      impact: 'medium'
    },
    {
      title: 'Font Optimization',
      description: 'Use font-display: swap for better loading',
      status: 'implemented',
      impact: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Gauge className="w-5 h-5 mr-2" />
            Performance Overview
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getGradeColor(grade)}`}>
              {grade.replace('-', ' ').toUpperCase()}
            </span>
            <div className={getGradeColor(grade)}>
              {getGradeIcon(grade)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LCP */}
          <motion.div 
            className="bg-gray-700 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">LCP</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.lcp ? `${(metrics.lcp / 1000).toFixed(2)}s` : 'N/A'}
            </div>
            <div className={`text-xs ${
              getMetricStatus(metrics.lcp, { good: 2500, fair: 4000 }) === 'good' ? 'text-green-400' :
              getMetricStatus(metrics.lcp, { good: 2500, fair: 4000 }) === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Largest Contentful Paint
            </div>
          </motion.div>

          {/* FID */}
          <motion.div 
            className="bg-gray-700 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">FID</span>
              <Zap className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.fid ? `${metrics.fid.toFixed(0)}ms` : 'N/A'}
            </div>
            <div className={`text-xs ${
              getMetricStatus(metrics.fid, { good: 100, fair: 300 }) === 'good' ? 'text-green-400' :
              getMetricStatus(metrics.fid, { good: 100, fair: 300 }) === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              First Input Delay
            </div>
          </motion.div>

          {/* CLS */}
          <motion.div 
            className="bg-gray-700 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">CLS</span>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
            </div>
            <div className={`text-xs ${
              getMetricStatus(metrics.cls, { good: 0.1, fair: 0.25 }) === 'good' ? 'text-green-400' :
              getMetricStatus(metrics.cls, { good: 0.1, fair: 0.25 }) === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Cumulative Layout Shift
            </div>
          </motion.div>

          {/* TTFB */}
          <motion.div 
            className="bg-gray-700 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">TTFB</span>
              <Activity className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white">
              {metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'N/A'}
            </div>
            <div className={`text-xs ${
              getMetricStatus(metrics.ttfb, { good: 200, fair: 500 }) === 'good' ? 'text-green-400' :
              getMetricStatus(metrics.ttfb, { good: 200, fair: 500 }) === 'fair' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              Time to First Byte
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cache Management */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Cache Management
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-medium">Cache Size: {formatBytes(cacheSize)}</p>
            <p className="text-gray-400 text-sm">Service Worker cache for static assets</p>
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={refreshMetrics}
              disabled={isRefreshing}
              className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
            <motion.button
              onClick={clearCache}
              className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear Cache
            </motion.button>
          </div>
        </div>
      </div>

      {/* Performance Recommendations */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Performance Optimizations
        </h3>
        
        <div className="space-y-3">
          {performanceRecommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1">
                <h4 className="text-white font-medium">{rec.title}</h4>
                <p className="text-gray-400 text-sm">{rec.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  rec.impact === 'high' ? 'bg-red-900 text-red-200' :
                  rec.impact === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                  'bg-green-900 text-green-200'
                }`}>
                  {rec.impact} impact
                </span>
                <div className="text-green-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Tips</h3>
        <div className="space-y-2 text-gray-300 text-sm">
          <p>• Images are automatically optimized with lazy loading and WebP support</p>
          <p>• JavaScript bundles are split for optimal caching</p>
          <p>• Service Worker caches static assets for faster repeat visits</p>
          <p>• Critical CSS is inlined to reduce render-blocking resources</p>
          <p>• All third-party scripts are loaded asynchronously</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard; 