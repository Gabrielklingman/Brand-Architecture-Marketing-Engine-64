import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const ToneVariants = ({ variants, selectedVariant, onSelect, title, description }) => {
  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variants.map((variant) => {
          const isSelected = selectedVariant === variant.id;
          
          return (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                hover
                selected={isSelected}
                onClick={() => onSelect(variant.id)}
                className="p-6"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{variant.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{variant.description}</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm italic text-gray-700">"{variant.example}"</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToneVariants;