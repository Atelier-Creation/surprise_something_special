import React, { useEffect, useState } from 'react';

export const Sparkles = ({ count = 20, active = true }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    if (!active) {
      setSparkles([]);
      return;
    }

    const newSparkles = Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 100; // 0% to 100%
      const left = Math.random() * 100; // 0% to 100%
      const size = Math.random() * 15 + 10; // 10px to 25px
      const delay = Math.random() * 3; // delay up to 3s
      const duration = Math.random() * 2 + 2; // speed 2s to 4s

      return {
        id: i,
        top,
        left,
        size,
        delay,
        duration
      };
    });

    setSparkles(newSparkles);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="absolute text-yellow-300/80 animate-sparkle"
          style={{
            top: `${sparkle.top}%`,
            left: `${sparkle.left}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Elegant 4-point star path */}
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      ))}
    </div>
  );
};

export default Sparkles;
