import React, { useEffect } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingStickers from './common/FloatingStickers';
import Sparkles from './common/Sparkles';

export const BirthdayPopup = ({ isActive }) => {
  const { recipientName, nextSlide } = useBirthday();

  useEffect(() => {
    if (!isActive) return;

    // Fire initial confetti blast
    const end = Date.now() + 3000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();

    // Standard center burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [isActive]);

  const handleNext = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    nextSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      {/* Visual background decorations */}
      <Sparkles count={15} active={isActive} />
      <FloatingStickers count={14} active={isActive} />

      {/* Floating Hearts background decoration */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {isActive && Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30 animate-float-medium"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              bottom: `-${50 + Math.random() * 100}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          >
            <span className="text-pink-400 text-3xl">❤️</span>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.2 }}
        className="w-full max-w-sm  p-8 rounded-3xl text-center relative z-20 flex flex-col justify-between items-center min-h-[80vh]"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isActive ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', damping: 10, delay: 0.5 }}
          className="text-7xl mb-4 drop-shadow-sm"
        >
          👑
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-xl font-bold font-sans text-purple-600 tracking-wider uppercase mb-1"
        >
          🎉 Happy Birthday 🎉
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: 'spring', damping: 8, delay: 0.9 }}
          className="text-7xl font-black font-sans tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600 mb-6 filter drop-shadow-[0_1px_4px_rgba(130,50,150,0.15)]"
        >
          {recipientName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-purple-950/70 text-base max-w-[260px] mb-8 font-medium leading-relaxed"
        >
          May your special day be filled with endless smiles, sweet moments, and warm memories! 🌟
        </motion.p>

        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full text-white font-bold text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 animate-pulse-glow z-30 min-w-[200px] min-h-[48px]"
        >
          Let's Cut the Cake! 🎂
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BirthdayPopup;
