import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ProgressStepper from '../components/layout/ProgressStepper';
import BubbleSelect from '../components/ui/BubbleSelect';
import TonePreviewCard from '../components/ui/TonePreviewCard';
import ValuePairCard from '../components/ui/ValuePairCard';
import BubbleButton from '../components/ui/BubbleButton';
import Card from '../components/ui/Card';
import { CORE_TONES, REFINED_TONES, AVATAR_VALUE_PAIRS } from '../data/toneProfiles';
import { useBrandStore } from '../stores/brandStore';

const STEPS = [
  { id: 'brand-name', title: 'Brand Name', subtitle: 'Your identity' },
  { id: 'core-tone', title: 'Core Tone', subtitle: 'Your voice' },
  { id: 'refined-tone', title: 'Style', subtitle: 'Your approach' },
  { id: 'audience', title: 'Audience', subtitle: 'Who you serve' },
  { id: 'values', title: 'Values', subtitle: 'What matters' },
  { id: 'offers', title: 'Offers', subtitle: 'What you sell' },
  { id: 'complete', title: 'Complete', subtitle: 'Ready to go' }
];

const BrandSetup = () => {
  const navigate = useNavigate();
  const { addBrand } = useBrandStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: '',
    coreTones: [],
    refinedTone: '',
    audienceDescription: '',
    avatarValues: {},
    offers: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.brandName.trim()) {
          toast.error('Please enter a brand name');
          return false;
        }
        break;
      case 2:
        if (formData.coreTones.length === 0) {
          toast.error('Please select at least one core tone');
          return false;
        }
        break;
      case 3:
        if (!formData.refinedTone) {
          toast.error('Please select a refined tone style');
          return false;
        }
        break;
      case 4:
        if (!formData.audienceDescription.trim()) {
          toast.error('Please describe your target audience');
          return false;
        }
        break;
      case 5:
        if (Object.keys(formData.avatarValues).length < AVATAR_VALUE_PAIRS.length) {
          toast.error('Please make a selection for each value pair');
          return false;
        }
        break;
    }
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const selectedRefinedTone = getAllRefinedTones().find(t => t.id === formData.refinedTone);
      
      const brandData = {
        name: formData.brandName,
        coreTones: formData.coreTones,
        refinedTone: formData.refinedTone,
        refinedToneName: selectedRefinedTone?.name || '',
        toneRules: selectedRefinedTone?.rules || [],
        audienceDescription: formData.audienceDescription,
        avatarValues: formData.avatarValues,
        offers: formData.offers
      };
      
      const newBrand = addBrand(brandData);
      
      // Success animation and redirect
      toast.success(`🎉 Brand "${newBrand.name}" created successfully!`);
      
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      toast.error('Failed to create brand. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAllRefinedTones = () => {
    return formData.coreTones.flatMap(coreId => REFINED_TONES[coreId] || []);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold gradient-text">
                Let's Create Your Brand
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Start by giving your brand a name that represents your unique voice and personality.
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Card className="p-8">
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-text-primary">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., SoloWriter Co."
                    value={formData.brandName}
                    onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                    className="w-full px-4 py-3 text-center text-lg border border-neutral-border rounded-xl focus-ring"
                  />
                  <p className="text-sm text-text-muted text-center">
                    This will be your content identity across all platforms
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold text-text-primary">
                Choose Your Core Voice
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Select one or more tones that represent how you want to communicate with your audience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CORE_TONES.map((tone, index) => (
                <motion.div
                  key={tone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    hover
                    selected={formData.coreTones.includes(tone.id)}
                    onClick={() => {
                      const newTones = formData.coreTones.includes(tone.id)
                        ? formData.coreTones.filter(id => id !== tone.id)
                        : [...formData.coreTones, tone.id];
                      setFormData(prev => ({ 
                        ...prev, 
                        coreTones: newTones,
                        refinedTone: '' // Reset refined tone
                      }));
                    }}
                    className="p-6 text-center"
                  >
                    <div className="space-y-4">
                      <div className="text-4xl">{tone.icon}</div>
                      <h3 className="font-semibold text-text-primary">{tone.name}</h3>
                      <p className="text-sm text-text-muted">{tone.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        const availableRefinedTones = getAllRefinedTones();
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold text-text-primary">
                Refine Your Style
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Based on your core tone selection, choose the specific style that best matches your brand.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableRefinedTones.map((tone, index) => (
                <TonePreviewCard
                  key={tone.id}
                  tone={tone}
                  selected={formData.refinedTone === tone.id}
                  onSelect={(toneId) => setFormData(prev => ({ ...prev, refinedTone: toneId }))}
                />
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold text-text-primary">
                Describe Your Audience
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Help us understand who you're creating content for so we can tailor your voice perfectly.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <div className="space-y-6">
                  <label className="block text-sm font-semibold text-text-primary">
                    Ideal Audience Description
                  </label>
                  <textarea
                    placeholder="e.g., A beginner writer trying to build a writing habit while growing an audience. They're motivated but often feel overwhelmed by all the advice out there..."
                    value={formData.audienceDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, audienceDescription: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-border rounded-xl focus-ring resize-none"
                  />
                  <p className="text-sm text-text-muted">
                    Be specific about their challenges, goals, and current situation
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold text-text-primary">
                Define Your Audience's Values
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Based on your audience description, select the values that best represent what they care about most.
              </p>
            </div>
            
            <div className="space-y-8">
              {AVATAR_VALUE_PAIRS.map((pair, index) => (
                <ValuePairCard
                  key={pair.id}
                  pair={pair}
                  selectedValue={formData.avatarValues[pair.id]}
                  onSelect={(pairId, valueKey) => {
                    setFormData(prev => ({
                      ...prev,
                      avatarValues: { ...prev.avatarValues, [pairId]: valueKey }
                    }));
                  }}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-h1 font-bold text-text-primary">
                Add Your Offers
              </h1>
              <p className="text-lg text-text-muted max-w-2xl mx-auto">
                Add products or services you want to promote in your content. This is optional but helps with CTA generation.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {formData.offers.map((offer, index) => (
                <Card key={index} className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-text-primary">Offer {index + 1}</h4>
                      <BubbleButton
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            offers: prev.offers.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        Remove
                      </BubbleButton>
                    </div>
                    <input
                      type="text"
                      placeholder="Offer name (e.g., 30-Day Writing Sprint)"
                      value={offer.name}
                      onChange={(e) => {
                        const newOffers = [...formData.offers];
                        newOffers[index] = { ...newOffers[index], name: e.target.value };
                        setFormData(prev => ({ ...prev, offers: newOffers }));
                      }}
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus-ring"
                    />
                    <textarea
                      placeholder="Brief description of the offer"
                      value={offer.description}
                      onChange={(e) => {
                        const newOffers = [...formData.offers];
                        newOffers[index] = { ...newOffers[index], description: e.target.value };
                        setFormData(prev => ({ ...prev, offers: newOffers }));
                      }}
                      rows={2}
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus-ring resize-none"
                    />
                    <input
                      type="url"
                      placeholder="CTA URL (optional)"
                      value={offer.ctaUrl}
                      onChange={(e) => {
                        const newOffers = [...formData.offers];
                        newOffers[index] = { ...newOffers[index], ctaUrl: e.target.value };
                        setFormData(prev => ({ ...prev, offers: newOffers }));
                      }}
                      className="w-full px-4 py-2 border border-neutral-border rounded-xl focus-ring"
                    />
                  </div>
                </Card>
              ))}
              
              <BubbleButton
                variant="secondary"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    offers: [...prev.offers, { name: '', description: '', ctaUrl: '' }]
                  }));
                }}
                className="w-full"
              >
                + Add Offer
              </BubbleButton>
            </div>
          </motion.div>
        );

      case 7:
        const selectedRefinedTone = getAllRefinedTones().find(t => t.id === formData.refinedTone);
        const selectedCoreToneNames = formData.coreTones
          .map(id => CORE_TONES.find(t => t.id === id)?.name)
          .filter(Boolean);
        
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-h1 font-bold gradient-text">
                  🎉 Brand Setup Complete!
                </h1>
              </motion.div>
              <p className="text-lg text-text-muted">
                Your brand is ready to create amazing content. Review your configuration below.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card gradient className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Brand Name</h3>
                    <p className="text-text-muted">{formData.brandName}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Tone Profile</h3>
                    <p className="text-text-muted">
                      {selectedRefinedTone?.name}
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      Core: {selectedCoreToneNames.join(', ')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Target Audience</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {formData.audienceDescription}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">Audience Values</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.avatarValues).map(([pairId, valueKey]) => {
                      const pair = AVATAR_VALUE_PAIRS.find(p => p.id === pairId);
                      const value = pair?.leftValue.key === valueKey ? pair.leftValue : pair?.rightValue;
                      return (
                        <span key={pairId} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                          {value?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                {formData.offers.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">
                      Offers ({formData.offers.length})
                    </h3>
                    <div className="space-y-2">
                      {formData.offers.map((offer, index) => (
                        <div key={index} className="text-sm text-text-muted">
                          • {offer.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <ProgressStepper 
          currentStep={currentStep} 
          totalSteps={STEPS.length} 
          steps={STEPS}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[500px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <BubbleButton
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </BubbleButton>
          
          <div className="flex items-center space-x-4">
            {currentStep < STEPS.length && (
              <BubbleButton
                variant="ghost"
                onClick={() => navigate('/')}
              >
                Skip Setup
              </BubbleButton>
            )}
            
            {currentStep === STEPS.length ? (
              <BubbleButton
                variant="primary"
                onClick={handleSubmit}
                loading={isSubmitting}
                size="lg"
              >
                Launch Brand
              </BubbleButton>
            ) : (
              <BubbleButton
                variant="primary"
                onClick={handleNext}
                size="lg"
              >
                Continue
              </BubbleButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSetup;