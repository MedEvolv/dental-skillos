'use client';

import { motion } from 'framer-motion';
import { 
  Check, 
  ScanFace, 
  Smartphone, 
  PenTool, 
  Lightbulb, 
  AlertTriangle,
  Video,
  Camera,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../../types';

interface SetupScreenProps {
  onNavigate: (screen: Screen) => void;
}

const materials = [
  { icon: ScanFace, label: 'Dental Mirror (#5)', required: true },
  { icon: PenTool, label: 'Probe / Explorer', required: true },
  { icon: Smartphone, label: 'Target Phone/Tablet', required: true },
  { icon: Smartphone, label: 'Recording Phone (Macro)', required: true },
  { icon: Camera, label: 'Tripod/Stand for Recording', required: true },
  { icon: Lightbulb, label: 'Ring Light or Dual LEDs', required: true },
];

const checklist = [
  'Target phone displaying digital-target.html at 80-100% brightness',
  'Recording phone at 15-20cm distance, macro mode enabled',
  'Target area (2cm × 2cm) centered and fully visible in frame',
  'Both hands + mirror visible throughout recording',
  'Screen protector clean, no scratches on target device',
  'Focus and exposure locked on target area',
  'Lighting: ring light or dual LEDs, no screen glare',
  '10-second test recording reviewed',
  'Mirror in non-dominant hand, probe in dominant hand',
];

// Impeccable: Purposeful motion
const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  },
};

export default function SetupScreen({ onNavigate }: SetupScreenProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [demoMode, setDemoMode] = useState(false);

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const allChecked = checklist.every(item => checkedItems.includes(item));

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Impeccable: Header - Solid color, no gradient */}
      <section className="pt-24 pb-12 bg-primary-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Indirect Vision Practice
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 tracking-tight">
              Task Setup
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Prepare your workspace and materials before recording your practice attempt.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Objective Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-2 tracking-tight">
                    Mirror-Guided Digital Tracing
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    Use the dental mirror to trace a <strong>2cm digital target</strong> displayed on a smartphone screen—
                    replicating the submillimeter precision required in actual clinical procedures. 
                    This exercise develops hand-eye coordination and mirror control skills essential 
                    for dental work.
                  </p>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-100">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent-500" />
                  Instructions
                </h3>
                <ol className="space-y-3 text-neutral-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                    <span>Open digital-target.html on the target phone/tablet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                    <span>Position the mirror to view the digital target indirectly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                    <span>Keep your eyes focused on the mirror, NOT the screen directly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                    <span>Trace the black path from green START to red END using the probe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">5</span>
                    <span>Maintain mirror stability throughout - avoid repositioning</span>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Recording Protocol */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <Video className="w-6 h-6 text-primary-600" />
                Recording Protocol
              </h3>

              <div className="bg-primary-50 rounded-xl p-4 mb-6 border border-primary-100">
                <p className="text-sm text-primary-800">
                  <strong>Clinical Scale Protocol:</strong> We use a 2cm × 2cm digital target displayed on a smartphone screen to replicate the submillimeter precision required in actual dental procedures. A second phone records in macro mode to capture micro-movements invisible to standard cameras.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-neutral-900">Target Setup</h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold">•</span>
                      <span>Open digital-target.html on target phone/tablet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold">•</span>
                      <span>Set brightness to 80-100% (consistent across sessions)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold">•</span>
                      <span>Active area: 2cm × 2cm (scalable 1.5cm - 2.6cm)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-500 font-bold">•</span>
                      <span>Screen protector required (replace if scratched)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-neutral-900">Recording Setup</h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 font-bold">✓</span>
                      <span>Macro mode enabled (captures submm movements)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 font-bold">✓</span>
                      <span>Distance: 15-20cm from target surface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 font-bold">✓</span>
                      <span>Settings: 1080p/4K, 60fps, locked focus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success-500 font-bold">✓</span>
                      <span>Use tripod - NO handheld recording</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent-500" />
                  Recording Procedure
                </h4>
                <ol className="space-y-2 text-sm text-neutral-600 list-decimal list-inside">
                  <li>Position mirror to view target indirectly (eyes on mirror only)</li>
                  <li>Start recording (5-sec countdown recommended)</li>
                  <li>State clearly: &quot;Attempt [number], Participant [ID], Date [today]&quot;</li>
                  <li>Begin task: Trace digital target path using mirror vision ONLY</li>
                  <li>Complete full path from green start to red end</li>
                  <li>State: &quot;Complete&quot;, wait 3 seconds, stop recording</li>
                </ol>
              </div>
            </motion.div>

            {/* Setup Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary-600" />
                Recording Checklist
              </h3>
              
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => toggleCheck(item)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      checkedItems.includes(item)
                        ? 'bg-success-50 border-2 border-success-200'
                        : 'bg-neutral-50 border-2 border-neutral-100 hover:border-primary-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                      checkedItems.includes(item)
                        ? 'bg-success-500'
                        : 'bg-white border-2 border-neutral-300'
                    }`}>
                      {checkedItems.includes(item) && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`font-medium ${
                      checkedItems.includes(item) ? 'text-success-800' : 'text-neutral-700'
                    }`}>
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {allChecked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-success-50 text-success-800 rounded-xl text-center font-semibold"
                >
                  All set! You&apos;re ready to record.
                </motion.div>
              )}
            </motion.div>

            {/* Demo Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6 bg-accent-50 border-accent-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent-900">Demo Mode</h4>
                    <p className="text-sm text-accent-700">Use pre-recorded sample videos</p>
                  </div>
                </div>
                <button
                  onClick={() => setDemoMode(!demoMode)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    demoMode ? 'bg-accent-500' : 'bg-neutral-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: demoMode ? 24 : 4 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-soft"
                  />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Materials Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">Required Materials</h3>
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <motion.div
                    key={material.label}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                      <material.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-neutral-700">{material.label}</span>
                      {material.required && (
                        <span className="ml-2 text-xs text-accent-600 font-medium">Required</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Digital Target Setup */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-900 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">Digital Target Setup</h3>
              <div className="aspect-square bg-neutral-800 rounded-xl mb-4 relative overflow-hidden font-mono text-xs">
                <div className="absolute top-2 left-2 right-2 text-center text-neutral-400">
                  [Recording Phone - Macro Mode]
                </div>
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-neutral-500">
                  ↓ 15-20cm ↓
                </div>
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-20 bg-neutral-700 rounded border-2 border-primary-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white rounded mx-auto mb-1 flex items-center justify-center">
                      <div className="w-8 h-8 border border-black rounded-full"></div>
                    </div>
                    <span className="text-[10px] text-neutral-400">2cm × 2cm</span>
                  </div>
                </div>
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-neutral-500">
                  ↑ Direct contact ↑
                </div>
                <div className="absolute bottom-2 left-4 text-neutral-400">
                  [Mirror]—[Probe]
                </div>
              </div>
              <p className="text-sm text-neutral-300">
                Miniaturized digital target replicates clinical working field size.
              </p>
            </motion.div>

            {/* Safety Note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6 bg-primary-50 border-primary-100"
            >
              <h4 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Safety Note
              </h4>
              <p className="text-sm text-primary-700 leading-relaxed">
                This prototype is for preclinical practice feedback only. 
                No patient data should be uploaded. This is not clinical advice, 
                grading, diagnosis, or competence certification.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={() => onNavigate('capture')}
            className="btn-primary flex items-center gap-2 mx-auto text-base px-8 py-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Video className="w-5 h-5" />
            {demoMode ? 'Continue with Demo Videos' : 'Start Recording Session'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="mt-4 text-neutral-500 text-sm">
            Or view a{' '}
            <button 
              onClick={() => onNavigate('report')}
              className="text-primary-600 hover:underline font-medium"
            >
              sample feedback report
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
