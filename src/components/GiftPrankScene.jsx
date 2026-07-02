import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import closedGift from '../assets/closed_gift.png';
import openedGift from '../assets/opened_gift.png';
import { Howl } from 'howler';
import confetti from 'canvas-confetti';
import Sparkles from './common/Sparkles';

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
    <div className="relative flex flex-col items-center justify-between h-full max-h-[85vh] md:max-h-full w-full px-6 py-10 bg-white text-purple-950 overflow-hidden select-none">
      {/* <FloatingStickers count={12} active={isActive} /> */}
      <Sparkles count={15} active={isActive} />

      {/* Header Section */}
      <div className="text-center z-20 mt-4">
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#d02120] block mb-1">
          A Special Surprise
        </span>
        <h2 className="text-3xl font-bold text-[#bf1f1e] font-serif leading-tight">
          Here is your gift
        </h2>
        <div className="w-12 h-1 bg-[#d02120] mx-auto mt-2 rounded-full shadow-sm" />

        <p className="text-gray-950/70 text-xs font-semibold mt-4">
          {!isOpened ? "Tap to open" : "Surprise! 📣✨"}
        </p>
      </div>

      {/* Gift Box Container */}
      <div
        onClick={handleOpenGift}
        className={`relative z-20 flex items-center justify-center cursor-pointer transition-transform duration-300 ${!isOpened ? 'hover:scale-105 active:scale-95' : ''
          }`}
        style={{ height: '340px' }}
      >
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.img
              key="closed"
              src={closedGift}
              alt="Closed Gift Box"
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1.0,
                rotate: [0, -3, 3, -3, 3, 0]
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                rotate: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                scale: { duration: 0.3 }
              }}
              className="w-52 h-52 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)]"
            />
          ) : (
            <motion.img
              key="opened"
              src={openedGift}
              alt="Opened Gift Box"
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1.0, y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 90 }}
              className="w-80 h-80 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
            />
          )}
        </AnimatePresence>
      </div>
      {isOpened && (
        <motion.h3 className='text-red-950/70'>You need this more </motion.h3>
      )}

      {/* Continue Button Area */}
      <div className="h-[64px] flex items-center justify-center z-20 mb-4">
        <AnimatePresence>
          {isOpened && (
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-3 rounded-full text-white font-bold text-base bg-[#d02120] hover:bg-[#bf1f1e] shadow-md shadow-[#d02120]/20 transition-all min-h-[48px] cursor-pointer"
            >
              Continue ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiftPrankScene;
