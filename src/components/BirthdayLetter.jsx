import React, { useRef } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import FloatingStickers from './common/FloatingStickers';
import flowerImg from '../assets/flower_4.png';

export const BirthdayLetter = ({ isActive }) => {
  const { birthdayMessage, recipientName, senderName, nextSlide } = useBirthday();
  const scrollRef = useRef(null);

  const handleNext = () => {
    nextSlide();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-white text-purple-950 overflow-hidden select-none">
      <FloatingStickers count={12} active={isActive} />

      <div className="flex flex-col items-center gap-6 w-full max-w-7xl z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#FCFBF7] border border-slate-200/80 rounded-2xl shadow-xl relative flex flex-col justify-between items-center min-h-[480px] md:min-h-[550px] overflow-hidden"
        >
          {/* Notebook Margins and Lines */}
          <div className="absolute top-0 bottom-0 left-8 md:left-14 w-[1px] bg-red-400/50 pointer-events-none z-10" />

          <div className="w-full flex-grow flex flex-col justify-start p-6 !pb-0 pl-12 md:p-12 md:pl-24 md:pr-12 md:py-10 relative z-10">
            {/* Rule Lines Container */}
            <div
              ref={scrollRef}
              className="w-full max-h-[350px] md:max-h-[500px] overflow-y-auto scrollbar-thin text-left select-none relative pb-6"
              style={{
                backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px)',
                backgroundSize: '100% 28px',
                lineHeight: '28px',
                paddingTop: '4px'
              }}
            >
              {/* Date header */}
              <span className="text-[10px] tracking-widest text-slate-400 font-sans block mb-1 leading-none uppercase">
                JUNE 2026
              </span>

              {/* Greeting */}
              <h3 className="text-lg md:text-xl font-bold font-serif text-blue-800 mb-2 leading-relaxed">
                My dearest {recipientName || "SunShine"},
              </h3>

              {/* Letter Body - Rendered instantly without typing animation */}
              <p className="text-slate-700 text-sm md:text-base font-serif leading-[28px] whitespace-pre-line">
                {birthdayMessage}
              </p>

              {/* Sign-off */}
              <span className="block text-right font-serif italic text-blue-800 text-base md:text-lg mt-6 leading-relaxed">
                Forever yours, {senderName || "ME"}
              </span>
            </div>
          </div>

          {/* Overlapping Flower Sticker */}
          <motion.img
            src={flowerImg}
            alt="Flower"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-4 w-24 h-24 md:w-28 md:h-28 object-contain z-30 pointer-events-none drop-shadow-md"
          />
        </motion.div>

        {/* Continue Button Area outside the paper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full flex justify-center"
        >
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full text-white font-bold text-base bg-[#d02120] hover:bg-[#bf1f1e] shadow-md shadow-[#d02120]/20 transition-all min-h-[48px] w-full max-w-[200px] md:max-w-[260px] cursor-pointer"
          >
            Open Your Gifts 🎁
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BirthdayLetter;
