import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import BubbleButton from './BubbleButton';
import Card from './Card';

const { FiMic, FiVideo, FiFileText, FiEdit3, FiPlus, FiX, FiPause, FiStop } = FiIcons;

const QuickCapture = ({ onSave, selectedBrand, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeType, setActiveType] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef(null);
  const intervalRef = useRef(null);

  const captureTypes = [
    { id: 'text', label: 'Quick Note', icon: FiEdit3, color: 'bg-blue-500' },
    { id: 'audio', label: 'Voice Memo', icon: FiMic, color: 'bg-green-500' },
    { id: 'video', label: 'Video Note', icon: FiVideo, color: 'bg-purple-500' },
    { id: 'document', label: 'Upload File', icon: FiFileText, color: 'bg-orange-500' },
  ];

  const handleTypeSelect = (type) => {
    setActiveType(type);
    setIsExpanded(true);
    
    if (type === 'audio') {
      startRecording();
    } else if (type === 'document') {
      fileInputRef.current?.click();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    toast.success('🎤 Recording started...');
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    const audioNote = {
      title: `Voice Note - ${new Date().toLocaleTimeString()}`,
      type: 'audio',
      originalContent: `Audio recording (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`,
      duration: `${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}`,
      brandId: selectedBrand
    };
    
    onSave(audioNote);
    setActiveType(null);
    setIsExpanded(false);
    toast.success('🎵 Voice note saved!');
  };

  const handleTextSave = () => {
    if (!textContent.trim()) return;
    
    const textNote = {
      title: textContent.split('\n')[0].substring(0, 50) || 'Quick Note',
      type: 'text',
      originalContent: textContent,
      brandId: selectedBrand
    };
    
    onSave(textNote);
    setTextContent('');
    setActiveType(null);
    setIsExpanded(false);
    toast.success('📝 Note saved!');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const documentNote = {
        title: file.name,
        type: 'document',
        originalContent: `Document: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`,
        fileType: file.type,
        brandId: selectedBrand
      };
      
      onSave(documentNote);
      setActiveType(null);
      setIsExpanded(false);
      toast.success('📄 Document uploaded!');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Quick Action Buttons */}
      <motion.div
        layout
        className="flex items-center space-x-2"
      >
        {!isExpanded ? (
          captureTypes.map((type) => (
            <motion.button
              key={type.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTypeSelect(type.id)}
              className={`${type.color} text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200`}
              title={type.label}
            >
              <SafeIcon icon={type.icon} className="w-5 h-5" />
            </motion.button>
          ))
        ) : (
          <BubbleButton
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsExpanded(false);
              setActiveType(null);
              setTextContent('');
              if (isRecording) {
                stopRecording();
              }
            }}
          >
            <SafeIcon icon={FiX} className="w-4 h-4" />
            Cancel
          </BubbleButton>
        )}
      </motion.div>

      {/* Expanded Capture Interface */}
      <AnimatePresence>
        {isExpanded && activeType && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 z-50"
          >
            <Card className="p-6 shadow-xl border-2 border-primary-200">
              {activeType === 'text' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiEdit3} className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary">Quick Note</h3>
                  </div>
                  
                  <textarea
                    placeholder="What's on your mind?"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-border rounded-xl focus-ring resize-none"
                    autoFocus
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <BubbleButton
                      variant="primary"
                      onClick={handleTextSave}
                      disabled={!textContent.trim()}
                    >
                      Save Note
                    </BubbleButton>
                  </div>
                </div>
              )}

              {activeType === 'audio' && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center">
                      <SafeIcon icon={FiMic} className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="font-semibold text-text-primary">Voice Recording</h3>
                  </div>
                  
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ scale: isRecording ? [1, 1.1, 1] : 1 }}
                      transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
                      className={`w-20 h-20 ${isRecording ? 'bg-red-500' : 'bg-green-500'} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <SafeIcon 
                        icon={isRecording ? FiPause : FiMic} 
                        className="w-8 h-8 text-white" 
                      />
                    </motion.div>
                    
                    <div className="text-2xl font-mono text-text-primary mb-4">
                      {formatTime(recordingTime)}
                    </div>
                    
                    <div className="flex justify-center space-x-3">
                      {isRecording ? (
                        <BubbleButton
                          variant="danger"
                          onClick={stopRecording}
                        >
                          <SafeIcon icon={FiStop} className="w-4 h-4 mr-2" />
                          Stop & Save
                        </BubbleButton>
                      ) : (
                        <BubbleButton
                          variant="primary"
                          onClick={startRecording}
                        >
                          <SafeIcon icon={FiMic} className="w-4 h-4 mr-2" />
                          Start Recording
                        </BubbleButton>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeType === 'video' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiVideo} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">Video Recording</h3>
                  <p className="text-text-muted mb-6">Video recording feature coming soon!</p>
                  <BubbleButton variant="secondary" onClick={() => setIsExpanded(false)}>
                    Got it
                  </BubbleButton>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.md,.jpg,.jpeg,.png"
      />
    </div>
  );
};

export default QuickCapture;