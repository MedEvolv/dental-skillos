'use client';

import { motion } from 'framer-motion';
import { 
  ScanFace, 
  Eye, 
  Hand, 
  Activity, 
  ChevronRight, 
  Play, 
  FileText,
  Target,
  Clock,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Screen } from '../../types';

interface LandingScreenProps {
  onNavigate: (screen: Screen) => void;
}

// Impeccable: Subtle, purposeful motion (not bounce/elastic)
const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

// Impeccable: Skill items with consistent iconography (not rainbow colors)
const skillItems = [
  { icon: ScanFace, label: 'Mirror Control' },
  { icon: Eye, label: 'Indirect Vision' },
  { icon: Hand, label: 'Hand Stability' },
  { icon: Activity, label: 'Posture' },
];

// Impeccable: Stats with clear hierarchy
const stats = [
  { value: '3.2M+', label: 'Dental Students Worldwide' },
  { value: '40%', label: 'Struggle with Indirect Vision' },
  { value: 'Delayed', label: 'Feedback in Traditional Training' },
];

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Impeccable: Hero Section - Clean, no gradient blobs */}
      <section className="relative pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-3xl mx-auto"
          >
            {/* Impeccable: Badge - subtle, not flashy */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="badge-primary">
                Masters&apos; Union Demo Prototype
              </span>
            </motion.div>

            {/* Impeccable: Main Headline - No gradient text (AI slop anti-pattern) */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight tracking-tight mb-6"
            >
              Dental education has digitized{' '}
              <span className="text-primary-600">knowledge</span>
              , but not{' '}
              <span className="text-primary-600">embodied skill</span>
            </motion.h1>

            {/* Impeccable: Subheadline - Proper line length (prose-default) */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed prose-default"
            >
              Dental SkillOS uses AI to transform practice videos into structured feedback, 
              helping students master the physical skills that textbooks cannot teach.
            </motion.p>

            {/* Impeccable: CTA Buttons - Clear hierarchy, flat design */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.button
                onClick={() => onNavigate('setup')}
                className="btn-primary flex items-center gap-2 text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-4 h-4" />
                Start Indirect Vision Demo
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('report')}
                className="btn-ghost flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-4 h-4" />
                View Sample Report
              </motion.button>
            </motion.div>

            {/* Impeccable: Skill Pills - Consistent styling, not rainbow */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3"
            >
              {skillItems.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.08, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-2 px-4 py-2 bg-surface rounded-full border border-neutral-200 shadow-soft"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <skill.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impeccable: Problem Statement Section - Warm neutral background */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4 tracking-tight">
              The Hardest Parts of Dentistry are Still{' '}
              <span className="text-primary-600">Physical</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto prose-default">
              Students can access notes, lectures, videos, MCQs, and AI tutors. 
              But the skills that matter most happen in the body, not the mind.
            </p>
          </motion.div>

          {/* Impeccable: Cards - Flat design, no nesting, warm neutrals */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Delayed Feedback',
                description: 'Students practice repeatedly but receive feedback hours or days later, often focused only on final output.',
              },
              {
                icon: Target,
                title: 'Subjective Assessment',
                description: 'Skill evaluation depends on faculty availability and varies between instructors, lacking objective metrics.',
              },
              {
                icon: TrendingUp,
                title: 'No Progress Tracking',
                description: 'Students cannot see their improvement over time or understand exactly what to practice next.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card-elevated p-8 hover:shadow-lifted transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impeccable: Stats Section - Dark but warm, not pure black */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-4xl sm:text-5xl font-semibold text-primary-400 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-neutral-400 text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impeccable: Solution Section - Clean background */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-4 tracking-tight">
              From Practice Video to{' '}
              <span className="text-primary-600">Structured Feedback</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto prose-default">
              Dental SkillOS closes the loop between practice and improvement.
            </p>
          </motion.div>

          {/* Impeccable: Step cards - Connected flow, flat design */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Record', desc: 'Student practices with phone camera' },
              { step: '2', title: 'Upload', desc: 'Session submitted to system' },
              { step: '3', title: 'Analyze', desc: 'AI extracts skill signals' },
              { step: '4', title: 'Improve', desc: 'Personalized feedback report' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="card p-6 text-center relative z-10 h-full">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-0">
                    <ChevronRight className="w-5 h-5 text-neutral-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impeccable: CTA Section - Warm accent for energy */}
      <section className="py-24 bg-accent-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-900 mb-6 tracking-tight">
              Ready to See the Demo?
            </h2>
            <p className="text-lg text-neutral-600 mb-10 max-w-2xl mx-auto prose-default">
              Experience how Dental SkillOS transforms a simple mirror-guided task 
              into actionable feedback for skill development.
            </p>
            <motion.button
              onClick={() => onNavigate('setup')}
              className="btn-primary flex items-center gap-2 mx-auto text-base px-8 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-5 h-5" />
              Start the Indirect Vision Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Impeccable: Footer - Clean, minimal */}
      <footer className="py-12 bg-neutral-900 text-neutral-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <ScanFace className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-medium">Dental SkillOS</span>
            </div>
            <p className="text-sm">
              Masters&apos; Union Demo Prototype • Prepared by ArchLife • SkillData Lab
            </p>
            <p className="text-sm">© 2026 ArchLife. Internal use only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
