import React from 'react';
import { Calculator } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const openPage = (page: string) => {
    window.open(`/${page}.html`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Content */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-amazon-orange mr-2 sm:mr-3" />
            <span className="text-lg sm:text-xl font-bold text-white">Smart Discount Calculator</span>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base px-4">
            The most comprehensive and accurate discount calculator for smart shoppers. 
            Calculate savings, apply complex discount rules, and make informed purchasing decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} Smart Discount Calculator. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <button 
                onClick={() => openPage('about')}
                className="text-gray-400 hover:text-white transition-colors py-1 px-2 sm:p-0"
              >
                About Us
              </button>
              <button 
                onClick={() => openPage('privacy')}
                className="text-gray-400 hover:text-white transition-colors py-1 px-2 sm:p-0"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => openPage('terms')}
                className="text-gray-400 hover:text-white transition-colors py-1 px-2 sm:p-0"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 