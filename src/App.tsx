import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { CareerProvider } from './contexts/CareerContext';
import ProfileView from './components/ProfileView';
import './styles/globals.css';

function App() {
  return (
    <CareerProvider>
      <Router>
        <ProfileView />
      </Router>
    </CareerProvider>
  );
}

export default App; 