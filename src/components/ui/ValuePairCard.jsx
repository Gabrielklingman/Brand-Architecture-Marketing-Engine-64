import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

const ValuePairCard = ({ pair, selectedValue, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="space-y-4"
    >
      {/* Pair Title */}
      <div className="text-center">
        <h4 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
          Choice {index + 1}
        </h4>
      </div>

      {/* Value Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Value */}
        <Card
          hover
          selected={selectedValue === pair.leftValue.key}
          onClick={() => onSelect(pair.id, pair.leftValue.key)}
          className="p-6 text-center relative overflow-hidden"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-a rounded-full mx-auto flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {pair.leftValue.label.charAt(0)}
              </span>
            </div>
            <h5 className="font-semibold text-text-primary text-lg">
              {pair.leftValue.label}
            </h5>
            <p className="text-text-muted text-sm leading-relaxed">
              {pair.leftValue.description}
            </p>
          </div>
          
          {selectedValue === pair.leftValue.key && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </Card>

        {/* Right Value */}
        <Card
          hover
          selected={selectedValue === pair.rightValue.key}
          onClick={() => onSelect(pair.id, pair.rightValue.key)}
          className="p-6 text-center relative overflow-hidden"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-b rounded-full mx-auto flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {pair.rightValue.label.charAt(0)}
              </span>
            </div>
            <h5 className="font-semibold text-text-primary text-lg">
              {pair.rightValue.label}
            </h5>
            <p className="text-text-muted text-sm leading-relaxed">
              {pair.rightValue.description}
            </p>
          </div>
          
          {selectedValue === pair.rightValue.key && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default ValuePairCard;