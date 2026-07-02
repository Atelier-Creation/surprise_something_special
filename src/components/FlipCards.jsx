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

  const cardDetails = [
    { id: '01', emoji: '⭐' },
    { id: '02', emoji: '🌸' },
    { id: '03', emoji: '💖' },
    { id: '04', emoji: '☕' },
    { id: '05', emoji: '🐱' },
    { id: '06', emoji: '✨' },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-4 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm md:max-w-2xl p-5 rounded-3xl text-center relative z-20 flex flex-col justify-between items-center min-h-[80vh]"
      >
        <div>
          <div className="text-center mb-4">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-blue-500 block mb-1">
              WISHES FOR YOU
            </span>
            <h2 className="text-3xl font-bold text-purple-950 font-serif leading-tight">
              Everything I hope you get
            </h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow-sm" />
          </div>
          <p className="text-purple-950/70 text-xs font-semibold mb-3">
            {openedCount < 6 
              ? `Open at least 3 gifts to continue (${openedCount}/6 opened)` 
              : "You've opened all your gifts! 🎉"}
          </p>
        </div>

        {/* 2x3 Grid on Mobile, 3x2 Grid on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-sm md:max-w-xl my-1 justify-items-center">
          {flipMessages.map((message, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="w-full aspect-square max-w-[145px] cursor-pointer perspective-1000"
            >
              <div
                className={`relative w-full h-full duration-700 preserve-3d transition-transform ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col items-center justify-between p-3.5 backface-hidden z-10">
                  <span className="text-[10px] md:text-xs font-serif font-bold tracking-widest text-blue-400">
                    {cardDetails[index].id}
                  </span>
                  <span className="text-4xl md:text-5xl filter drop-shadow-sm select-none my-auto animate-pulse-glow">
                    {cardDetails[index].emoji}
                  </span>
                  <span className="text-[8px] md:text-[9px] text-slate-400 font-bold tracking-widest uppercase">
                    TAP TO REVEAL
                  </span>
                </div>

                {/* Back Side (Message) */}
                <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 text-purple-950 p-3 border border-purple-100 shadow-md flex items-center justify-center rotate-y-180 backface-hidden z-20 overflow-y-auto scrollbar-none">
                  <p className="text-[10px] md:text-xs leading-normal font-bold text-center text-purple-950 select-text overflow-wrap-break-word">
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
