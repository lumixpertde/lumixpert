import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon, ImageIcon, EyeIcon, HomeIcon, InfoIcon, MailIcon, LayoutIcon, GalleryHorizontalIcon, SearchIcon, Globe, BarChart3, Gauge } from 'lucide-react';
import SEOAnalytics from './SEOAnalytics';
import SitemapManager from './SitemapManager';
import AnalyticsDashboard from './AnalyticsDashboard';
import MetaPixelDashboard from './MetaPixelDashboard';
import PerformanceDashboard from './PerformanceDashboard';

interface GalleryItem {
  id: number;
  name: string;
  image: string;
  description: string;
  products?: ProductImage[];
}

interface ProductImage {
  id: number;
  title: string;
  image: string;
  description: string;
}



interface AboutContent {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}

interface ContactContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string[];
  openingHours: {
    [key: string]: string;
  };
}

interface SEOContent {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
  structuredData: {
    businessName: string;
    businessType: string;
    telephone: string;
    email: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    openingHours: string[];
  };
}



interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContentSection = 'gallery' | 'about' | 'contact' | 'seo' | 'sitemap' | 'analytics' | 'metapixel' | 'performance';

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<ContentSection>('gallery');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<GalleryItem | null>(null);
  const [editingProduct, setEditingProduct] = useState<ProductImage | null>(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: ''
  });
  const [productFormData, setProductFormData] = useState({
    title: '',
    image: '',
    description: ''
  });

  // Content states

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: 'Über Uns',
    description: 'Wir sind auf Premium-Lasergravuren spezialisiert und verwandeln gewöhnliche Produkte in außergewöhnliche Markenerlebnisse, die Ihr Publikum begeistern.',
    features: [
      {
        title: 'Schnelle Skalierbarkeit',
        description: 'Von Prototypen bis zur Massenproduktion – wir skalieren nach Ihren Anforderungen ohne Qualitätsverlust.'
      },
      {
        title: 'Individuelle Lösungen',
        description: 'Maßgeschneiderte Gravurlösungen für Ihre spezifischen Markenanforderungen und Produktspezifikationen.'
      },
      {
        title: 'Emotionales Branding',
        description: 'Wir schaffen bleibende Eindrücke, indem wir Ihre Marke auf emotionaler Ebene mit Ihren Kunden verbinden.'
      }
    ]
  });

  const [contactContent, setContactContent] = useState<ContactContent>({
    title: 'Kontakt Aufnehmen',
    description: 'Bereit, Ihre Marke mit Premium-Lasergravuren auf ein neues Level zu bringen? Kontaktieren Sie uns für eine Beratung!',
    email: 'lumixpert.de@gmail.com',
    phone: '+49 178 1638184',
    address: ['Schwalbenweg 19', '34212 Melsungen'],
    openingHours: {
      'Montag – Freitag': '9:00 – 18:00',
      'Samstag': '10:00 – 16:00',
      'Sonntag': 'geschlossen'
    }
  });

  const [seoContent, setSeoContent] = useState<SEOContent>({
    title: 'LumiXpert - Premium Lasergravur für außergewöhnliche Markenerlebnisse',
    description: 'Präzise Lasergravuren auf Metall, Holz, Leder und Acryl. Wir verewigen die Energie Ihrer Marke mit hochwertigen Gravurlösungen für Unternehmen und Privatkunden.',
    keywords: 'Lasergravur, Gravur, Metall, Holz, Leder, Acryl, Glas, Markierung, Personalisierung, Deutschland',
    ogImage: '/logo.png',
    canonicalUrl: 'https://lumixpert.de',
    structuredData: {
      businessName: 'LumiXpert',
      businessType: 'LocalBusiness',
      telephone: '+49 178 1638184',
      email: 'lumixpert.de@gmail.com',
      address: {
        street: 'Schwalbenweg 19',
        city: 'Melsungen',
        postalCode: '34212',
        country: 'DE'
      },
      openingHours: ['Mo-Fr 09:00-18:00', 'Sa 10:00-16:00']
    }
  });



  // Load content from localStorage on component mount
  useEffect(() => {
    // Load gallery items
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      setGalleryItems(JSON.parse(savedItems));
    } else {
      // Default items if none exist
      const defaultItems: GalleryItem[] = [
        {
          id: 1,
          name: 'Metall',
          image: '/metall.webp',
          description: 'Hochwertige Gravuren auf Edelstahl, Aluminium und weiteren Metallen.',
          products: []
        },
        {
          id: 2,
          name: 'Holz',
          image: '/holz.jpg',
          description: 'Präzise Gravuren auf nachhaltigem Holz für besondere Produkte.',
          products: []
        },
        {
          id: 3,
          name: 'Leder',
          image: '/leder.webp',
          description: 'Stilvolle Gravuren auf Leder für exklusive Accessoires.',
          products: []
        },
        {
          id: 4,
          name: 'Acryl / Glas',
          image: '/glas.webp',
          description: 'Klare Gravuren für moderne und elegante Designs.',
          products: []
        }
      ];
      setGalleryItems(defaultItems);
      localStorage.setItem('galleryItems', JSON.stringify(defaultItems));
    }

    // Load other content
    const savedAbout = localStorage.getItem('aboutContent');
    if (savedAbout) setAboutContent(JSON.parse(savedAbout));

    const savedContact = localStorage.getItem('contactContent');
    if (savedContact) setContactContent(JSON.parse(savedContact));

    const savedSEO = localStorage.getItem('seoContent');
    if (savedSEO) setSeoContent(JSON.parse(savedSEO));
  }, []);

  // Save content to localStorage and dispatch events
  useEffect(() => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    window.dispatchEvent(new CustomEvent('galleryItemsUpdated', { detail: galleryItems }));
  }, [galleryItems]);



  useEffect(() => {
    localStorage.setItem('aboutContent', JSON.stringify(aboutContent));
    window.dispatchEvent(new CustomEvent('aboutContentUpdated', { detail: aboutContent }));
  }, [aboutContent]);

  useEffect(() => {
    localStorage.setItem('contactContent', JSON.stringify(contactContent));
    window.dispatchEvent(new CustomEvent('contactContentUpdated', { detail: contactContent }));
  }, [contactContent]);

  useEffect(() => {
    localStorage.setItem('seoContent', JSON.stringify(seoContent));
    window.dispatchEvent(new CustomEvent('seoContentUpdated', { detail: seoContent }));
  }, [seoContent]);



  // Gallery management functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    setFormData({ name: '', image: '', description: '' });
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsAddingNew(false);
    setFormData({
      name: item.name,
      image: item.image,
      description: item.description
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.image.trim() || !formData.description.trim()) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    if (isAddingNew) {
      const newItem: GalleryItem = {
        id: Math.max(...galleryItems.map(item => item.id), 0) + 1,
        name: formData.name.trim(),
        image: formData.image.trim(),
        description: formData.description.trim(),
        products: []
      };
      setGalleryItems(prev => [...prev, newItem]);
    } else if (editingItem) {
      setGalleryItems(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? { 
                ...item, 
                name: formData.name.trim(), 
                image: formData.image.trim(), 
                description: formData.description.trim(),
                products: item.products || []
              }
            : item
        )
      );
    }

    handleCancel();
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingItem(null);
    setFormData({ name: '', image: '', description: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?')) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Product management functions
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddNewProduct = (materialId: number) => {
    setIsAddingNewProduct(true);
    setEditingProduct(null);
    setProductFormData({ title: '', image: '', description: '' });
    const material = galleryItems.find(item => item.id === materialId);
    if (material) {
      setSelectedMaterial(material);
    }
  };

  const handleEditProduct = (product: ProductImage, materialId: number) => {
    setEditingProduct(product);
    setIsAddingNewProduct(false);
    setProductFormData({
      title: product.title,
      image: product.image,
      description: product.description
    });
    const material = galleryItems.find(item => item.id === materialId);
    if (material) {
      setSelectedMaterial(material);
    }
  };

  const handleSaveProduct = () => {
    if (!productFormData.title.trim() || !productFormData.image.trim() || !productFormData.description.trim()) {
      alert('Bitte füllen Sie alle Felder aus.');
      return;
    }

    if (!selectedMaterial) return;

    setGalleryItems(prev =>
      prev.map(item => {
        if (item.id === selectedMaterial.id) {
          const products = item.products || [];
          
          if (isAddingNewProduct) {
            const newProduct: ProductImage = {
              id: Math.max(...products.map(p => p.id), 0) + 1,
              title: productFormData.title.trim(),
              image: productFormData.image.trim(),
              description: productFormData.description.trim()
            };
            return { ...item, products: [...products, newProduct] };
          } else if (editingProduct) {
            return {
              ...item,
              products: products.map(product =>
                product.id === editingProduct.id
                  ? {
                      ...product,
                      title: productFormData.title.trim(),
                      image: productFormData.image.trim(),
                      description: productFormData.description.trim()
                    }
                  : product
              )
            };
          }
        }
        return item;
      })
    );

    handleCancelProduct();
  };

  const handleCancelProduct = () => {
    setIsAddingNewProduct(false);
    setEditingProduct(null);
    setProductFormData({ title: '', image: '', description: '' });
    setSelectedMaterial(null);
  };

  const handleDeleteProduct = (productId: number, materialId: number) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Produkt löschen möchten?')) {
      setGalleryItems(prev =>
        prev.map(item => {
          if (item.id === materialId) {
            return {
              ...item,
              products: (item.products || []).filter(product => product.id !== productId)
            };
          }
          return item;
        })
      );
    }
  };

  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProductFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Content update functions

  const updateAboutContent = (field: keyof AboutContent, value: any) => {
    setAboutContent(prev => ({ ...prev, [field]: value }));
  };

  const updateAboutFeature = (index: number, field: 'title' | 'description', value: string) => {
    setAboutContent(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const updateContactContent = (field: keyof ContactContent, value: any) => {
    setContactContent(prev => ({ ...prev, [field]: value }));
  };

  const updateSEOContent = (field: keyof SEOContent, value: any) => {
    setSeoContent(prev => ({ ...prev, [field]: value }));
  };

  const updateSEOStructuredData = (field: string, value: any) => {
    setSeoContent(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        [field]: value
      }
    }));
  };

  const updateSEOAddress = (field: keyof SEOContent['structuredData']['address'], value: string) => {
    setSeoContent(prev => ({
      ...prev,
      structuredData: {
        ...prev.structuredData,
        address: {
          ...prev.structuredData.address,
          [field]: value
        }
      }
    }));
  };



  // Navigation sections
  const sections = [
    { id: 'gallery' as ContentSection, name: 'Galerie', icon: <GalleryHorizontalIcon className="w-5 h-5" /> },
    { id: 'about' as ContentSection, name: 'Über Uns', icon: <InfoIcon className="w-5 h-5" /> },
    { id: 'contact' as ContentSection, name: 'Kontakt', icon: <MailIcon className="w-5 h-5" /> },
    { id: 'seo' as ContentSection, name: 'SEO', icon: <SearchIcon className="w-5 h-5" /> },
    { id: 'sitemap' as ContentSection, name: 'Sitemap', icon: <Globe className="w-5 h-5" /> },
    { id: 'analytics' as ContentSection, name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'metapixel' as ContentSection, name: 'Meta Pixel', icon: <EyeIcon className="w-5 h-5" /> },
    { id: 'performance' as ContentSection, name: 'Performance', icon: <Gauge className="w-5 h-5" /> },
  ];

    // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {

      case 'about':
        return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Über Uns Bearbeiten</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Titel</label>
                <input
                  type="text"
                  value={aboutContent.title}
                  onChange={(e) => updateAboutContent('title', e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Beschreibung</label>
                <textarea
                  value={aboutContent.description}
                  onChange={(e) => updateAboutContent('description', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-gray-300">Features</label>
                {aboutContent.features.map((feature, index) => (
                  <div key={index} className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Feature Titel</label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => updateAboutFeature(index, 'title', e.target.value)}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-400">Feature Beschreibung</label>
                        <textarea
                          value={feature.description}
                          onChange={(e) => updateAboutFeature(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Kontakt Bearbeiten</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Titel</label>
                  <input
                    type="text"
                    value={contactContent.title}
                    onChange={(e) => updateContactContent('title', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Beschreibung</label>
                  <textarea
                    value={contactContent.description}
                    onChange={(e) => updateContactContent('description', e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">E-Mail</label>
                  <input
                    type="email"
                    value={contactContent.email}
                    onChange={(e) => updateContactContent('email', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Telefon</label>
                  <input
                    type="tel"
                    value={contactContent.phone}
                    onChange={(e) => updateContactContent('phone', e.target.value)}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Adresse</label>
                  {contactContent.address.map((line, index) => (
                    <input
                      key={index}
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const newAddress = [...contactContent.address];
                        newAddress[index] = e.target.value;
                        updateContactContent('address', newAddress);
                      }}
                      className="w-full p-3 mb-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                      placeholder={`Adresszeile ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Öffnungszeiten</label>
                <div className="space-y-2">
                  {Object.entries(contactContent.openingHours).map(([day, hours]) => (
                    <div key={day} className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={day}
                        onChange={(e) => {
                          const newHours = { ...contactContent.openingHours };
                          delete newHours[day];
                          newHours[e.target.value] = hours;
                          updateContactContent('openingHours', newHours);
                        }}
                        className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                      />
                      <input
                        type="text"
                        value={hours}
                        onChange={(e) => {
                          const newHours = { ...contactContent.openingHours };
                          newHours[day] = e.target.value;
                          updateContactContent('openingHours', newHours);
                        }}
                        className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">SEO Einstellungen</h3>
            
            {/* SEO Analytics Dashboard */}
            <SEOAnalytics />
            
            {/* Basic SEO Settings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Grundlegende SEO Einstellungen</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Meta Titel</label>
                    <input
                      type="text"
                      value={seoContent.title}
                      onChange={(e) => updateSEOContent('title', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                      maxLength={60}
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoContent.title.length}/60 Zeichen</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Meta Beschreibung</label>
                    <textarea
                      value={seoContent.description}
                      onChange={(e) => updateSEOContent('description', e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900 resize-none"
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500 mt-1">{seoContent.description.length}/160 Zeichen</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Keywords</label>
                    <input
                      type="text"
                      value={seoContent.keywords}
                      onChange={(e) => updateSEOContent('keywords', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                      placeholder="Keyword1, Keyword2, Keyword3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Canonical URL</label>
                    <input
                      type="url"
                      value={seoContent.canonicalUrl}
                      onChange={(e) => updateSEOContent('canonicalUrl', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">OG Image URL</label>
                    <input
                      type="text"
                      value={seoContent.ogImage}
                      onChange={(e) => updateSEOContent('ogImage', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    />
                  </div>
                </div>

                {/* Structured Data Settings */}
                <div className="space-y-4">
                  <h5 className="text-lg font-semibold text-gray-900">Strukturierte Daten (Schema.org)</h5>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Firmenname</label>
                    <input
                      type="text"
                      value={seoContent.structuredData.businessName}
                      onChange={(e) => updateSEOStructuredData('businessName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Geschäftstyp</label>
                    <select
                      value={seoContent.structuredData.businessType}
                      onChange={(e) => updateSEOStructuredData('businessType', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    >
                      <option value="LocalBusiness">Lokales Unternehmen</option>
                      <option value="Organization">Organisation</option>
                      <option value="Corporation">Unternehmen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Telefon</label>
                    <input
                      type="tel"
                      value={seoContent.structuredData.telephone}
                      onChange={(e) => updateSEOStructuredData('telephone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">E-Mail</label>
                    <input
                      type="email"
                      value={seoContent.structuredData.email}
                      onChange={(e) => updateSEOStructuredData('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <input
                      type="text"
                      value={seoContent.structuredData.address.street}
                      onChange={(e) => updateSEOAddress('street', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                      placeholder="Straße und Hausnummer"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={seoContent.structuredData.address.postalCode}
                        onChange={(e) => updateSEOAddress('postalCode', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                        placeholder="PLZ"
                      />
                      <input
                        type="text"
                        value={seoContent.structuredData.address.city}
                        onChange={(e) => updateSEOAddress('city', e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                        placeholder="Stadt"
                      />
                    </div>
                    <input
                      type="text"
                      value={seoContent.structuredData.address.country}
                      onChange={(e) => updateSEOAddress('country', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                      placeholder="Land (z.B. DE)"
                    />
                  </div>

                  {/* Opening Hours */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Öffnungszeiten</label>
                    {seoContent.structuredData.openingHours.map((hours, index) => (
                      <input
                        key={index}
                        type="text"
                        value={hours}
                        onChange={(e) => {
                          const newHours = [...seoContent.structuredData.openingHours];
                          newHours[index] = e.target.value;
                          updateSEOStructuredData('openingHours', newHours);
                        }}
                        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                        placeholder="Mo-Fr 09:00-18:00"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sitemap':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Sitemap Verwaltung</h3>
            <SitemapManager galleryItems={galleryItems} />
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Google Analytics Dashboard</h3>
            <AnalyticsDashboard />
          </div>
        );

      case 'metapixel':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Meta (Facebook) Pixel Dashboard</h3>
            <MetaPixelDashboard />
          </div>
        );

      case 'performance':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Performance Dashboard</h3>
            <PerformanceDashboard />
          </div>
        );

      case 'gallery':
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Galerie Verwalten</h3>
            
            {/* Add New Material Button */}
              <div className="mb-6">
                <motion.button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <PlusIcon className="w-5 h-5" />
                Neues Material hinzufügen
                </motion.button>
              </div>

            {/* Form for Adding/Editing Materials */}
              <AnimatePresence>
                {(isAddingNew || editingItem) && (
                  <motion.div
                    className="mb-6 p-6 bg-gray-800 rounded-lg border border-gray-700"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-white">
                    {isAddingNew ? 'Neues Material hinzufügen' : 'Material bearbeiten'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Material Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                            placeholder="z.B. Metall, Holz, etc."
                          />
                        </div>

                        <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Material Bild URL oder Upload</label>
                          <div className="space-y-2">
                            <input
                              type="text"
                              name="image"
                              value={formData.image}
                              onChange={handleInputChange}
                              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                              placeholder="/pfad/zum/bild.jpg oder https://..."
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                                id="imageUpload"
                              />
                              <label
                                htmlFor="imageUpload"
                                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
                              >
                                <ImageIcon className="w-4 h-4" />
                                Bild hochladen
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300">Beschreibung</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                            placeholder="Beschreibung des Materials und der Gravurmöglichkeiten..."
                          />
                        </div>
                      </div>

                      {/* Preview */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Vorschau</label>
                        <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                          {formData.image && (
                            <img
                              src={formData.image}
                              alt={`${formData.name || 'Material'} Vorschau - Lasergravur Beispielbild`}
                              className="w-full h-40 object-cover rounded-md mb-3"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBWMTUwSDEwMFYxMDBINTBMMTAwIDUwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K';
                              }}
                            />
                          )}
                          <h4 className="font-semibold text-white">{formData.name || 'Material Name'}</h4>
                          <p className="text-gray-300 text-sm mt-1">{formData.description || 'Beschreibung wird hier angezeigt...'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <motion.button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <SaveIcon className="w-4 h-4" />
                        Speichern
                      </motion.button>
                      <motion.button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <XIcon className="w-4 h-4" />
                        Abbrechen
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            {/* Form for Adding/Editing Products */}
        <AnimatePresence>
              {(isAddingNewProduct || editingProduct) && selectedMaterial && (
              <motion.div
                  className="mb-6 p-6 bg-blue-900/20 rounded-lg border border-blue-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <h3 className="text-xl font-semibold mb-4 text-white">
                    {isAddingNewProduct ? `Neues Produkt für ${selectedMaterial.name} hinzufügen` : `Produkt für ${selectedMaterial.name} bearbeiten`}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Produkt Titel</label>
                              <input
                                type="text"
                          name="title"
                          value={productFormData.title}
                          onChange={handleProductInputChange}
                          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                          placeholder="z.B. Graviertes Metallschild, Holzbox mit Logo, etc."
                              />
                            </div>

                            <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Produkt Bild URL oder Upload</label>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  name="image"
                            value={productFormData.image}
                            onChange={handleProductInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                            placeholder="/pfad/zum/produkt-bild.jpg oder https://..."
                                />
                                <div className="flex items-center gap-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                              onChange={handleProductImageUpload}
                                    className="hidden"
                              id="productImageUpload"
                                  />
                                  <label
                              htmlFor="productImageUpload"
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
                                  >
                                    <ImageIcon className="w-4 h-4" />
                              Produkt Bild hochladen
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Produkt Beschreibung</label>
                              <textarea
                                name="description"
                          value={productFormData.description}
                          onChange={handleProductInputChange}
                                rows={4}
                          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white resize-none"
                          placeholder="Detaillierte Beschreibung des fertigen Produkts..."
                              />
                            </div>
                          </div>

                    {/* Product Preview */}
                          <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Produkt Vorschau</label>
                            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        {productFormData.image && (
                                <img
                            src={productFormData.image}
                            alt={`${productFormData.title || 'Produkt'} Vorschau - Lasergravur Beispiel`}
                                  className="w-full h-40 object-cover rounded-md mb-3"
                                  onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBWMTUwSDEwMFYxMDBINTBMMTAwIDUwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K';
                                  }}
                                />
                              )}
                        <h4 className="font-semibold text-white">{productFormData.title || 'Produkt Titel'}</h4>
                        <p className="text-gray-300 text-sm mt-1">{productFormData.description || 'Produkt Beschreibung wird hier angezeigt...'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <motion.button
                      onClick={handleSaveProduct}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <SaveIcon className="w-4 h-4" />
                      Produkt Speichern
                          </motion.button>
                          <motion.button
                      onClick={handleCancelProduct}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <XIcon className="w-4 h-4" />
                            Abbrechen
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

            {/* Materials List with Products */}
            <div className="space-y-6">
                    {galleryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                  className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                  {/* Material Header */}
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={`${item.name} Material - Lasergravur Übersichtsbild`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                          <p className="text-gray-400 text-xs mt-1">{item.products?.length || 0} Produkte</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleAddNewProduct(item.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <PlusIcon className="w-4 h-4" />
                          Produkt hinzufügen
                        </motion.button>
                        <motion.button
                          onClick={() => handleEdit(item)}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <EditIcon className="w-4 h-4" />
                          Material bearbeiten
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <TrashIcon className="w-4 h-4" />
                          Material löschen
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="p-6">
                    {item.products && item.products.length > 0 ? (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {item.products.map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-colors"
                          >
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={product.image}
                                alt={`${product.title} - ${item.name} Lasergravur Produktbild`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                              <h4 className="font-medium text-white mb-2 text-sm">{product.title}</h4>
                              <p className="text-gray-300 text-xs mb-3 line-clamp-2">{product.description}</p>
                          <div className="flex gap-2">
                            <motion.button
                                  onClick={() => handleEditProduct(product, item.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <EditIcon className="w-3 h-3" />
                              Bearbeiten
                            </motion.button>
                            <motion.button
                                  onClick={() => handleDeleteProduct(product.id, item.id)}
                                  className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <TrashIcon className="w-3 h-3" />
                              Löschen
                            </motion.button>
                          </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">Keine Produkte für {item.name} vorhanden</p>
                        <p className="text-gray-500 text-sm">Klicken Sie auf "Produkt hinzufügen" um zu beginnen</p>
                      </div>
                    )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {galleryItems.length === 0 && (
                    <div className="text-center py-12">
                      <EyeIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Keine Materialien vorhanden</p>
                <p className="text-gray-500">Klicken Sie auf "Neues Material hinzufügen" um zu beginnen</p>
                    </div>
                  )}
          </div>
        );
    }
  };

  // If used as a page (isOpen=true and onClose is empty), render without modal wrapper
  const isPageMode = isOpen && (!onClose || onClose.toString() === '() => {}');

  if (isPageMode) {
    return (
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Content Management System</h2>
          <p className="text-gray-400">Verwalten Sie alle Inhalte Ihrer Website</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {section.icon}
                {section.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
          {renderContent()}
        </div>
      </div>
    );
  }

  // Modal mode
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] relative z-10 overflow-hidden border border-gray-700"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Content Management System</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Navigation */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.icon}
                      {section.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="bg-gray-900 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm border border-gray-800">
                {renderContent()}
              </div>
                </div>
              </motion.div>
            </div>
          )}
                 </AnimatePresence>
       );
 };
 
 export default AdminPanel; 