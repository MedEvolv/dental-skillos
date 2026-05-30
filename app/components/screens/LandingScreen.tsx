'use client';

import { motion } from 'framer-motion';
import { 
  ScanFace, 
  BarChart3, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2,
  Video,
  Target,
  LineChart,
  Shield,
  Users
} from 'lucide-react';
import { Screen } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface LandingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Clinical Header */}
      <header className="clinical-header">
        <div className="clinical-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-stone-900 rounded-md flex items-center justify-center">
                <ScanFace className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-stone-900">Dental SkillOS</h1>
                <p className="text-xs text-stone-500">MirrorDex v0</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Masters&apos; Union Demo
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="clinical-section bg-white border-b border-stone-200">
        <div className="clinical-container">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <Badge className="clinical-badge-accent mb-4">
                Preclinical Training Platform
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="clinical-title mb-6"
            >
              AI-Powered Feedback for
              <br />
              <span className="text-stone-600">Indirect Vision Skills</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="clinical-subtitle mb-8 max-w-2xl"
            >
              Record your mirror-guided practice sessions and receive detailed 
              performance analytics. Designed for dental students mastering 
              intraoral mirror work before patient contact.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg"
                onClick={() => onNavigate('setup')}
                className="clinical-button-primary gap-2"
              >
                <Video className="w-4 h-4" />
                Start Practice Session
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => onNavigate('report')}
                className="clinical-button-secondary gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                View Sample Report
              </Button>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="mt-8 flex items-center gap-6 text-sm text-stone-500"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                No patient data required
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Instant AI analysis
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Progress tracking
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="clinical-section">
        <div className="clinical-container">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">How It Works</h2>
            <p className="text-stone-600">Three steps to structured feedback</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Setup',
                description: 'Configure your recording environment with the digital target and macro camera setup.',
                icon: Target,
              },
              {
                step: '02',
                title: 'Record',
                description: 'Practice mirror-guided tracing while recording. Upload when complete.',
                icon: Video,
              },
              {
                step: '03',
                title: 'Analyze',
                description: 'Receive detailed metrics on mirror stability, field control, and technique.',
                icon: LineChart,
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              >
                <Card className="clinical-card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="clinical-icon-box-primary shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-stone-400 mb-1">
                          Step {item.step}
                        </div>
                        <h3 className="text-lg font-semibold text-stone-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Metrics Preview */}
      <section className="clinical-section bg-white">
        <div className="clinical-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Performance Analytics
              </Badge>
              <h2 className="text-2xl font-semibold text-stone-900 mb-4">
                Detailed Session Reports
              </h2>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Every practice session generates a comprehensive report tracking 
                mirror reposition events, field loss incidents, target accuracy, 
                and overall technique smoothness. Compare attempts over time to 
                measure improvement.
              </p>
              
              <div className="space-y-4">
                {[
                  { label: 'Mirror Stability Score', value: '78/100' },
                  { label: 'Field Control', value: '12 events' },
                  { label: 'Target Accuracy', value: '85%' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 border-b border-stone-100">
                    <span className="text-sm text-stone-600">{stat.label}</span>
                    <span className="text-sm font-semibold text-stone-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Card className="clinical-card-elevated overflow-hidden">
                <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-stone-600" />
                    <span className="font-medium text-stone-900">Session Analysis</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      Attempt #3
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="clinical-stat">
                      <span className="clinical-stat-label">Duration</span>
                      <span className="clinical-stat-value">2:34</span>
                    </div>
                    <div className="clinical-stat">
                      <span className="clinical-stat-label">Events</span>
                      <span className="clinical-stat-value">8</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Mirror Repositions', count: 3, color: 'bg-stone-800' },
                      { label: 'Field Loss', count: 2, color: 'bg-amber-500' },
                      { label: 'Target Misses', count: 1, color: 'bg-teal-600' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-stone-600">{item.label}</span>
                            <span className="text-sm font-medium text-stone-900">{item.count}</span>
                          </div>
                          <div className="clinical-progress">
                            <div 
                              className={`clinical-progress-bar ${item.color}`}
                              style={{ width: `${(item.count / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Trust Indicators */}
      <section className="clinical-section">
        <div className="clinical-container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="clinical-icon-box-accent shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">Privacy First</h3>
                <p className="text-sm text-stone-600">
                  No patient data collection. All practice sessions are anonymized 
                  and used solely for skill development.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="clinical-icon-box-accent shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">Educational Use</h3>
                <p className="text-sm text-stone-600">
                  Designed for preclinical training. Not for clinical diagnosis 
                  or patient care decisions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="clinical-icon-box-accent shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">Faculty Integration</h3>
                <p className="text-sm text-stone-600">
                  Reports can be reviewed by instructors. Faculty comments and 
                  grades supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="clinical-section bg-stone-900 text-white">
        <div className="clinical-container text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Practice?</h2>
          <p className="text-stone-400 mb-8 max-w-xl mx-auto">
            Set up your recording environment and begin your first structured 
            mirror practice session.
          </p>
          <Button 
            size="lg"
            onClick={() => onNavigate('setup')}
            className="bg-white text-stone-900 hover:bg-stone-100 gap-2"
          >
            <Video className="w-4 h-4" />
            Begin Setup
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-500 py-8 border-t border-stone-800">
        <div className="clinical-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-stone-800 rounded flex items-center justify-center">
                <ScanFace className="w-4 h-4" />
              </div>
              <span className="text-sm">Dental SkillOS • MirrorDex v0</span>
            </div>
            <p className="text-xs">
              Prototype for educational use only. Not for clinical application.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
