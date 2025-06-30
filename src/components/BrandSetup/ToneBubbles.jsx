import React from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

const ToneBubbles = ({ tones, selectedTones, onToggle, multiSelect = true, title, description }) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tones.map((tone) => {
          const isSelected = multiSelect 
            ? selectedTones.includes(tone.id)
            : selectedTones === tone.id;
          
          return (
            <motion.div
              key={tone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                hover
                selected={isSelected}
                onClick={() => onToggle(tone.id)}
                className="p-4 text-center"
              >
                <div className="text-2xl mb-2">{tone.icon}</div>
                <h4 className="font-medium text-gray-900 mb-1">{tone.name}</h4>
                <p className="text-sm text-gray-600">{tone.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToneBubbles;