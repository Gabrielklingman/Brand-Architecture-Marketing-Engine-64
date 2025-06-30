import React from 'react';
import { motion } from 'framer-motion';

const ProgressStepper = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold
                    transition-all duration-300 relative
                    ${isCompleted 
                      ? 'bg-primary-600 text-white shadow-lg' 
                      : isCurrent 
                        ? 'bg-white text-primary-600 ring-4 ring-primary-200 shadow-lg' 
                        : 'bg-gray-100 text-text-muted'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                  
                  {/* Current step pulse */}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary-400 opacity-30"
                    />
                  )}
                </motion.div>
                
                {/* Step Label */}
                <div className="mt-3 text-center">
                  <span className={`
                    text-sm font-medium block
                    ${isCurrent ? 'text-primary-600' : isCompleted ? 'text-text-primary' : 'text-text-muted'}
                  `}>
                    {step.title}
                  </span>
                  {step.subtitle && (
                    <span className="text-xs text-text-muted mt-1 block">
                      {step.subtitle}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 mb-8">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`
                      h-1 rounded-full transform origin-left
                      ${isCompleted ? 'bg-primary-600' : 'bg-gray-200'}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-8 bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-a rounded-full"
        />
      </div>
      
      {/* Progress Text */}
      <div className="flex justify-between items-center mt-2 text-tiny text-text-muted">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressStepper;