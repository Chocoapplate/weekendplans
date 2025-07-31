export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  category: EventCategory;
  priceRange: PriceRange;
  ageGroup: AgeGroup[];
  image?: string;
  link?: string;
  source: 'nyc' | 'eventbrite' | 'ticketmaster' | 'meetup';
}

export type EventCategory = 
  | 'music' 
  | 'art' 
  | 'food' 
  | 'family' 
  | 'sports' 
  | 'outdoors' 
  | 'cultural' 
  | 'educational' 
  | 'nightlife' 
  | 'shopping';

export type PriceRange = 'free' | 'low' | 'medium' | 'high';

export type AgeGroup = 'kids' | 'teens' | 'adults' | 'seniors' | 'family';

export interface WeatherData {
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: WeatherForecast[];
}

export type WeatherCondition = 
  | 'sunny' 
  | 'cloudy' 
  | 'rainy' 
  | 'snowy' 
  | 'stormy' 
  | 'foggy';

export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: WeatherCondition;
  precipitation: number;
}

export interface UserProfile {
  hasKids: boolean;
  kidAgeGroups: KidAgeGroup[];
  interests: EventCategory[];
  budget: PriceRange;
  preferredTime: 'morning' | 'afternoon' | 'evening' | 'any';
  transportMode: 'walking' | 'public' | 'car';
  location: {
    borough: NYC_Borough;
    zipCode?: string;
  };
}

export type KidAgeGroup = 'toddler' | 'preschool' | 'elementary' | 'middle' | 'high';

export type NYC_Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island';

export interface Recommendation {
  event: Event;
  score: number;
  reasons: string[];
  weatherCompatibility: number;
  familyFriendly: boolean;
}