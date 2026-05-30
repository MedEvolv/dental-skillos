'use client';

import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Users, 
  TrendingUp, 
  Lightbulb,
  ChevronRight,
  GraduationCap,
  Building2,
  Stethoscope,
  Globe,
  Sparkles,
  CheckCircle,
  ArrowRight,
  HandHeart
} from 'lucide-react';
import { Screen } from '../../types';

interface VentureScreenProps {
  onNavigate: (screen: Screen) => void;
}

const businessModels = [
  {
    title: 'Student Subscription',
    price: '₹199-499/month',
    icon: Users,
    color: 'blue',
    pros: ['Fast adoption', 'Direct user', 'Useful for exam/coaching'],
    cons: ['Price-sensitive', 'Requires strong trust'],
    recommended: false,
  },
  {
    title: 'College Lab License',
    price: '₹50K-2L/year/department',
    icon: GraduationCap,
    color: 'emerald',
    pros: ['Stronger credibility', 'Structured use', 'Faculty integration'],
    cons: ['Slower sales cycle'],
    recommended: true,
  },
  {
    title: 'Coaching/Simulation Center',
    price: 'Custom pricing',
    icon: Building2,
    color: 'violet',
    pros: ['Easier pilot', 'Practical skill training'],
    cons: ['Smaller initial market'],
    recommended: false,
  },
  {
    title: 'Hardware + SaaS Kit',
    price: 'Premium bundle',
    icon: Stethoscope,
    color: 'amber',
    pros: ['Tangible product', 'Setup control'],
    cons: ['Hardware support burden'],
    recommended: false,
  },
];

const expansionVerticals = [
  { name: 'Wire Bending', status: 'Planned', description: 'Orthodontic wire bending practice' },
  { name: 'Teeth Setting', status: 'Future', description: 'Prosthodontic teeth arrangement' },
  { name: 'Wax Adaptation', status: 'Future', description: 'Crown and bridge wax work' },
  { name: 'Posture Coach', status: 'Future', description: 'Ergonomics and positioning' },
  { name: 'Field Control', status: 'Future', description: 'Advanced mirror techniques' },
];

export default function VentureScreen({ onNavigate }: VentureScreenProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
              <Rocket className="w-4 h-4" />
              Venture Opportunity
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              From Dental EdTech to{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent">
                Embodied AI
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Dental SkillOS begins in dentistry, but the broader category is embodied skill feedback: 
              making hands-on professional learning measurable, teachable, and ethical.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Problem Validation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Target className="w-7 h-7 text-indigo-600" />
            The Opportunity Gap
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">$12B+</div>
              <p className="text-slate-600">Global dental education market</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">3.2M</div>
              <p className="text-slate-600">Dental students worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">White Space</div>
              <p className="text-slate-600">No skill feedback infrastructure</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <p className="text-lg text-slate-700 leading-relaxed">
              <strong>The Gap:</strong> Dental education platforms monetize content (videos, MCQs, notes). 
              There is a white space for skill feedback infrastructure—the missing layer between 
              content learning → practice attempt → feedback → improvement.
            </p>
          </div>
        </motion.div>

        {/* Business Models */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-7 h-7 text-emerald-600" />
            Business Model Options
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {businessModels.map((model, index) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg border-2 p-6 relative ${
                  model.recommended ? 'border-emerald-500' : 'border-slate-100'
                }`}
              >
                {model.recommended && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-${model.color}-100 rounded-xl flex items-center justify-center`}>
                    <model.icon className={`w-7 h-7 text-${model.color}-600`} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">{model.price}</p>
                    <p className="text-sm text-slate-500">{model.title}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 mb-1">Pros:</p>
                    <ul className="space-y-1">
                      {model.pros.map((pro, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-700 mb-1">Cons:</p>
                    <ul className="space-y-1">
                      {model.cons.map((con, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-xs">!</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Expansion Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Globe className="w-7 h-7 text-violet-600" />
            Expansion Roadmap
          </h2>
          
          <div className="grid md:grid-cols-5 gap-4">
            {expansionVerticals.map((vertical, index) => (
              <motion.div
                key={vertical.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  index === 0 
                    ? 'bg-blue-50 border-blue-200' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold mb-2 ${
                  index === 0 ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {vertical.status}
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{vertical.name}</h4>
                <p className="text-xs text-slate-600">{vertical.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-violet-50 rounded-xl border border-violet-100">
            <p className="text-sm text-violet-800">
              <strong>Beyond Dentistry:</strong> The same platform architecture applies to surgical training, 
              physical therapy, sports coaching, and other embodied skill domains.
            </p>
          </div>
        </motion.div>

        {/* The Ask */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <HandHeart className="w-7 h-7 text-pink-400" />
            The Masters&apos; Union Ask
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-200">What We Need</h3>
              <ul className="space-y-3">
                {[
                  'Product mentorship from experienced EdTech/HealthTech founders',
                  'Technical collaborator (CV/ML engineer) for v1 development',
                  'Guidance on Masters&apos; Union venture track or capstone integration',
                  'Introduction to dental education stakeholders for pilot validation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-200">What We Offer</h3>
              <ul className="space-y-3">
                {[
                  'Strong domain insight from dental education background',
                  'Working MVP with real user feedback loop demonstrated',
                  'Clear wedge into embodied skill AI—a defensible category',
                  'Commitment to ethical AI and responsible deployment',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Why Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {[
            {
              icon: Lightbulb,
              title: 'AI Timing',
              description: 'Computer vision and pose estimation have reached the accuracy and cost thresholds needed for skill analysis.',
              color: 'amber',
            },
            {
              icon: GraduationCap,
              title: 'Education Shift',
              description: 'Post-pandemic, dental schools are actively seeking digital solutions for preclinical training.',
              color: 'blue',
            },
            {
              icon: Stethoscope,
              title: 'First-Mover',
              description: 'No existing player focuses specifically on embodied skill feedback in dental education.',
              color: 'emerald',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6"
            >
              <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center py-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Ready to Build the Future of Skill Training?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => onNavigate('setup')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-xl shadow-xl flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket className="w-6 h-6" />
              Try the Demo
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => onNavigate('landing')}
              className="px-8 py-4 bg-white text-slate-700 font-bold text-lg rounded-xl border border-slate-200 shadow-lg flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}