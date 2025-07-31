'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import TopNavigation from './TopNavigation';
import Header from './Header';
import UserProfile from './UserProfile';
import WeatherWidget from './WeatherWidget';
import EventsList from './EventsList';
import ThemeSwitcher from './ThemeSwitcher';
import PreferenceEditor from './PreferenceEditor';
import { UserProfile as UserProfileType, Event, WeatherData } from '@/types';

export default function WeekendPlanner() {
  const { theme } = useTheme();
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  const mockWeather: WeatherData = {
    temperature: 68,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 8,
    precipitation: 0,
    forecast: [
      { date: '2025-08-02', high: 72, low: 58, condition: 'sunny', precipitation: 0 },
      { date: '2025-08-03', high: 69, low: 55, condition: 'cloudy', precipitation: 20 },
    ]
  };

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Central Park Summer Concert',
      description: 'Free outdoor concert featuring local NYC bands',
      date: '2025-08-02',
      time: '2:00 PM',
      venue: 'Central Park Bandshell',
      address: 'Central Park, Manhattan, NY',
      category: 'music',
      priceRange: 'free',
      ageGroup: ['family', 'adults'],
      source: 'nyc',
      link: 'https://www.centralparknyc.org/activities/events'
    },
    {
      id: '2',
      title: 'Brooklyn Bridge Park Family Festival',
      description: 'Interactive activities and games for kids and families',
      date: '2025-08-02',
      time: '10:00 AM',
      venue: 'Brooklyn Bridge Park',
      address: 'Brooklyn, NY',
      category: 'family',
      priceRange: 'free',
      ageGroup: ['kids', 'family'],
      source: 'nyc',
      link: 'https://www.brooklynbridgepark.org/events'
    },
    {
      id: '3',
      title: 'Museum of Natural History Special Exhibit',
      description: 'Interactive dinosaur exhibit perfect for curious minds',
      date: '2025-08-03',
      time: '11:00 AM',
      venue: 'American Museum of Natural History',
      address: 'Upper West Side, Manhattan, NY',
      category: 'educational',
      priceRange: 'medium',
      ageGroup: ['kids', 'family', 'adults'],
      source: 'ticketmaster',
      link: 'https://www.amnh.org/exhibitions'
    }
  ];

  useEffect(() => {
    setWeather(mockWeather);
    setEvents(mockEvents);
  }, []);

  const handleProfileComplete = (profile: UserProfileType) => {
    setUserProfile(profile);
  };

  const handleProfileUpdate = (profile: UserProfileType) => {
    setUserProfile(profile);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme === 'airbnb' ? 'bg-gradient-to-br from-gray-50 to-rose-50/30' : theme === 'playful' ? 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50' : 'bg-white'}`}>
      <TopNavigation />
      
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="flex justify-end mb-6">
          <ThemeSwitcher />
        </div>

        {!userProfile ? (
          <div className="max-w-2xl mx-auto">
            <UserProfile onComplete={handleProfileComplete} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <PreferenceEditor 
                userProfile={userProfile}
                onUpdate={handleProfileUpdate}
              />
              <WeatherWidget weather={weather} />
            </div>
            
            <div className="lg:col-span-3">
              <EventsList 
                events={events} 
                userProfile={userProfile}
                weather={weather}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}