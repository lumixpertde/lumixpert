import React, { useState, useEffect } from 'react';
import { ArrowUpIcon, InstagramIcon, FacebookIcon } from 'lucide-react';

// WhatsApp Icon
const WhatsAppIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087z"/>
  </svg>
);

interface FooterContent {
  companyName: string;
  description: string;
  copyright: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

const FooterSection = () => {
  const [footerContent, setFooterContent] = useState<FooterContent>({
    companyName: 'LumiXpert',
    description: 'Ihr Partner für professionelle Lasergravuren mit modernster Technologie und höchsten Qualitätsstandards.',
    copyright: '© 2024 LumiXpert. Alle Rechte vorbehalten.',
    socialLinks: {},
  });

  // Load footer content from localStorage and listen for updates
  useEffect(() => {
    const loadFooterContent = () => {
      const saved = localStorage.getItem('footerContent');
      if (saved) {
        setFooterContent(JSON.parse(saved));
      }
    };

    loadFooterContent();

    const handleFooterUpdate = (event: CustomEvent) => {
      setFooterContent(event.detail);
    };

    window.addEventListener('footerContentUpdated', handleFooterUpdate as EventListener);

    return () => {
      window.removeEventListener('footerContentUpdated', handleFooterUpdate as EventListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-black relative overflow-hidden">
      {/* Top section with red accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      {/* Content wrapper */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main content */}
        <div className="text-center mb-12">
          {/* Company logo/name - Text only */}
          <div className="mb-8">
            {/* Company name text - Same style as HeroSection */}
            <div className="text-3xl md:text-4xl font-black tracking-tight flex items-center justify-center mb-4">
              <span
                className="text-white inline-block"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)',
                }}
              >
                LUMI
              </span>
              <span
                className="ml-2 text-red-500 inline-block"
                style={{
                  textShadow: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)',
                }}
              >
                XPERT
              </span>
            </div>

            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              {footerContent.description}
            </p>
          </div>

          {/* Social media icons */}
          <div className="mb-12">
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/lumi.xpert/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577765944704"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/491781638184"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="mb-4 md:mb-0">
              {footerContent.copyright}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-red-400 transition-colors duration-300">
                Datenschutz
              </a>
              <a href="#" className="hover:text-red-400 transition-colors duration-300">
                Impressum
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300 z-20"
      >
        <ArrowUpIcon className="w-5 h-5 mx-auto" />
      </button>
    </footer>
  );
};

export default FooterSection;
