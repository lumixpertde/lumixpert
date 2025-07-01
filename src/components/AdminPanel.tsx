import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  XIcon, EyeIcon, InfoIcon, MailIcon, GalleryHorizontalIcon, SearchIcon, Globe, BarChart3, Gauge } from 'lucide-react';
import { AdminPanelProps, ContentSection, GalleryItem, SEOContent, AboutContent, ContactContent, ProductImage } from './admin/admin.types';
import renderContent from './admin/AdminContent';
import { aboutContentInitial, contactContentInitial, defaultItems, seoContentInitial } from './admin/staticContent';


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
  const [aboutContent, setAboutContent] = useState<AboutContent>(aboutContentInitial);
  const [contactContent, setContactContent] = useState<ContactContent>(contactContentInitial);
  const [seoContent, setSeoContent] = useState<SEOContent>(seoContentInitial);
  // Load content from localStorage on component mount
  useEffect(() => {
    // Load gallery items
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems && savedItems != '[]') {
      setGalleryItems(JSON.parse(savedItems));
    } else {
      // Default items if none exist
      
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

    const handleRenderContent = () => {
        return renderContent({
            activeSection,
            aboutContent,
            updateAboutContent,
            updateAboutFeature,
            contactContent,
            updateContactContent,
            seoContent,
            updateSEOContent,
            updateSEOStructuredData,
            updateSEOAddress,
            handleAddNew,
            galleryItems,
            isAddingNew,
            editingItem,
            formData,
            handleInputChange,
            handleImageUpload,
            handleSave,
            handleCancel,
            isAddingNewProduct,
            editingProduct,
            selectedMaterial,
            productFormData,
            handleProductInputChange,
            handleProductImageUpload,
            handleSaveProduct,
            handleCancelProduct,
            handleAddNewProduct,
            handleDelete,
            handleEdit,
            handleEditProduct,
            handleDeleteProduct,
        });
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
          {handleRenderContent()}
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
              {handleRenderContent()}
              </div>
                </div>
              </motion.div>
            </div>
          )}
                 </AnimatePresence>
       );
 };
 
 export default AdminPanel; 