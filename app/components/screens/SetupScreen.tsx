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
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="clinical-header">
        <div className="clinical-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-stone-900 rounded-md flex items-center justify-center">
                <ScanFace className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-stone-900">Dental SkillOS</h1>
                <p className="text-xs text-stone-500">Task Setup</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Step 1 of 3</Badge>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('landing')}>
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-stone-200">
        <div className="clinical-container py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm font-medium text-stone-900">Setup</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-stone-500">Record</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-stone-500">Analyze</span>
            </div>
          </div>
        </div>
      </div>

      <main className="clinical-section">
        <div className="clinical-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Overview */}
              <motion.div {...fadeIn}>
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="clinical-icon-box-primary shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">Mirror-Guided Digital Tracing</CardTitle>
                        <p className="text-stone-600 text-sm leading-relaxed">
                          Use the dental mirror to trace a <strong>2cm digital target</strong> displayed on a 
                          smartphone screen—replicating the submillimeter precision required in actual 
                          clinical procedures.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                      <h3 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        Instructions
                      </h3>
                      <ol className="space-y-2 text-sm text-stone-700">
                        {[
                          'Open digital-target.html on the target phone/tablet',
                          'Position the mirror to view the digital target indirectly',
                          'Keep your eyes focused on the mirror, NOT the screen directly',
                          'Trace the black path from green START to red END using the probe',
                          'Maintain mirror stability throughout - avoid repositioning'
                        ].map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 bg-stone-200 text-stone-700 rounded-full flex items-center justify-center text-xs font-medium">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recording Protocol */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Video className="w-5 h-5 text-stone-600" />
                      Recording Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <p className="text-sm text-teal-800">
                        <strong>Clinical Scale Protocol:</strong> We use a 2cm × 2cm digital target 
                        displayed on a smartphone screen to replicate the submillimeter precision 
                        required in actual dental procedures.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-stone-900 mb-3">Target Setup</h4>
                        <ul className="space-y-2 text-sm text-stone-600">
                          {[
                            'Open digital-target.html on target phone/tablet',
                            'Set brightness to 80-100% (consistent across sessions)',
                            'Active area: 2cm × 2cm (scalable 1.5cm - 2.6cm)',
                            'Screen protector required (replace if scratched)'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-teal-600">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-stone-900 mb-3">Recording Setup</h4>
                        <ul className="space-y-2 text-sm text-stone-600">
                          {[
                            'Macro mode enabled (captures submm movements)',
                            'Distance: 15-20cm from target surface',
                            'Settings: 1080p/4K, 60fps, locked focus',
                            'Use tripod - NO handheld recording'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-teal-600 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-stone-900 mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        Recording Procedure
                      </h4>
                      <ol className="space-y-2 text-sm text-stone-600 list-decimal list-inside">
                        <li>Position mirror to view target indirectly (eyes on mirror only)</li>
                        <li>Start recording (5-sec countdown recommended)</li>
                        <li>State clearly: &quot;Attempt [number], Participant [ID], Date [today]&quot;</li>
                        <li>Begin task: Trace digital target path using mirror vision ONLY</li>
                        <li>Complete full path from green start to red end</li>
                        <li>State: &quot;Complete&quot;, wait 3 seconds, stop recording</li>
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Checklist */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Camera className="w-5 h-5 text-stone-600" />
                      Pre-Recording Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {checklist.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.03, duration: 0.2 }}
                          className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            checkedItems.includes(item)
                              ? 'bg-teal-50 border border-teal-200'
                              : 'bg-stone-50 border border-stone-200 hover:border-stone-300'
                          }`}
                          onClick={() => toggleCheck(item)}
                        >
                          <Checkbox 
                            checked={checkedItems.includes(item)}
                            onCheckedChange={() => toggleCheck(item)}
                            className="mt-0.5"
                          />
                          <Label className={`text-sm font-normal cursor-pointer ${
                            checkedItems.includes(item) ? 'text-teal-900' : 'text-stone-700'
                          }`}>
                            {item}
                          </Label>
                        </motion.div>
                      ))}
                    </div>

                    {allChecked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-teal-100 text-teal-800 rounded-lg text-center font-medium text-sm"
                      >
                        All set! You&apos;re ready to record.
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Materials */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Required Materials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {materials.map((material, index) => (
                        <motion.div
                          key={material.label}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05, duration: 0.2 }}
                          className="flex items-center gap-3"
                        >
                          <div className="clinical-icon-box shrink-0">
                            <material.icon className="w-4 h-4 text-stone-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-stone-700">{material.label}</span>
                            {material.required && (
                              <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Digital Target */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Card className="bg-stone-900 text-white border-stone-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Digital Target Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-stone-800 rounded-lg mb-4 relative overflow-hidden font-mono text-xs">
                      <div className="absolute top-2 left-2 right-2 text-center text-stone-500">
                        [Recording Phone - Macro Mode]
                      </div>
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-stone-600">
                        ↓ 15-20cm ↓
                      </div>
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-20 h-20 bg-stone-700 rounded border-2 border-teal-500 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white rounded mx-auto mb-1 flex items-center justify-center">
                            <div className="w-8 h-8 border border-black rounded-full"></div>
                          </div>
                          <span className="text-[10px] text-stone-400">2cm × 2cm</span>
                        </div>
                      </div>
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-600">
                        ↑ Direct contact ↑
                      </div>
                      <div className="absolute bottom-2 left-4 text-stone-500">
                        [Mirror]—[Probe]
                      </div>
                    </div>
                    <p className="text-sm text-stone-400">
                      Miniaturized digital target replicates clinical working field size.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Demo Mode */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="clinical-icon-box-warning shrink-0">
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-900 text-sm">Demo Mode</h4>
                          <p className="text-xs text-amber-700">Use pre-recorded samples</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setDemoMode(!demoMode)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          demoMode ? 'bg-amber-500' : 'bg-stone-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: demoMode ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                        />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Safety Note */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Safety Note
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      This prototype is for preclinical practice feedback only. 
                      No patient data should be uploaded. Not clinical advice, 
                      grading, diagnosis, or certification.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Action */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-10 flex items-center justify-between"
          >
            <Button variant="outline" onClick={() => onNavigate('landing')}>
              Back
            </Button>
            <Button 
              size="lg"
              onClick={() => onNavigate('capture')}
              className="gap-2"
            >
              <Video className="w-4 h-4" />
              {demoMode ? 'Continue with Demo' : 'Start Recording Session'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
