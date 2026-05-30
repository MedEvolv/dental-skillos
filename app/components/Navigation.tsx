'use client';

import { motion } from 'framer-motion';
import { ScanFace, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const navItems: { screen: Screen; label: string }[] = [
  { screen: 'landing', label: 'Home' },
  { screen: 'setup', label: 'Practice' },
  { screen: 'faculty', label: 'Faculty' },
  { screen: 'venture', label: 'Venture' },
];

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('landing')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-40" />
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 w-10 h-10 rounded-xl flex items-center justify-center">
                <ScanFace className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-lg leading-tight">
                Dental SkillOS
              </span>
              <span className="text-xs text-slate-500 font-medium">MirrorDex v0</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.screen}
                onClick={() => onNavigate(item.screen)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  currentScreen === item.screen
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentScreen === item.screen && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-blue-50 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
            
            <motion.button
              onClick={() => onNavigate('setup')}
              className="ml-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/25 flex items-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              Start Demo
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.screen}
                onClick={() => {
                  onNavigate(item.screen);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                  currentScreen === item.screen
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('setup');
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Demo
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}