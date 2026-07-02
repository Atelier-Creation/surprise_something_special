import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import confetti from 'canvas-confetti';

export const FlipCards = ({ isActive }) => {
  const { flipMessages, flippedCards, toggleFlipCard, nextSlide, playSFX } = useBirthday();

  const handleCardClick = (index) => {
    // Play card flip sound
    playSFX('cakeCut');
    
    // Toggle flip state
    toggleFlipCard(index);

    // If card is being opened for the first time, spray tiny confetti
    if (!flippedCards[index]) {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.7, x: index % 2 === 0 ? 0.3 : 0.7 },
        colors: ['#FF69B4', '#D4AF37', '#FFF']
      });
    }
  };

  const openedCount = flippedCards.filter(Boolean).length;
  const isContinueEnabled = openedCount >= 3;

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-4 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm glass-card border border-white/60 p-5 rounded-3xl text-center shadow-lg relative z-20 flex flex-col justify-between items-center min-h-[490px]"
      >
        <div>
          <h2 className="text-xl font-bold font-sans text-purple-600 mb-1">
            Tap Your Gifts! 🎁
          </h2>
          <p className="text-purple-950/70 text-xs font-semibold mb-3">
            {openedCount < 6 
              ? `Open at least 3 gifts to continue (${openedCount}/6 opened)` 
              : "You've opened all your gifts! 🎉"}
          </p>
        </div>

        {/* 2x3 Flip Card Grid */}
        <div className="grid grid-cols-2 gap-3 w-full my-1 justify-items-center">
          {flipMessages.map((message, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="w-[140px] h-[95px] cursor-pointer perspective-1000"
            >
              <div
                className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side (Gift Wrap) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 border border-white/30 shadow-md flex flex-col items-center justify-center backface-hidden z-10">
                  <span className="text-3xl filter drop-shadow">🎁</span>
                  <span className="text-[10px] text-white/90 font-bold tracking-wider mt-1 uppercase">
                    Gift {index + 1}
                  </span>
                </div>

                {/* Back Side (Message) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 text-indigo-950 p-2.5 border border-amber-200 shadow-md flex items-center justify-center rotate-y-180 backface-hidden z-20 overflow-y-auto">
                  <p className="text-[10px] leading-snug font-bold text-center text-indigo-950 select-text overflow-wrap-break-word">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button Area */}
        <div className="w-full h-[52px] mt-2 flex items-center justify-center">
          <AnimatePresence>
            {isContinueEnabled && (
              <motion.button
                onClick={nextSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 transition-all min-h-[48px]"
              >
                Next Surprise! 🌟
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCards;
