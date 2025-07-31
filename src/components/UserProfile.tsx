'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { UserProfile as UserProfileType, EventCategory, PriceRange, NYC_Borough, KidAgeGroup } from '@/types';

interface Props {
  onComplete: (profile: UserProfileType) => void;
}

export default function UserProfile({ onComplete }: Props) {
  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfileType>>({
    hasKids: false,
    kidAgeGroups: [],
    interests: [],
    budget: 'medium',
    preferredTime: 'any',
    transportMode: 'public',
    location: { borough: 'Manhattan' }
  });

  const categories: EventCategory[] = [
    'music', 'art', 'food', 'family', 'sports', 'outdoors', 
    'cultural', 'educational', 'nightlife', 'shopping'
  ];

  const boroughs: NYC_Borough[] = [
    'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'
  ];

  const ageGroups: { value: KidAgeGroup; label: string; description: string }[] = [
    { value: 'toddler', label: 'Toddler', description: '1-3 years' },
    { value: 'preschool', label: 'Preschool', description: '4-5 years' },
    { value: 'elementary', label: 'Elementary', description: '6-11 years' },
    { value: 'middle', label: 'Middle School', description: '12-14 years' },
    { value: 'high', label: 'High School', description: '15-18 years' },
  ];

  const getCardStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-white rounded-3xl shadow-lg border border-gray-100 p-10 hover:shadow-xl transition-all duration-300 hover-lift max-w-3xl mx-auto';
      case 'playful':
        return 'bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-purple-100 p-10 transform hover:scale-[1.02] transition-transform duration-200 max-w-3xl mx-auto';
      case 'minimal':
        return 'bg-white rounded-lg border border-gray-300 p-10 shadow-sm hover:shadow-md transition-all duration-200 max-w-3xl mx-auto';
      default:
        return 'bg-white rounded-3xl shadow-lg border border-gray-100 p-10 hover:shadow-xl transition-all duration-300 hover-lift max-w-3xl mx-auto';
    }
  };

  const getButtonStyles = (isPrimary = false, isSelected = false) => {
    const baseStyles = 'px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5';
    
    if (isPrimary) {
      switch (theme) {
        case 'airbnb':
          return `${baseStyles} bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl`;
        case 'playful':
          return `${baseStyles} bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg transform hover:scale-110`;
        case 'minimal':
          return `${baseStyles} bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl`;
        default:
          return `${baseStyles} bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl`;
      }
    }

    if (isSelected) {
      switch (theme) {
        case 'airbnb':
          return `${baseStyles} bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-400 text-rose-700 shadow-md hover:shadow-lg`;
        case 'playful':
          return `${baseStyles} bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-400 text-purple-700 transform scale-105 shadow-md`;
        case 'minimal':
          return `${baseStyles} bg-gray-200 border-2 border-black text-black shadow-md`;
        default:
          return `${baseStyles} bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-400 text-rose-700 shadow-md hover:shadow-lg`;
      }
    }

    switch (theme) {
      case 'airbnb':
        return `${baseStyles} bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md`;
      case 'playful':
        return `${baseStyles} bg-white/90 hover:bg-purple-50 text-purple-700 border-2 border-purple-200 hover:border-purple-300 backdrop-blur-sm shadow-sm`;
      case 'minimal':
        return `${baseStyles} bg-gray-50 hover:bg-gray-100 text-gray-700 border-2 border-gray-300 hover:border-gray-400 shadow-sm`;
      default:
        return `${baseStyles} bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md`;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(profile as UserProfileType);
    }
  };

  const handleInterestToggle = (interest: EventCategory) => {
    const interests = profile.interests || [];
    const newInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    setProfile({ ...profile, interests: newInterests });
  };

  const handleAgeGroupToggle = (ageGroup: KidAgeGroup) => {
    const kidAgeGroups = profile.kidAgeGroups || [];
    const newAgeGroups = kidAgeGroups.includes(ageGroup)
      ? kidAgeGroups.filter(g => g !== ageGroup)
      : [...kidAgeGroups, ageGroup];
    setProfile({ ...profile, kidAgeGroups: newAgeGroups });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Family Situation</h2>
              <p className="text-gray-600 text-lg">Let's start with who's joining your weekend adventures</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Do you have kids joining you?
                </label>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setProfile({ ...profile, hasKids: true })}
                    className={getButtonStyles(false, profile.hasKids === true)}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setProfile({ ...profile, hasKids: false })}
                    className={getButtonStyles(false, profile.hasKids === false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {profile.hasKids && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Age groups of your kids (select all that apply):
                  </label>
                  <div className="space-y-3">
                    {ageGroups.map((ageGroup) => (
                      <button
                        key={ageGroup.value}
                        onClick={() => handleAgeGroupToggle(ageGroup.value)}
                        className={getButtonStyles(false, profile.kidAgeGroups?.includes(ageGroup.value))}
                      >
                        <div className="text-left">
                          <div className="font-medium">{ageGroup.label}</div>
                          <div className="text-sm opacity-75">{ageGroup.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Interests</h2>
              <p className="text-gray-600 text-lg">What activities make your weekend perfect? Choose all that apply</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleInterestToggle(category)}
                  className={getButtonStyles(false, profile.interests?.includes(category))}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Preferences</h2>
              <p className="text-gray-600 text-lg">Help us tailor recommendations to your style and budget</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Budget preference:
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['free', 'low', 'medium', 'high'] as PriceRange[]).map((budget) => (
                    <button
                      key={budget}
                      onClick={() => setProfile({ ...profile, budget })}
                      className={getButtonStyles(false, profile.budget === budget)}
                    >
                      {budget === 'free' ? 'Free' : budget.charAt(0).toUpperCase() + budget.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Preferred time of day:
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['morning', 'afternoon', 'evening', 'any'] as const).map((time) => (
                    <button
                      key={time}
                      onClick={() => setProfile({ ...profile, preferredTime: time })}
                      className={getButtonStyles(false, profile.preferredTime === time)}
                    >
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Location & Transport</h2>
              <p className="text-gray-600 text-lg">Where in NYC would you like to explore and how do you prefer to get around?</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Preferred NYC borough:
                </label>
                <div className="flex flex-wrap gap-3">
                  {boroughs.map((borough) => (
                    <button
                      key={borough}
                      onClick={() => setProfile({ 
                        ...profile, 
                        location: { ...profile.location, borough } 
                      })}
                      className={getButtonStyles(false, profile.location?.borough === borough)}
                    >
                      {borough}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  How do you prefer to get around?
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['walking', 'public', 'car'] as const).map((transport) => (
                    <button
                      key={transport}
                      onClick={() => setProfile({ ...profile, transportMode: transport })}
                      className={getButtonStyles(false, profile.transportMode === transport)}
                    >
                      {transport === 'public' ? 'Public Transit' : 
                       transport.charAt(0).toUpperCase() + transport.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={getCardStyles()}>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-sm font-medium text-gray-500">Step {step} of 4</span>
            <div className="text-xs text-gray-400 mt-1">
              {step === 1 && "Tell us about your family"}
              {step === 2 && "What interests you?"}
              {step === 3 && "Your preferences"}
              {step === 4 && "Location & transport"}
            </div>
          </div>
          <div className="flex space-x-3">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`relative transition-all duration-300 ${
                  s <= step ? 'scale-100' : 'scale-75'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    s < step 
                      ? 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg' 
                      : s === step
                      ? 'bg-gradient-to-r from-rose-400 to-pink-400 shadow-md ring-4 ring-rose-100'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
                {s < step && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className={`px-6 py-3 rounded-lg font-medium ${
            step === 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && (profile.hasKids === undefined || (profile.hasKids && (!profile.kidAgeGroups || profile.kidAgeGroups.length === 0)))) ||
            (step === 2 && (!profile.interests || profile.interests.length === 0))
          }
          className={getButtonStyles(true)}
        >
          {step === 4 ? 'Find My Weekend Plans!' : 'Next'}
        </button>
      </div>
    </div>
  );
}