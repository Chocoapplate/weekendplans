'use client';

import { useTheme } from '@/contexts/ThemeContext';

export default function TopNavigation() {
  const { theme } = useTheme();

  const getNavStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';
      case 'playful':
        return 'bg-gradient-to-r from-pink-50/90 to-purple-50/90 backdrop-blur-md border-b border-purple-100 shadow-sm';
      case 'minimal':
        return 'bg-white/95 backdrop-blur-md border-b border-gray-200';
      default:
        return 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm';
    }
  };

  const getSignInButtonStyles = () => {
    switch (theme) {
      case 'airbnb':
        return 'bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-lg transform hover:scale-105';
      case 'playful':
        return 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105';
      case 'minimal':
        return 'bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-lg';
      default:
        return 'bg-rose-500 hover:bg-rose-600 text-white shadow-md hover:shadow-lg transform hover:scale-105';
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${getNavStyles()}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Space */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-gray-600">Your Weekend,</div>
              <div className="text-xs text-gray-500">Perfectly Planned</div>
            </div>
          </div>

          {/* Right Side - Sign In */}
          <div className="flex items-center space-x-4">
            {/* Theme Switcher - Mobile Hidden */}
            <div className="hidden md:block">
              {/* We'll move the theme switcher here later if needed */}
            </div>

            {/* Sign In Button */}
            <button
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${getSignInButtonStyles()}`}
              onClick={() => {
                // Handle sign in logic here
                console.log('Sign in clicked');
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}