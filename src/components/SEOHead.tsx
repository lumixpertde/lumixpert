import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOProps> = ({
  title = "LumiXpert - Premium Lasergravur für außergewöhnliche Markenerlebnisse",
  description = "Präzise Lasergravuren auf Metall, Holz, Leder und Acryl. Wir verewigen die Energie Ihrer Marke mit hochwertigen Gravurlösungen für Unternehmen und Privatkunden.",
  keywords = "Lasergravur, Gravur, Metall, Holz, Leder, Acryl, Glas, Markierung, Personalisierung, Deutschland",
  image = "/logo.png",
  url = "https://lumixpert.de",
  type = "website",
  structuredData
}) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LumiXpert",
    "description": "Premium Lasergravur-Dienstleistungen",
    "url": "https://lumixpert.de",
    "logo": "/logo.png",
    "serviceType": "Lasergravur",
    "areaServed": "Deutschland",
    "telephone": "+49 123 456 789",
    "email": "info@lumixpert.de",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Musterstraße 123",
      "addressLocality": "Musterstadt",
      "postalCode": "12345",
      "addressCountry": "DE"
    },
    "openingHours": [
      "Mo-Fr 08:00-18:00",
      "Sa 09:00-14:00"
    ],
    "priceRange": "€€",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Lasergravur Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Metallgravur",
            "description": "Präzise Lasergravuren auf verschiedenen Metallarten"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Holzgravur",
            "description": "Hochwertige Lasergravuren auf Holzoberflächen"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ledergravur",
            "description": "Professionelle Lasergravuren auf Leder"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Acrylgravur",
            "description": "Präzise Lasergravuren auf Acrylglas"
          }
        }
      ]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="LumiXpert" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead; 