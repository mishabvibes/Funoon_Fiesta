import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/festlogo.png';
const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    // Animate loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => prev === 'Loading...' ? 'Loading' : prev + '.');
    }, 500);

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(textInterval);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Main container with circular animation */}
      <div className="relative">
        {/* Outer rotating circle */}
        <div className="w-32 h-32 border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin" />
        
        {/* Inner rotating circle */}
        <div className="absolute top-4 left-4 w-24 h-24 border-4 border-t-transparent border-r-blue-300 border-b-blue-500 border-l-transparent rounded-full animate-spin-slow" />
        
        {/* Center logo/icon */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <img 
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

// Add this to your CSS/Tailwind config
const style = {
  '.animate-spin-slow': {
    animation: 'spin 2s linear infinite'
  }
};