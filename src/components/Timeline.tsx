import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Heart, MessageCircle, Calendar, Home, Navigation, Star } from 'lucide-react';

// Journey Data
const timelineEvents = [
  {
    id: 'cousins',
    date: 'The Beginning',
    title: 'We are Cousins',
    description: 'Our story started long before we even knew it. We share roots, family, and a special bond that laid the foundation.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'instagram',
    date: 'The Connection',
    title: 'Instagram Chats',
    description: 'We started talking through Instagram. Late night messages, sharing stories, and falling for each other step by step.',
    icon: MessageCircle,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'falling',
    date: 'The Spark',
    title: 'Falling For Each Other',
    description: 'The more we talked, the more we knew. The connection went from friendly to something truly magical.',
    icon: Star,
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'proposal',
    date: 'My Birthday',
    title: 'The Proposal',
    description: 'You proposed to me on my birthday! I already guessed you loved me, but hearing it was everything. Of course, I said yes.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'visit',
    date: 'The Visit',
    title: '10 Days Together',
    description: 'You came to my cousin\'s house and stayed for 10 beautiful days. It was the first time we could truly share romantic moments together.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'distance',
    date: 'Until Next Time',
    title: 'Heading Home',
    description: 'You left for Chennai, and I stayed in Palakkad. But distance means nothing when someone means everything.',
    icon: Navigation,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80',
  }
];

export function Timeline() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEvent = timelineEvents.find(e => e.id === selectedId);

  return (
    <div className="w-full max-w-lg mx-auto py-12 px-4 relative z-10">
      
      <h2 className="font-serif italic text-3xl text-center text-rose-900 mb-12">Our Magical Journey</h2>

      <div className="relative border-l-2 border-rose-200 ml-4 pb-12">
        {timelineEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            className="mb-10 ml-8 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Timeline Dot with Icon */}
            <motion.div 
              className="absolute -left-[43px] bg-white border-2 border-rose-300 w-10 h-10 rounded-full flex items-center justify-center text-rose-500 shadow-md z-10"
              whileHover={{ scale: 1.2, backgroundColor: '#ffe4e6' }}
              whileTap={{ scale: 0.9 }}
            >
              <event.icon size={18} />
            </motion.div>

            {/* Event Card (Clickable to zoom) */}
            <motion.div 
              layoutId={`card-${event.id}`}
              className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-2xl shadow-sm cursor-pointer"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(225, 29, 72, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedId(event.id)}
            >
              <motion.span layoutId={`date-${event.id}`} className="text-xs font-sans font-bold text-rose-400 uppercase tracking-widest mb-1 block">
                {event.date}
              </motion.span>
              <motion.h4 layoutId={`title-${event.id}`} className="font-serif text-xl text-rose-900 mb-2">
                {event.title}
              </motion.h4>
              
              {/* Image thumbnail (clipped) */}
              <div className="w-full h-24 overflow-hidden rounded-xl mt-3 relative pointer-events-none">
                <motion.img 
                  layoutId={`image-${event.id}`}
                  src={event.image}
                  alt={event.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className="absolute bottom-2 right-2 text-white text-xs font-semibold drop-shadow-md">Tap to view</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Expanded / Zoomed View using AnimatePresence */}
      <AnimatePresence>
        {selectedId && selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-900/40 backdrop-blur-sm"
            onClick={() => setSelectedId(null)} // Close on background click
          >
            <motion.div 
              layoutId={`card-${selectedEvent.id}`}
              className="bg-white rounded-[32px] overflow-hidden w-full max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking card
            >
               {/* High-res image display with drag physics (pan to dismiss) */}
               <motion.div 
                 className="w-full h-64 bg-rose-100 relative cursor-grab active:cursor-grabbing"
                 drag="y"
                 dragConstraints={{ top: 0, bottom: 0 }}
                 onDragEnd={(_, info) => {
                   if (info.offset.y > 100 || info.offset.y < -100) {
                     setSelectedId(null);
                   }
                 }}
               >
                 <motion.img 
                   layoutId={`image-${selectedEvent.id}`}
                   src={selectedEvent.image}
                   alt={selectedEvent.title}
                   className="w-full h-full object-cover"
                 />
                 {/* Swipe to close indicator */}
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/50 rounded-full backdrop-blur-md" />
               </motion.div>
               
               <div className="p-6">
                 <motion.span layoutId={`date-${selectedEvent.id}`} className="text-sm font-sans font-bold text-rose-500 uppercase tracking-widest block mb-2">
                   {selectedEvent.date}
                 </motion.span>
                 <motion.h3 layoutId={`title-${selectedEvent.id}`} className="font-serif text-3xl text-rose-950 mb-4">
                   {selectedEvent.title}
                 </motion.h3>
                 <motion.p 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.2 }}
                   className="text-rose-800 leading-relaxed text-sm font-sans"
                 >
                   {selectedEvent.description}
                 </motion.p>
                 
                 <button 
                  onClick={() => setSelectedId(null)}
                  className="mt-6 w-full py-3 bg-rose-100 text-rose-800 rounded-xl font-medium tracking-wide active:bg-rose-200 transition-colors"
                 >
                   Close Photo
                 </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
