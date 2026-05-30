'use client';

import { motion } from 'framer-motion';
import { 
  Clock, 
  ScanFace, 
  Eye, 
  Target, 
  Pause, 
  Activity,
  TrendingUp,
  User,
  Calendar,
  Hash,
  Lightbulb,
  Share2,
  Download,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar
} from 'recharts';
import { Screen, EventType } from '../../types';
import { sampleSessions, getSessionEvents, getSessionMetrics, getSessionReport } from '../../data/sampleData';
import { formatDuration } from '../../lib/utils';

interface ReportScreenProps {
  onNavigate: (screen: Screen) => void;
  sessionId: string;
}

const eventTypeColors: Record<EventType, string> = {
  mirror_reposition: '#2f8f9c',
  field_loss: '#d96a52',
  direct_vision_switch: '#d97706',
  pause: '#6b7280',
  target_miss: '#c2410c',
  hand_occlusion: '#7c3aed',
  posture_drift: '#059669',
  correction_event: '#0d9488',
};

const eventTypeLabels: Record<EventType, string> = {
  mirror_reposition: 'Mirror Reposition',
  field_loss: 'Field Loss',
  direct_vision_switch: 'Direct Vision',
  pause: 'Pause',
  target_miss: 'Target Miss',
  hand_occlusion: 'Hand Occlusion',
  posture_drift: 'Posture Drift',
  correction_event: 'Correction',
};

export default function ReportScreen({ onNavigate, sessionId }: ReportScreenProps) {
  const session = sampleSessions.find(s => s.id === sessionId) || sampleSessions[0];
  const events = getSessionEvents(session.id);
  const metrics = getSessionMetrics(session.id);
  const report = getSessionReport(session.id);

  if (!metrics || !report) return null;

  // Prepare chart data
  const eventCounts = events.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(eventCounts).map(([type, count]) => ({
    name: eventTypeLabels[type as EventType],
    count,
    fill: eventTypeColors[type as EventType],
  }));

  const radarData = [
    { subject: 'Mirror Stability', A: metrics.stabilityScore, fullMark: 100 },
    { subject: 'Smoothness', A: metrics.smoothnessScore, fullMark: 100 },
    { subject: 'Field Control', A: 100 - (metrics.fieldLossCount * 10), fullMark: 100 },
    { subject: 'Target Accuracy', A: 100 - (metrics.targetMissCount * 8), fullMark: 100 },
    { subject: 'Posture', A: 100 - (metrics.pauseCount * 5), fullMark: 100 },
  ];

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Impeccable: Header - Solid color, no gradient */}
      <section className="pt-24 pb-12 bg-success-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
                <BarChart3 className="w-4 h-4" />
                Feedback Report
              </span>
              <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-2 tracking-tight">
                Session Analysis
              </h1>
              <p className="text-success-100">
                Indirect Vision Practice • Attempt {session.attemptNumber}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => onNavigate('comparison')}
                className="btn-secondary bg-white text-success-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrendingUp className="w-5 h-5" />
                Compare Attempts
              </motion.button>
              <motion.button
                className="btn-secondary bg-success-800 text-white border-success-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Export
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Session Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="card-elevated p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Participant</p>
                <p className="font-semibold text-neutral-900">{session.participantId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Attempt</p>
                <p className="font-semibold text-neutral-900">#{session.attemptNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Duration</p>
                <p className="font-semibold text-neutral-900">{formatDuration(session.durationSeconds)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-500">Date</p>
                <p className="font-semibold text-neutral-900">
                  {new Date(session.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4 tracking-tight">Session Summary</h2>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                {report.summary}
              </p>
              
              <div className="bg-success-50 rounded-xl p-6 border border-success-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-success-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-success-900 mb-2">Main Pattern Observed</h3>
                    <p className="text-success-800">{report.mainPattern}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { 
                  icon: ScanFace, 
                  label: 'Mirror Repositions', 
                  value: metrics.mirrorRepositionCount,
                  color: 'primary'
                },
                { 
                  icon: Eye, 
                  label: 'Field Loss Events', 
                  value: metrics.fieldLossCount,
                  color: 'accent'
                },
                { 
                  icon: Target, 
                  label: 'Target Misses', 
                  value: metrics.targetMissCount,
                  color: 'accent'
                },
                { 
                  icon: Pause, 
                  label: 'Pauses', 
                  value: metrics.pauseCount,
                  color: 'neutral'
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="card p-5"
                >
                  <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <p className="text-2xl font-semibold text-neutral-900">{metric.value}</p>
                  <p className="text-sm text-neutral-500">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Event Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Interpretation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-primary-700 rounded-2xl p-8 text-white"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                AI Interpretation
              </h3>
              <p className="text-primary-100 leading-relaxed text-lg">
                {report.interpretation}
              </p>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Practice Recommendations</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Immediate Focus</h4>
                    <p className="text-neutral-600">{report.practiceRecommendation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Next Attempt Focus</h4>
                    <p className="text-neutral-600">{report.nextAttemptFocus}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Radar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#2f8f9c"
                      fill="#2f8f9c"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skill Scores */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Skill Scores</h3>
              <div className="space-y-4">
                {[
                  { label: 'Smoothness', value: metrics.smoothnessScore, color: 'bg-primary-500' },
                  { label: 'Stability', value: metrics.stabilityScore, color: 'bg-success-500' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">{skill.label}</span>
                      <span className="text-sm font-semibold text-neutral-900">{skill.value}/100</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Faculty Comment */}
            {report.facultyComment && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="card bg-neutral-100 border-neutral-200"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Faculty Note
                </h3>
                <p className="text-neutral-700 italic">&ldquo;{report.facultyComment}&rdquo;</p>
              </motion.div>
            )}

            {/* Review Status */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-600">Review Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  report.reviewStatus === 'reviewed' 
                    ? 'bg-success-100 text-success-700' 
                    : 'bg-accent-100 text-accent-700'
                }`}>
                  {report.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={() => onNavigate('capture')}
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-5 h-5" />
                Practice Again
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('comparison')}
                className="btn-secondary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-5 h-5" />
                Compare Attempts
              </motion.button>

              <motion.button
                className="btn-ghost w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Share2 className="w-5 h-5" />
                Share Report
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
