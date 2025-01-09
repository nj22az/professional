import React from 'react';
import { Download } from 'lucide-react';
import { useCareer } from '../contexts/CareerContext';

const Header: React.FC = () => {
  const { personalInfo } = useCareer();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200/80 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <span className="text-[17px] font-semibold text-gray-900">
            {personalInfo.name}
          </span>
          <button className="ios-button">
            <Download size={16} />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 