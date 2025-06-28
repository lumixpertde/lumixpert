// Advanced sitemap generation utilities for LumiXpert

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangefreq: SitemapUrl['changefreq'];
  defaultPriority: number;
  includeAlternates: boolean;
  languages: string[];
}

export class SitemapGenerator {
  private config: SitemapConfig;
  private urls: SitemapUrl[] = [];

  constructor(config: Partial<SitemapConfig> = {}) {
    this.config = {
      baseUrl: 'https://lumixpert.de',
      defaultChangefreq: 'weekly',
      defaultPriority: 0.5,
      includeAlternates: false,
      languages: ['de'],
      ...config
    };
  }

  // Add a URL to the sitemap
  addUrl(url: Partial<SitemapUrl> & { loc: string }): void {
    const fullUrl: SitemapUrl = {
      changefreq: this.config.defaultChangefreq,
      priority: this.config.defaultPriority,
      lastmod: new Date().toISOString().split('T')[0],
      ...url,
      loc: url.loc.startsWith('http') ? url.loc : `${this.config.baseUrl}${url.loc}`
    };

    // Add language alternates if configured
    if (this.config.includeAlternates && this.config.languages.length > 1) {
      fullUrl.alternates = this.config.languages.map(lang => ({
        hreflang: lang,
        href: `${this.config.baseUrl}/${lang}${url.loc.replace(this.config.baseUrl, '')}`
      }));
    }

    this.urls.push(fullUrl);
  }

  // Add multiple URLs at once
  addUrls(urls: Array<Partial<SitemapUrl> & { loc: string }>): void {
    urls.forEach(url => this.addUrl(url));
  }

  // Generate main pages
  addMainPages(): void {
    const mainPages = [
      {
        loc: '/',
        priority: 1.0,
        changefreq: 'weekly' as const
      },
      {
        loc: '/#about',
        priority: 0.8,
        changefreq: 'monthly' as const
      },
      {
        loc: '/#gallery',
        priority: 0.9,
        changefreq: 'weekly' as const
      },
      {
        loc: '/#contact',
        priority: 0.7,
        changefreq: 'monthly' as const
      }
    ];

    this.addUrls(mainPages);
  }

  // Add gallery/material pages dynamically
  addGalleryPages(materials: Array<{ name: string; id: number }>): void {
    materials.forEach(material => {
      this.addUrl({
        loc: `/#gallery/${material.name.toLowerCase()}`,
        priority: 0.6,
        changefreq: 'weekly'
      });
    });
  }

  // Add service pages
  addServicePages(): void {
    const services = [
      'metallgravur',
      'holzgravur', 
      'ledergravur',
      'acrylgravur',
      'glasgravur'
    ];

    services.forEach(service => {
      this.addUrl({
        loc: `/services/${service}`,
        priority: 0.7,
        changefreq: 'monthly'
      });
    });
  }

  // Generate XML sitemap
  generateXML(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
      (this.config.includeAlternates ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : '') + '>';
    const urlsetClose = '</urlset>';

    const urlElements = this.urls.map(url => {
      let urlXml = `  <url>\n    <loc>${this.escapeXml(url.loc)}</loc>\n`;
      
      if (url.lastmod) {
        urlXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        urlXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority !== undefined) {
        urlXml += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }

      // Add language alternates
      if (url.alternates && url.alternates.length > 0) {
        url.alternates.forEach(alternate => {
          urlXml += `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${this.escapeXml(alternate.href)}" />\n`;
        });
      }
      
      urlXml += '  </url>';
      return urlXml;
    }).join('\n');

    return `${xmlHeader}\n${urlsetOpen}\n${urlElements}\n${urlsetClose}`;
  }

  // Get all URLs
  getUrls(): SitemapUrl[] {
    return [...this.urls];
  }

  // Clear all URLs
  clear(): void {
    this.urls = [];
  }

  // Escape XML special characters
  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Get sitemap statistics
  getStats(): {
    totalUrls: number;
    priorityDistribution: Record<string, number>;
    changefreqDistribution: Record<string, number>;
    lastGenerated: string;
  } {
    const priorityDistribution: Record<string, number> = {};
    const changefreqDistribution: Record<string, number> = {};

    this.urls.forEach(url => {
      const priority = url.priority?.toString() || 'undefined';
      const changefreq = url.changefreq || 'undefined';
      
      priorityDistribution[priority] = (priorityDistribution[priority] || 0) + 1;
      changefreqDistribution[changefreq] = (changefreqDistribution[changefreq] || 0) + 1;
    });

    return {
      totalUrls: this.urls.length,
      priorityDistribution,
      changefreqDistribution,
      lastGenerated: new Date().toISOString()
    };
  }
}

// Default sitemap for LumiXpert
export const generateLumiXpertSitemap = (galleryItems: any[] = []): string => {
  const generator = new SitemapGenerator({
    baseUrl: 'https://lumixpert.de',
    defaultChangefreq: 'weekly',
    defaultPriority: 0.5
  });

  // Add main pages
  generator.addMainPages();

  // Add gallery pages if items exist
  if (galleryItems.length > 0) {
    generator.addGalleryPages(galleryItems);
  }

  // Add service pages
  generator.addServicePages();

  return generator.generateXML();
};

// Generate robots.txt with sitemap reference
export const generateRobotsTxt = (sitemapUrl: string = 'https://lumixpert.de/sitemap.xml'): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${sitemapUrl}

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin and private areas
Disallow: /admin
Disallow: /api/
Disallow: /private/

# Allow important static resources
Allow: /public/
Allow: /assets/
Allow: /images/
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.webp$
Allow: /*.svg$
Allow: /*.ico$

# Block common spam/bot patterns
Disallow: /*?utm_*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*

# Allow sitemap specifically
Allow: /sitemap.xml
Allow: /robots.txt`;
};

// Ping search engines about sitemap updates
export const pingSearchEngines = async (sitemapUrl: string): Promise<void> => {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];

  const pingPromises = searchEngines.map(async (url) => {
    try {
      const response = await fetch(url, { method: 'GET' });
      console.log(`Pinged ${url}: ${response.status}`);
      return response.ok;
    } catch (error) {
      console.error(`Failed to ping ${url}:`, error);
      return false;
    }
  });

  await Promise.all(pingPromises);
}; 