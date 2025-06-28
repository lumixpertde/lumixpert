import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleIcon } from 'lucide-react';

interface ContactButtonProps {
  onClick: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 bg-red-600 text-white p-3 sm:p-4 rounded-full shadow-lg border border-red-500 group touch-target"
      whileHover={{
        scale: 1.15,
        boxShadow: '0 0 30px rgba(239, 68, 68, 0.8), 0 0 60px rgba(239, 68, 68, 0.4)',
      }}
      whileTap={{
        scale: 0.9,
      }}
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay: 1,
        duration: 0.5,
        type: 'spring',
        bounce: 0.4,
      }}
      style={{
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), 0 0 40px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
    >
      {/* Pulsing ring effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-red-400/50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Icon with subtle animation */}
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <MessageCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
      </motion.div>
      
      <span className="sr-only">Contact Us</span>
    </motion.button>
  );
};

export default ContactButton;