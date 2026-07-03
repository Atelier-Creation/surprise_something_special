import React, { useEffect, useState } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Sparkles from './common/Sparkles';
import bouquet from "../assets/boque.png";
import crownImg from '../assets/crown.png';
import haritha1 from '../assets/haritha1.png';
import haritha2 from '../assets/haritha2.PNG';
import partyhat from '../assets/balloons.png';
import camera from '../assets/camera.png';
import giftbox from '../assets/GiftBoxes.png';
import partyWizzela from '../assets/party_wizzela.png';

// Inline SVGs for mockup stickers




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
      setNameToDisplay("harithaa");
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
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-white text-purple-950 overflow-hidden select-none">
      <Sparkles count={8} active={isActive} />

      {/* Symmetrical Left Side Stickers */}
      <img src={partyhat}
        className="absolute left-4 md:left-36 top-[18%] w-16 h-16 md:w-24 md:h-24 z-20 animate-float-slow"
      />
        {nameToDisplay === "harithaa" ? (<></>):( 
      <img src={partyWizzela}
        className="absolute left-2 md:left-16 top-[48%] w-20 h-20 md:w-28 md:h-28 z-20 animate-float-fast"
      />)}
      
      <AnimatePresence mode="wait">
        {nameToDisplay === "harithaa" ? (
          <motion.img
            key="haritha2"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: -45 }}
            // transition={{ type: 'spring', damping: 15, stiffness: 80 }}
            src={haritha2}
            alt="Haritha 1"
            className="absolute left-4 md:-left-15 -bottom-5 w-36 h-36 md:w-120 md:h-120 z-20 object-contain"
          />
        ) : (
          <motion.div
            key="balloons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-8 md:left-24 bottom-26 w-18 h-22 md:w-26 md:h-32 z-20 animate-float-fast"
          >
            <img src={camera} className="w-full object-contain h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Symmetrical Right Side Stickers (Flipped) */}
      {nameToDisplay === "harithaa" ? (<></>):( 
      <BalloonsSVG
        className="absolute right-4 md:right-20 top-[48%] w-18 h-22 md:w-26 md:h-32 z-20 animate-float-medium"
        style={{ transform: 'scaleX(-1)' }}
      />)}

      <AnimatePresence mode="wait">
        {nameToDisplay === "harithaa" ? (
          <motion.img
            key="haritha1"
            initial={{ opacity: 0, scale: 0, rotate: 45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 45 }}
            // transition={{ type: 'spring', damping: 15, stiffness: 80 }}
            src={haritha1}
            alt="Haritha 2"
            style={{ transform: 'scaleX(-1)' }}
            className="absolute right-8 md:-right-15 bottom-0 w-40 h-40 md:w-130 md:h-130 z-20 object-contain"
          />
        ) : (
          <motion.div
            key="giftbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute right-8 md:right-32 bottom-12 w-20 h-20 md:w-28 md:h-28 z-20 animate-float-fast"
            style={{ transform: 'scaleX(-1)' }}
          >
            <img src={camera} className="w-full object-contain h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <img src={giftbox}
        className="absolute right-2 md:right-16 top-[18%] w-16 h-16 md:w-24 md:h-24 z-20 animate-float-fast"
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
            className="flex items-center justify-center gap-1 md:gap-3 mb-10"
          >
            <span className="font-aurora text-2xl md:text-4xl  text-[#d02120] italic font-medium leading-none">
              Happy
            </span>
            <img src={bouquet} className='h-30'/>
            <span className="font-aurora text-2xl md:text-4xl text-[#d02120] italic font-medium leading-none">
              Birthday
            </span>
          </motion.div>

          {/* Name/Sunshine in custom Aurora font with crown */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={nameToDisplay}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={isActive ? { opacity: 1, y: 0, scale: 1 } : {}}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 80 }}
              className="text-4xl md:text-9xl font-aurora text-[#d02120] tracking-normal mb-8 leading-none mt-2 select-none"
            >
              <span className="relative capitalize inline-block">
                {/* Crown Image sitting right on top of the first letter */}
                <img
                  src={crownImg}
                  alt="Crown"
                  className="absolute -top-6 md:-top-28 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-36 md:h-36 object-contain pointer-events-none"
                />
                {firstLetter}
              </span>
              {remainingName}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 0.75 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-[#d02120] text-xs md:text-sm max-w-[280px] mb-12 font-serif italic leading-relaxed"
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
          className="px-8 py-3.5 rounded-full text-white font-bold text-base bg-[#d02120] hover:bg-[#bf1f1e] shadow-md shadow-[#d02120]/20 z-30 min-w-[200px] min-h-[48px] cursor-pointer"
        >
          Let's Cut the Cake! 🎂
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BirthdayPopup;
