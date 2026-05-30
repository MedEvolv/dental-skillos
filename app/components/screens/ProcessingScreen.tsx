'use client';

import { motion } from 'framer-motion';
import { 
  Video, 
  Brain, 
  Activity, 
  FileText, 
  Loader2,
  Check,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Screen } from '../../types';

interface ProcessingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const processingSteps = [
  { icon: Video, label: 'Analyzing video frames', duration: 2000 },
  { icon: Activity, label: 'Detecting practice events', duration: 2500 },
  { icon: Brain, label: 'Extracting skill signals', duration: 2000 },
  { icon: FileText, label: 'Generating feedback report', duration: 1500 },
];

export default function ProcessingScreen({ onNavigate }: ProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (currentStep < processingSteps.length) {
      timeout = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, processingSteps[currentStep].duration);
    } else {
      // All steps complete, navigate to report
      timeout = setTimeout(() => {
        onNavigate('report');
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentStep, onNavigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-12"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Analyzing Your Session
            </h1>
            <p className="text-slate-600">
              Our AI is reviewing your practice attempt and extracting skill signals.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4 mb-10">
            {processingSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = index === currentStep;

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isCompleted
                      ? 'bg-green-50 border border-green-200'
                      : isActive
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-slate-50 border border-slate-100'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500'
                      : isActive
                      ? 'bg-blue-500'
                      : 'bg-slate-200'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : isActive ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <step.icon className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex-1">
                    <span className={`font-semibold transition-colors duration-300 ${
                      isCompleted
                        ? 'text-green-800'
                        : isActive
                        ? 'text-blue-800'
                        : 'text-slate-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>

                  {/* Status */}
                  {isActive && (
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                          className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                animate={{ 
                  width: `${(completedSteps.length / processingSteps.length) * 100}%` 
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
              />
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm font-medium text-slate-600">
                {Math.round((completedSteps.length / processingSteps.length) * 100)}% Complete
              </span>
            </div>
          </div>

          {/* Processing Details */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Session ID</span>
              <span className="font-mono text-slate-700">S001-2026-05-28</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-500">Duration</span>
              <span className="font-mono text-slate-700">3:20</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-slate-500">Events Detected</span>
              <span className="font-mono text-slate-700">15</span>
            </div>
          </div>
        </motion.div>

        {/* Cancel Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => onNavigate('capture')}
          className="mt-6 w-full py-3 text-slate-500 hover:text-slate-700 font-medium transition-colors"
        >
          Cancel Analysis
        </motion.button>
      </div>
    </div>
  );
}