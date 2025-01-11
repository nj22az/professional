import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, FileText } from 'lucide-react';
import { useCareer } from '../contexts/CareerContext';
import ContactModal from './ContactModal';

interface StickyHeaderProps {
  onDownloadCV: () => void;
  onDownloadCoverLetter: () => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ onDownloadCV, onDownloadCoverLetter }) => {
  const { personalInfo } = useCareer();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm z-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Name */}
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900">{personalInfo.name}</h1>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-4">
              {/* Download buttons */}
              <button
                onClick={onDownloadCV}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">CV</span>
              </button>
              <button
                onClick={onDownloadCoverLetter}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Cover Letter</span>
              </button>

              {/* Social links */}
              <div className="h-6 w-px bg-gray-200" />
              <a
                href="https://github.com/nj22az"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default StickyHeader; 