import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, HeartPulse, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../lib/confetti';

export function SurpriseGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      triggerConfetti();
    }
  }, [isOpen]);

  const handleTap = () => {
    if (isOpen) return;

    if (!isShaking) {
      setIsShaking(true);
      
      // Perform the shake animation for 1 second, then open the box
      setTimeout(() => {
        setIsShaking(false);
        setIsOpen(true);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-16 flex flex-col items-center justify-center p-6 relative">
      <h3 className="font-serif italic text-2xl text-rose-900 mb-8 z-10 text-center">A Special Surprise</h3>
      
      {/* Background Magic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-300/30 blur-2xl rounded-full pointer-events-none" />

      <div className="relative w-full aspect-square flex items-center justify-center">
        
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="gift-box"
              onClick={handleTap}
              className="absolute z-20 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              animate={
                isShaking
                  ? {
                      x: [-10, 10, -10, 10, -5, 5, 0],
                      rotate: [-5, 5, -5, 5, -2, 2, 0],
                      scale: 1.1,
                    }
                  : { y: [0, -10, 0] }
              }
              transition={
                isShaking
                  ? { duration: 0.8, ease: "easeInOut" }
                  : { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }
              exit={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl shadow-[0_15px_35px_rgba(225,29,72,0.4)] flex flex-col items-center justify-center relative border border-rose-300 transform-style-3d">
                {/* Gift Lid Illusion */}
                <div className="absolute -top-3 w-36 h-10 bg-gradient-to-tr from-rose-300 to-rose-500 rounded-xl shadow-lg border border-rose-200" />
                {/* Ribbon Vertical */}
                <div className="w-6 h-full bg-orange-100 absolute shadow-sm" />
                {/* Ribbon Horizontal */}
                <div className="w-full h-6 bg-orange-100 absolute shadow-sm" />
                <Gift size={48} className="text-rose-100 absolute -top-8" />
              </div>
              <p className="text-center mt-6 text-[10px] uppercase font-bold tracking-widest text-rose-500 animate-pulse">Tap to open</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Revealed Token */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="revealed-token"
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="absolute z-10 flex flex-col items-center w-full"
            >
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-[32px] p-8 text-center flex flex-col items-center w-full relative overflow-hidden">
                {/* Celebration Particles */}
                <motion.div 
                  className="absolute -top-10 -left-10 text-orange-300 opacity-60"
                  animate={{ y: [0, -20, 0], x: [0, -10, 0], rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity }}
                ><Sparkles size={32}/></motion.div>
                <motion.div 
                  className="absolute -bottom-10 -right-10 text-rose-300 opacity-60"
                  animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity }}
                ><Sparkles size={40}/></motion.div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-white p-2 pb-6 shadow-lg rounded-sm border border-rose-100 rotate-6 mb-6"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80" 
                    alt="Couple"
                    className="w-32 h-32 object-cover rounded-sm pointer-events-none"
                  />
                </motion.div>

                <h4 className="font-serif italic text-2xl text-rose-900 mb-2">My Endless Love</h4>
                <p className="text-rose-700/80 font-sans text-sm px-4 leading-relaxed">
                  A virtual token of my heart. No matter the distance between Palakkad and Chennai, it belongs fully to you.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
