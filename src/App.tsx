import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { CareerProvider } from './contexts/CareerContext';
import ProfileView from './components/ProfileView';
import CVModal from './components/CVModal';
import CoverLetterModal from './components/CoverLetterModal';
import StickyHeader from './components/StickyHeader';
import './styles/globals.css';
import './styles/fonts.css';

function App() {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);

  return (
    <CareerProvider>
      <Router>
        <div className="min-h-screen bg-[#f5f5f7]">
          <StickyHeader 
            onDownloadCV={() => setIsCVModalOpen(true)}
            onDownloadCoverLetter={() => setIsCoverLetterModalOpen(true)}
          />
          
          {/* Add padding-top to account for sticky header */}
          <main className="pt-16">
            <ProfileView 
              onDownloadCV={() => setIsCVModalOpen(true)}
              onDownloadCoverLetter={() => setIsCoverLetterModalOpen(true)}
            />
          </main>

          <CVModal 
            isOpen={isCVModalOpen}
            onClose={() => setIsCVModalOpen(false)}
          />
          
          <CoverLetterModal 
            isOpen={isCoverLetterModalOpen}
            onClose={() => setIsCoverLetterModalOpen(false)}
          />
        </div>
      </Router>
    </CareerProvider>
  );
}

export default App; 