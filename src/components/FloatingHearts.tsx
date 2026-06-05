import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate sporadic hearts
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 90 + 5, // 5% to 95% width
          size: Math.random() * 20 + 20, // 20px to 40px
          delay: 0,
          duration: Math.random() * 5 + 8, // 8s to 13s drifting up
        };
        return [...prev.slice(-15), newHeart]; // keep last 15 hearts max
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, y: '110vh', x: `${heart.x}vw`, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.6, 0.8, 0], 
              y: '-20vh', 
              x: [`${heart.x}vw`, `${heart.x + (Math.random() > 0.5 ? 5 : -5)}vw`],
              rotate: [0, Math.random() > 0.5 ? 45 : -45]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: heart.duration, 
              ease: 'easeOut',
            }}
            className="absolute pointer-events-auto cursor-pointer"
            whileHover={{ scale: 1.5, opacity: 1, filter: "drop-shadow(0 0 15px rgba(251, 113, 133, 0.8))" }}
            whileTap={{ scale: 1.8 }}
          >
            <Heart 
              size={heart.size} 
              className="text-rose-400/50 fill-rose-300 drop-shadow-md backdrop-blur-sm"
              style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
