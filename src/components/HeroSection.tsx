import React from 'react';
import { motion } from 'motion/react';

export function HeroSection() {
  return (
    <div className="relative w-full min-h-[70vh] flex flex-col items-center justify-center p-6 z-10 text-center">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm flex flex-col justify-center text-left"
      >
        <h2 className="text-rose-900/40 font-serif italic text-xl mb-4 text-center">Our Distance is Only Physical</h2>
        <motion.h1 
          className="text-6xl font-serif leading-[1.1] text-rose-900 mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          I miss you <span className="italic">every single day</span>.
        </motion.h1>

        <div className="bg-white/40 backdrop-blur-md border border-white/60 p-8 rounded-[40px] shadow-sm relative">
          <motion.div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-tr from-rose-300 to-orange-200 rounded-full blur-xl opacity-60 pointer-events-none"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-rose-800 leading-relaxed text-lg italic text-center">
            "From Instagram chats as cousins to that magical birthday proposal, every mile between Palakkad and Chennai is filled with the warmth of your smile. Those 10 days we spent together were just the beginning..."
          </p>
          <div className="mt-6 flex items-center">
            <div className="h-px flex-1 bg-rose-200"></div>
            <span className="mx-4 text-[10px] uppercase tracking-widest text-rose-400">I love you</span>
            <div className="h-px flex-1 bg-rose-200"></div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
