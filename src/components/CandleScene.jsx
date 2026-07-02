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
  const [candles, setCandles] = useState([
    { id: 1, isLit: true, x: 100, y: 75, height: 40 },
    { id: 2, isLit: true, x: 150, y: 70, height: 45 },
    { id: 3, isLit: true, x: 200, y: 75, height: 40 }
  ]);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);

  // Monitor microphone blowing input
  useEffect(() => {
    if (!isActive || isCandleBlown || useTapMode || hasPermission !== true) return;

    if (isBlowing) {
      // Extinguish candles one by one in rapid succession
      extinguishAllCandlesSequentially();
    }
  }, [isBlowing, isActive, isCandleBlown, useTapMode, hasPermission]);

  // Cleanup microphone when slide changes
  useEffect(() => {
    if (!isActive) {
      stopMic();
    }
  }, [isActive]);

  const extinguishAllCandlesSequentially = () => {
    candles.forEach((candle, idx) => {
      setTimeout(() => {
        setCandles(prev =>
          prev.map(c => (c.id === candle.id ? { ...c, isLit: false } : c))
        );
      }, idx * 250);
    });

    // Complete blowing sequence
    setTimeout(() => {
      handleBlowingComplete();
    }, candles.length * 250 + 100);
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

  const handleTapCandle = (id) => {
    if (isCandleBlown) return;
    
    // Extinguish single candle
    setCandles(prev =>
      prev.map(c => (c.id === id ? { ...c, isLit: false } : c))
    );

    // Check if all candles are blown out
    const updatedCandles = candles.map(c => (c.id === id ? { ...c, isLit: false } : c));
    const allBlown = updatedCandles.every(c => !c.isLit);

    if (allBlown) {
      handleBlowingComplete();
    }
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
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm glass-card border border-white/60 p-6 rounded-3xl text-center shadow-lg relative z-20 flex flex-col justify-between items-center min-h-[460px]"
      >
        <div>
          <h2 className="text-2xl font-bold font-sans text-purple-600 mb-1">
            {isCandleBlown ? "Wish Made! ✨" : "Make a Wish!"}
          </h2>
          
          <div className="h-[48px] flex items-center justify-center">
            {isActive && !isCandleBlown && (
              <>
                {showPermissionPrompt && (
                  <p className="text-purple-950/70 text-xs px-2 font-semibold leading-tight">
                    We can detect your blowing! Give permission or tap to blow.
                  </p>
                )}

                {!showPermissionPrompt && !useTapMode && hasPermission === true && (
                  <div className="flex flex-col items-center gap-1 animate-fade-in">
                    <p className="text-purple-700/90 text-xs font-bold animate-pulse">
                      💨 Blow into the microphone now!
                    </p>
                    {/* Visual Volume Mic Meter */}
                    <div className="w-24 h-1.5 bg-purple-100 rounded-full overflow-hidden mt-1">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-75"
                        style={{ width: `${Math.min(100, volume * 180)}%` }}
                      />
                    </div>
                  </div>
                )}

                {!showPermissionPrompt && useTapMode && (
                  <p className="text-purple-700/80 text-xs font-bold animate-pulse flex items-center gap-1">
                    <FaHandPointer className="inline" /> Tap the candle flames to blow them out!
                  </p>
                )}
              </>
            )}

            {isCandleBlown && (
              <p className="text-pink-600 text-xs font-bold">
                May all your wishes come true! 💕
              </p>
            )}
          </div>
        </div>

        {/* Cake drawing + candles inside SVG */}
        <div className="relative w-[280px] h-[190px] flex items-center justify-center">
          <svg width="260" height="180" viewBox="0 0 300 200" className="overflow-visible">
            {/* The Plate */}
            <ellipse cx="150" cy="165" rx="100" ry="18" fill="#FFF0F5" stroke="#FFF" strokeWidth="2" />
            <ellipse cx="150" cy="165" rx="80" ry="12" fill="#E6E6FA" />

            {/* Whole Uncut Birthday Cake Base */}
            {/* Cylindrical Side */}
            <path d="M 60,100 L 60,155 A 90,30 0 0,0 240,155 L 240,100 A 90,30 0 0,1 60,100 Z" fill="#FFB6C1" />
            {/* Cake Top Face */}
            <ellipse cx="150" cy="100" rx="90" ry="30" fill="#FFF0F5" stroke="#FFF" strokeWidth="1" />
            {/* Cake Cream trim */}
            <path d="M 60,105 Q 90,115 120,105 T 180,105 T 240,105" fill="none" stroke="#FF69B4" strokeWidth="4" />
            
            {/* Sprinkles on top */}
            <circle cx="100" cy="95" r="2.5" fill="#D4AF37" />
            <circle cx="130" cy="108" r="2" fill="#4B0082" />
            <circle cx="170" cy="92" r="2.5" fill="#FF1493" />
            <circle cx="200" cy="102" r="2" fill="#32CD32" />

            {/* Render 3 Candles */}
            {candles.map((candle) => (
              <g 
                key={candle.id} 
                onClick={() => !usePermissionPrompt() && handleTapCandle(candle.id)}
                className={`cursor-pointer ${isCandleBlown ? 'pointer-events-none' : ''}`}
              >
                {/* Candle Stick */}
                <rect 
                  x={candle.x - 3} 
                  y={candle.y} 
                  width="6" 
                  height={candle.height} 
                  fill={candle.id % 2 === 0 ? "#FFD700" : "#BA55D3"} 
                  rx="1"
                />
                {/* Candle Stripes */}
                <path d={`M ${candle.x-3},${candle.y+10} L ${candle.x+3},${candle.y+5}`} stroke="#FFF" strokeWidth="2" />
                <path d={`M ${candle.x-3},${candle.y+25} L ${candle.x+3},${candle.y+20}`} stroke="#FFF" strokeWidth="2" />

                {/* Candle Wick */}
                <line x1={candle.x} y1={candle.y} x2={candle.x} y2={candle.y - 6} stroke="#333" strokeWidth="1.5" />

                {/* Lit Flame */}
                {candle.isLit ? (
                  <motion.path
                    d={`M ${candle.x},${candle.y - 6} 
                       C ${candle.x - 6},${candle.y - 12} ${candle.x - 5},${candle.y - 24} ${candle.x},${candle.y - 30} 
                       C ${candle.x + 5},${candle.y - 24} ${candle.x + 6},${candle.y - 12} ${candle.x},${candle.y - 6} Z`}
                    fill="url(#flameGradient)"
                    className="origin-bottom animate-flicker"
                    style={{ transformOrigin: `${candle.x}px ${candle.y - 6}px` }}
                  />
                ) : (
                  /* Smoke Effect when extinguished */
                  <g className="animate-smoke" style={{ transformOrigin: `${candle.x}px ${candle.y - 6}px` }}>
                    <circle cx={candle.x} cy={candle.y - 12} r="4" fill="rgba(200,200,200,0.6)" className="animate-smoke" />
                    <circle cx={candle.x + 4} cy={candle.y - 20} r="6" fill="rgba(220,220,220,0.4)" className="animate-smoke" style={{ animationDelay: '0.2s' }} />
                  </g>
                )}
              </g>
            ))}

            {/* Gradient Definitions */}
            <defs>
              <radialGradient id="flameGradient" cx="50%" cy="80%" r="50%">
                <stop offset="0%" stopColor="#FFFF00" />
                <stop offset="50%" stopColor="#FF8C00" />
                <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Conditional Setup Buttons */}
        <div className="w-full h-[70px] flex items-center justify-center gap-4">
          <AnimatePresence>
            {isActive && showPermissionPrompt && !isCandleBlown && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-3 z-30"
              >
                <button
                  onClick={handleRequestMic}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 flex items-center gap-1.5 min-h-[48px]"
                >
                  <FaMicrophone /> Use Mic
                </button>
                <button
                  onClick={handleSkipToTap}
                  className="px-4 py-2 rounded-full text-xs font-bold text-purple-800 border border-purple-200 bg-white hover:bg-purple-50/50 flex items-center gap-1.5 min-h-[48px] shadow-sm"
                >
                  <FaHandPointer /> Tap Mode
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        <div className="w-full h-[50px] flex items-center justify-center">
          <AnimatePresence>
            {isCandleBlown && (
              <motion.button
                onClick={handleContinue}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 transition-all min-h-[48px]"
              >
                Continue ✨
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );

  function usePermissionPrompt() {
    return showPermissionPrompt && !isCandleBlown;
  }
};

export default CandleScene;
