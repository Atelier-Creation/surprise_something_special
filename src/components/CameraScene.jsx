import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import cameraImg from '../assets/camera_1.png';
import confetti from 'canvas-confetti';

export const CameraScene = ({ isActive }) => {
  const { nextSlide, playSFX } = useBirthday();
  const [revealedCount, setRevealedCount] = useState(0);
  const [flash, setFlash] = useState(false);

  const memories = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      caption: 'main character 💋',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      caption: 'too cool ✌️',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      caption: 'tiny chaos 🐾',
    },
  ];

  const handleCapture = () => {
    if (revealedCount >= 3) return;

    // Camera flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    // Play camera click SFX
    playSFX('cameraClick');

    // Sprinkle light sparkles/confetti to mimic camera flash particles
    confetti({
      particleCount: 15,
      angle: 90,
      spread: 45,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#FFF', '#BAE6FD', '#FBCFE8', '#FFF'],
    });

    setRevealedCount((prev) => prev + 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full px-6 pt-12 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      {/* Camera Shutter Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 z-20"
      >
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-blue-500 block mb-1">
          Captured Moments
        </span>
        <h2 className="text-3xl font-bold text-purple-950 font-serif">
          Press for a memory
        </h2>
        <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow-sm" />
      </motion.div>

      {/* Camera shutter circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={handleCapture}
        className="z-20 flex flex-col items-center cursor-pointer mb-2"
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="w-[210px] h-[210px] rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center bg-blue-50/10 backdrop-blur-sm relative"
        >
          <img
            src={cameraImg}
            alt="Camera"
            className="w-32 h-32 object-contain filter drop-shadow-[0_4px_10px_rgba(59,130,246,0.15)]"
          />
        </motion.div>
        <p className="text-xs text-purple-900/60 font-semibold mt-4">
          {revealedCount < 3
            ? `Tap the camera · ${3 - revealedCount} memories left`
            : "All memories captured! 💖"}
        </p>
      </motion.div>

      {/* Polaroid cards stack area */}
      <div className="relative w-full max-w-xs h-[230px] mt-2 flex justify-center items-start z-20">
        <AnimatePresence>
          {revealedCount >= 1 && (
            <motion.div
              initial={{ scale: 0.5, rotate: -45, y: -80, opacity: 0 }}
              animate={{ scale: 0.85, rotate: -8, x: -50, y: 15, opacity: 1, zIndex: 10 }}
              className="absolute bg-white p-2.5 pb-4 rounded-xl shadow-md border border-slate-100 w-[120px] flex flex-col items-center"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg bg-slate-50 mb-2">
                <img src={memories[0].src} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-handwritten text-[9px] text-purple-700 font-bold whitespace-nowrap">
                {memories[0].caption}
              </p>
            </motion.div>
          )}

          {revealedCount >= 2 && (
            <motion.div
              initial={{ scale: 0.5, rotate: 45, y: -80, opacity: 0 }}
              animate={{ scale: 0.85, rotate: 8, x: 50, y: 15, opacity: 1, zIndex: 11 }}
              className="absolute bg-white p-2.5 pb-4 rounded-xl shadow-md border border-slate-100 w-[120px] flex flex-col items-center"
            >
              <div className="w-full aspect-square overflow-hidden rounded-lg bg-slate-50 mb-2">
                <img src={memories[1].src} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-handwritten text-[9px] text-purple-700 font-bold whitespace-nowrap">
                {memories[1].caption}
              </p>
            </motion.div>
          )}

          {revealedCount >= 3 && (
            <motion.div
              initial={{ scale: 0.5, y: -80, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, x: 0, y: 45, opacity: 1, zIndex: 20 }}
              className="absolute bg-white p-3 pb-5 rounded-md shadow-lg border border-slate-150 w-[140px] flex flex-col items-center"
            >
              <div className="w-full aspect-square overflow-hidden rounded-sm bg-slate-50 mb-2.5">
                <img src={memories[2].src} className="w-full h-full object-cover" alt="" />
              </div>
              <p className="font-handwritten text-xs text-purple-700 font-bold whitespace-nowrap">
                {memories[2].caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 h-[48px]">
        <AnimatePresence>
          {revealedCount === 3 && (
            <motion.button
              onClick={nextSlide}
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

export default CameraScene;
