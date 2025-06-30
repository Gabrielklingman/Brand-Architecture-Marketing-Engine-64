import React from 'react';
import { motion } from 'framer-motion';

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCompleted 
                      ? 'bg-primary-600 text-white' 
                      : isCurrent 
                        ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-600' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? '✓' : stepNumber}
                </motion.div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-20
                  ${isCurrent ? 'text-primary-600' : 'text-gray-500'}
                `}>
                  {step.title}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 mb-6
                  ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;