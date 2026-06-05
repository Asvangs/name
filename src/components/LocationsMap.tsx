import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Heart, Sparkles } from "lucide-react";

export function LocationsMap() {
  const [activeCity, setActiveCity] = useState<'palakkad' | 'chennai' | null>(null);

  // Custom 3D Avatar styles using Dicebear Micah
  const avatarMe = "https://api.dicebear.com/7.x/micah/svg?seed=Aswin&backgroundColor=transparent";
  const avatarHer = "https://api.dicebear.com/7.x/micah/svg?seed=Priya&backgroundColor=transparent";

  return (
    <div className="relative w-full max-w-md mx-auto my-12 flex flex-col items-center z-10 px-4">
      
      {/* 1. Interactive Geographic Map Section */}
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-rose-900/50 font-serif italic text-xl mb-6 text-center"
      >
        Bridging the Distance
      </motion.h3>
      
      <div className="w-full aspect-square relative flex items-center justify-center mb-16 group">
        
        {/* Background Maps Container (clipped) */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md rounded-[50px] border border-white/80 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {/* Soft Map Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/40 to-orange-50/20" />
          
          {/* India Peninsula Map Path */}
          <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] absolute pointer-events-none drop-shadow-sm opacity-80" style={{ transform: 'translateY(-10%)' }}>
            <defs>
              <linearGradient id="coastlineFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fda4af" stopOpacity="0" />
                <stop offset="30%" stopColor="#fda4af" stopOpacity="0.4" />
                <stop offset="90%" stopColor="#be123c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
              </linearGradient>
              <filter id="pathGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* South India Stylized Coastline */}
            <path 
              d="M 60,60 Q 100,180 140,280 Q 180,360 200,380 Q 220,360 260,280 Q 300,180 340,60" 
              fill="none" 
              stroke="url(#coastlineFade)" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            
            {/* Animated Connecting Tracing Path */}
            <motion.path 
              d="M 140,280 Q 200,240 270,220"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              filter="url(#pathGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Pulsing Dots inside SVG based on coordinates */}
            <motion.circle cx="140" cy="280" r="16" fill="#f43f5e" opacity="0.1" animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity }} />
            <circle cx="140" cy="280" r="5" fill="#be123c" />

            <motion.circle cx="270" cy="220" r="16" fill="#f43f5e" opacity="0.1" animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
            <circle cx="270" cy="220" r="5" fill="#be123c" />
          </svg>
        </div>

        {/* Interactive Overlay Labels (Outside overflow to prevent clipping) */}
        <motion.button 
          className={`absolute flex flex-col items-center justify-center transition-all duration-300 ${activeCity === 'palakkad' ? 'scale-110 z-20' : 'z-10'}`}
          style={{ left: '15%', bottom: '28%' }}
          onClick={() => setActiveCity(activeCity === 'palakkad' ? null : 'palakkad')}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-[0_8px_20px_rgb(136,19,55,0.1)] border border-rose-100 flex items-center gap-1.5 cursor-pointer">
            <MapPin size={12} className="text-rose-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-rose-950">Palakkad</span>
          </div>
          <AnimatePresence>
            {activeCity === 'palakkad' && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 3 }} className="mt-2 bg-white/90 backdrop-blur-xl text-rose-900 text-[10px] uppercase font-bold tracking-wider px-4 py-3 rounded-xl shadow-2xl w-40 border border-white relative before:w-3 before:h-3 before:bg-white/90 before:rotate-45 before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:border-l before:border-t before:border-white text-center">
                 Where the magic started.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button 
          className={`absolute flex flex-col items-center justify-center transition-all duration-300 ${activeCity === 'chennai' ? 'scale-110 z-20' : 'z-10'}`}
          style={{ right: '8%', bottom: '48%' }}
          onClick={() => setActiveCity(activeCity === 'chennai' ? null : 'chennai')}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-[0_8px_20px_rgb(136,19,55,0.1)] border border-rose-100 flex items-center gap-1.5 cursor-pointer">
            <MapPin size={12} className="text-rose-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-rose-950">Chennai</span>
          </div>
          <AnimatePresence>
            {activeCity === 'chennai' && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 3 }} className="mt-2 bg-white/90 backdrop-blur-xl text-rose-900 text-[10px] uppercase font-bold tracking-wider px-4 py-3 rounded-xl shadow-2xl w-40 border border-white relative before:w-3 before:h-3 before:bg-white/90 before:rotate-45 before:absolute before:-top-1.5 before:left-1/2 before:-translate-x-1/2 before:border-l before:border-t before:border-white text-center">
                 Where you are. Miss you endlessly.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

      </div>

      {/* 2. 3D Customizable Avatars Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="w-full relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-[0_20px_40px_rgb(136,19,55,0.05)] p-8 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Magical Ambient Orbs strictly inside the card */}
        <motion.div 
          className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200/40 rounded-full blur-[40px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-300/30 rounded-full blur-[40px] pointer-events-none"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="flex items-center justify-center gap-2 mb-8 text-rose-500/80">
          <Sparkles size={16} />
          <span className="font-serif italic text-sm tracking-[0.2em] uppercase text-rose-900/60">Soulmates</span>
          <Sparkles size={16} />
        </div>

        <div 
          className="flex items-center justify-between w-full max-w-[280px] relative z-10 perspective-[1200px]"
          style={{ perspective: 1200 }}
        >
          {/* User Avatar (Left) */}
          <div className="flex flex-col items-center group relative cursor-pointer z-10">
            <motion.div 
              className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-[30px] border-4 border-white shadow-xl bg-gradient-to-br from-orange-50 to-rose-50 overflow-hidden relative"
              animate={{ rotateY: 15, rotateX: 5, y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ rotateY: 0, scale: 1.05 }}
            >
              <img src={avatarMe} alt="Me in Palakkad" className="w-full h-full object-cover scale-[1.15] translate-y-2 pointer-events-none" />
            </motion.div>
            <span className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-rose-800 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/50">Me</span>
          </div>

          {/* Central Magical Heart */}
          <motion.div 
            className="text-rose-500 absolute left-1/2 -translate-x-1/2 z-20"
            animate={{ scale: [1, 1.25, 1], y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "drop-shadow(0 0 15px rgba(244,63,94,0.4))" }}
          >
            <Heart size={36} strokeWidth={0} fill="currentColor" />
          </motion.div>

          {/* Partner Avatar (Right) */}
          <div className="flex flex-col items-center group relative cursor-pointer z-10">
            <motion.div 
              className="w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-[30px] border-4 border-white shadow-xl bg-gradient-to-br from-rose-50 to-pink-50 overflow-hidden relative"
              animate={{ rotateY: -15, rotateX: 5, y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ rotateY: 0, scale: 1.05 }}
            >
              <img src={avatarHer} alt="Her in Chennai" className="w-full h-full object-cover scale-[1.15] translate-y-2 pointer-events-none" />
            </motion.div>
            <span className="mt-4 text-[10px] uppercase tracking-[0.2em] font-bold text-rose-800 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/50">Her</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
