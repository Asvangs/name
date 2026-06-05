import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PenTool, Save, BookHeart, Share2, Check } from 'lucide-react';
import { triggerBurstConfetti } from '../lib/confetti';

export function LoveLetterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [letterContent, setLetterContent] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Check for shared URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedMode = params.get('share');
    if (sharedMode) {
      try {
        const decodedText = decodeURIComponent(atob(sharedMode));
        setLetterContent(decodedText);
        setIsEditing(false);
        setIsOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (e) {
        console.error("Failed to parse shared letter", e);
      }
    }
  }, []);

  // Fetch saved letter from server when modal opened
  useEffect(() => {
    if (isOpen) {
      if (!letterContent) {
        // Fetch from API instead of localStorage
        fetch('/api/letter')
          .then(res => res.json())
          .then(data => {
            if (data.content) {
              setLetterContent(data.content);
              setIsEditing(false); // Default to read mode if stored on server
            } else {
              setLetterContent("");
              setIsEditing(true);
            }
          })
          .catch(err => {
            console.error("Failed to load letter from server", err);
            setIsEditing(true);
          });
      }
      triggerBurstConfetti();
    }
  }, [isOpen, letterContent]);

  const handleSave = async () => {
    try {
      await fetch('/api/letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: letterContent })
      });
      // Also save to localStorage as a backup
      localStorage.setItem('love_letter', letterContent);
      setIsEditing(false);
      setIsSaved(true);
      triggerBurstConfetti();
      setTimeout(() => setIsSaved(false), 2000);
    } catch (e) {
      console.error("Failed to save letter", e);
    }
  };
  
  const handleShare = () => {
    if (!letterContent.trim()) return;
    try {
      const encoded = btoa(encodeURIComponent(letterContent));
      const url = `${window.location.origin}${window.location.pathname}?share=${encoded}`;
      navigator.clipboard.writeText(url).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } catch (e) {
      console.error("Failed to generate share link", e);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 px-6 h-14 bg-rose-500 text-white rounded-full flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(244,63,94,0.4)] z-40 hover:bg-rose-600 transition-colors active:scale-95 font-medium tracking-wide"
      >
        <BookHeart size={24} />
        <span>Read My Letter</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/40 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ y: "100%", opacity: 0, rotate: 5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: "100%", opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-[#fdf6e3] rounded-sm shadow-2xl relative flex flex-col h-[80vh] max-h-[700px] overflow-hidden"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3), inset 0 0 40px rgba(180, 140, 100, 0.1)"
              }}
            >
              {/* Parchment Edge Styling */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#e8dec0] to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#e8dec0] to-transparent pointer-events-none" />
              
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-[#e8dec0]">
                <h3 className="font-serif italic text-2xl text-[#8b5a2b]">My Heart's Words</h3>
                <div className="flex gap-4 items-center">
                  {!isEditing && (
                    <>
                      <button 
                        onClick={handleShare}
                        className="text-[#8b5a2b] hover:text-rose-600 transition-colors flex items-center gap-1 text-sm font-sans mr-2"
                        title="Copy shareable link"
                      >
                        {isCopied ? <Check size={20} className="text-emerald-600" /> : <Share2 size={20} />}
                      </button>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-[#8b5a2b] hover:text-rose-600 transition-colors"
                      >
                        <PenTool size={20} />
                      </button>
                    </>
                  )}
                  {isEditing && (
                    <button 
                      onClick={handleSave}
                      className="text-white bg-[#8b5a2b] p-1.5 rounded hover:bg-[#6e4620] transition-colors flex items-center gap-1 text-sm font-sans"
                    >
                      <Save size={16} /> 
                      {isSaved ? "Saved!" : "Save"}
                    </button>
                  )}
                  <button 
                    onClick={async () => {
                      if (isEditing) {
                        try {
                          await fetch('/api/letter', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ content: letterContent })
                          });
                          localStorage.setItem('love_letter', letterContent);
                        } catch(e) {
                          console.error(e);
                        }
                      }
                      setIsOpen(false);
                    }}
                    className="text-[#8b5a2b] hover:text-rose-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Letter Content Area */}
              <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
                {isEditing ? (
                  <textarea
                    value={letterContent}
                    onChange={(e) => {
                      setLetterContent(e.target.value);
                    }}
                    placeholder="Write your deepest feelings here..."
                    className="w-full h-full bg-transparent resize-none outline-none text-2xl leading-relaxed text-[#5c3a21] placeholder-[#af8b68]"
                    style={{ fontFamily: "var(--font-handwriting)" }}
                  />
                ) : (
                  <div 
                    className="w-full h-full text-3xl leading-[2] text-[#5c3a21] whitespace-pre-wrap pb-12"
                    style={{ fontFamily: "var(--font-handwriting)" }}
                  >
                    {letterContent || "No words written yet. Tap the pen to start."}
                  </div>
                )}
              </div>

              {/* Bottom decorative seal */}
              <div className="absolute bottom-4 right-8 opacity-20 pointer-events-none text-[#8b5a2b]">
                <BookHeart size={48} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
