import React from 'react';
import { motion } from 'framer-motion';

const BrandBadge = ({ brand, active = false, onClick, className = '' }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center space-x-2 px-3 py-1.5 rounded-full cursor-pointer
        transition-all duration-200 border
        ${active 
          ? 'bg-primary-600 text-white border-primary-600 shadow-lg' 
          : 'bg-white text-text-primary border-neutral-border hover:border-primary-300 hover:bg-primary-50'
        }
        ${className}
      `}
    >
      {/* Brand Icon/Color */}
      <div className={`w-3 h-3 rounded-full ${active ? 'bg-white/20' : 'bg-primary-600'}`} />
      
      {/* Brand Name */}
      <span className="text-sm font-medium">{brand.name}</span>
      
      {/* Tone Indicator */}
      {brand.refinedToneName && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-gray-100 text-text-muted'
        }`}>
          {brand.refinedToneName.split(' ')[0]}
        </span>
      )}
    </motion.div>
  );
};

export default BrandBadge;