import React, { useEffect } from 'react';
import { useBirthday } from '../context/BirthdayContext';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import FloatingStickers from './common/FloatingStickers';
import Sparkles from './common/Sparkles';
import { FaSyncAlt, FaShareAlt } from 'react-icons/fa';

export const FinalScene = ({ isActive }) => {
  const { senderName, recipientName, resetAll } = useBirthday();

  useEffect(() => {
    if (!isActive) return;

    // Launch periodic confetti bursts for celebration
    const interval = setInterval(() => {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => {
          toast.success("Surprise link copied! Share it with Sophia! 🌸", {
            duration: 3500,
            position: 'bottom-center',
            style: {
              background: '#FFF0F5',
              color: '#4B0082',
              borderRadius: '20px',
              border: '1.5px solid #FF69B4',
              fontSize: '13px',
              fontWeight: '600'
            }
          });
        })
        .catch(() => {
          toast.error("Unable to copy automatically.");
        });
    } else {
      toast.error("Clipboard unsupported in this environment.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full px-6 bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-100 text-purple-950 overflow-hidden select-none">
      <Sparkles count={15} active={isActive} />
      <FloatingStickers count={12} active={isActive} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm glass-card border border-white/60 p-8 rounded-3xl text-center shadow-lg relative z-20 flex flex-col justify-center items-center min-h-[440px]"
      >
        {/* Giant Beating Heart */}
        <motion.div
          animate={isActive ? { scale: [1, 1.12, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="text-7xl mb-6 text-red-500 drop-shadow-[0_4px_10px_rgba(239,68,68,0.2)] cursor-pointer"
          onClick={() => {
            confetti({ particleCount: 30, spread: 40, colors: ['#EF4444', '#FFF'] });
          }}
        >
          ❤️
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl font-handwritten text-pink-600 mb-1"
        >
          With Love,
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-2xl font-bold font-sans tracking-wide text-purple-900 mb-2"
        >
          Best Wishes From
        </motion.h1>

        <motion.h3
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6, type: 'spring', damping: 10 }}
          className="text-4xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600 tracking-wider mb-8 filter drop-shadow-sm"
        >
          {senderName}
        </motion.h3>

        {/* Replay and Share buttons */}
        <div className="flex flex-col gap-4 w-full z-35">
          {/* <motion.button
            onClick={handleShare}
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-bold text-base bg-gradient-to-r from-pink-500 to-purple-600 shadow-md shadow-pink-500/20 min-h-[48px]"
          >
            <FaShareAlt /> Share Surprise
          </motion.button> */}

          <motion.button
            onClick={resetAll}
            initial={{ opacity: 0, y: 15 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-purple-800 border border-purple-200 bg-white/40 hover:bg-white/60 transition-all min-h-[48px] shadow-sm font-semibold"
          >
            <FaSyncAlt /> Replay Story
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalScene;
