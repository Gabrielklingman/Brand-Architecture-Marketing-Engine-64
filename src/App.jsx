import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import BrandSetup from './pages/BrandSetup';
import ContentCreator from './pages/ContentCreator';
import BrandManager from './pages/BrandManager';
import { useBrandStore } from './stores/brandStore';

function App() {
  const { brands } = useBrandStore();
  const hasCompletedSetup = brands.length > 0;

  return (
    <Router>
      <div className="min-h-screen bg-neutral-bg">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#7C3AED',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontWeight: '500',
            },
            success: {
              iconTheme: {
                primary: '#4ADE80',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#F87171',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={hasCompletedSetup ? <Dashboard /> : <BrandSetup />} 
          />
          <Route path="/brand-setup" element={<BrandSetup />} />
          <Route path="/content-creator" element={<ContentCreator />} />
          <Route path="/brand-manager" element={<BrandManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;