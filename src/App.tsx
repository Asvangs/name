/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { FloatingHearts } from './components/FloatingHearts';
import { LocationsMap } from './components/LocationsMap';
import { Timeline } from './components/Timeline';
import { LoveLetterModal } from './components/LoveLetterModal';
import { SurpriseGift } from './components/SurpriseGift';
import { AudioPlayer } from './components/AudioPlayer';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#FFF9F5] text-rose-950 font-sans flex flex-col relative overflow-x-hidden selection:bg-rose-200">
      <ParticleBackground />
      <FloatingHearts />
      <LoveLetterModal />
      <AudioPlayer />
      
      {/* Navigation / Header */}
      <header className="flex justify-between items-center px-8 py-8 z-10 w-full max-w-2xl mx-auto mt-4">
        <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-rose-900/60">Palakkad &bull; Chennai</div>
        <div className="flex space-x-6">
          <div className="w-2 h-2 rounded-full bg-rose-400"></div>
          <div className="w-2 h-2 rounded-full bg-rose-300"></div>
          <div className="w-2 h-2 rounded-full bg-rose-200"></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center px-8 pb-12 z-10">
        <HeroSection />
        <SurpriseGift />
        <LocationsMap />
        <Timeline />
      </main>
    </div>
  );
}
