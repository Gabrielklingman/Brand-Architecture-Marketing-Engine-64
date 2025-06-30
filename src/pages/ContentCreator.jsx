import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Navigation from '../components/layout/Navigation';
import BubbleButton from '../components/ui/BubbleButton';
import Card from '../components/ui/Card';
import ContentCard from '../components/ui/ContentCard';
import BrandBadge from '../components/ui/BrandBadge';
import { useBrandStore } from '../stores/brandStore';
import { useContentStore } from '../stores/contentStore';

const { FiArrowLeft, FiZap, FiEdit, FiSend, FiUpload } = FiIcons;

const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: '📷', maxLength: 2200, color: 'bg-pink-100 text-pink-600' },
  { id: 'twitter', name: 'Twitter/X', icon: '🐦', maxLength: 280, color: 'bg-blue-100 text-blue-600' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', maxLength: 3000, color: 'bg-blue-100 text-blue-700' },
  { id: 'facebook', name: 'Facebook', icon: '👥', maxLength: 63206, color: 'bg-blue-100 text-blue-800' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', maxLength: 300, color: 'bg-red-100 text-red-600' },
  { id: 'youtube', name: 'YouTube', icon: '📺', maxLength: 5000, color: 'bg-red-100 text-red-700' }
];

const ContentCreator = () => {
  const navigate = useNavigate();
  const { brands, currentBrand, setCurrentBrand } = useBrandStore();
  const { addContent } = useContentStore();
  
  const [selectedBrand, setSelectedBrand] = useState(currentBrand || brands[0]);
  const [originalContent, setOriginalContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['instagram']);
  const [generatedContent, setGeneratedContent] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(null);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setCurrentBrand(brand);
  };

  const generateContent = async () => {
    if (!originalContent.trim()) {
      toast.error('Please enter some content to transform');
      return;
    }

    if (!selectedBrand) {
      toast.error('Please select a brand first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const results = {};
      
      // Add AI suggestion notification
      toast.success('✨ AI is crafting your content...');
      
      for (const platformId of selectedPlatforms) {
        const platform = PLATFORMS.find(p => p.id === platformId);
        const generatedText = await simulateAIGeneration(originalContent, selectedBrand, platform);
        
        results[platformId] = {
          content: generatedText,
          platform: platform.name,
          characterCount: generatedText.length,
          maxLength: platform.maxLength
        };
      }
      
      setGeneratedContent(results);
      toast.success('🎉 Content generated successfully!');
      
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const simulateAIGeneration = async (content, brand, platform) => {
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    const toneModifiers = {
      'tactical-minimalist': 'Direct and actionable',
      'friendly-guide': 'Warm and supportive',
      'executive-advisor': 'Professional and strategic',
      'vulnerable-narrator': 'Personal and story-driven',
      'unfiltered-truth': 'Bold and uncompromising',
      'contrarian-catalyst': 'Provocative and debate-sparking'
    };
    
    let generatedContent = content;
    
    if (brand.refinedTone === 'tactical-minimalist') {
      generatedContent = content.split('.').map(sentence => 
        sentence.trim() ? `• ${sentence.trim()}.` : ''
      ).filter(Boolean).join('\n');
    } else if (brand.refinedTone === 'friendly-guide') {
      generatedContent = `Hey there! 👋\n\n${content}\n\nHope this helps! 💪`;
    } else if (platform.id === 'instagram') {
      generatedContent = `${content}\n\n✨ What's your take on this?\n\n#contentcreation #solopreneur #growth`;
    }
    
    if (generatedContent.length > platform.maxLength) {
      generatedContent = generatedContent.substring(0, platform.maxLength - 3) + '...';
    }
    
    return generatedContent;
  };

  const handleCopyContent = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('📋 Content copied to clipboard!');
  };

  const handleRegenerateContent = async (platformId) => {
    setIsGenerating(true);
    toast.success('✨ Regenerating with fresh AI perspective...');
    
    setTimeout(async () => {
      const platform = PLATFORMS.find(p => p.id === platformId);
      const newContent = await simulateAIGeneration(originalContent, selectedBrand, platform);
      
      setGeneratedContent(prev => ({
        ...prev,
        [platformId]: {
          ...prev[platformId],
          content: newContent,
          characterCount: newContent.length
        }
      }));
      
      setIsGenerating(false);
      toast.success('🔄 Content regenerated!');
    }, 1500);
  };

  const saveContent = () => {
    const contentData = {
      brandId: selectedBrand.id,
      originalContent,
      generatedContent,
      platforms: selectedPlatforms,
      title: originalContent.split('\n')[0].substring(0, 50) + '...'
    };
    
    addContent(contentData);
    toast.success('💾 Content saved successfully!');
  };

  if (brands.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-bg">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <Card className="p-12 text-center max-w-md">
            <div className="w-16 h-16 bg-gradient-a rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SafeIcon icon={FiEdit} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary mb-4">No Brands Found</h2>
            <p className="text-text-muted mb-6">You need to create a brand before generating content.</p>
            <BubbleButton onClick={() => navigate('/brand-setup')}>
              Create Your First Brand
            </BubbleButton>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-bg">
      <Navigation />
      
      <div className="pt-20 max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-h1 font-bold gradient-text mb-2">Content Creator</h1>
              <p className="text-text-muted">Transform your ideas into platform-optimized content</p>
            </div>
            
            {/* Brand Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-text-muted">Active Brand:</span>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <BrandBadge
                    key={brand.id}
                    brand={brand}
                    active={selectedBrand?.id === brand.id}
                    onClick={() => handleBrandSelect(brand)}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Raw Content Input */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Raw Content</h3>
              
              <div className="space-y-4">
                <textarea
                  placeholder="Enter your raw content, ideas, or thoughts here..."
                  value={originalContent}
                  onChange={(e) => setOriginalContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-neutral-border rounded-xl focus-ring resize-none"
                />
                
                <div className="flex items-center justify-between text-sm text-text-muted">
                  <span>{originalContent.length} characters</span>
                  <BubbleButton variant="ghost" size="sm">
                    <SafeIcon icon={FiUpload} className="w-4 h-4 mr-1" />
                    Upload
                  </BubbleButton>
                </div>
              </div>
            </Card>

            {/* Platform Selection */}
            <Card className="p-6">
              <h4 className="font-semibold text-text-primary mb-4">Target Platforms</h4>
              <div className="grid grid-cols-2 gap-3">
                {PLATFORMS.map(platform => (
                  <label 
                    key={platform.id} 
                    className="flex items-center space-x-3 cursor-pointer p-3 rounded-xl border border-neutral-border hover:bg-primary-50/50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(platform.id)}
                      onChange={() => {
                        setSelectedPlatforms(prev => 
                          prev.includes(platform.id)
                            ? prev.filter(id => id !== platform.id)
                            : [...prev, platform.id]
                        );
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-lg">{platform.icon}</span>
                    <div>
                      <span className="text-sm font-medium text-text-primary block">{platform.name}</span>
                      <span className="text-xs text-text-muted">{platform.maxLength} chars</span>
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Generate Button */}
            <BubbleButton
              variant="primary"
              onClick={generateContent}
              loading={isGenerating}
              disabled={!originalContent.trim() || selectedPlatforms.length === 0}
              className="w-full"
              size="lg"
            >
              <SafeIcon icon={FiZap} className="w-5 h-5 mr-2" />
              Generate Content
            </BubbleButton>
          </motion.div>

          {/* Generated Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {Object.keys(generatedContent).length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="w-16 h-16 bg-gradient-b rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <SafeIcon icon={FiEdit} className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Ready to Generate</h3>
                  <p className="text-text-muted max-w-md mx-auto">
                    Enter your content and select platforms to get started with AI-powered content generation.
                  </p>
                </Card>
              ) : (
                <>
                  {selectedPlatforms.map(platformId => {
                    const content = generatedContent[platformId];
                    const platform = PLATFORMS.find(p => p.id === platformId);
                    
                    if (!content) return null;
                    
                    return (
                      <ContentCard
                        key={platformId}
                        content={content}
                        platform={platform}
                        onCopy={() => handleCopyContent(content.content)}
                        onRegenerate={() => handleRegenerateContent(platformId)}
                        onAddCTA={() => setShowCTAModal(platformId)}
                        onEdit={() => {}}
                      />
                    );
                  })}
                  
                  {/* Save Button */}
                  <div className="flex justify-center pt-6">
                    <BubbleButton onClick={saveContent} size="lg">
                      <SafeIcon icon={FiSend} className="w-5 h-5 mr-2" />
                      Save All Content
                    </BubbleButton>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Modal */}
      {showCTAModal && selectedBrand?.offers && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Add Call to Action</h3>
              <div className="space-y-3">
                {selectedBrand.offers.map((offer, index) => (
                  <BubbleButton
                    key={index}
                    variant="secondary"
                    className="w-full justify-start"
                    onClick={() => {
                      // Insert CTA logic here
                      setShowCTAModal(null);
                      toast.success(`CTA for "${offer.name}" added!`);
                    }}
                  >
                    {offer.name}
                  </BubbleButton>
                ))}
              </div>
              <BubbleButton
                variant="ghost"
                className="w-full mt-4"
                onClick={() => setShowCTAModal(null)}
              >
                Cancel
              </BubbleButton>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContentCreator;