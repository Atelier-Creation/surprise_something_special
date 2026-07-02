import React, { useEffect } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';

export const CaptionScene = ({ isActive }) => {
  const { nextSlide } = useBirthday();

  useEffect(() => {
    if (!isActive) return;

    // Auto progress after 4.5 seconds
    const timer = setTimeout(() => {
      nextSlide();
    }, 4500);

    return () => clearTimeout(timer);
  }, [isActive]);

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-8 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <motion.div
        animate={isActive ? { scale: [1, 1.25], opacity: [0.4, 0.6] } : {}}
        transition={{ duration: 5, ease: "easeOut" }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at center, rgba(244, 63, 94, 0.25) 0%, rgba(168, 85, 247, 0.15) 55%, transparent 75%)' }}
      />

      <FloatingStickers count={10} active={isActive} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {isActive && Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, x: Math.random() * 200 - 100 }}
            animate={{ opacity: [0, 0.6, 0], y: -200, x: Math.random() * 200 - 100 }}
            transition={{ duration: 4, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute left-1/2 bottom-10 w-2 h-2 rounded-full bg-pink-400"
            style={{ filter: 'blur(1.5px)' }}
          />
        ))}
      </div>

      <div className="relative z-20 text-center max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative px-6 py-4"
        >
          {/* Double Quotes Icon */}
          <span className="absolute -top-4 -left-2 text-pink-500/20 text-8xl font-serif leading-none select-none">“</span>
          
          <h1 className="text-2xl md:text-3xl font-medium font-serif leading-relaxed italic text-transparent bg-clip-text bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 px-4 py-2 relative z-10">
            Some people make life brighter just by being in it.
          </h1>

          <span className="absolute -bottom-8 -right-2 text-pink-500/20 text-8xl font-serif leading-none select-none">”</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CaptionScene;
