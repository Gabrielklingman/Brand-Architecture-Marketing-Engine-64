import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import BrandBadge from './BrandBadge';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiPause, FiShare2, FiMoreHorizontal, FiVolume2 } = FiIcons;

const NoteCard = ({ 
  note, 
  brand, 
  viewMode = 'grid', 
  onClick, 
  onPlay, 
  onShare, 
  className = '' 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeColor = (type) => {
    const colors = {
      text: 'bg-blue-500',
      audio: 'bg-green-500',
      video: 'bg-purple-500',
      document: 'bg-orange-500'
    };
    return colors[type] || colors.text;
  };

  const getTypeIcon = (type) => {
    const icons = {
      text: FiIcons.FiEdit3,
      audio: FiIcons.FiMic,
      video: FiIcons.FiVideo,
      document: FiIcons.FiFileText
    };
    return icons[type] || icons.text;
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
      >
        <Card hover onClick={onClick} className="p-4">
          <div className="flex items-center space-x-4">
            {/* Type Icon */}
            <div className={`w-10 h-10 ${getTypeColor(note.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <SafeIcon icon={getTypeIcon(note.type)} className="w-5 h-5 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-text-primary truncate">{note.title}</h4>
                {note.type === 'audio' && note.duration && (
                  <span className="text-xs text-text-muted bg-gray-100 px-2 py-0.5 rounded-full">
                    {note.duration}
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted line-clamp-1">{note.originalContent}</p>
              <div className="flex items-center space-x-2 mt-1 text-xs text-text-muted">
                <span>{formatDate(note.createdAt)}</span>
                <span>•</span>
                <span className="capitalize">{note.type}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {brand && <BrandBadge brand={brand} />}
              {note.type === 'audio' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay?.(note.id);
                  }}
                  className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  <SafeIcon icon={FiPlay} className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.(note.id);
                }}
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <SafeIcon icon={FiShare2} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card hover onClick={onClick} className="p-5 h-full">
        <div className="space-y-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${getTypeColor(note.type)} rounded-xl flex items-center justify-center`}>
                <SafeIcon icon={getTypeIcon(note.type)} className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <span>{formatDate(note.createdAt)}</span>
                  <span>•</span>
                  <span className="capitalize">{note.type}</span>
                  {note.duration && (
                    <>
                      <span>•</span>
                      <span>{note.duration}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
              <SafeIcon icon={FiMoreHorizontal} className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-text-primary leading-tight line-clamp-2">
            {note.title}
          </h4>

          {/* Content Preview */}
          <div className="flex-1 bg-gray-50 rounded-lg p-3 min-h-[80px]">
            {note.type === 'audio' ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <SafeIcon icon={FiVolume2} className="w-6 h-6 text-text-muted mx-auto mb-2" />
                  <p className="text-xs text-text-muted">Audio content</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-text-muted line-clamp-3 leading-relaxed">
                {note.originalContent}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {brand && <BrandBadge brand={brand} />}
              {note.platforms?.length > 0 && (
                <div className="flex space-x-1">
                  {note.platforms.slice(0, 2).map(platform => (
                    <span key={platform} className="text-xs">
                      {platform === 'instagram' && '📷'}
                      {platform === 'twitter' && '🐦'}
                      {platform === 'linkedin' && '💼'}
                      {platform === 'youtube' && '📺'}
                    </span>
                  ))}
                  {note.platforms.length > 2 && (
                    <span className="text-xs text-text-muted">+{note.platforms.length - 2}</span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              {note.type === 'audio' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay?.(note.id);
                  }}
                  className="p-1 text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiPlay} className="w-3 h-3" />
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.(note.id);
                }}
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <SafeIcon icon={FiShare2} className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default NoteCard;