import React, { useEffect, useState } from 'react';

const BALLOON_COLORS = [
  'from-pink-400 to-rose-500 shadow-pink-500/30',
  'from-purple-400 to-indigo-500 shadow-purple-500/30',
  'from-yellow-400 to-amber-500 shadow-yellow-500/30',
  'from-peach-300 to-orange-400 shadow-orange-300/30',
  'from-lavender-400 to-purple-300 shadow-purple-300/30'
];

export const FloatingBalloons = ({ count = 15, active = true }) => {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    if (!active) {
      setBalloons([]);
      return;
    }

    const newBalloons = Array.from({ length: count }).map((_, i) => {
      const sizeWidth = Math.floor(Math.random() * 30) + 40; // 40px to 70px
      const sizeHeight = sizeWidth * 1.25;
      const left = Math.random() * 100; // 0% to 100% of screen width
      const delay = Math.random() * 8; // delay up to 8s
      const duration = Math.random() * 6 + 7; // speed 7s to 13s
      const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      const swayDuration = Math.random() * 3 + 3; // sway speed 3s to 6s

      return {
        id: i,
        width: sizeWidth,
        height: sizeHeight,
        left,
        delay,
        duration,
        color,
        swayDuration
      };
    });

    setBalloons(newBalloons);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute opacity-80"
          style={{
            left: `${balloon.left}%`,
            bottom: `-120px`,
            animation: `float-slow ${balloon.duration}s linear infinite`,
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <div
            className={`relative rounded-t-full rounded-b-[60%_70%] bg-gradient-to-t ${balloon.color} shadow-lg animate-sway`}
            style={{
              width: `${balloon.width}px`,
              height: `${balloon.height}px`,
              animationDuration: `${balloon.swayDuration}s`,
            }}
          >
            {/* Balloon Highlight */}
            <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/40 rounded-full blur-[1px]" />
            
            {/* Balloon Knot */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-current opacity-80 text-inherit" />
            
            {/* Balloon String */}
            <svg
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-4 h-16 stroke-current text-white/40 fill-none"
              viewBox="0 0 10 40"
            >
              <path
                d="M5,0 Q8,10 2,20 T8,30 T5,40"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingBalloons;
