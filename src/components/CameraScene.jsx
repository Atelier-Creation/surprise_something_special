import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import cameraImg from '../assets/camera_1.png';
import confetti from 'canvas-confetti';

// Import images
import bestFriendsImg from '../assets/best_frends_for_ever.jpeg';
import bigEarsImg from '../assets/i_got_big_ears.jpeg';
import theLegend from '../assets/the-legend.jpeg';
import pookieImg from '../assets/pookie.jpeg';

const PolaroidCard = ({ photo, angle, onClick }) => (
  <motion.div
    initial={{ scale: 0.5, y: -40, opacity: 0, rotate: angle * 2 }}
    animate={{ scale: 1, y: 0, opacity: 1, rotate: parseFloat(angle) }}
    whileHover={{ scale: 1.05, zIndex: 30 }}
    onClick={onClick}
    className="bg-white p-2 pb-3 rounded shadow-md border border-slate-100 flex flex-col items-center cursor-pointer origin-center transform transition-shadow hover:shadow-lg w-[180px] md:w-[200px]"
  >
    <div className="w-full aspect-square overflow-hidden rounded bg-slate-50 mb-1.5 pointer-events-none">
      <img src={photo.src} className="w-full h-full object-cover" alt="" />
    </div>
    <p className="font-handwritten text-[9px] md:text-[11px] text-[#d02120] font-bold text-center leading-none mt-1 select-none pointer-events-none truncate w-full">
      {photo.caption}
    </p>
  </motion.div>
);

export const CameraScene = ({ isActive }) => {
  const { nextSlide, playSFX } = useBirthday();
  const [revealedCount, setRevealedCount] = useState(0);
  const [flash, setFlash] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const memories = [
    {
      id: 1,
      src: bestFriendsImg,
      caption: 'best frends for ever',
    },
    {
      id: 2,
      src: bigEarsImg,
      caption: 'i got big ears',
    },
    {
      id: 3,
      src: theLegend,
      caption: 'we are Legends',
    },
    {
      id: 4,
      src: pookieImg,
      caption: 'pookie',
    },
  ];

  const handleCapture = () => {
    if (revealedCount >= 4) return;

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
    <div className="relative flex flex-col items-center justify-start h-full w-full px-4 pt-6 bg-white text-purple-950 overflow-hidden select-none">
      {/* <FloatingStickers count={12} active={isActive} /> */}

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
        className="text-center mb-2 z-20"
      >
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-[#d02120] block mb-0.5">
          Captured Moments
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#bf1f1e] font-serif">
          Press for a memory
        </h2>
        <div className="w-10 h-0.5 bg-blue-500 mx-auto mt-1 rounded-full shadow-sm" />
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
          className="w-[130px] h-[130px] rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center bg-blue-50/10 backdrop-blur-sm relative"
        >
          <img
            src={cameraImg}
            alt="Camera"
            className="w-20 h-20 object-contain filter drop-shadow-[0_4px_10px_rgba(59,130,246,0.15)]"
          />
        </motion.div>
        <p className="text-[10px] md:text-xs text-purple-900/60 font-semibold mt-2">
          {revealedCount < 4
            ? `Tap the camera · ${4 - revealedCount} memories left`
            : "✦ every memory revealed"}
        </p>
      </motion.div>

      {/* Symmetrical Polaroid Grid Area */}
      <div className="w-full max-w-lg md:max-w-4xl mt-10 flex flex-col items-center gap-3.5 z-20 overflow-y-auto max-h-[calc(100vh-270px)] scrollbar-none pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full justify-items-center">
          {revealedCount >= 1 && <PolaroidCard photo={memories[0]} angle="-4" onClick={() => setSelectedPhoto(memories[0])} />}
          {revealedCount >= 2 && <PolaroidCard photo={memories[1]} angle="2" onClick={() => setSelectedPhoto(memories[1])} />}
          {revealedCount >= 3 && <PolaroidCard photo={memories[2]} angle="-2" onClick={() => setSelectedPhoto(memories[2])} />}
          {revealedCount >= 4 && <PolaroidCard photo={memories[3]} angle="4" onClick={() => setSelectedPhoto(memories[3])} />}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (Click to zoom like in Gallery) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -4 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 4 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-7 rounded-xl shadow-2xl max-w-sm w-full flex flex-col items-center border border-slate-200"
            >
              {/* Close button */}
              <div className="w-full flex justify-end mb-2">
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="text-slate-500 hover:text-slate-800 text-lg w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 cursor-pointer transition-colors"
                >
                  ✕
                </button>
              </div>
              {/* Image Frame */}
              <div className="w-full aspect-square overflow-hidden rounded bg-slate-100 shadow-inner mb-4">
                <img 
                  src={selectedPhoto.src} 
                  className="w-full h-full object-cover select-none" 
                  alt={selectedPhoto.caption} 
                />
              </div>
              {/* Caption */}
              <p className="font-handwritten text-lg md:text-xl text-[#d02120] font-bold text-center select-none leading-none">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation button */}
      <div className="absolute bottom-26 md:bottom-16 left-1/2 transform -translate-x-1/2 z-30 h-[48px]">
        <AnimatePresence>
          {revealedCount === 4 && (
            <motion.button
              onClick={nextSlide}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full text-white font-bold text-base bg-[#d02120] hover:bg-[#bf1f1e] shadow-md shadow-[#d02120]/20 min-h-[48px] flex items-center justify-center whitespace-nowrap cursor-pointer"
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
