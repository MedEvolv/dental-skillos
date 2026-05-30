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
  Sparkles,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Screen } from '../../types';

interface LandingScreenProps {
  onNavigate: (screen: Screen) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillItems = [
  { icon: ScanFace, label: 'Mirror Control', color: 'bg-blue-500' },
  { icon: Eye, label: 'Indirect Vision', color: 'bg-cyan-500' },
  { icon: Hand, label: 'Hand Stability', color: 'bg-indigo-500' },
  { icon: Activity, label: 'Posture', color: 'bg-violet-500' },
];

const stats = [
  { value: '3.2M+', label: 'Dental Students Worldwide' },
  { value: '40%', label: 'Struggle with Indirect Vision' },
  { value: 'Delayed', label: 'Feedback in Traditional Training' },
];

export default function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute top-40 -left-40 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
                <Sparkles className="w-4 h-4" />
                Masters&apos; Union Demo Prototype
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6"
            >
              Dental education has digitized{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                knowledge
              </span>
              , but not{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                embodied skill
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Dental SkillOS uses AI to transform practice videos into structured feedback, 
              helping students master the physical skills that textbooks cannot teach.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.button
                onClick={() => onNavigate('setup')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/25 flex items-center gap-3 text-lg"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.5)' 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Start Indirect Vision Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('report')}
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center gap-3 text-lg hover:border-slate-300 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText className="w-5 h-5" />
                View Sample Report
              </motion.button>
            </motion.div>

            {/* Skill Pills */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3"
            >
              {skillItems.map((skill, index) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100"
                >
                  <div className={`w-8 h-8 ${skill.color} rounded-lg flex items-center justify-center`}>
                    <skill.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{skill.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              The Hardest Parts of Dentistry are Still{' '}
              <span className="text-blue-600">Physical</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Students can access notes, lectures, videos, MCQs, and AI tutors. 
              But the skills that matter most happen in the body, not the mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              From Practice Video to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Structured Feedback
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Dental SkillOS closes the loop between practice and improvement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Record', desc: 'Student practices with phone camera' },
              { step: '2', title: 'Upload', desc: 'Session submitted to system' },
              { step: '3', title: 'Analyze', desc: 'AI extracts skill signals' },
              { step: '4', title: 'Improve', desc: 'Personalized feedback report' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-0">
                    <ChevronRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Ready to See the Demo?
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Experience how Dental SkillOS transforms a simple mirror-guided task 
              into actionable feedback for skill development.
            </p>
            <motion.button
              onClick={() => onNavigate('setup')}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-xl shadow-blue-500/25 flex items-center gap-3 mx-auto"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.5)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-6 h-6" />
              Start the Indirect Vision Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <ScanFace className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">Dental SkillOS</span>
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