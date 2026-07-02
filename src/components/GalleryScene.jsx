import React, { useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import { FaTimes } from 'react-icons/fa';

export const GalleryScene = ({ isActive }) => {
  const { nextSlide } = useBirthday();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&q=80&w=600',
      caption: 'opposites attract 🫶',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600',
      caption: 'our little universe ✨',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600',
      caption: 'my favorite place ❤️',
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/31760918/pexels-photo-31760918.jpeg',
      caption: 'straight out of a movie 🌅',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=600',
      caption: 'kissed by the rain 🌧️',
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=600',
      caption: 'tiny chaos 🐾',
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-start h-full w-full px-4 pt-12 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 z-20"
      >
        <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-blue-500 block mb-1">
          A Little Gallery
        </span>
        <h2 className="text-3xl font-bold text-purple-950 font-serif">
          Us, in pictures
        </h2>
        <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full shadow-sm" />
      </motion.div>

      {/* Photo Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 px-2 pb-32 overflow-y-auto max-h-[calc(100vh-350px)] w-full max-w-md z-20 scrollbar-none"
        style={{ touchAction: 'pan-y' }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? -1 : 1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-3 pb-5 rounded-md shadow-md border border-slate-100 flex flex-col items-center cursor-pointer transition-shadow hover:shadow-lg"
          >
            <div className="w-full aspect-square overflow-hidden rounded-sm bg-slate-50 mb-3">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="font-handwritten text-purple-700 text-xs md:text-sm font-semibold text-center mt-1">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Continue Button */}
      {isActive && (
        <div className="absolute bottom-22 left-1/2 transform -translate-x-1/2 z-30">
          <motion.button
            onClick={nextSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 backdrop-blur-md min-h-[48px] flex items-center justify-center whitespace-nowrap"
          >
            See Gifts 🎁
          </motion.button>
        </div>
      )}

      {/* Lightbox / Zoom Modal Overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
          >
            {/* Close Button top right */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white text-2xl hover:scale-110 active:scale-95 transition-all w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 border border-white/10 z-55"
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>

            {/* Polaroid card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 pb-8 rounded-3xl shadow-2xl border border-white/20 max-w-[90%] md:max-w-md w-full flex flex-col items-center z-55"
            >
              <div className="w-full aspect-square overflow-hidden rounded-2xl bg-slate-50 mb-5">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwritten text-purple-700 text-lg md:text-xl font-bold text-center">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryScene;
