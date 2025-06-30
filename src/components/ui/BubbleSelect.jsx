import React from 'react';
import { motion } from 'framer-motion';

const BubbleSelect = ({ options, selected, onSelect, multiSelect = false, className = '' }) => {
  const handleSelect = (option) => {
    if (multiSelect) {
      const newSelected = selected.includes(option.id)
        ? selected.filter(id => id !== option.id)
        : [...selected, option.id];
      onSelect(newSelected);
    } else {
      onSelect(option.id);
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = multiSelect 
          ? selected.includes(option.id)
          : selected === option.id;

        return (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isSelected ? { 
              scale: [1, 1.08, 1],
              backgroundColor: '#7C3AED',
              color: '#ffffff'
            } : {}}
            onClick={() => handleSelect(option)}
            className={`
              px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-200
              ${isSelected 
                ? 'bg-primary-600 text-white border-primary-600 shadow-lg' 
                : 'bg-white text-text-primary border-neutral-border hover:border-primary-300 hover:bg-primary-50'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            `}
          >
            <div className="flex items-center space-x-2">
              {option.icon && <span>{option.icon}</span>}
              <span>{option.name || option.label}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default BubbleSelect;