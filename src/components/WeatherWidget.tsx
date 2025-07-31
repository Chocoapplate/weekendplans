'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { WeatherData } from '@/types';

interface Props {
  weather: WeatherData | null;
}

export default function WeatherWidget({ weather }: Props) {
  const { theme } = useTheme();

  if (!weather) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
    );
  }

  const getCardStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 p-6 transition-all duration-300 hover-lift';
      case 'playful':
        return 'bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border-2 border-blue-100 p-6 backdrop-blur-sm hover:shadow-2xl transition-all duration-300';
      case 'minimal':
        return 'bg-white rounded border border-gray-300 p-6 shadow-sm hover:shadow-md transition-all duration-200';
      default:
        return 'bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 p-6 transition-all duration-300 hover-lift';
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'snowy':
        return '❄️';
      case 'stormy':
        return '⛈️';
      case 'foggy':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return 'text-red-500';
    if (temp >= 70) return 'text-orange-500';
    if (temp >= 60) return 'text-green-500';
    if (temp >= 50) return 'text-blue-500';
    return 'text-blue-700';
  };

  const getRecommendation = () => {
    const { condition, temperature, precipitation } = weather;
    
    if (precipitation > 50) {
      return "Indoor activities recommended! ☔";
    }
    if (condition === 'sunny' && temperature > 75) {
      return "Perfect day for outdoor events! 🌞";
    }
    if (condition === 'sunny' && temperature < 60) {
      return "Great weather, bring a jacket! 🧥";
    }
    if (condition === 'cloudy' && temperature > 65) {
      return "Good day for walking around! 🚶‍♀️";
    }
    return "Check the forecast for your plans! 📅";
  };

  return (
    <div className={getCardStyles()}>
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        This Weekend's Weather
      </h3>
      
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className={`text-4xl font-bold mb-2 ${getTemperatureColor(weather.temperature)}`}>
          {weather.temperature}°F
        </div>
        <div className="text-gray-600 capitalize font-medium">
          {weather.condition}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Humidity:</span>
          <span className="font-medium">{weather.humidity}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Wind:</span>
          <span className="font-medium">{weather.windSpeed} mph</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Rain chance:</span>
          <span className="font-medium">{weather.precipitation}%</span>
        </div>
      </div>

      <div className={`p-4 rounded-lg mb-4 ${
        theme === 'airbnb' ? 'bg-blue-50 border border-blue-200' :
        theme === 'playful' ? 'bg-gradient-to-r from-blue-100 to-purple-100 border border-purple-200' :
        'bg-gray-50 border border-gray-200'
      }`}>
        <p className="text-sm font-medium text-gray-700">
          💡 {getRecommendation()}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-gray-800">Weekend Forecast:</h4>
        {weather.forecast.map((day, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0 border-gray-100">
            <div className="flex items-center space-x-3">
              <span className="text-lg">{getWeatherIcon(day.condition)}</span>
              <span className="text-sm text-gray-600">
                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="text-sm">
              <span className="font-medium">{day.high}°</span>
              <span className="text-gray-500 ml-1">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}