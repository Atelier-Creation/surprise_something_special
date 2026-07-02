import React, { createContext, useContext, useState, useEffect } from 'react';
import { birthdayData } from '../data/birthdayData';
import { audioService } from '../utils/audioService';

const BirthdayContext = createContext();

export const BirthdayProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Array(6).fill(false));
  const [swiperRef, setSwiperRef] = useState(null);

  // Sync state with swiper slides
  const goToSlide = (index) => {
    if (swiperRef) {
      swiperRef.slideTo(index);
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    if (swiperRef) {
      const nextIndex = currentSlide + 1;
      swiperRef.slideTo(nextIndex);
      setCurrentSlide(nextIndex);
    }
  };

  const prevSlide = () => {
    if (swiperRef) {
      const prevIndex = Math.max(0, currentSlide - 1);
      swiperRef.slideTo(prevIndex);
      setCurrentSlide(prevIndex);
    }
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      audioService.stopMusic();
      setIsMusicPlaying(false);
    } else {
      audioService.playMusic();
      setIsMusicPlaying(true);
    }
  };

  const startMusicOnInteraction = () => {
    audioService.playMusic();
    setIsMusicPlaying(true);
  };

  const playSFX = (sfxName) => {
    audioService.playSFX(sfxName);
  };

  const cutCake = () => {
    setIsCakeCut(true);
    playSFX('cakeCut');
  };

  const blowCandle = () => {
    setIsCandleBlown(true);
    playSFX('candleBlow');
    // Follow up with cheering crowd SFX shortly
    setTimeout(() => {
      playSFX('applause');
    }, 400);
  };

  const toggleFlipCard = (index) => {
    setFlippedCards((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const resetAll = () => {
    // Stop music
    audioService.stopMusic();
    setIsMusicPlaying(false);
    
    // Reset interaction states
    setIsCakeCut(false);
    setIsCandleBlown(false);
    setFlippedCards(new Array(6).fill(false));
    
    // Go to slide 0
    if (swiperRef) {
      swiperRef.slideTo(0);
      setCurrentSlide(0);
    }
  };

  return (
    <BirthdayContext.Provider
      value={{
        currentSlide,
        isMusicPlaying,
        isCakeCut,
        isCandleBlown,
        flippedCards,
        recipientName: birthdayData.recipientName,
        senderName: birthdayData.senderName,
        birthdayMessage: birthdayData.birthdayMessage,
        flipMessages: birthdayData.flipMessages,
        swiperRef,
        setSwiperRef,
        goToSlide,
        nextSlide,
        prevSlide,
        toggleMusic: handleToggleMusic,
        startMusicOnInteraction,
        playSFX,
        cutCake,
        blowCandle,
        toggleFlipCard,
        resetAll
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
};

export const useBirthday = () => {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error('useBirthday must be used within a BirthdayProvider');
  }
  return context;
};
