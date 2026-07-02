import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import closedGift from '../assets/closed_gift.png';
import openedGift from '../assets/opened_gift.png';
import { Howl } from 'howler';
import confetti from 'canvas-confetti';

export const GiftPrankScene = ({ isActive }) => {
  const { nextSlide } = useBirthday();
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Play funny sound effect
    const prankSound = new Howl({
      src: ['/Faaaaaa_sound_effect.mp3'],
      volume: 1.0
    });
    prankSound.play();

    // Spray messy colorful confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
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
        className="w-full max-w-sm glass-card border border-white/60 p-8 rounded-3xl text-center shadow-lg relative z-20 flex flex-col justify-between items-center min-h-[500px]"
      >
        <div>
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-blue-500 block mb-1">
            A Special Surprise
          </span>
          <h2 className="text-3xl font-bold text-purple-950 font-serif leading-tight">
            Here is your gift
          </h2>
          <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow-sm" />
          <p className="text-purple-950/70 text-xs font-semibold mt-4">
            {!isOpened ? "Tap the box to open it! 🎁" : "Surprise! 🎉✨"}
          </p>
        </div>

        {/* Gift Box Container */}
        <div 
          onClick={handleOpenGift}
          className={`relative w-48 h-48 flex items-center justify-center cursor-pointer my-6 transition-transform ${
            !isOpened ? 'hover:scale-105 active:scale-95' : ''
          }`}
        >
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.img
                key="closed"
                src={closedGift}
                alt="Closed Gift Box"
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: 1,
                  rotate: [0, -3, 3, -3, 3, 0] 
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
                className="w-40 h-40 object-contain drop-shadow-md"
              />
            ) : (
              <motion.img
                key="opened"
                src={openedGift}
                alt="Opened Gift Box"
                initial={{ scale: 0.5, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 10 }}
                className="w-44 h-44 object-contain drop-shadow-lg"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Action / Continue button */}
        <div className="w-full h-[52px] flex items-center justify-center">
          <AnimatePresence>
            {isOpened && (
              <motion.button
                onClick={handleNext}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full text-white font-bold text-base bg-[#600411] hover:bg-[#7d0a1a] shadow-md shadow-[#600411]/20 transition-all min-h-[48px] cursor-pointer"
              >
                Continue ✨
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default GiftPrankScene;
