import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ZapIcon, LayersIcon, HeartIcon } from 'lucide-react';

interface AboutContent {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
}

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px' 
  });

  const [content, setContent] = useState<AboutContent>({
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

  // Load content from localStorage
  useEffect(() => {
    const loadContent = () => {
      const savedContent = localStorage.getItem('aboutContent');
      if (savedContent) {
        setContent(JSON.parse(savedContent));
      }
    };

    // Load initial content
    loadContent();

    // Listen for content updates from admin panel
    const handleContentUpdate = (event: CustomEvent) => {
      setContent(event.detail);
    };

    window.addEventListener('aboutContentUpdated', handleContentUpdate as EventListener);

    return () => {
      window.removeEventListener('aboutContentUpdated', handleContentUpdate as EventListener);
    };
  }, []);

  const featureIcons = [
    <ZapIcon className="w-8 h-8 text-red-600" />,
    <LayersIcon className="w-8 h-8 text-red-600" />,
    <HeartIcon className="w-8 h-8 text-red-600" />
  ];

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

  const descriptionVariants = {
    hidden: { 
      opacity: 0,
      y: 30,
      filter: 'blur(5px)',
    },
    visible: { 
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: 'easeOut',
      }
    }
  };

  return (
    <section ref={ref} className="w-full py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-10 w-2 h-20 bg-red-600/20 rotate-45 blur-sm"></div>
        <div className="absolute bottom-1/4 right-10 w-2 h-16 bg-red-600/20 -rotate-45 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-32 bg-red-600/10 rotate-12 blur-md transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto mobile-container">
        <motion.div 
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              textShadow: isInView ? '0 0 20px rgba(255, 255, 255, 0.3)' : 'none',
            }}
          >
            {content.title}
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-300 text-lg"
            variants={descriptionVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              textShadow: isInView ? '0 0 10px rgba(255, 255, 255, 0.1)' : 'none',
            }}
          >
            {content.description}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {content.features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 bg-opacity-50 p-8 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-red-900 transition-all duration-300 group"
              variants={itemVariants}
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
              {/* Enhanced icon container with glow */}
              <motion.div 
                className="bg-black bg-opacity-50 p-4 rounded-full inline-flex items-center justify-center mb-6 border border-red-900/30"
                style={{
                  boxShadow: '0 0 15px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  scale: 1.1,
                }}
                transition={{ duration: 0.3 }}
                              >
                  {featureIcons[index] || <ZapIcon className="w-8 h-8 text-red-600" />}
                </motion.div>
              
              <motion.h3 
                className="text-xl font-bold mb-3"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced background accents with animation */}
      <motion.div 
        className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900 rounded-full opacity-5 blur-3xl"
        animate={isInView ? {
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute -top-10 -left-10 w-48 h-48 bg-red-900 rounded-full opacity-3 blur-3xl"
        animate={isInView ? {
          scale: [1, 1.3, 1],
          opacity: [0.03, 0.08, 0.03],
        } : {}}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </section>
  );
};

export default AboutSection;