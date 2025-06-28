#!/usr/bin/env node

/**
 * Automatic sitemap update script for LumiXpert
 * This script can be run to update sitemap.xml and robots.txt files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  baseUrl: 'https://lumixpert.de',
  outputDir: path.join(__dirname, '..', 'public'),
  lastmod: new Date().toISOString().split('T')[0]
};

// URL definitions
const urls = [
  {
    loc: '/',
    priority: 1.0,
    changefreq: 'weekly'
  },
  {
    loc: '/#about',
    priority: 0.8,
    changefreq: 'monthly'
  },
  {
    loc: '/#gallery',
    priority: 0.9,
    changefreq: 'weekly'
  },
  {
    loc: '/#contact',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    loc: '/services/metallgravur',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    loc: '/services/holzgravur',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    loc: '/services/ledergravur',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    loc: '/services/acrylgravur',
    priority: 0.7,
    changefreq: 'monthly'
  },
  {
    loc: '/services/glasgravur',
    priority: 0.7,
    changefreq: 'monthly'
  }
];

// Generate sitemap XML
function generateSitemap() {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urlElements = urls.map(url => {
    const fullUrl = url.loc.startsWith('http') ? url.loc : `${config.baseUrl}${url.loc}`;
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${config.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urlElements}\n${urlsetClose}`;
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${config.baseUrl}/sitemap.xml

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
Allow: /*.woff$
Allow: /*.woff2$
Allow: /*.ttf$

# Block common spam/bot patterns
Disallow: /*?utm_*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*
Disallow: /search?*
Disallow: /*?ref=*

# Development and config files
Disallow: /*.json$
Disallow: /*.xml$ 
Disallow: /*.yml$
Disallow: /*.yaml$
Disallow: /*.env$
Disallow: /*.log$

# Allow sitemap specifically
Allow: /sitemap.xml
Allow: /sitemap*.xml
Allow: /robots.txt`;
}

// Write files
function writeFiles() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir, { recursive: true });
    }

    // Generate and write sitemap.xml
    const sitemapContent = generateSitemap();
    const sitemapPath = path.join(config.outputDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
    console.log(`✅ Sitemap updated: ${sitemapPath}`);

    // Generate and write robots.txt
    const robotsContent = generateRobotsTxt();
    const robotsPath = path.join(config.outputDir, 'robots.txt');
    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    console.log(`✅ Robots.txt updated: ${robotsPath}`);

    console.log(`\n📊 Statistics:`);
    console.log(`   Total URLs: ${urls.length}`);
    console.log(`   Last updated: ${config.lastmod}`);
    console.log(`   Base URL: ${config.baseUrl}`);

  } catch (error) {
    console.error('❌ Error updating sitemap files:', error.message);
    process.exit(1);
  }
}

// Main execution
console.log('🚀 Updating LumiXpert sitemap files...\n');
writeFiles();
console.log('\n✨ Sitemap update completed successfully!');

export {
  generateSitemap,
  generateRobotsTxt,
  writeFiles,
  config,
  urls
}; 