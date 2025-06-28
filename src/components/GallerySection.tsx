import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { XIcon, PlusIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import LazyImage from './LazyImage';

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

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px' 
  });

  const [materials, setMaterials] = useState<GalleryItem[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<GalleryItem | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Load materials from localStorage and listen for updates
  useEffect(() => {
    const loadMaterials = () => {
      const savedItems = localStorage.getItem('galleryItems');
      if (savedItems) {
        const items = JSON.parse(savedItems);
        // Ensure each material has a products array
        const itemsWithProducts = items.map((item: GalleryItem) => ({
          ...item,
          products: item.products || []
        }));
        setMaterials(itemsWithProducts);
      } else {
        // Default materials if none exist
        const defaultMaterials: GalleryItem[] = [
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
        setMaterials(defaultMaterials);
        localStorage.setItem('galleryItems', JSON.stringify(defaultMaterials));
      }
    };

    // Load materials on component mount
    loadMaterials();

    // Listen for updates from admin panel
    const handleGalleryUpdate = (event: CustomEvent) => {
      const items = event.detail;
      const itemsWithProducts = items.map((item: GalleryItem) => ({
        ...item,
        products: item.products || []
      }));
      setMaterials(itemsWithProducts);
    };

    window.addEventListener('galleryItemsUpdated', handleGalleryUpdate as EventListener);

    return () => {
      window.removeEventListener('galleryItemsUpdated', handleGalleryUpdate as EventListener);
    };
  }, []);

  const handleMaterialClick = (material: GalleryItem) => {
    setSelectedMaterial(material);
    setSelectedImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedMaterial(null);
    setSelectedImageIndex(0);
  };

  const handlePrevImage = () => {
    if (selectedMaterial && selectedMaterial.products) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedMaterial.products!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedMaterial && selectedMaterial.products) {
      setSelectedImageIndex((prev) => 
        prev === selectedMaterial.products!.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Enhanced animation variants matching AboutSection
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 60,
      x: -30,
      scale: 0.8,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        type: 'spring',
        bounce: 0.4,
        ease: 'easeOut',
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.8,
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1,
        type: 'spring',
        bounce: 0.3,
        ease: 'easeOut',
      }
    }
  };

  return (
    <>
      <section ref={ref} className="w-full py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
        {/* Simplified background elements - reduced animations */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Single subtle laser line - reduced complexity */}
          <motion.div 
            className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/15 to-transparent"
            animate={isInView ? {
              opacity: [0, 0.3, 0.1, 0.3],
            } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto mobile-container">
          <motion.div 
            className="text-center mb-16"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h2 
              className="mobile-text-xl font-bold mb-6"
              style={{
                textShadow: isInView ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
              }}
            >
              Unsere Galerie
            </motion.h2>
            <motion.p 
              className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg px-4"
              initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
              animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 30, filter: 'blur(5px)' }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{
                textShadow: isInView ? '0 0 10px rgba(255, 255, 255, 0.1)' : 'none',
              }}
            >
              Entdecken Sie unsere hochwertigen Gravurmaterialien für außergewöhnliche Ergebnisse.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {materials.map((material, index) => (
              <motion.div
                key={material.id}
                className="group relative overflow-hidden rounded-lg bg-gray-900 bg-opacity-50 border border-gray-800 hover:border-red-900 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                variants={itemVariants}
                onClick={() => handleMaterialClick(material)}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.3), 0 0 30px rgba(239, 68, 68, 0.2)',
                  borderColor: 'rgb(127, 29, 29)',
                }}
                whileTap={{
                  scale: 0.98,
                }}
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Enhanced image container with lazy loading */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={material.image}
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Enhanced overlay with subtle gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/60 transition-all duration-300" />
                  
                  {/* Product count indicator */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white border border-white/20">
                    {material.products?.length || 0} Produkte
                  </div>
                  
                  {/* Click to view indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600/90 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
                      Galerie anzeigen
                    </div>
                  </div>
                </div>

                {/* Enhanced content section */}
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300"
                    style={{
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {material.name}
                  </motion.h3>
                  
                  <motion.p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {material.description}
                  </motion.p>
                </div>

                {/* Enhanced glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.1), transparent)',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced background accents with animation */}
        <motion.div 
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-900 rounded-full opacity-5 blur-3xl"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div 
          className="absolute -top-32 -left-32 w-96 h-96 bg-red-900 rounded-full opacity-3 blur-3xl"
          animate={isInView ? {
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.08, 0.03],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </section>

      {/* Material Gallery Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
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
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedMaterial.name} Galerie</h2>
                  <p className="text-gray-400 mt-1">{selectedMaterial.products?.length || 0} Produkte</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {selectedMaterial.products && selectedMaterial.products.length > 0 ? (
                  <div className="space-y-8">
                    {/* Large Image Display */}
                    <div className="relative">
                      <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={selectedMaterial.products[selectedImageIndex].image}
                          alt={selectedMaterial.products[selectedImageIndex].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Navigation Arrows */}
                      {selectedMaterial.products.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                          >
                            <ArrowLeftIcon className="w-6 h-6" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                          >
                            <ArrowRightIcon className="w-6 h-6" />
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                        {selectedImageIndex + 1} / {selectedMaterial.products.length}
                      </div>
                    </div>

                    {/* Current Image Info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {selectedMaterial.products[selectedImageIndex].title}
                      </h3>
                      <p className="text-gray-300">
                        {selectedMaterial.products[selectedImageIndex].description}
                      </p>
                    </div>

                    {/* Thumbnail Grid */}
                    {selectedMaterial.products.length > 1 && (
                      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {selectedMaterial.products.map((product, index) => (
                          <button
                            key={product.id}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              index === selectedImageIndex
                                ? 'border-red-600 ring-2 ring-red-600/50'
                                : 'border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlusIcon className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Keine Produkte vorhanden</h3>
                    <p className="text-gray-400">
                      Verwenden Sie das Admin Panel, um Produktbilder für {selectedMaterial.name} hinzuzufügen.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;