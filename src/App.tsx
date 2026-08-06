import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { EverythingChainSection } from './components/EverythingChainSection';
import { ProjectMetricsSection } from './components/ProjectMetricsSection';
import { SystemArchitectureSection } from './components/SystemArchitectureSection';
import { GetInvolvedSection } from './components/GetInvolvedSection';
import { WhyBreakpointSection } from './components/WhyBreakpointSection';
import { TechEcosystemSection } from './components/TechEcosystemSection';
import { SponsorsSection } from './components/SponsorsSection';
import { SystemModulesSection } from './components/SystemModulesSection';
import { HighlightsSection } from './components/HighlightsSection';
import { StatsSection } from './components/StatsSection';
import { DeliverablesTimelineSection } from './components/DeliverablesTimelineSection';
import { EcosystemEventsSection } from './components/EcosystemEventsSection';
import { TestimonialSection } from './components/TestimonialSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { FaqSection } from './components/FaqSection';
import { FooterCountdown } from './components/FooterCountdown';
import { CustomCursor } from './components/CustomCursor';
import { PageView } from './types';
import { SupabaseProvider } from './lib/SupabaseContext';

// Dynamic Lazy Imports for Heavy Route Components & Modals
const ExecutiveDashboard = lazy(() => import('./features/dashboard/components/ExecutiveDashboard').then(m => ({ default: m.ExecutiveDashboard })));
const TravelPage = lazy(() => import('./components/TravelPage').then(m => ({ default: m.TravelPage })));
const SponsorsPage = lazy(() => import('./components/SponsorsPage').then(m => ({ default: m.SponsorsPage })));
const EventsPage = lazy(() => import('./components/EventsPage').then(m => ({ default: m.EventsPage })));
const RecapModal = lazy(() => import('./components/RecapModal').then(m => ({ default: m.RecapModal })));
const CommandPaletteModal = lazy(() => import('./components/CommandPaletteModal').then(m => ({ default: m.CommandPaletteModal })));
const IntranetChatbot = lazy(() => import('./components/IntranetChatbot').then(m => ({ default: m.IntranetChatbot })));

const ComponentLoader: React.FC = () => (
  <div className="w-full min-h-[400px] flex items-center justify-center p-12">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-[#E6004D] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm font-semibold text-[#4A5568]">Loading Module...</p>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [isRecapModalOpen, setIsRecapModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.99, filter: 'blur(4px)', y: 16 },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 },
    exit: { opacity: 0, scale: 0.99, filter: 'blur(2px)', y: -12 },
  };

  const pageTransition = {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1]
  };

  return (
    <SupabaseProvider>
      <div className="bg-[#F4F5F7] text-[#1A202C] min-h-screen font-sans-body selection:bg-[#FCE4E8] selection:text-[#E6004D]">
        {/* Precision Custom Cursor Follower */}
        <CustomCursor />

        {/* Fixed Top Navigation Bar */}
        {currentView !== 'dashboard' && (
          <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        )}

        {/* Animated Main View Router with Framer Motion */}
        <main className="w-full">
          <Suspense fallback={<ComponentLoader />}>
            <AnimatePresence mode="wait">
              {currentView === 'home' && (
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <HeroSection
                    onNavigateToDashboard={() => setCurrentView('dashboard')}
                  />

                  <EverythingChainSection />

                  <ProjectMetricsSection />

                  <SystemArchitectureSection />

                  <GetInvolvedSection
                    onOpenSponsors={() => setCurrentView('sponsors')}
                  />

                  <WhyBreakpointSection />

                  <TechEcosystemSection />

                  <SponsorsSection
                    onContactClick={() => setCurrentView('sponsors')}
                  />

                  <SystemModulesSection />

                  <HighlightsSection
                    onOpenRecapModal={() => setIsRecapModalOpen(true)}
                  />

                  <StatsSection />

                  <DeliverablesTimelineSection />

                  <EcosystemEventsSection
                    onSelectEvent={() => setCurrentView('events')}
                  />

                  <TestimonialSection />

                  <AnnouncementsSection
                    onAnnouncementClick={(title) => {
                      if (title.includes('highlights')) {
                        setIsRecapModalOpen(true);
                      } else if (title.includes('Hacker House') || title.includes('side event')) {
                        setCurrentView('events');
                      }
                    }}
                  />

                  <FaqSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
                </motion.div>
              )}

              {currentView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="pt-0 min-h-screen"
                >
                  <ExecutiveDashboard onNavigateToHome={() => setCurrentView('home')} />
                </motion.div>
              )}

              {currentView === 'travel' && (
                <motion.div
                  key="travel"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <TravelPage
                    setCurrentView={setCurrentView}
                  />
                </motion.div>
              )}

              {currentView === 'sponsors' && (
                <motion.div
                  key="sponsors"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <SponsorsPage />
                </motion.div>
              )}

              {currentView === 'events' && (
                <motion.div
                  key="events"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <EventsPage />
                </motion.div>
              )}

              {currentView === 'faq' && (
                <motion.div
                  key="faq"
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                  className="pt-24 min-h-screen"
                >
                  <FaqSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </main>

        {/* Footer & Live Countdown Timer */}
        <FooterCountdown />

        {/* Interactive Modals */}
        <Suspense fallback={null}>
          <RecapModal
            isOpen={isRecapModalOpen}
            onClose={() => setIsRecapModalOpen(false)}
          />

          <CommandPaletteModal
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            setCurrentView={setCurrentView}
          />

          {/* Floating Intranet AI Chatbot Widget */}
          <IntranetChatbot />
        </Suspense>
      </div>
    </SupabaseProvider>
  );
}
