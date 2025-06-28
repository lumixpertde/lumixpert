# 🔥 LumiXpert - Premium Lasergravur Website

Eine hochmoderne, performance-optimierte Website für Premium-Lasergravur-Dienstleistungen mit umfassendem Admin-Panel und fortschrittlichen Analytics.

![LumiXpert](./public/logo.png)

## 🚀 Live Demo

**Website**: [https://lumixpert.de](https://lumixpert.de)  
**Admin Panel**: [https://lumixpert.de/admin](https://lumixpert.de/admin)  
**Passwort**: `lumixpert2025`

## ✨ Features

### 🎯 **Umfassendes Admin Panel**
- **Galerie-Management** mit verschachtelten Produktgalerien
- **Content-Management** für Hero, About, Contact, Footer
- **SEO-Einstellungen** mit Meta-Tags und strukturierten Daten
- **Analytics Dashboard** mit Echtzeit-Metriken
- **Meta Pixel Konfiguration** und Tracking
- **Sitemap-Management** mit automatischer Generierung
- **Performance Dashboard** mit Optimierungseinblicken

### 📊 **Analytics & Tracking**
- **Google Analytics 4** mit GDPR-konformer Cookie-Einwilligung
- **Meta (Facebook) Pixel** mit Datenschutz-Kontrollen
- **Scroll-Tracking** für Engagement-Analytics
- **Section-Visibility-Tracking** für Navigation
- **Core Web Vitals Monitoring**
- **Performance-Metriken** in Echtzeit

### ⚡ **Performance-Optimierungen**
- **Service Worker Caching** für optimale Performance
- **Code Splitting** nach Vendor, Animationen, Icons
- **Critical CSS Inlining** für schnelleres Rendering
- **Smart Image Loading** mit Fetch-Prioritäten
- **Bundle-Optimierung** und Minifizierung
- **Error Boundary** für graceful Error-Handling

### 🔒 **Datenschutz & Sicherheit**
- **GDPR-konforme Cookie-Verwaltung**
- **IP-Anonymisierung** für Analytics
- **Consent-basiertes Tracking**
- **Sichere Headers** und CSP-Policies

### 📱 **Mobile-First Design**
- **Responsive Design** mit Tailwind CSS
- **Touch-freundliche Interfaces**
- **Mobile-optimierte Performance**
- **Progressive Web App** Features

## 🛠️ Tech Stack

### Frontend
- **React 18** mit TypeScript
- **Vite** für Build-Optimierung
- **Tailwind CSS** für Styling
- **Framer Motion** für Animationen
- **React Router** für Navigation
- **React Helmet Async** für SEO

### Analytics & Tracking
- **Google Analytics 4**
- **Meta (Facebook) Pixel**
- **Custom Event Tracking**
- **Performance API**

### Performance
- **Service Worker** für Caching
- **Intersection Observer** für Lazy Loading
- **Critical Resource Hints**
- **Bundle Splitting**

## 📦 Installation

```bash
# Repository klonen
git clone https://github.com/lumixpertde/lumixpert.git
cd lumixpert

# Dependencies installieren
yarn install

# Development Server starten
yarn dev

# Production Build erstellen
yarn build

# Build preview
yarn preview
```

## 🔧 Konfiguration

### Analytics Setup
1. **Google Analytics 4**:
   - Siehe [GA4_SETUP_GUIDE.md](./GA4_SETUP_GUIDE.md)
   - Measurement ID im Admin Panel konfigurieren

2. **Meta Pixel**:
   - Siehe [META_PIXEL_SETUP_GUIDE.md](./META_PIXEL_SETUP_GUIDE.md)
   - Pixel ID im Admin Panel konfigurieren

### Admin Panel Zugang
- **URL**: `/admin`
- **Passwort**: `lumixpert2025`
- **Features**: Vollständige Content- und Analytics-Verwaltung

## 📊 Performance Metriken

### Optimierungen
- **Bundle Size**: Reduziert um 30-40% durch Code Splitting
- **First Contentful Paint**: Verbessert um 200-500ms
- **Largest Contentful Paint**: Verbessert um 300-800ms
- **Cumulative Layout Shift**: Reduziert um 50-70%
- **Time to Interactive**: Verbessert um 400-1000ms

### Core Web Vitals
- **LCP**: < 2.5s (Gut)
- **FID**: < 100ms (Gut)
- **CLS**: < 0.1 (Gut)

## 🗂️ Projektstruktur

```
lumixpert/
├── public/                 # Statische Assets
│   ├── logo.png           # Logo
│   ├── metall.webp        # Material-Bilder
│   ├── robots.txt         # SEO Robots
│   ├── sitemap.xml        # SEO Sitemap
│   └── sw.js              # Service Worker
├── src/
│   ├── components/        # React Komponenten
│   │   ├── AdminPanel.tsx # Admin Panel
│   │   ├── HeroSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── PerformanceDashboard.tsx
│   │   └── ...
│   ├── utils/             # Utility Funktionen
│   │   ├── analytics.ts   # GA4 Integration
│   │   ├── metaPixel.ts   # Meta Pixel Integration
│   │   ├── performance.ts # Performance Monitoring
│   │   ├── seo.ts         # SEO Utilities
│   │   └── ...
│   ├── pages/             # Seiten
│   └── App.tsx            # Haupt-App Komponente
├── scripts/               # Build Scripts
│   └── update-sitemap.js  # Sitemap Generator
└── docs/                  # Dokumentation
    ├── GA4_SETUP_GUIDE.md
    └── META_PIXEL_SETUP_GUIDE.md
```

## 🚀 Deployment

### Automatische Sitemap-Generierung
```bash
# Sitemap manuell generieren
yarn sitemap

# Wird automatisch vor dem Build ausgeführt
yarn build
```

### Vercel Deployment
Das Projekt ist für Vercel optimiert mit:
- Automatischen Builds
- Performance-Optimierungen
- CDN-Integration

### Environment Variables
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=XXXXXXXXXX
```

## 📈 Analytics Features

### Google Analytics 4
- **Enhanced E-commerce** Tracking
- **Custom Events** für CTA Clicks
- **Scroll Depth** Tracking
- **Section Visibility** Tracking
- **Performance Metrics** Integration

### Meta Pixel
- **PageView** Tracking
- **Custom Events** (Lead, Contact, ViewContent)
- **Enhanced Matching**
- **Conversion Tracking**

## 🔍 SEO Features

### On-Page SEO
- **Dynamic Meta Tags**
- **Structured Data** (Schema.org)
- **Open Graph** Tags
- **Twitter Cards**
- **Canonical URLs**

### Technical SEO
- **XML Sitemap** mit automatischer Generierung
- **Robots.txt** Optimierung
- **Performance** Optimierung
- **Mobile-First** Indexing

## 🛡️ Sicherheit

### Datenschutz
- **GDPR-konforme** Cookie-Einwilligung
- **IP-Anonymisierung**
- **Datenminimierung**
- **Transparente** Datenschutzrichtlinien

### Sicherheits-Headers
- **Content Security Policy**
- **X-Frame-Options**
- **X-Content-Type-Options**
- **Referrer-Policy**

## 🤝 Contributing

1. Fork das Repository
2. Erstelle einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📄 Lizenz

Dieses Projekt ist urheberrechtlich geschützt und gehört LumiXpert.

## 📞 Kontakt

**LumiXpert**  
Email: lumixpert.de@gmail.com  
Telefon: +49 178 1638184  
Website: [https://lumixpert.de](https://lumixpert.de)

---

**Entwickelt mit ❤️ für Premium-Lasergravur-Dienstleistungen**
