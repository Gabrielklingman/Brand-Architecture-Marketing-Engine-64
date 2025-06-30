import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const ValuePairs = ({ valuePairs, selections, onSelect, title, description }) => {
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
      
      <div className="space-y-6">
        {valuePairs.map((pair, index) => {
          const selectedValue = selections[pair.id];
          
          return (
            <motion.div
              key={pair.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-3"
            >
              <h4 className="text-center text-sm font-medium text-gray-500 uppercase tracking-wide">
                Choice {index + 1}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card
                  hover
                  selected={selectedValue === pair.leftValue.key}
                  onClick={() => onSelect(pair.id, pair.leftValue.key)}
                  className="p-4 text-center"
                >
                  <h5 className="font-medium text-gray-900 mb-1">
                    {pair.leftValue.label}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {pair.leftValue.description}
                  </p>
                </Card>
                
                <Card
                  hover
                  selected={selectedValue === pair.rightValue.key}
                  onClick={() => onSelect(pair.id, pair.rightValue.key)}
                  className="p-4 text-center"
                >
                  <h5 className="font-medium text-gray-900 mb-1">
                    {pair.rightValue.label}
                  </h5>
                  <p className="text-sm text-gray-600">
                    {pair.rightValue.description}
                  </p>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ValuePairs;