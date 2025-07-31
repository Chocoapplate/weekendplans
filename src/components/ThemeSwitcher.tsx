'use client';

import { useTheme, Theme } from '@/contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string; description: string }[] = [
    { value: 'airbnb', label: 'Modern', description: 'Clean and simple like Airbnb' },
    { value: 'playful', label: 'Playful', description: 'Colorful and fun' },
    { value: 'minimal', label: 'Minimal', description: 'Sleek and refined' },
  ];

  const getButtonStyles = (isActive: boolean, themeValue: Theme) => {
    const baseStyles = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    
    if (isActive) {
      switch (themeValue) {
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
        return `${baseStyles} bg-white border border-gray-200 text-gray-700 hover:bg-gray-50`;
      case 'playful':
        return `${baseStyles} bg-white/80 border border-purple-200 text-purple-700 hover:bg-purple-50 backdrop-blur-sm`;
      case 'minimal':
        return `${baseStyles} bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200`;
      default:
        return `${baseStyles} bg-white border border-gray-200 text-gray-700 hover:bg-gray-50`;
    }
  };

  return (
    <div className="flex flex-col items-end space-y-2">
      <span className="text-sm text-gray-600 font-medium">Theme:</span>
      <div className="flex space-x-2">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={getButtonStyles(theme === themeOption.value, themeOption.value)}
            title={themeOption.description}
          >
            {themeOption.label}
          </button>
        ))}
      </div>
    </div>
  );
}