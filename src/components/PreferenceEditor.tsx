'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { UserProfile, EventCategory, PriceRange, NYC_Borough, KidAgeGroup } from '@/types';

interface Props {
  userProfile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export default function PreferenceEditor({ userProfile, onUpdate }: Props) {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: EventCategory[] = [
    'music', 'art', 'food', 'family', 'sports', 'outdoors', 
    'cultural', 'educational', 'nightlife', 'shopping'
  ];

  const boroughs: NYC_Borough[] = [
    'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'
  ];

  const ageGroups: { value: KidAgeGroup; label: string }[] = [
    { value: 'toddler', label: 'Toddler (1-3)' },
    { value: 'preschool', label: 'Preschool (4-5)' },
    { value: 'elementary', label: 'Elementary (6-11)' },
    { value: 'middle', label: 'Middle School (12-14)' },
    { value: 'high', label: 'High School (15-18)' },
  ];

  const getCardStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover-lift';
      case 'playful':
        return 'bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border-2 border-purple-100 backdrop-blur-sm hover:shadow-2xl transition-all duration-300';
      case 'minimal':
        return 'bg-white rounded border border-gray-300 shadow-sm hover:shadow-md transition-all duration-200';
      default:
        return 'bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover-lift';
    }
  };

  const getButtonStyles = (isSelected = false, isSmall = false) => {
    const baseStyles = `${isSmall ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'} rounded-lg font-medium transition-all duration-200`;
    
    if (isSelected) {
      switch (theme) {
        case 'airbnb':
          return `${baseStyles} bg-rose-500 text-white shadow-md`;
        case 'playful':
          return `${baseStyles} bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md transform scale-105`;
        case 'minimal':
          return `${baseStyles} bg-black text-white shadow-md`;
        default:
          return `${baseStyles} bg-rose-500 text-white shadow-md`;
      }
    }

    switch (theme) {
      case 'airbnb':
        return `${baseStyles} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`;
      case 'playful':
        return `${baseStyles} bg-white/80 hover:bg-purple-50 text-purple-700 border border-purple-200 backdrop-blur-sm`;
      case 'minimal':
        return `${baseStyles} bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300`;
      default:
        return `${baseStyles} bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300`;
    }
  };

  const handleInterestToggle = (interest: EventCategory) => {
    const newInterests = userProfile.interests.includes(interest)
      ? userProfile.interests.filter(i => i !== interest)
      : [...userProfile.interests, interest];
    onUpdate({ ...userProfile, interests: newInterests });
  };

  const handleAgeGroupToggle = (ageGroup: KidAgeGroup) => {
    const newAgeGroups = userProfile.kidAgeGroups.includes(ageGroup)
      ? userProfile.kidAgeGroups.filter(g => g !== ageGroup)
      : [...userProfile.kidAgeGroups, ageGroup];
    onUpdate({ ...userProfile, kidAgeGroups: newAgeGroups });
  };

  return (
    <div className={`${getCardStyles()} sticky top-6`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Your Preferences</h3>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={getButtonStyles(false, true)}
          >
            {isExpanded ? 'Collapse' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Family</div>
            <div className="text-sm text-gray-600">
              {userProfile.hasKids ? (
                <>
                  With kids: {userProfile.kidAgeGroups.map(group => 
                    ageGroups.find(ag => ag.value === group)?.label
                  ).join(', ')}
                </>
              ) : (
                'No kids'
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Location</div>
            <div className="text-sm text-gray-600">{userProfile.location.borough}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Budget</div>
            <div className="text-sm text-gray-600 capitalize">{userProfile.budget}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Interests</div>
            <div className="flex flex-wrap gap-1">
              {userProfile.interests.slice(0, 3).map((interest) => (
                <span key={interest} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {interest}
                </span>
              ))}
              {userProfile.interests.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  +{userProfile.interests.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 pt-4 border-t border-gray-200 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Situation
              </label>
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => onUpdate({ ...userProfile, hasKids: true })}
                  className={getButtonStyles(userProfile.hasKids === true, true)}
                >
                  With Kids
                </button>
                <button
                  onClick={() => onUpdate({ ...userProfile, hasKids: false, kidAgeGroups: [] })}
                  className={getButtonStyles(userProfile.hasKids === false, true)}
                >
                  No Kids
                </button>
              </div>
              
              {userProfile.hasKids && (
                <div>
                  <div className="text-xs text-gray-600 mb-2">Age Groups:</div>
                  <div className="flex flex-wrap gap-1">
                    {ageGroups.map((ageGroup) => (
                      <button
                        key={ageGroup.value}
                        onClick={() => handleAgeGroupToggle(ageGroup.value)}
                        className={getButtonStyles(userProfile.kidAgeGroups.includes(ageGroup.value), true)}
                      >
                        {ageGroup.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget
              </label>
              <div className="flex flex-wrap gap-2">
                {(['free', 'low', 'medium', 'high'] as PriceRange[]).map((budget) => (
                  <button
                    key={budget}
                    onClick={() => onUpdate({ ...userProfile, budget })}
                    className={getButtonStyles(userProfile.budget === budget, true)}
                  >
                    {budget === 'free' ? 'Free' : budget.charAt(0).toUpperCase() + budget.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Borough
              </label>
              <div className="flex flex-wrap gap-1">
                {boroughs.map((borough) => (
                  <button
                    key={borough}
                    onClick={() => onUpdate({ 
                      ...userProfile, 
                      location: { ...userProfile.location, borough } 
                    })}
                    className={getButtonStyles(userProfile.location.borough === borough, true)}
                  >
                    {borough}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleInterestToggle(category)}
                    className={getButtonStyles(userProfile.interests.includes(category), true)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <div className="flex flex-wrap gap-2">
                {(['morning', 'afternoon', 'evening', 'any'] as const).map((time) => (
                  <button
                    key={time}
                    onClick={() => onUpdate({ ...userProfile, preferredTime: time })}
                    className={getButtonStyles(userProfile.preferredTime === time, true)}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportation
              </label>
              <div className="flex flex-wrap gap-2">
                {(['walking', 'public', 'car'] as const).map((transport) => (
                  <button
                    key={transport}
                    onClick={() => onUpdate({ ...userProfile, transportMode: transport })}
                    className={getButtonStyles(userProfile.transportMode === transport, true)}
                  >
                    {transport === 'public' ? 'Public Transit' : 
                     transport.charAt(0).toUpperCase() + transport.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}