import React, { useEffect, useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { useMicrophone } from '../hooks/useMicrophone';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingStickers from './common/FloatingStickers';
import { FaMicrophone, FaHandPointer } from 'react-icons/fa';

export const CandleScene = ({ isActive }) => {
  const { isCandleBlown, blowCandle, nextSlide } = useBirthday();
  const { isSupported, hasPermission, isBlowing, volume, requestPermission, stopMic } = useMicrophone();
  
  const [useTapMode, setUseTapMode] = useState(false);
  const [isLit, setIsLit] = useState(!isCandleBlown);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);

  // Sync state if candle has been blown previously
  useEffect(() => {
    if (isActive) {
      setIsLit(!isCandleBlown);
    }
  }, [isActive, isCandleBlown]);

  // Monitor microphone blowing input
  useEffect(() => {
    if (!isActive || !isLit || useTapMode || hasPermission !== true) return;

    if (isBlowing) {
      handleExtinguish();
    }
  }, [isBlowing, isActive, isLit, useTapMode, hasPermission]);

  // Cleanup microphone when slide changes
  useEffect(() => {
    if (!isActive) {
      stopMic();
    }
  }, [isActive]);

  const handleExtinguish = () => {
    if (!isLit) return;
    setIsLit(false);
    
    // Complete blowing sequence with confetti
    setTimeout(() => {
      handleBlowingComplete();
    }, 500);
  };

  const handleBlowingComplete = () => {
    if (isCandleBlown) return;
    
    // Trigger blow out in context (sound + cheers)
    blowCandle();
    
    // Stop recording
    stopMic();
    
    // Explode multi-color confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleRequestMic = async () => {
    const granted = await requestPermission();
    setShowPermissionPrompt(false);
    if (!granted) {
      setUseTapMode(true);
    }
  };

  const handleSkipToTap = () => {
    setShowPermissionPrompt(false);
    setUseTapMode(true);
  };

  const handleContinue = () => {
    nextSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full px-6 pt-12 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-4 z-20"
      >
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-blue-500 block mb-1">
          A Birthday Ritual
        </span>
        <h2 className="text-3xl font-bold text-purple-950 font-serif">
          Make a wish
        </h2>
        <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow-sm" />
      </motion.div>

      {/* Subtext description matching mockup */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.75 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xs md:text-sm font-serif italic text-purple-900 text-center max-w-xs mb-8 z-20 leading-relaxed px-4"
      >
        Close your eyes · think of something beautiful · then blow out the candle
      </motion.p>

      {/* Main Candle Area */}
      <div 
        onClick={() => {
          if (!showPermissionPrompt && (useTapMode || isCandleBlown)) {
            handleExtinguish();
          }
        }}
        className={`relative w-[280px] h-[260px] flex items-center justify-center z-20 cursor-pointer ${
          isCandleBlown ? 'pointer-events-none' : ''
        }`}
      >
        <svg width="200" height="260" viewBox="0 0 200 260" className="overflow-visible">
          {/* Shadow Glow under candle */}
          <ellipse cx="100" cy="245" rx="55" ry="9" fill="#E2E8F0" opacity="0.65" filter="blur(1px)" />
          {isLit && (
            <ellipse cx="100" cy="245" rx="35" ry="6" fill="#FDE047" opacity="0.3" filter="blur(2px)" />
          )}

          {/* Candle Body */}
          <rect 
            x="82" 
            y="110" 
            width="36" 
            height="130" 
            fill="url(#candleGrad)" 
            rx="10"
            stroke="#F1F5F9"
            strokeWidth="1"
          />

          {/* Candle body segments / horizontal lines */}
          <line x1="82" y1="140" x2="118" y2="140" stroke="#F1F5F9" strokeWidth="1.5" />
          <line x1="82" y1="170" x2="118" y2="170" stroke="#F1F5F9" strokeWidth="1.5" />
          <line x1="82" y1="200" x2="118" y2="200" stroke="#F1F5F9" strokeWidth="1.5" />

          {/* Candle Wick */}
          <line x1="100" y1="110" x2="100" y2="98" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lit Flame */}
          {isLit ? (
            <g>
              {/* Radial glow background */}
              <circle cx="100" cy="72" r="32" fill="#F59E0B" opacity="0.15" filter="blur(6px)" />
              <circle cx="100" cy="72" r="16" fill="#FDE047" opacity="0.25" filter="blur(3px)" />

              <motion.path
                d="M 100,98 
                   C 92,90 88,78 100,50 
                   C 112,78 108,90 100,98 Z"
                fill="url(#flameGrad)"
                className="origin-bottom animate-flicker"
                style={{ transformOrigin: "100px 98px" }}
              />
            </g>
          ) : (
            /* Smoke Effect when extinguished */
            <g key="smoke">
              {/* Drift line 1 */}
              <motion.path
                initial={{ opacity: 0.8, pathLength: 0, y: 0 }}
                animate={{ opacity: 0, pathLength: 1, y: -60, x: [-2, 8, -4, 2] }}
                transition={{ duration: 2, ease: "easeOut" }}
                d="M 100,95 Q 96,80 104,65 T 98,45"
                fill="none"
                stroke="#64748B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Drift line 2 */}
              <motion.path
                initial={{ opacity: 0.6, pathLength: 0, y: 0 }}
                animate={{ opacity: 0, pathLength: 1, y: -50, x: [2, -6, 4, -2] }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.15 }}
                d="M 98,95 Q 102,82 96,68 T 102,52"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Little smoke puffs */}
              <motion.circle
                initial={{ opacity: 0.7, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -70, scale: 2, x: [0, 10, -5, 5] }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 0.1 }}
                cx="100"
                cy="85"
                r="5"
                fill="#CBD5E1"
              />
            </g>
          )}

          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <radialGradient id="flameGrad" cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FEF08A" />
              <stop offset="60%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Interaction Mode Status */}
      <div className="h-[48px] flex items-center justify-center z-20 mt-4 mb-2">
        {isActive && !isCandleBlown && (
          <>
            {showPermissionPrompt && (
              <p className="text-purple-950/70 text-xs px-2 font-semibold leading-tight text-center">
                We can detect your blowing! Give permission or skip to tap.
              </p>
            )}

            {!showPermissionPrompt && !useTapMode && hasPermission === true && (
              <div className="flex flex-col items-center gap-1 animate-fade-in">
                <p className="text-purple-700/95 text-xs font-bold animate-pulse">
                  💨 Blow into the microphone now!
                </p>
                {/* Visual Volume Mic Meter */}
                <div className="w-24 h-1.5 bg-purple-100 rounded-full overflow-hidden mt-1 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-75"
                    style={{ width: `${Math.min(100, volume * 180)}%` }}
                  />
                </div>
              </div>
            )}

            {!showPermissionPrompt && useTapMode && (
              <p className="text-purple-700/80 text-xs font-bold animate-pulse flex items-center gap-1">
                <FaHandPointer className="inline text-purple-600" /> Tap the candle to blow it out!
              </p>
            )}
          </>
        )}

        {isCandleBlown && (
          <p className="text-pink-600 text-sm font-bold animate-pulse">
            May all your wishes come true! 💕
          </p>
        )}
      </div>

      {/* Conditional Setup Buttons */}
      <div className="w-full h-[60px] flex items-center justify-center gap-4 z-20">
        <AnimatePresence>
          {isActive && showPermissionPrompt && !isCandleBlown && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3"
            >
              <button
                onClick={handleRequestMic}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 flex items-center gap-1.5 min-h-[44px]"
              >
                <FaMicrophone /> Use Mic
              </button>
              <button
                onClick={handleSkipToTap}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-purple-800 border border-purple-200 bg-white hover:bg-purple-50/50 flex items-center gap-1.5 min-h-[44px] shadow-sm"
              >
                <FaHandPointer /> Tap Mode
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 h-[48px]">
        <AnimatePresence>
          {isCandleBlown && (
            <motion.button
              onClick={handleContinue}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 backdrop-blur-md min-h-[48px] flex items-center justify-center whitespace-nowrap"
            >
              Continue ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CandleScene;
