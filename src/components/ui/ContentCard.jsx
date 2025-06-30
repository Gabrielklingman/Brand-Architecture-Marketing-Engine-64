import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import BubbleButton from './BubbleButton';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCopy, FiRefreshCw, FiSend, FiPlus, FiEdit, FiClock } = FiIcons;

const ContentCard = ({ content, platform, onCopy, onRegenerate, onAddCTA, onEdit, className = '' }) => {
  const getCharacterCountColor = () => {
    if (!content.maxLength) return 'text-text-muted';
    const percentage = (content.characterCount / content.maxLength) * 100;
    if (percentage > 90) return 'text-error';
    if (percentage > 75) return 'text-yellow-500';
    return 'text-secondary-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card hover className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-b rounded-full flex items-center justify-center">
              <span className="text-lg">{platform.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{platform.name}</h3>
              <div className="flex items-center space-x-2 text-tiny text-text-muted">
                <SafeIcon icon={FiClock} className="w-3 h-3" />
                <span>Generated now</span>
              </div>
            </div>
          </div>
          
          {content.maxLength && (
            <div className={`text-xs font-medium px-2 py-1 rounded-lg bg-gray-100 ${getCharacterCountColor()}`}>
              {content.characterCount}/{content.maxLength}
            </div>
          )}
        </div>

        {/* Content Preview */}
        <div className="mb-4">
          <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-neutral-border">
            <div className="ai-suggestion">
              <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans leading-relaxed">
                {content.content}
              </pre>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BubbleButton
              variant="secondary"
              size="sm"
              onClick={onCopy}
            >
              <SafeIcon icon={FiCopy} className="w-4 h-4 mr-1" />
              Copy
            </BubbleButton>
            
            <BubbleButton
              variant="ghost"
              size="sm"
              onClick={onRegenerate}
            >
              <SafeIcon icon={FiRefreshCw} className="w-4 h-4 mr-1" />
              Retry
            </BubbleButton>
            
            <BubbleButton
              variant="ghost"
              size="sm"
              onClick={onAddCTA}
            >
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-1" />
              Add CTA
            </BubbleButton>
          </div>

          <BubbleButton
            variant="primary"
            size="sm"
            onClick={onEdit}
          >
            <SafeIcon icon={FiSend} className="w-4 h-4 mr-1" />
            Send
          </BubbleButton>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentCard;