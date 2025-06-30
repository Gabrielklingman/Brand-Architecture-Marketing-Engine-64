import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Navigation from '../components/layout/Navigation';
import BubbleButton from '../components/ui/BubbleButton';
import Card from '../components/ui/Card';
import BrandBadge from '../components/ui/BrandBadge';
import { useBrandStore } from '../stores/brandStore';
import { useContentStore } from '../stores/contentStore';

const { 
  FiPlus, FiEdit3, FiMic, FiVideo, FiFileText, FiUpload, FiSearch, 
  FiCalendar, FiBrand, FiGrid, FiList, FiFilter, FiMoreHorizontal,
  FiPlay, FiPause, FiDownload, FiShare2, FiTrash2 
} = FiIcons;

const PLATFORMS = [
  { id: 'all', name: 'All Platforms', icon: '📱', color: 'bg-gray-100 text-gray-600' },
  { id: 'instagram', name: 'Instagram', icon: '📷', color: 'bg-pink-100 text-pink-600' },
  { id: 'twitter', name: 'Twitter', icon: '🐦', color: 'bg-blue-100 text-blue-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'bg-blue-100 text-blue-700' },
  { id: 'youtube', name: 'YouTube', icon: '📺', color: 'bg-red-100 text-red-700' },
];

const NOTE_TYPES = [
  { id: 'text', label: 'Written Note', icon: FiEdit3, color: 'bg-blue-500' },
  { id: 'audio', label: 'Voice Note', icon: FiMic, color: 'bg-green-500' },
  { id: 'video', label: 'Video Note', icon: FiVideo, color: 'bg-purple-500' },
  { id: 'document', label: 'Document', icon: FiFileText, color: 'bg-orange-500' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { brands, currentBrand, setCurrentBrand } = useBrandStore();
  const { contentPieces, addContent } = useContentStore();
  
  const [selectedFilter, setSelectedFilter] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedBrand, setSelectedBrand] = useState(currentBrand?.id || 'all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showNewNoteModal, setShowNewNoteModal] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');
  
  const fileInputRef = useRef(null);

  // Filter content based on selected criteria
  const filteredContent = contentPieces.filter(content => {
    if (searchQuery && !content.title?.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !content.originalContent?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedBrand !== 'all' && content.brandId !== selectedBrand) {
      return false;
    }
    
    if (selectedFilter === 'date') {
      const contentDate = new Date(content.createdAt).toISOString().split('T')[0];
      return contentDate === selectedDate;
    }
    
    if (selectedPlatform !== 'all' && !content.platforms?.includes(selectedPlatform)) {
      return false;
    }
    
    return true;
  });

  const handleCreateNote = (type) => {
    if (type === 'text') {
      setShowNewNoteModal(true);
    } else if (type === 'audio') {
      handleStartRecording();
    } else if (type === 'document') {
      fileInputRef.current?.click();
    } else if (type === 'video') {
      toast.success('Video recording feature coming soon!');
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success('🎤 Recording started...');
    
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      const audioNote = {
        title: `Voice Note - ${new Date().toLocaleTimeString()}`,
        type: 'audio',
        originalContent: 'Audio content transcription would appear here...',
        brandId: selectedBrand === 'all' ? brands[0]?.id : selectedBrand,
        platforms: [],
        status: 'draft',
        duration: '0:45'
      };
      addContent(audioNote);
      toast.success('🎵 Voice note saved!');
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const documentNote = {
        title: file.name,
        type: 'document',
        originalContent: `Document: ${file.name} (${(file.size / 1024).toFixed(1)}KB)`,
        brandId: selectedBrand === 'all' ? brands[0]?.id : selectedBrand,
        platforms: [],
        status: 'draft',
        fileType: file.type
      };
      addContent(documentNote);
      toast.success('📄 Document uploaded!');
    }
  };

  const handleSaveTextNote = () => {
    if (!newNoteContent.trim()) return;
    
    const textNote = {
      title: newNoteContent.split('\n')[0].substring(0, 50) || 'Untitled Note',
      type: 'text',
      originalContent: newNoteContent,
      brandId: selectedBrand === 'all' ? brands[0]?.id : selectedBrand,
      platforms: [],
      status: 'draft'
    };
    
    addContent(textNote);
    setNewNoteContent('');
    setShowNewNoteModal(false);
    toast.success('📝 Note saved!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeIcon = (content) => {
    const type = NOTE_TYPES.find(t => t.id === content.type) || NOTE_TYPES[0];
    return type;
  };

  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navigation />
      
      <div className="pt-16">
        {/* Header Section */}
        <div className="bg-white border-b border-neutral-border">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-h1 font-bold text-text-primary mb-1">Your Notes</h1>
                <p className="text-text-muted">Capture ideas, transform into content</p>
              </div>
              
              {/* Quick Add Buttons */}
              <div className="flex items-center space-x-2">
                {NOTE_TYPES.map((type) => (
                  <BubbleButton
                    key={type.id}
                    variant={isRecording && type.id === 'audio' ? 'danger' : 'secondary'}
                    size="sm"
                    onClick={() => handleCreateNote(type.id)}
                    disabled={isRecording && type.id !== 'audio'}
                  >
                    <SafeIcon 
                      icon={isRecording && type.id === 'audio' ? FiPause : type.icon} 
                      className="w-4 h-4 mr-1" 
                    />
                    {isRecording && type.id === 'audio' ? 'Recording...' : type.label}
                  </BubbleButton>
                ))}
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Filter Type */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-muted">Filter by:</span>
                  <div className="flex rounded-lg border border-neutral-border overflow-hidden">
                    {[
                      { id: 'date', label: 'Date', icon: FiCalendar },
                      { id: 'brand', label: 'Brand', icon: FiBrand },
                      { id: 'platform', label: 'Platform', icon: FiGrid }
                    ].map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center space-x-1 ${
                          selectedFilter === filter.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-text-muted hover:bg-gray-50'
                        }`}
                      >
                        <SafeIcon icon={filter.icon} className="w-3 h-3" />
                        <span>{filter.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Filter Options */}
                {selectedFilter === 'date' && (
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-1.5 border border-neutral-border rounded-lg text-sm focus-ring"
                  />
                )}

                {selectedFilter === 'brand' && brands.length > 0 && (
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="px-3 py-1.5 border border-neutral-border rounded-lg text-sm focus-ring"
                  >
                    <option value="all">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                )}

                {selectedFilter === 'platform' && (
                  <div className="flex space-x-1">
                    {PLATFORMS.map(platform => (
                      <button
                        key={platform.id}
                        onClick={() => setSelectedPlatform(platform.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center space-x-1 ${
                          selectedPlatform === platform.id
                            ? platform.color
                            : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                        }`}
                      >
                        <span>{platform.icon}</span>
                        <span>{platform.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-neutral-border rounded-lg text-sm focus-ring w-64"
                  />
                </div>

                {/* View Mode */}
                <div className="flex rounded-lg border border-neutral-border overflow-hidden">
                  {[
                    { id: 'grid', icon: FiGrid },
                    { id: 'list', icon: FiList }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={`p-2 transition-colors ${
                        viewMode === mode.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-text-muted hover:bg-gray-50'
                      }`}
                    >
                      <SafeIcon icon={mode.icon} className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {filteredContent.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-a rounded-3xl flex items-center justify-center mx-auto mb-6">
                <SafeIcon icon={FiEdit3} className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {searchQuery ? 'No notes found' : 'Start your first note'}
              </h3>
              <p className="text-text-muted max-w-md mx-auto mb-8">
                {searchQuery 
                  ? `No notes match your search for "${searchQuery}"`
                  : selectedFilter === 'date'
                    ? `No notes for ${formatDate(selectedDate)}. Capture your ideas to get started.`
                    : 'Capture your thoughts, ideas, and inspiration. Transform them into engaging content.'
                }
              </p>
              {!searchQuery && (
                <div className="flex justify-center space-x-3">
                  {NOTE_TYPES.slice(0, 2).map((type) => (
                    <BubbleButton
                      key={type.id}
                      variant="primary"
                      onClick={() => handleCreateNote(type.id)}
                    >
                      <SafeIcon icon={type.icon} className="w-4 h-4 mr-2" />
                      {type.label}
                    </BubbleButton>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              <AnimatePresence>
                {filteredContent.map((content, index) => {
                  const typeInfo = getTypeIcon(content);
                  const brand = brands.find(b => b.id === content.brandId);
                  
                  return (
                    <motion.div
                      key={content.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        hover 
                        className={`p-5 ${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}
                        onClick={() => navigate('/content-creator')}
                      >
                        <div className={`${viewMode === 'grid' ? 'space-y-4' : 'flex-1 flex items-center space-x-4'}`}>
                          {/* Header */}
                          <div className={`${viewMode === 'grid' ? 'flex items-start justify-between' : 'flex items-center space-x-3'}`}>
                            <div className={`${viewMode === 'list' ? 'flex items-center space-x-3' : ''}`}>
                              <div className={`w-10 h-10 ${typeInfo.color} rounded-xl flex items-center justify-center`}>
                                <SafeIcon icon={typeInfo.icon} className="w-5 h-5 text-white" />
                              </div>
                              
                              {viewMode === 'grid' ? (
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-text-muted">{formatDate(content.createdAt)}</span>
                                  <span className="w-1 h-1 bg-text-muted rounded-full"></span>
                                  <span className="text-xs text-text-muted">{content.type}</span>
                                </div>
                              ) : (
                                <div>
                                  <h4 className="font-semibold text-text-primary">{content.title}</h4>
                                  <div className="flex items-center space-x-2 text-xs text-text-muted">
                                    <span>{formatDate(content.createdAt)}</span>
                                    <span>•</span>
                                    <span>{content.type}</span>
                                    {content.duration && (
                                      <>
                                        <span>•</span>
                                        <span>{content.duration}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <button className="p-1 text-text-muted hover:text-text-primary transition-colors">
                              <SafeIcon icon={FiMoreHorizontal} className="w-4 h-4" />
                            </button>
                          </div>

                          {viewMode === 'grid' && (
                            <>
                              {/* Title */}
                              <h4 className="font-semibold text-text-primary leading-tight">
                                {content.title}
                              </h4>

                              {/* Content Preview */}
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-text-muted line-clamp-3">
                                  {content.originalContent}
                                </p>
                              </div>

                              {/* Footer */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  {brand && <BrandBadge brand={brand} />}
                                  {content.platforms?.length > 0 && (
                                    <div className="flex space-x-1">
                                      {content.platforms.slice(0, 2).map(platform => {
                                        const platformInfo = PLATFORMS.find(p => p.id === platform);
                                        return platformInfo ? (
                                          <span key={platform} className="text-xs">
                                            {platformInfo.icon}
                                          </span>
                                        ) : null;
                                      })}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  {content.type === 'audio' && (
                                    <button className="p-1 text-primary-600 hover:text-primary-700">
                                      <SafeIcon icon={FiPlay} className="w-3 h-3" />
                                    </button>
                                  )}
                                  <button className="p-1 text-text-muted hover:text-text-primary">
                                    <SafeIcon icon={FiShare2} className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </>
                          )}

                          {viewMode === 'list' && (
                            <div className="flex-1 flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-sm text-text-muted line-clamp-1 max-w-md">
                                  {content.originalContent}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                {brand && <BrandBadge brand={brand} />}
                                <div className="flex items-center space-x-1">
                                  {content.type === 'audio' && (
                                    <button className="p-1 text-primary-600 hover:text-primary-700">
                                      <SafeIcon icon={FiPlay} className="w-3 h-3" />
                                    </button>
                                  )}
                                  <button className="p-1 text-text-muted hover:text-text-primary">
                                    <SafeIcon icon={FiShare2} className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* New Note Modal */}
      <AnimatePresence>
        {showNewNoteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl"
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">New Note</h3>
                  <button
                    onClick={() => setShowNewNoteModal(false)}
                    className="p-1 text-text-muted hover:text-text-primary"
                  >
                    <SafeIcon icon={FiPlus} className="w-4 h-4 transform rotate-45" />
                  </button>
                </div>
                
                <textarea
                  placeholder="Start writing your note..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-neutral-border rounded-xl focus-ring resize-none mb-4"
                  autoFocus
                />
                
                <div className="flex justify-end space-x-3">
                  <BubbleButton
                    variant="ghost"
                    onClick={() => setShowNewNoteModal(false)}
                  >
                    Cancel
                  </BubbleButton>
                  <BubbleButton
                    variant="primary"
                    onClick={handleSaveTextNote}
                    disabled={!newNoteContent.trim()}
                  >
                    Save Note
                  </BubbleButton>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.md"
      />
    </div>
  );
};

export default Dashboard;