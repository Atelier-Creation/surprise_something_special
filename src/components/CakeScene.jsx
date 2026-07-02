import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingStickers from './common/FloatingStickers';
import { FaUtensils } from 'react-icons/fa';

export const CakeScene = ({ isActive }) => {
  const { isCakeCut, cutCake, nextSlide } = useBirthday();
  const [isCutting, setIsCutting] = useState(false);

  const handleCutCake = () => {
    if (isCakeCut || isCutting) return;
    setIsCutting(true);

    // Knife animation delay before actual cut
    setTimeout(() => {
      cutCake();
      setIsCutting(false);
      
      // Spray cream-colored confetti particles around the cake
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#FFF0F5', '#FFDAB9', '#FFB07C', '#F3E5AB']
      });
    }, 900);
  };

  const handleContinue = () => {
    nextSlide();
  };

  // SVG dimensions: 300x240
  // Center: X=150. Top face ellipse Y center = 100, rx=100, ry=40.
  // Cake bottom Y = 170. Height = 70.
  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm p-6 rounded-3xl text-center relative z-20 flex flex-col justify-between items-center min-h-[80vh]"
      >
        <div>
          <h2 className="text-2xl font-bold font-sans text-purple-600 mb-1">
            {isCakeCut ? "Mmm, looks delicious! 😋" : "Make a Cut!"}
          </h2>
          <p className="text-purple-950/60 text-xs px-4 mb-4 font-semibold">
            {isCakeCut 
              ? "A sweet treat to share on your special day!" 
              : "Tap the cake to cut your first birthday slice."}
          </p>
        </div>

        {/* Cake Container */}
        <div 
          onClick={handleCutCake}
          className={`relative w-[300px] h-[220px] my-2 cursor-pointer flex items-center justify-center ${isCakeCut ? 'pointer-events-none' : ''}`}
        >
          {/* Animated Knife */}
          <AnimatePresence>
            {isCutting && (
              <motion.div
                initial={{ x: 50, y: -80, rotate: -45, opacity: 0 }}
                animate={{ x: 0, y: -20, rotate: -15, opacity: 1 }}
                exit={{ y: 80, opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute z-40 text-gray-200 drop-shadow-md"
                style={{ top: '30px', left: '130px' }}
              >
                {/* Custom SVG Knife */}
                <svg width="60" height="120" viewBox="0 0 40 100" fill="none">
                  {/* Blade */}
                  <path d="M15,10 L25,10 C25,10 25,60 20,80 L15,80 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M15,10 L18,10 L18,78 L15,80 Z" fill="#FFFFFF" />
                  {/* Handle */}
                  <rect x="16" y="80" width="8" height="30" rx="4" fill="#8B4513" />
                  {/* Guard */}
                  <rect x="12" y="77" width="16" height="4" rx="2" fill="#D4AF37" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG 3D Cake */}
          <svg width="280" height="200" viewBox="0 0 300 220" className="overflow-visible">
            {/* Shadow under the plate */}
            <ellipse cx="150" cy="185" rx="110" ry="20" fill="rgba(0,0,0,0.3)" />
            {/* The Plate */}
            <ellipse cx="150" cy="180" rx="110" ry="20" fill="#E6E6FA" stroke="#FFF" strokeWidth="3" />
            <ellipse cx="150" cy="180" rx="90" ry="14" fill="#D8BFD8" />

            {/* Left Slice Group */}
            <motion.g
              animate={isCakeCut ? { x: -30, y: -15 } : { x: 0, y: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 60 }}
            >
              {/* Left Side Cylinder */}
              <path 
                d="M 50,110 L 50,170 A 100,40 0 0,0 150,210 L 150,150 A 100,40 0 0,1 50,110 Z" 
                fill="#FF69B4" 
              />
              
              {/* Left Top Face */}
              <path 
                d="M 150,110 A 100,40 0 0,1 50,110 A 100,40 0 0,1 150,70 Z" 
                fill="#FFB6C1" 
                stroke="#FFF0F5"
                strokeWidth="1"
              />

              {/* Left Cut Interior Face (Exposed layers) */}
              {isCakeCut && (
                <path 
                  d="M 150,70 L 150,110 L 150,150 L 150,210 Z" 
                  fill="#FFF" 
                  className="hidden" // Just simple visual separator, we can add colored layered cake lines:
                />
              )}
              {isCakeCut && (
                <g>
                  {/* Sponge layer 1 */}
                  <path d="M 150,110 L 150,150 L 150,175 L 150,135 Z" fill="#CD853F" />
                  {/* Cream layer 1 */}
                  <path d="M 150,135 L 150,175 L 150,185 L 150,145 Z" fill="#FFF8DC" />
                  {/* Sponge layer 2 */}
                  <path d="M 150,145 L 150,185 L 150,205 L 150,165 Z" fill="#CD853F" />
                  {/* Cream layer 2 */}
                  <path d="M 150,165 L 150,205 L 150,210 L 150,170 Z" fill="#FFB6C1" />
                </g>
              )}

              {/* Frosting drips and decorations left side */}
              <path d="M 50,115 Q 70,125 90,118 T 130,123 T 150,115 L 150,110 L 50,110 Z" fill="#FF1493" opacity="0.8" />

              {/* Left Side Toppings (Cherries/Strawberries) */}
              <circle cx="90" cy="90" r="10" fill="#D2143A" />
              <path d="M 90,82 Q 95,72 105,75" stroke="#4A2511" strokeWidth="2" fill="none" />
              <circle cx="130" cy="85" r="9" fill="#D2143A" />
              <path d="M 130,78 Q 135,68 145,70" stroke="#4A2511" strokeWidth="2" fill="none" />
            </motion.g>

            {/* Right Slice Group */}
            <motion.g
              animate={isCakeCut ? { x: 30, y: 15 } : { x: 0, y: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 60 }}
            >
              {/* Right Side Cylinder */}
              <path 
                d="M 150,150 L 150,210 A 100,40 0 0,0 250,170 L 250,110 A 100,40 0 0,1 150,150 Z" 
                fill="#FF1493" 
              />
              
              {/* Right Top Face */}
              <path 
                d="M 150,70 A 100,40 0 0,1 250,110 A 100,40 0 0,1 150,150 Z" 
                fill="#FF69B4" 
                stroke="#FFF0F5"
                strokeWidth="1"
              />

              {/* Right Cut Interior Face */}
              {isCakeCut && (
                <g>
                  {/* Sponge layer 1 */}
                  <path d="M 150,70 L 150,110 L 150,135 L 150,95 Z" fill="#D2691E" />
                  {/* Cream layer 1 */}
                  <path d="M 150,95 L 150,135 L 150,145 L 150,105 Z" fill="#FFFFF0" />
                  {/* Sponge layer 2 */}
                  <path d="M 150,105 L 150,145 L 150,165 L 150,125 Z" fill="#D2691E" />
                  {/* Cream layer 2 */}
                  <path d="M 150,125 L 150,165 L 150,170 L 150,130 Z" fill="#FFC0CB" />
                </g>
              )}

              {/* Frosting drips and decorations right side */}
              <path d="M 150,150 Q 170,158 200,150 T 230,155 T 250,150 L 250,145 L 150,145 Z" fill="#C71585" opacity="0.8" />

              {/* Right Side Toppings */}
              <circle cx="170" cy="105" r="9" fill="#D2143A" />
              <path d="M 170,98 Q 175,88 185,90" stroke="#4A2511" strokeWidth="2" fill="none" />
              <circle cx="210" cy="115" r="10" fill="#D2143A" />
              <path d="M 210,107 Q 215,97 225,99" stroke="#4A2511" strokeWidth="2" fill="none" />
            </motion.g>
          </svg>

        </div>

        {/* Actions and plates area */}
        <div className="w-full h-[70px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isCakeCut ? (
              <motion.button
                key="cut-btn"
                onClick={handleCutCake}
                disabled={isCutting}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 transition-all min-h-[56px] w-full max-w-[240px] cursor-pointer"
              >
                {isCutting ? "Cutting... 🔪" : "🎂 Take the knife!"}
              </motion.button>
            ) : (
              <motion.div
                key="share-plates"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-8 justify-center animate-fade-in"
              >
                <div className="text-center">
                  <span className="text-xl">❤️</span>
                  <p className="text-xs font-bold text-purple-700">One piece for you</p>
                </div>
                <div className="h-6 w-[1.5px] bg-purple-200" />
                <div className="text-center">
                  <span className="text-xl">😊</span>
                  <p className="text-xs font-bold text-purple-700">One piece for me</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue button */}
        <div className="w-full mt-2 h-[50px] flex items-center justify-center">
          <AnimatePresence>
            {isCakeCut && (
              <motion.button
                onClick={handleContinue}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 hover:scale-105 transition-all min-h-[48px]"
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

export default CakeScene;
