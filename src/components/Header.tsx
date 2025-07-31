'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme } = useTheme();

  const getTitleStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent font-bold tracking-tight';
      case 'playful':
        return 'text-purple-800 font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent';
      case 'minimal':
        return 'text-black font-light tracking-wide';
      default:
        return 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent font-bold tracking-tight';
    }
  };

  const getSubtitleStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'text-gray-600 font-medium';
      case 'playful':
        return 'text-purple-600 font-medium';
      case 'minimal':
        return 'text-gray-500 font-light';
      default:
        return 'text-gray-600 font-medium';
    }
  };

  const getAccentStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'text-rose-400';
      case 'playful':
        return 'text-purple-400';
      case 'minimal':
        return 'text-gray-400';
      default:
        return 'text-rose-400';
    }
  };

  return (
    <header className="text-center mb-12 pt-8">
      <div className="relative">
        {/* Decorative Elements */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className={`w-24 h-1 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 ${theme === 'airbnb' ? 'opacity-100' : 'opacity-60'}`}></div>
        </div>
        
        {/* Main Title with Dynamic Styling */}
        <div className="relative">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl mb-6 ${getTitleStyles()} relative inline-block`}>
            <span className="relative">
              Weekend
              {/* Decorative Accent */}
              <span className={`absolute -top-2 -right-4 text-2xl md:text-3xl ${getAccentStyles()} animate-pulse`}>
                ✨
              </span>
            </span>
            <br />
            <span className="relative">
              Plans
              {/* Underline Accent */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transform scale-x-0 animate-[scale-in_0.8s_ease-out_0.5s_forwards]"></span>
            </span>
          </h1>
        </div>

        {/* Enhanced Subtitle */}
        <div className="relative">
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${getSubtitleStyles()}`}>
            Discover amazing weekend activities 
            <span className={`font-semibold ${theme === 'airbnb' ? 'text-rose-600' : theme === 'playful' ? 'text-purple-600' : 'text-black'}`}>
              {' '}tailored to your family
            </span>, weather, and local events in 
            <span className={`font-semibold ${theme === 'airbnb' ? 'text-rose-600' : theme === 'playful' ? 'text-purple-600' : 'text-black'}`}>
              {' '}NYC
            </span>
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['🌤️ Weather-Smart', '👨‍👩‍👧‍👦 Family-Friendly', '🗽 NYC Focused'].map((feature, index) => (
              <span
                key={feature}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  theme === 'airbnb' 
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' 
                    : theme === 'playful'
                    ? 'bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 border border-purple-200 hover:from-pink-100 hover:to-purple-100'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                } hover:scale-105 transform`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}