import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import BubbleButton from '../ui/BubbleButton';
import BrandBadge from '../ui/BrandBadge';
import { useBrandStore } from '../../stores/brandStore';

const { FiHome, FiBrand, FiEdit3, FiSettings, FiUser } = FiIcons;

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { brands, currentBrand, setCurrentBrand } = useBrandStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
    { id: 'brands', label: 'Brands', icon: FiBrand, path: '/brand-manager' },
    { id: 'content', label: 'Content', icon: FiEdit3, path: '/content-creator' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-border shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-a rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="font-bold text-h2 gradient-text">Content OS</span>
          </motion.div>

          {/* Current Brand Badge */}
          {currentBrand && (
            <div className="hidden md:block">
              <BrandBadge 
                brand={currentBrand} 
                active 
                onClick={() => navigate('/brand-manager')}
              />
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <BubbleButton
                  key={item.id}
                  variant={isActive ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className="hidden md:inline-flex"
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4 mr-2" />
                  {item.label}
                </BubbleButton>
              );
            })}

            {/* Profile */}
            <BubbleButton variant="ghost" size="sm">
              <SafeIcon icon={FiUser} className="w-4 h-4" />
            </BubbleButton>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;