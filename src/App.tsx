import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import ContactButton from './components/ContactButton';
import ContactModal from './components/ContactModal';
import AdminPage from './pages/AdminPage';
const HomePage = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <FooterSection />
      <ContactButton onClick={() => setIsContactModalOpen(true)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}