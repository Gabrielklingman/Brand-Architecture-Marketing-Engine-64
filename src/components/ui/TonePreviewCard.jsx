import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const TonePreviewCard = ({ tone, selected, onSelect, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={className}
    >
      <Card
        hover
        selected={selected}
        onClick={() => onSelect(tone.id)}
        className="p-6 h-full"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-text-primary text-lg mb-1">
                {tone.name}
              </h3>
              <p className="text-text-muted text-sm">
                {tone.description}
              </p>
            </div>
            {selected && (
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Example Content */}
          <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-primary-600">
            <p className="text-sm text-text-primary italic leading-relaxed">
              "{tone.example}"
            </p>
          </div>

          {/* Rules Tags */}
          {tone.rules && tone.rules.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tone.rules.slice(0, 3).map((rule, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium"
                >
                  {rule.replace(/_/g, ' ')}
                </span>
              ))}
              {tone.rules.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-text-muted rounded-lg text-xs">
                  +{tone.rules.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TonePreviewCard;