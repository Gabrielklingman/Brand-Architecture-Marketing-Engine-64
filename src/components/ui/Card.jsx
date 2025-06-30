import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  selected = false,
  gradient = false,
  onClick,
  ...props 
}) => {
  const baseClasses = `
    bg-white rounded-2xl border border-neutral-border
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
    ${hover ? 'card-hover cursor-pointer' : ''}
    ${selected ? 'ring-2 ring-primary-500 border-primary-300 bg-primary-50/30' : ''}
  `;
  
  const classes = `${baseClasses} ${className}`;
  
  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" } : {}}
        whileTap={{ scale: 0.98 }}
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;