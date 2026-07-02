import React, { useEffect, useState } from 'react';

const STICKERS = [
  { emoji: '🧁', scale: 'scale-90' },
  { emoji: '🎈', scale: 'scale-110' },
  { emoji: '🌸', scale: 'scale-100' },
  { emoji: '🍬', scale: 'scale-95' },
  { emoji: '☁️', scale: 'scale-125' },
  { emoji: '✨', scale: 'scale-90' },
  { emoji: '💖', scale: 'scale-100' },
  { emoji: '🌼', scale: 'scale-105' }
];

export const FloatingStickers = ({ count = 12, active = true }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!active) {
      setItems([]);
      return;
    }

    const newItems = Array.from({ length: count }).map((_, i) => {
      const sticker = STICKERS[i % STICKERS.length];
      const left = Math.random() * 92 + 4; // 4% to 96%
      const delay = Math.random() * 8; // delay up to 8s
      const duration = Math.random() * 6 + 10; // speed 10s to 16s
      const swayDuration = Math.random() * 3 + 4; // sway speed 4s to 7s
      const rotate = Math.random() * 40 - 20; // initial rotation

      return {
        id: i,
        emoji: sticker.emoji,
        scale: sticker.scale,
        left,
        delay,
        duration,
        swayDuration,
        rotate
      };
    });

    setItems(newItems);
  }, [count, active]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute opacity-50 filter drop-shadow-sm select-none"
          style={{
            left: `${item.left}%`,
            bottom: `-80px`,
            animation: `float-slow ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <div
            className={`text-3xl animate-sway ${item.scale}`}
            style={{
              animationDuration: `${item.swayDuration}s`,
              transform: `rotate(${item.rotate}deg)`,
            }}
          >
            {item.emoji}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingStickers;
