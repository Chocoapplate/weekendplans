'use client';

import { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Event, UserProfile, WeatherData, EventCategory } from '@/types';
import EventCard from './EventCard';

interface Props {
  events: Event[];
  userProfile: UserProfile;
  weather: WeatherData | null;
  loading: boolean;
}

export default function EventsList({ events, userProfile, weather, loading }: Props) {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'date' | 'price'>('recommended');

  const getRecommendationScore = (event: Event): number => {
    let score = 0;

    if (userProfile.interests.includes(event.category)) {
      score += 30;
    }

    if (userProfile.hasKids && event.ageGroup.includes('family')) {
      score += 25;
    }

    if (!userProfile.hasKids && event.ageGroup.includes('adults')) {
      score += 20;
    }

    const budgetScore = {
      free: { free: 30, low: 20, medium: 10, high: 5 },
      low: { free: 25, low: 30, medium: 20, high: 10 },
      medium: { free: 15, low: 25, medium: 30, high: 20 },
      high: { free: 10, low: 15, medium: 25, high: 30 }
    };
    score += budgetScore[userProfile.budget][event.priceRange] || 0;

    if (weather) {
      if (weather.condition === 'rainy' && 
          ['cultural', 'educational', 'art', 'shopping'].includes(event.category)) {
        score += 15;
      } else if (weather.condition === 'sunny' && 
                 ['outdoors', 'sports', 'family'].includes(event.category)) {
        score += 15;
      }
    }

    return score;
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events;

    if (selectedCategory !== 'all') {
      filtered = events.filter(event => event.category === selectedCategory);
    }

    switch (sortBy) {
      case 'recommended':
        return filtered.sort((a, b) => getRecommendationScore(b) - getRecommendationScore(a));
      case 'date':
        return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'price':
        const priceOrder = { free: 0, low: 1, medium: 2, high: 3 };
        return filtered.sort((a, b) => priceOrder[a.priceRange] - priceOrder[b.priceRange]);
      default:
        return filtered;
    }
  }, [events, selectedCategory, sortBy, userProfile, weather]);

  const categories = Array.from(new Set(events.map(event => event.category)));

  const getFilterButtonStyles = (isSelected: boolean) => {
    const baseStyles = 'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5';
    
    if (isSelected) {
      switch (theme) {
        case 'airbnb':
          return `${baseStyles} bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl`;
        case 'playful':
          return `${baseStyles} bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg transform scale-105 hover:scale-110`;
        case 'minimal':
          return `${baseStyles} bg-black text-white shadow-lg hover:shadow-xl`;
        default:
          return `${baseStyles} bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl`;
      }
    }

    switch (theme) {
      case 'airbnb':
        return `${baseStyles} bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md`;
      case 'playful':
        return `${baseStyles} bg-white/90 border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 backdrop-blur-sm shadow-sm`;
      case 'minimal':
        return `${baseStyles} bg-gray-100 border-2 border-gray-300 text-gray-700 hover:bg-gray-200 hover:border-gray-400 shadow-sm`;
      default:
        return `${baseStyles} bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-48"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Your Weekend Plans
          </h2>
          <p className="text-gray-600 text-lg">
            {filteredAndSortedEvents.length} personalized recommendations
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-5 py-3 border-2 border-gray-200 rounded-xl bg-white focus:ring-4 focus:ring-rose-100 focus:border-rose-400 transition-all duration-200 font-medium text-gray-700 hover:border-gray-300 shadow-sm hover:shadow-md"
          >
            <option value="recommended">✨ Best Matches</option>
            <option value="date">📅 By Date</option>
            <option value="price">💰 By Price</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={getFilterButtonStyles(selectedCategory === 'all')}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={getFilterButtonStyles(selectedCategory === category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredAndSortedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            recommendationScore={getRecommendationScore(event)}
            userProfile={userProfile}
            weather={weather}
          />
        ))}
      </div>

      {filteredAndSortedEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No events found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or check back later for new events.
          </p>
        </div>
      )}
    </div>
  );
}