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
import CameraScene from './components/CameraScene';
import CandleScene from './components/CandleScene';
import CaptionScene from './components/CaptionScene';
import BirthdayLetter from './components/BirthdayLetter';
import GiftPrankScene from './components/GiftPrankScene';
import FlipCards from './components/FlipCards';
import FinalScene from './components/FinalScene';

// Import Global Audio Indicator
import BackgroundMusic from './components/common/BackgroundMusic';

const AppContent = () => {
  const { currentSlide, setSwiperRef } = useBirthday();

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-blue-150 select-none">
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
          <CameraScene isActive={currentSlide === 3} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <CandleScene isActive={currentSlide === 4} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <CaptionScene isActive={currentSlide === 5} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <BirthdayLetter isActive={currentSlide === 6} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <GiftPrankScene isActive={currentSlide === 7} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <FlipCards isActive={currentSlide === 8} />
        </SwiperSlide>

        <SwiperSlide className="w-full h-full">
          <FinalScene isActive={currentSlide === 9} />
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
