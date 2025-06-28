import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px 0px' 
  });

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      >
        {/* Dynamic laser lines */}
        <motion.div 
          className="absolute left-0 top-1/4 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
          animate={isInView ? {
            scaleX: [0, 1, 0.8, 1],
            opacity: [0, 0.6, 0.3, 0.6],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute right-0 bottom-1/4 w-full h-[1px] bg-gradient-to-l from-transparent via-red-600/20 to-transparent"
          animate={isInView ? {
            scaleX: [0, 0.8, 1, 0.6],
            opacity: [0, 0.4, 0.6, 0.4],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          ref={ref} 
          className="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl"
          initial={{
            opacity: 0,
            y: 100,
            x: -50,
            scale: 0.8,
            rotateX: 15,
            filter: 'blur(20px)',
          }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
          } : {
            opacity: 0,
            y: 100,
            x: -50,
            scale: 0.8,
            rotateX: 15,
            filter: 'blur(20px)',
          }}
          transition={{
            duration: 1.2,
            type: 'spring',
            bounce: 0.3,
            ease: 'easeOut',
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.2)',
            borderColor: 'rgb(127, 29, 29)',
          }}
          style={{
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.4)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Video placeholder with enhanced styling */}
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black relative">
            {/* Animated background pattern */}
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={isInView ? {
                backgroundPosition: ['0% 0%', '100% 100%'],
              } : {}}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: 'linear-gradient(45deg, transparent 40%, rgba(239, 68, 68, 0.1) 50%, transparent 60%)',
                backgroundSize: '20px 20px',
              }}
            />
            
            <motion.div 
              className="text-gray-400 text-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Enhanced play button */}
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-gray-500 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                whileHover={{
                  scale: 1.1,
                  borderColor: 'rgb(239, 68, 68)',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)',
                }}
                whileTap={{
                  scale: 0.95,
                }}
                animate={isInView ? {
                  boxShadow: [
                    '0 0 0 rgba(239, 68, 68, 0)',
                    '0 0 20px rgba(239, 68, 68, 0.3)',
                    '0 0 0 rgba(239, 68, 68, 0)',
                  ],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  boxShadow: '0 0 15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <motion.div 
                  className="w-8 h-8 bg-gray-500 rounded-full relative"
                  animate={isInView ? {
                    backgroundColor: ['rgb(107, 114, 128)', 'rgb(239, 68, 68)', 'rgb(107, 114, 128)'],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Play triangle */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/4 w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"
                  />
                </motion.div>
              </motion.div>
              
              <motion.p 
                className="text-lg font-semibold mb-2"
                style={{
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                }}
              >
                Video Kommt Bald
              </motion.p>
              
              <motion.p 
                className="text-sm max-w-md mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Our premium laser engraving process showcased in stunning detail
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced diagonal line decorations with animation */}
      <motion.div 
        className="absolute left-0 top-0 w-[200px] h-[1px] bg-red-600/20 -rotate-45 translate-y-10"
        animate={isInView ? {
          scaleX: [0, 1, 0.8],
          opacity: [0, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute right-0 bottom-0 w-[200px] h-[1px] bg-red-600/20 -rotate-45 -translate-y-10"
        animate={isInView ? {
          scaleX: [0, 0.8, 1],
          opacity: [0, 0.3, 0.4],
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Additional atmospheric glow effects */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-32 h-32 bg-red-900/5 rounded-full blur-3xl"
        animate={isInView ? {
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-red-900/3 rounded-full blur-2xl"
        animate={isInView ? {
          scale: [1, 1.8, 1],
          opacity: [0.03, 0.1, 0.03],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </section>
  );
};

export default VideoSection;