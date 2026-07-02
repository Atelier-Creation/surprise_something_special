import React, { useState, useRef, useEffect } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import Sparkles from './common/Sparkles';
import balloonsImg from '../assets/balloons_1.png';
import cameraImg from '../assets/camera_1.png';
import presentImg from '../assets/present.png';

export const WelcomeScreen = () => {
  const { nextSlide, startMusicOnInteraction } = useBirthday();
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const cardRef = useRef(null);

  const escapeNoButton = () => {
    if (!cardRef.current) return;

    // Increment escape counter
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    // Swap positions after 3 escape attempts to tease the user
    if (nextCount === 3) {
      setSwapped(true);
    }

    const cardRect = cardRef.current.getBoundingClientRect();
    const btnWidth = 100;
    const btnHeight = 48;

    // Bounds within the card to prevent jumping off-screen
    const maxX = cardRect.width / 2 - btnWidth;
    const minX = -cardRect.width / 2 + btnWidth;
    const maxY = cardRect.height / 2 - btnHeight;
    const minY = -cardRect.height / 2 + btnHeight;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoBtnPos({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    startMusicOnInteraction();
    nextSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      {/* Background Stickers floating up */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[8%] w-16 h-16 bg-white/20 rounded-full blur-md" />
        <div className="absolute bottom-[15%] right-[8%] w-24 h-24 bg-white/30 rounded-full blur-lg" />
      </div>

      {/* Floating Animated Stickers */}
      <motion.img
        src={balloonsImg}
        alt="Balloons"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, -3, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-12 right-6 w-24 h-24 md:w-32 md:h-32 object-contain z-10 drop-shadow-md pointer-events-none"
      />

      <motion.img
        src={presentImg}
        alt="Present"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -4, 4, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-14 left-6 w-20 h-20 md:w-28 md:h-28 object-contain z-10 drop-shadow-md pointer-events-none"
      />

      <motion.img
        src={cameraImg}
        alt="Camera"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-36 right-8 w-16 h-16 md:w-22 md:h-22 object-contain z-10 drop-shadow-md opacity-80 pointer-events-none"
      />

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full max-w-sm p-8 rounded-3xl text-center relative z-20 flex flex-col justify-between min-h-[80vh]"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-6xl mb-6 block drop-shadow-sm"
        >
          🎁
        </motion.span>

        <h1 className="text-3xl capitalize font-bold font-sans mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 leading-tight">
          Are you ready for your birthday surprise?
        </h1>

        <p className="text-purple-950/60 text-sm mb-8 font-medium">
          Turn up your volume 🔊 and get ready for a little magic!
        </p>

        <div className={`relative flex items-center justify-center gap-6 mt-4 ${swapped ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* YES BUTTON */}
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 animate-pulse-glow z-30 min-w-[110px] min-h-[48px]"
          >
            YES!
          </motion.button>

          {/* NO BUTTON */}
          <motion.button
            onClick={escapeNoButton}
            animate={{
              x: noBtnPos.x,
              y: noBtnPos.y,
              scale: noCount > 5 ? 0.75 : 1,
              rotate: noCount * 15
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="px-6 py-2 rounded-full text-purple-900/80 font-semibold text-base border border-purple-200 bg-white/40 hover:bg-white/60 transition-colors duration-150 min-w-[90px] min-h-[48px] z-30"
          >
            {noCount > 4 ? "Wait..." : "No"}
          </motion.button>
        </div>

        {/* Small tease tooltip */}
        <AnimatePresence>
          {noCount > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-purple-700/80 font-bold mt-6 absolute bottom-4 left-0 right-0 text-center"
            >
              {noCount < 3 && "You can't click NO! 😝"}
              {noCount >= 3 && noCount < 5 && "Positions swapped! Sneaky! 😉"}
              {noCount >= 5 && "Give up yet? Say YES! 💕"}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
