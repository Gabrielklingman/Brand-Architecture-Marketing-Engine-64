import React from 'react';

const Textarea = ({ 
  label, 
  error, 
  className = '', 
  rows = 4,
  ...props 
}) => {
  const textareaClasses = `
    w-full px-3 py-2 border border-gray-300 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    resize-vertical
    ${error ? 'border-red-300 focus:ring-red-500' : ''}
    ${className}
  `;
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Textarea;