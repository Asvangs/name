import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playAttempted = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set low volume for background music
      
      // Attempt to play immediately on mount
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            playAttempted.current = true;
          })
          .catch((error) => {
            console.log("Autoplay prevented by browser, waiting for user interaction.", error);
            setIsPlaying(false);
          });
      }
    }

    // Setup a one-time global interaction listener to play audio if autoplay was blocked
    const handleFirstInteraction = () => {
      if (!playAttempted.current && audioRef.current && !isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              playAttempted.current = true;
              document.removeEventListener('click', handleFirstInteraction);
              document.removeEventListener('touchstart', handleFirstInteraction);
              document.removeEventListener('keydown', handleFirstInteraction);
            })
            .catch(() => {
              // Silently ignore browser autoplay policies on interaction
            });
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // Prevent global listener from overriding this
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        playAttempted.current = true; // User manually paused, respect it
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          playAttempted.current = true;
        }).catch(() => {
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
        autoPlay
        // Raabta song
        src="https://archive.org/download/RaabtaKehteHainKhudaNebestwap.in/Raabta_%28Kehte_Hain_Khuda_Ne%29_%28bestwap.in%29.mp3" 
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
