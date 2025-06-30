import React from 'react';
import { motion } from 'framer-motion';

const BubbleButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  selected = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'bubble-button focus-ring inline-flex items-center justify-center';
  
  const variants = {
    primary: `bubble-button-primary ${selected ? 'ring-2 ring-primary-300' : ''}`,
    secondary: `bubble-button-secondary ${selected ? 'bg-primary-50 ring-2 ring-primary-300' : ''}`,
    ghost: 'text-text-muted hover:text-text-primary hover:bg-gray-100',
    success: 'bg-secondary-400 text-white hover:bg-secondary-500',
    danger: 'bg-error text-white hover:bg-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-button',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      animate={selected ? { scale: [1, 1.08, 1] } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Processing...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default BubbleButton;