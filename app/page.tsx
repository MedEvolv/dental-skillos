'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Screen } from './types';
import LandingScreen from './components/screens/LandingScreen';
import SetupScreen from './components/screens/SetupScreen';
import CaptureScreen from './components/screens/CaptureScreen';
import ProcessingScreen from './components/screens/ProcessingScreen';
import ReportScreen from './components/screens/ReportScreen';
import ComparisonScreen from './components/screens/ComparisonScreen';
import FacultyScreen from './components/screens/FacultyScreen';
import VentureScreen from './components/screens/VentureScreen';
import Navigation from './components/Navigation';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const navigateTo = (screen: Screen, sessionId?: string) => {
    if (sessionId) setSelectedSessionId(sessionId);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const screenComponents = {
    landing: <LandingScreen onNavigate={navigateTo} />,
    setup: <SetupScreen onNavigate={navigateTo} />,
    capture: <CaptureScreen onNavigate={navigateTo} />,
    processing: <ProcessingScreen onNavigate={navigateTo} />,
    report: <ReportScreen onNavigate={navigateTo} sessionId={selectedSessionId || 'S001'} />,
    comparison: <ComparisonScreen onNavigate={navigateTo} participantId="STU-001" />,
    faculty: <FacultyScreen onNavigate={navigateTo} />,
    venture: <VentureScreen onNavigate={navigateTo} />,
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navigation currentScreen={currentScreen} onNavigate={navigateTo} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="pt-20"
        >
          {screenComponents[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}