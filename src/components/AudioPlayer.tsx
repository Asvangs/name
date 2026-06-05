import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set low volume for background music
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.error("Audio playback failed", e);
          setIsPlaying(false);
        });
      }
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <audio 
        ref={audioRef} 
        loop
        // Reliable romantic placeholder audio
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
      />
      
      <motion.button
        onClick={togglePlay}
        className="w-12 h-12 bg-white/80 backdrop-blur-md border border-white rounded-full shadow-[0_8px_20px_rgb(136,19,55,0.15)] flex items-center justify-center text-rose-500 hover:bg-rose-50 active:scale-95 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 border border-dashed border-rose-300 rounded-full"
            />
            <Volume2 size={20} />
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </div>
  );
}
