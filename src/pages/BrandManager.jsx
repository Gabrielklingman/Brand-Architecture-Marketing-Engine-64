import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { useBrandStore } from '../stores/brandStore';
import { CORE_TONES, REFINED_TONES, AVATAR_VALUE_PAIRS } from '../data/toneProfiles';

const { FiArrowLeft, FiEdit, FiTrash2, FiPlus, FiSave, FiX } = FiIcons;

const BrandManager = () => {
  const navigate = useNavigate();
  const { brands, updateBrand, deleteBrand, setCurrentBrand } = useBrandStore();
  const [editingBrand, setEditingBrand] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditStart = (brand) => {
    setEditingBrand(brand.id);
    setEditForm({
      name: brand.name,
      audienceDescription: brand.audienceDescription,
      offers: [...(brand.offers || [])]
    });
  };

  const handleEditCancel = () => {
    setEditingBrand(null);
    setEditForm({});
  };

  const handleEditSave = () => {
    updateBrand(editingBrand, editForm);
    setEditingBrand(null);
    setEditForm({});
    toast.success('Brand updated successfully!');
  };

  const handleDelete = (brand) => {
    if (window.confirm(`Are you sure you want to delete "${brand.name}"? This action cannot be undone.`)) {
      deleteBrand(brand.id);
      toast.success('Brand deleted successfully!');
    }
  };

  const handleOfferUpdate = (index, field, value) => {
    setEditForm(prev => ({
      ...prev,
      offers: prev.offers.map((offer, i) => 
        i === index ? { ...offer, [field]: value } : offer
      )
    }));
  };

  const handleOfferAdd = () => {
    setEditForm(prev => ({
      ...prev,
      offers: [...prev.offers, { name: '', description: '', ctaUrl: '' }]
    }));
  };

  const handleOfferRemove = (index) => {
    setEditForm(prev => ({
      ...prev,
      offers: prev.offers.filter((_, i) => i !== index)
    }));
  };

  const getToneDisplayName = (brand) => {
    const allRefinedTones = Object.values(REFINED_TONES).flat();
    const refinedTone = allRefinedTones.find(t => t.id === brand.refinedTone);
    return refinedTone?.name || brand.refinedToneName || 'Unknown Tone';
  };

  const getValueDisplayNames = (brand) => {
    if (!brand.avatarValues) return [];
    
    return Object.entries(brand.avatarValues).map(([pairId, valueKey]) => {
      const pair = AVATAR_VALUE_PAIRS.find(p => p.id === pairId);
      const value = pair?.leftValue.key === valueKey ? pair.leftValue : pair?.rightValue;
      return value?.label || 'Unknown Value';
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
              >
                <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Brand Manager</h1>
                <p className="text-sm text-gray-600">Manage your brand profiles and settings</p>
              </div>
            </div>
            
            <Button onClick={() => navigate('/brand-setup')}>
              <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
              Add New Brand
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {brands.length === 0 ? (
          <Card className="p-12 text-center">
            <SafeIcon icon={FiPlus} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Brands Yet</h3>
            <p className="text-gray-600 mb-6">Create your first brand to start generating content.</p>
            <Button onClick={() => navigate('/brand-setup')}>
              Create Your First Brand
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  {editingBrand === brand.id ? (
                    // Edit Mode
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Edit Brand</h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleEditCancel}
                          >
                            <SafeIcon icon={FiX} className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleEditSave}
                          >
                            <SafeIcon icon={FiSave} className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Input
                            label="Brand Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tone Profile
                          </label>
                          <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-600">
                            {getToneDisplayName(brand)}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            To change tone, create a new brand
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Textarea
                          label="Audience Description"
                          value={editForm.audienceDescription}
                          onChange={(e) => setEditForm(prev => ({ ...prev, audienceDescription: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Offers
                          </label>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleOfferAdd}
                          >
                            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-1" />
                            Add Offer
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {editForm.offers?.map((offer, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-gray-900">Offer {index + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOfferRemove(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                                </Button>
                              </div>
                              
                              <Input
                                placeholder="Offer name"
                                value={offer.name}
                                onChange={(e) => handleOfferUpdate(index, 'name', e.target.value)}
                              />
                              
                              <Textarea
                                placeholder="Brief description"
                                value={offer.description}
                                onChange={(e) => handleOfferUpdate(index, 'description', e.target.value)}
                                rows={2}
                              />
                              
                              <Input
                                placeholder="CTA URL (optional)"
                                value={offer.ctaUrl}
                                onChange={(e) => handleOfferUpdate(index, 'ctaUrl', e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                          <p className="text-sm text-gray-500">
                            Created {new Date(brand.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setCurrentBrand(brand)}
                          >
                            Set as Active
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEditStart(brand)}
                          >
                            <SafeIcon icon={FiEdit} className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(brand)}
                          >
                            <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Tone Profile</h4>
                          <p className="text-sm text-gray-600">{getToneDisplayName(brand)}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Target Audience</h4>
                          <p className="text-sm text-gray-600">{brand.audienceDescription}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Audience Values</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            {getValueDisplayNames(brand).map((value, index) => (
                              <div key={index}>• {value}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {brand.offers && brand.offers.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-900 mb-3">Offers ({brand.offers.length})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {brand.offers.map((offer, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-4">
                                <h5 className="font-medium text-gray-900">{offer.name}</h5>
                                {offer.description && (
                                  <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                                )}
                                {offer.ctaUrl && (
                                  <a 
                                    href={offer.ctaUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block"
                                  >
                                    {offer.ctaUrl}
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandManager;