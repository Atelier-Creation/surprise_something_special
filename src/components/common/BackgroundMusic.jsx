import React from 'react';
import { useBirthday } from '../../context/BirthdayContext';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';

export const BackgroundMusic = () => {
  const { isMusicPlaying, toggleMusic, currentSlide } = useBirthday();

  // Hide the music button on the Welcome Screen (slide 0)
  if (currentSlide === 0) return null;

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full glass-card border border-purple-200/60 text-purple-800 shadow-md focus:outline-none hover:scale-105 active:scale-95 transition-all duration-300"
      aria-label={isMusicPlaying ? "Mute Background Music" : "Play Background Music"}
    >
      {isMusicPlaying ? (
        <div className="flex items-center gap-1">
          {/* Animated sound wave bars */}
          <span className="w-1 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '0.6s' }} />
          <span className="w-1 h-6 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.5s' }} />
          <span className="w-1 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '0.7s' }} />
        </div>
      ) : (
        <FaVolumeMute className="w-5 h-5 text-purple-600/70" />
      )}
    </button>
  );
};

export default BackgroundMusic;
