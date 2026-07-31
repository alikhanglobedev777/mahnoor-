import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import CursorGlow from '@/components/CursorGlow';
import Aurora from '@/components/Aurora';
import MusicPlayer from '@/components/MusicPlayer';
import EmotionalMessages from '@/components/EmotionalMessages';
import Hero from '@/components/Hero';
import LoveLetter from '@/components/LoveLetter';
import Poetry from '@/components/Poetry';
import FlowerGarden from '@/components/FlowerGarden';
import PhotoGallery from '@/components/PhotoGallery';
import Reasons from '@/components/Reasons';
import MemoryTimeline from '@/components/MemoryTimeline';
import VirtualFlowers from '@/components/VirtualFlowers';
import BirthdayCake from '@/components/BirthdayCake';
import CakeCutting from '@/components/CakeCutting';
import GrandCelebration from '@/components/GrandCelebration';
import WishWall from '@/components/WishWall';
import Countdown from '@/components/Countdown';
import SurpriseGift from '@/components/SurpriseGift';
import FinalSection from '@/components/FinalSection';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-screen text-white">
      <CursorGlow />
      <Aurora />

      <AnimatePresence>
        {!loaded && <LoadingScreen onOpen={() => setLoaded(true)} />}
      </AnimatePresence>

      {loaded && (
        <main className="relative z-10">
          <Hero />
          <LoveLetter />
          <Poetry />
          <FlowerGarden />
          <PhotoGallery />
          <Reasons />
          <MemoryTimeline />
          <VirtualFlowers />
          <BirthdayCake />
          <CakeCutting />
          <GrandCelebration />
          <WishWall />
          <Countdown />
          <SurpriseGift />
          <FinalSection />
        </main>
      )}

      {loaded && <MusicPlayer />}
      {loaded && <EmotionalMessages />}
    </div>
  );
}

export default App;
