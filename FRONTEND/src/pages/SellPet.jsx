import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, Heart, MapPin, Calendar, DollarSign, Tag, FileText, CheckCircle } from 'lucide-react';
import { petAPI } from '../services/api';

const SellPet = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dog',
    breed: '',
    age: '',
    price: '',
    image: '',
    description: '',
    location: '',
    traits: [],
    vaccinated: false,
    spayedNeutered: false,
    houseTrained: false
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Handle image preview
    if (name === 'image' && value) {
      setImagePreview(value);
    }
  };

  const handleTraitToggle = (trait) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.includes(trait)
        ? prev.traits.filter(t => t !== trait)
        : [...prev.traits, trait]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare data for API
      const petData = {
        name: formData.name,
        category: formData.category,
        breed: formData.breed,
        age: formData.age,
        gender: 'Male', // You can add gender selection to form
        size: 'Medium', // You can add size selection to form
        price: parseInt(formData.price) || 0,
        images: formData.image ? [formData.image] : [],
        description: formData.description,
        location: formData.location,
        traits: formData.traits,
        healthInfo: {
          vaccinated: formData.vaccinated,
          spayedNeutered: formData.spayedNeutered,
          houseTrained: formData.houseTrained,
          specialNeeds: ''
        },
        contact: {
          name: 'Pet Owner', // You can add contact form fields
          email: 'owner@example.com',
          phone: '(555) 123-4567',
          organization: ''
        }
      };

      const response = await petAPI.createPet(petData);
      
      // Show success message
      alert('🎉 Pet listed successfully! Your furry friend will find a loving home soon.');
      navigate('/');
    } catch (err) {
      console.error('Error creating pet:', err);
      alert('❌ Failed to list pet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Info', icon: Tag },
    { number: 2, title: 'Details', icon: FileText },
    { number:3, title: 'Photos', icon: Camera },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  const availableTraits = [
    'Friendly', 'Energetic', 'Calm', 'Playful', 'Loyal', 'Independent',
    'Good with Kids', 'Good with Pets', 'House Trained', 'Protective'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🏠 Find a Loving Home for Your Pet
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help your beloved companion find their perfect forever family
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center items-center space-x-4 md:space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${
                    index < steps.length - 1 ? 'mr-4 md:mr-8' : ''
                  }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-indigo-600 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-medium mt-2 ${
                      isActive ? 'text-indigo-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-16 h-0.5 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <Tag className="w-6 h-6 mr-3 text-indigo-600" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pet Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Buddy, Luna, Max"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    >
                      <option value="Dog">🐕 Dog</option>
                      <option value="Cat">🐱 Cat</option>
                      <option value="Bird">🐦 Bird</option>
                      <option value="Rabbit">🐰 Rabbit</option>
                      <option value="Other">🐾 Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Breed
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      placeholder="e.g. Golden Retriever, Mixed"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 2 years, 6 months"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Price (Leave 0 for free adoption)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Downtown Shelter, City Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-indigo-600" />
                  Pet Details
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your pet's personality, habits, and what makes them special..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Personality Traits
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {availableTraits.map(trait => (
                        <button
                          key={trait}
                          type="button"
                          onClick={() => handleTraitToggle(trait)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            formData.traits.includes(trait)
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {trait}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Health & Training Status
                    </label>
                    <div className="space-y-3">
                      {[
                        { key: 'vaccinated', label: '💉 Up to date on vaccinations' },
                        { key: 'spayedNeutered', label: '🏥 Spayed/Neutered' },
                        { key: 'houseTrained', label: '🏠 House trained' }
                      ].map(item => (
                        <label key={item.key} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name={item.key}
                            checked={formData[item.key]}
                            onChange={handleChange}
                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                          />
                          <span className="text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photos */}
            {currentStep === 3 && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-indigo-600" />
                  Add Photos
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pet Photo URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/pet-photo.jpg"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  {imagePreview && (
                    <div className="mt-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Preview
                      </label>
                      <div className="relative w-full max-w-md mx-auto">
                        <img
                          src={imagePreview}
                          alt="Pet preview"
                          className="w-full h-64 object-cover rounded-xl shadow-lg"
                          onError={() => setImagePreview('')}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <Camera className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Photo Tips</h3>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Use high-quality, well-lit photos</li>
                          <li>• Show your pet's face clearly</li>
                          <li>• Include photos of them playing or being happy</li>
                          <li>• Avoid blurry or dark images</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-indigo-600" />
                  Review & Submit
                </h2>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {imagePreview && (
                      <div>
                        <img
                          src={imagePreview}
                          alt={formData.name}
                          className="w-full h-48 object-cover rounded-xl shadow-lg"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{formData.name}</h3>
                        <p className="text-gray-600">{formData.breed} • {formData.age}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {formData.category}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {formData.price > 0 ? `$${formData.price}` : 'Free'}
                        </span>
                      </div>
                      
                      <p className="text-gray-700">{formData.description}</p>
                      
                      {formData.traits.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Traits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.traits.map(trait => (
                              <span key={trait} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm">
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-2">Ready to Find a Home!</h3>
                      <p className="text-sm text-green-700">
                        Your pet listing will be reviewed and published within 24 hours. 
                        We'll help connect your beloved companion with their perfect forever family.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="bg-gray-50 px-8 md:px-12 py-6 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={currentStep === 1}
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>List My Pet</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPet;