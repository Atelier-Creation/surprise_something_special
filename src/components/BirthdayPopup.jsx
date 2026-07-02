import React, { useEffect, useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Sparkles from './common/Sparkles';
import bouquet from "../assets/boque.png";
import crownImg from '../assets/crown.png';
import haritha1 from '../assets/haritha1.png';
import haritha2 from '../assets/haritha2.PNG';

// Inline SVGs for mockup stickers


const PartyHatSVG = ({ className, style }) => (
  <svg className={`${className} drop-shadow-md select-none`} style={style} viewBox="0 0 80 80">
    <path d="M 40,10 L 16,65 L 64,65 Z" fill="#E91E63" />
    <path d="M 33,26 L 47,26 L 50,34 L 30,34 Z" fill="#00BCD4" />
    <path d="M 27,41 L 53,41 L 56,49 L 24,49 Z" fill="#FFEB3B" />
    <path d="M 21,56 L 59,56 L 62,64 L 18,64 Z" fill="#8BC34A" />
    <rect x="12" y="65" width="56" height="4" rx="2" fill="#FF9800" />
    <circle cx="40" cy="8" r="6" fill="#FFEB3B" />
    <line x1="40" y1="2" x2="40" y2="5" stroke="#FF9800" strokeWidth="1.5" />
    <line x1="34" y1="4" x2="36" y2="6" stroke="#FF9800" strokeWidth="1.5" />
    <line x1="46" y1="4" x2="44" y2="6" stroke="#FF9800" strokeWidth="1.5" />
  </svg>
);

const BalloonsSVG = ({ className, style }) => (
  <svg className={`${className} drop-shadow-md select-none`} style={style} viewBox="0 0 80 100">
    <g>
      <ellipse cx="30" cy="35" rx="15" ry="20" fill="#D2143A" />
      <ellipse cx="24" cy="27" rx="3.5" ry="6" fill="#FFF" opacity="0.4" />
      <polygon points="30,55 26,60 34,60" fill="#D2143A" />
    </g>
    <g>
      <ellipse cx="48" cy="45" rx="15" ry="20" fill="#FFC107" />
      <ellipse cx="42" cy="37" rx="3.5" ry="6" fill="#FFF" opacity="0.5" />
      <polygon points="48,65 44,70 52,70" fill="#FFC107" />
    </g>
    <path d="M 30,57 Q 30,75 40,92" stroke="#475569" strokeWidth="1.5" fill="none" opacity="0.7" />
    <path d="M 48,67 Q 45,82 40,92" stroke="#475569" strokeWidth="1.5" fill="none" opacity="0.7" />
  </svg>
);

const GiftBoxesSVG = ({ className, style }) => (
  <svg className={`${className} drop-shadow-md select-none`} style={style} viewBox="0 0 80 80">
    <g>
      <rect x="10" y="44" width="24" height="24" fill="#00ACC1" rx="1.5" />
      <rect x="20" y="44" width="4" height="24" fill="#8BC34A" />
      <rect x="10" y="54" width="24" height="4" fill="#8BC34A" />
      <path d="M 22,44 Q 18,34 22,38 Q 26,34 22,44 Z" fill="#8BC34A" />
    </g>
    <g>
      <rect x="44" y="42" width="26" height="26" fill="#E91E63" rx="1.5" />
      <rect x="55" y="42" width="4" height="26" fill="#FFEB3B" />
      <rect x="44" y="53" width="26" height="4" fill="#FFEB3B" />
      <path d="M 57,42 Q 53,32 57,36 Q 61,32 57,42 Z" fill="#FFEB3B" />
    </g>
  </svg>
);

export const BirthdayPopup = ({ isActive }) => {
  const { recipientName, nextSlide } = useBirthday();
  const [nameToDisplay, setNameToDisplay] = useState(recipientName ? recipientName.toLowerCase() : "sunshine");

  // Handle the transition delay from sunshine to Haritha after 5 seconds
  useEffect(() => {
    if (!isActive) {
      setNameToDisplay(recipientName ? recipientName.toLowerCase() : "sunshine");
      return;
    }

    const timer = setTimeout(() => {
      setNameToDisplay("haritha");
      // Celebratory name reveal confetti!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [isActive, recipientName]);

  useEffect(() => {
    if (!isActive) return;

    // Fire initial confetti blast
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, [isActive]);

  const handleNext = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
    nextSlide();
  };

  const firstLetter = nameToDisplay.charAt(0);
  const remainingName = nameToDisplay.substring(1);

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-50 via-white to-blue-50 text-purple-950 overflow-hidden select-none">
      <Sparkles count={8} active={isActive} />

      {/* Symmetrical Left Side Stickers */}
      {nameToDisplay === "haritha" ? (
        <motion.img
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -4 }}
          src={haritha2}
          alt="Haritha 1"
          className="absolute left-4 md:left-26 top-[22%] w-16 h-16 md:w-52 md:h-52 z-20 object-contain animate-float-slow"
        />
      ) : (
        <PartyHatSVG
          className="absolute left-4 md:left-36 top-[24%] w-16 h-16 md:w-24 md:h-24 z-20 animate-float-slow"
        />
      )}
      <GiftBoxesSVG
        className="absolute left-2 md:left-16 top-[48%] w-20 h-20 md:w-28 md:h-28 z-20 animate-float-fast"
      />
      <BalloonsSVG
        className="absolute left-8 md:left-24 bottom-12 w-18 h-22 md:w-26 md:h-32 z-20 animate-float-fast"
      />


      {/* Symmetrical Right Side Stickers (Flipped) */}

      <BalloonsSVG
        className="absolute right-4 md:right-20 top-[48%] w-18 h-22 md:w-26 md:h-32 z-20 animate-float-medium"
        style={{ transform: 'scaleX(-1)' }}
      />

      {nameToDisplay === "haritha" ? (
        <motion.img
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 4 }}
          src={haritha1}
          alt="Haritha 2"
          className="absolute right-8 md:right-32 bottom-12 w-20 h-20 md:w-52 md:h-52 z-20 object-contain animate-float-fast"
        />
      ) : (
        <GiftBoxesSVG
          className="absolute right-8 md:right-32 bottom-12 w-20 h-20 md:w-28 md:h-28 z-20 animate-float-fast"
          style={{ transform: 'scaleX(-1)' }}
        />
      )}
      <PartyHatSVG
        className="absolute right-2 md:right-16 top-[24%] w-16 h-16 md:w-24 md:h-24 z-20 animate-float-slow"
        style={{ transform: 'scaleX(-1)' }}
      />

      {/* Main Popup Content Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.2 }}
        className="w-full max-w-full p-8 text-center relative z-20 flex flex-col justify-between items-center min-h-[75vh]"
      >
        <div className="flex flex-col items-center justify-center my-auto">
          {/* happy [Bouquet] birthday line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-1 md:gap-3 mb-1"
          >
            <span className="font-aurora text-2xl md:text-4xl  text-[#600411] italic font-medium leading-none">
              Happy
            </span>
            <img src={bouquet} />
            <span className="font-aurora text-2xl md:text-4xl text-[#600411] italic font-medium leading-none">
              Birthday
            </span>
          </motion.div>

          {/* Name/Sunshine in custom Aurora font with crown */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isActive ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: 'spring', damping: 10, delay: 0.8 }}
            className="text-4xl md:text-9xl font-aurora  text-[#600411] tracking-normal mb-8 leading-none mt-2 select-none"
          >
            <span className="relative capitalize inline-block">
              {/* Crown Image sitting right on top of the first letter */}
              <img
                src={crownImg}
                alt="Crown"
                className="absolute -top-6 md:-top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-11 md:h-11 object-contain pointer-events-none"
              />
              {firstLetter}
            </span>
            {remainingName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 0.75 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[#600411] text-xs md:text-sm max-w-[280px] mb-12 font-serif italic leading-relaxed"
          >
            May your special day be filled with endless smiles, sweet moments, and warm memories! 🌟
          </motion.p>
        </div>

        <motion.button
          onClick={handleNext}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 5.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3.5 rounded-full text-white font-bold text-base bg-[#600411] hover:bg-[#7d0a1a] shadow-md shadow-[#600411]/20 z-30 min-w-[200px] min-h-[48px] cursor-pointer"
        >
          Let's Cut the Cake! 🎂
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BirthdayPopup;
