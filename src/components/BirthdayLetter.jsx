import React, { useState, useEffect, useRef } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';

export const BirthdayLetter = ({ isActive }) => {
  const { birthdayMessage, nextSlide } = useBirthday();
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    let currentIndex = 0;
    const intervalTime = 25; // 25ms per character (nice readable speed)
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (currentIndex >= birthdayMessage.length) {
        clearInterval(timer);
        setIsTypingComplete(true);
        return;
      }
      
      const nextChar = birthdayMessage[currentIndex];
      setDisplayedText((prev) => prev + nextChar);
      currentIndex++;

      // Auto-scroll to bottom of letter box during typing
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isActive, birthdayMessage]);

  const handleSkipTyping = () => {
    if (!isTypingComplete) {
      setDisplayedText(birthdayMessage);
      setIsTypingComplete(true);
    }
  };

  const handleNext = () => {
    nextSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm glass-card border border-white/60 p-6 rounded-3xl text-center shadow-lg relative z-20 flex flex-col justify-between items-center min-h-[530px]"
      >
        <div className="w-full flex-grow flex flex-col justify-start">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-handwritten text-purple-600 mt-2 mb-4"
          >
            A Little Note for You...
          </motion.h2>

          {/* Letter Body: Scrollable box, clicking skips typewriter animation */}
          <div 
            ref={scrollRef}
            onClick={handleSkipTyping}
            className="max-h-[330px] overflow-y-auto px-2 mb-6 scrollbar-thin text-left cursor-pointer select-none"
            title={!isTypingComplete ? "Tap to show entire message" : ""}
          >
            <p className="text-purple-950/85 text-sm leading-relaxed whitespace-pre-line font-medium">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-pink-500 animate-pulse font-bold">|</span>
              )}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 transition-all min-h-[48px] w-full max-w-[250px]"
        >
          Open My Gifts 🎁
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BirthdayLetter;
