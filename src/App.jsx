import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper/modules';
import { Toaster } from 'react-hot-toast';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';

// Import Screens
import WelcomeScreen from './components/WelcomeScreen';
import BirthdayPopup from './components/BirthdayPopup';
import CakeScene from './components/CakeScene';
import CandleScene from './components/CandleScene';
import CaptionScene from './components/CaptionScene';
import BirthdayLetter from './components/BirthdayLetter';
import GalleryScene from './components/GalleryScene';
import FlipCards from './components/FlipCards';
import FinalScene from './components/FinalScene';

// Import Global Audio Indicator
import BackgroundMusic from './components/common/BackgroundMusic';

const AppContent = () => {
  const { currentSlide, setSwiperRef } = useBirthday();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-tr from-pink-100 via-purple-50 to-blue-50 select-none">
      {/* Global Background Music Wave Indicator */}
      <BackgroundMusic />

      {/* Slide Container */}
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        speed={800}
        allowTouchMove={false}
        onSwiper={setSwiperRef}
        className="w-full h-full"
      >
        <SwiperSlide className="w-full h-full">
          <WelcomeScreen />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <BirthdayPopup isActive={currentSlide === 1} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <CakeScene isActive={currentSlide === 2} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <CandleScene isActive={currentSlide === 3} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <CaptionScene isActive={currentSlide === 4} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <BirthdayLetter isActive={currentSlide === 5} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <GalleryScene isActive={currentSlide === 6} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <FlipCards isActive={currentSlide === 7} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <FinalScene isActive={currentSlide === 8} />
        </SwiperSlide>
      </Swiper>

      {/* Premium Toast Alerts Configuration */}
      <Toaster />
    </div>
  );
};

export default function App() {
  return (
    <BirthdayProvider>
      <AppContent />
    </BirthdayProvider>
  );
}
