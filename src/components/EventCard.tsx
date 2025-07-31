'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Event, UserProfile, WeatherData } from '@/types';

interface Props {
  event: Event;
  recommendationScore: number;
  userProfile: UserProfile;
  weather: WeatherData | null;
}

export default function EventCard({ event, recommendationScore, userProfile, weather }: Props) {
  const { theme } = useTheme();

  const getCardStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover-lift';
      case 'playful':
        return 'bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg hover:shadow-xl border-2 border-purple-100 p-6 transition-all duration-300 hover:scale-[1.03] hover:rotate-1 backdrop-blur-sm';
      case 'minimal':
        return 'bg-white rounded border border-gray-300 p-6 shadow-sm hover:shadow-md transition-all duration-200';
      default:
        return 'bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover-lift';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      music: '🎵',
      art: '🎨',
      food: '🍽️',
      family: '👨‍👩‍👧‍👦',
      sports: '⚽',
      outdoors: '🌲',
      cultural: '🏛️',
      educational: '📚',
      nightlife: '🌙',
      shopping: '🛍️'
    };
    return icons[category as keyof typeof icons] || '📅';
  };

  const getPriceDisplay = (priceRange: string) => {
    switch (priceRange) {
      case 'free':
        return { text: 'Free', color: 'text-green-600' };
      case 'low':
        return { text: '$', color: 'text-green-500' };
      case 'medium':
        return { text: '$$', color: 'text-yellow-500' };
      case 'high':
        return { text: '$$$', color: 'text-red-500' };
      default:
        return { text: '?', color: 'text-gray-500' };
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getRecommendationReasons = () => {
    const reasons = [];
    
    if (userProfile.interests.includes(event.category)) {
      reasons.push('Matches your interests');
    }
    
    if (userProfile.hasKids && event.ageGroup.includes('family')) {
      reasons.push('Family-friendly');
    }
    
    if (event.priceRange === 'free') {
      reasons.push('Free event');
    }
    
    if (weather?.condition === 'rainy' && 
        ['cultural', 'educational', 'art', 'shopping'].includes(event.category)) {
      reasons.push('Indoor activity (good for rainy weather)');
    } else if (weather?.condition === 'sunny' && 
               ['outdoors', 'sports', 'family'].includes(event.category)) {
      reasons.push('Outdoor activity (perfect for sunny weather)');
    }

    return reasons;
  };

  const priceInfo = getPriceDisplay(event.priceRange);
  const reasons = getRecommendationReasons();

  return (
    <div className={getCardStyles()}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon(event.category)}</span>
          <div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-lg font-bold ${priceInfo.color}`}>
            {priceInfo.text}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(recommendationScore)}`}>
            {recommendationScore}% match
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
        {event.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {event.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">📅</span>
          <span>
            {new Date(event.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {event.time}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">📍</span>
          <span className="line-clamp-1">{event.venue}, {event.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">👥</span>
          <span>
            {event.ageGroup.map(age => age.charAt(0).toUpperCase() + age.slice(1)).join(', ')}
          </span>
        </div>
      </div>

      {reasons.length > 0 && (
        <div className={`p-3 rounded-lg mb-4 ${
          theme === 'airbnb' ? 'bg-rose-50 border border-rose-200' :
          theme === 'playful' ? 'bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200' :
          'bg-gray-50 border border-gray-200'
        }`}>
          <div className="text-xs font-semibold text-gray-700 mb-1">
            Why we recommend this:
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {reasons.slice(0, 2).map((reason, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">✓</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Source: {event.source.toUpperCase()}
        </div>
        
        {event.link && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
              theme === 'airbnb' ? 'bg-rose-500 hover:bg-rose-600 text-white' :
              theme === 'playful' ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transform hover:scale-105' :
              'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            <span>Visit Website</span>
            <span className="text-xs">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}