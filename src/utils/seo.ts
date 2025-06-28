// SEO utility functions for LumiXpert

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapUrls: SitemapUrl[] = [
  {
    url: 'https://lumixpert.de/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: 'https://lumixpert.de/#about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: 'https://lumixpert.de/#gallery',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    url: 'https://lumixpert.de/#contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  }
];

export const generateSitemap = (): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = sitemapUrls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`).join('');

  return `${xmlHeader}\n${urlsetOpen}${urls}\n${urlsetClose}`;
};

export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://lumixpert.de/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin areas
Disallow: /admin
Disallow: /api/

# Allow important resources
Allow: /public/
Allow: /assets/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.webp
Allow: /*.svg`;
};

// SEO meta tag configurations for different pages
export const seoConfigs = {
  home: {
    title: "LumiXpert - Premium Lasergravur für außergewöhnliche Markenerlebnisse",
    description: "Präzise Lasergravuren auf Metall, Holz, Leder und Acryl. Wir verewigen die Energie Ihrer Marke mit hochwertigen Gravurlösungen für Unternehmen und Privatkunden.",
    keywords: "Lasergravur, Gravur, Metall, Holz, Leder, Acryl, Glas, Markierung, Personalisierung, Deutschland, Premium",
    url: "https://lumixpert.de/"
  },
  about: {
    title: "Über LumiXpert - Ihr Partner für professionelle Lasergravur",
    description: "Erfahren Sie mehr über LumiXpert und unsere Expertise in der Lasergravur. Präzision, Qualität und Innovation seit Jahren.",
    keywords: "Über uns, LumiXpert, Lasergravur Experten, Unternehmen, Geschichte, Team",
    url: "https://lumixpert.de/#about"
  },
  gallery: {
    title: "Galerie - LumiXpert Lasergravur Arbeiten & Projekte",
    description: "Entdecken Sie unsere hochwertigen Lasergravur-Arbeiten auf verschiedenen Materialien. Inspiration für Ihr nächstes Projekt.",
    keywords: "Galerie, Lasergravur Beispiele, Projekte, Metall, Holz, Leder, Acryl, Portfolio",
    url: "https://lumixpert.de/#gallery"
  },
  contact: {
    title: "Kontakt - LumiXpert Lasergravur Service",
    description: "Kontaktieren Sie LumiXpert für Ihre Lasergravur-Anfragen. Schnelle Beratung und professionelle Umsetzung Ihrer Projekte.",
    keywords: "Kontakt, Anfrage, Beratung, Lasergravur Service, Angebot, Deutschland",
    url: "https://lumixpert.de/#contact"
  }
};

// Generate structured data for different content types
export const generateProductStructuredData = (products: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "LumiXpert Lasergravur Services",
    "description": "Hochwertige Lasergravur-Dienstleistungen auf verschiedenen Materialien",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": product.name,
        "description": product.description,
        "provider": {
          "@type": "LocalBusiness",
          "name": "LumiXpert"
        }
      }
    }))
  };
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}; 