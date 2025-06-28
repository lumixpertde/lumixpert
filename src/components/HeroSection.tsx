import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

const HeroSection = () => {
  const [animationPhase, setAnimationPhase] = useState(0);

  // Function to scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Generate stable particle positions
  const particles = React.useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    })), []
  );

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationPhase(1), 500),
      setTimeout(() => setAnimationPhase(2), 1500),
      setTimeout(() => setAnimationPhase(3), 3000),
      setTimeout(() => setAnimationPhase(4), 4000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.1) 0%, rgba(0, 0, 0, 0.9) 60%, black 100%)',
          }}
        />
        
        {/* Simplified laser lines */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
            style={{
              top: `${30 + i * 20}%`,
              left: '0%',
              right: '0%',
            }}
            animate={{
              scaleX: [0, 1, 0.8, 1],
              opacity: [0, 0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Stable particle system */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-red-500/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.3, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content Container - Properly Centered */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-center mobile-container py-8 sm:py-16">
        {/* Demo Logo - Above LASER CRAFT Title */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          animate={animationPhase >= 1 ? { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
          } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Rotating outer ring */}
          <motion.div 
            className="absolute -inset-2 border-2 border-red-500/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Pulsing inner ring */}
          <motion.div 
            className="absolute -inset-1 border border-red-500/40 rounded-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Main logo with dynamic effects */}
                    <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/20 mx-auto relative overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(239, 68, 68, 0.4)',
                '0 0 60px rgba(255, 255, 255, 0.5), 0 0 120px rgba(239, 68, 68, 0.8)',
                '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(239, 68, 68, 0.4)',
              ],
              scale: [1, 1.05, 1],
              borderColor: [
                'rgba(255, 255, 255, 0.2)',
                'rgba(239, 68, 68, 0.6)',
                'rgba(255, 255, 255, 0.2)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{
              scale: 1.15,
              boxShadow: '0 0 80px rgba(255, 255, 255, 0.6), 0 0 150px rgba(239, 68, 68, 1)',
              rotateZ: 5,
            }}
          >
            {/* Enhanced background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-black/40 via-red-500/20 to-black/50 rounded-2xl"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Scanning line effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/80 to-transparent"
              animate={{
                y: [0, 96, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
            
            {/* Logo image with enhanced visibility */}
            <motion.div className="relative z-10 p-2">
              <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                loading="eager"
                decoding="async"
                style={{
                  filter: 'brightness(1.2) contrast(1.1)',
                }}
                animate={{
                  filter: [
                    'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
                    'brightness(1.4) contrast(1.2) drop-shadow(0 0 25px rgba(255, 255, 255, 1))',
                    'brightness(1.2) contrast(1.1) drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Logo background highlight */}
              <motion.div
                className="absolute inset-0 bg-black/30 rounded-xl"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />
            </motion.div>
            
            {/* Enhanced sparkle effects */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                style={{
                  top: `${15 + i * 12}%`,
                  left: `${10 + i * 15}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: 'easeInOut',
                }}
              />
            ))}
            
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/40 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/40 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/40 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/40 rounded-br-lg" />
          </motion.div>
        </motion.div>

        {/* Targeting System */}
        <motion.div 
          className="absolute -top-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: animationPhase >= 1 ? 1 : 0,
            scale: animationPhase >= 1 ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div 
            className="w-12 h-12 border-2 border-red-500/40 rounded-full relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-2 border border-red-500/20 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500/20"></div>
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-red-500/20"></div>
          </motion.div>
        </motion.div>

        {/* Logo Section - Centered */}
        <div className="relative mb-12 flex flex-col items-center justify-center">
          {/* Laser scanning beam - Below the logo */}
          <motion.div
            className="absolute -bottom-6 left-0 right-0 flex justify-center"
          >
            <motion.div
              className="w-full max-w-2xl h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={animationPhase >= 2 ? {
                scaleX: [0, 1, 1, 0],
                opacity: [0, 1, 0.8, 0],
              } : {}}
              transition={{
                duration: 2,
                ease: 'easeInOut',
              }}
              style={{
                boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)',
                transformOrigin: 'center',
              }}
            />
      </motion.div>
          
          {/* Logo with reliable reveal */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={animationPhase >= 3 ? {
                opacity: 1,
                scale: [0.8, 1.05, 1],
              } : {}}
              transition={{
      duration: 1,
                ease: 'easeOut',
              }}
            >
              {/* Logo text with better fallback styling */}
              <span 
                className="text-white inline-block"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
                }}
              >
                LUMI
              </span>
              <span 
                className="ml-2 sm:ml-3 text-red-500 inline-block"
                style={{
                  textShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
                }}
              >
                XPERT
              </span>
            </motion.div>
            
            {/* Glow effect layer */}
            <motion.div 
              className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight blur-sm opacity-0 flex items-center justify-center"
              animate={animationPhase >= 3 ? { opacity: 0.4 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-white/30 inline-block">LUMI</span>
              <span className="ml-2 sm:ml-3 text-red-500/50 inline-block">XPERT</span>
            </motion.div>
          </div>

          {/* Impact effect */}
          <motion.div
            className="absolute -inset-8 rounded-xl opacity-0"
            animate={animationPhase >= 3 ? {
              opacity: [0, 0.3, 0],
              scale: [1, 1.02, 1],
            } : {}}
            transition={{
              duration: 0.6,
              repeat: 1,
              delay: 0.2,
            }}
            style={{
              background: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Enhanced content section - Centered */}
        <motion.div
          className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={animationPhase >= 4 ? {
            opacity: 1,
            y: 0,
          } : {}}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
          }}
        >
          {/* Improved tagline */}
          <div className="space-y-6 text-center">
            <h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-100 leading-relaxed max-w-3xl mx-auto px-4"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
              }}
            >
              Wir <span className="font-semibold text-red-400 italic">verewigen</span> die Energie Ihrer Marke.
            </h2>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={animationPhase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Präzise Lasergravuren, die gewöhnliche Produkte in außergewöhnliche Markenerlebnisse verwandeln.
            </motion.p>
          </div>

          {/* CTA section - Centered */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={animationPhase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.button 
              className="group relative px-6 sm:px-8 py-4 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-base sm:text-lg font-semibold rounded-lg overflow-hidden shadow-lg w-full sm:w-auto touch-target"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
              }}
              onClick={scrollToContact}
            >
              <span className="relative flex items-center justify-center gap-3 z-10">
                Angebot anfordern
                <ArrowRightIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.button>


          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - Fixed at bottom center of screen */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center">
        <motion.div 
          className="flex flex-col items-center justify-center text-center text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={animationPhase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="text-xs mb-2 tracking-wider uppercase font-medium whitespace-nowrap">Scrollen zum Erkunden</span>
          <motion.div
            className="flex items-center justify-center cursor-pointer"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            onClick={scrollToContact}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDownIcon size={20} />
          </motion.div>
        </motion.div>
      </div>

      {/* Atmospheric effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-900/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900/6 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;