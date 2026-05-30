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
  mirror_reposition: '#3B82F6',
  field_loss: '#EF4444',
  direct_vision_switch: '#F59E0B',
  pause: '#6B7280',
  target_miss: '#EC4899',
  hand_occlusion: '#8B5CF6',
  posture_drift: '#10B981',
  correction_event: '#14B8A6',
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

  // Timeline data for future use
  // const timelineData = events.map(e => ({
  //   time: e.timestampStart,
  //   type: eventTypeLabels[e.eventType],
  //   color: eventTypeColors[e.eventType],
  // }));

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-emerald-600 to-teal-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-4">
                <BarChart3 className="w-4 h-4" />
                Feedback Report
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Session Analysis
              </h1>
              <p className="text-emerald-100">
                Indirect Vision Practice • Attempt {session.attemptNumber}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => onNavigate('comparison')}
                className="px-6 py-3 bg-white text-emerald-700 font-semibold rounded-xl shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <TrendingUp className="w-5 h-5" />
                Compare Attempts
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Session Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Participant</p>
                <p className="font-semibold text-slate-900">{session.participantId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Attempt</p>
                <p className="font-semibold text-slate-900">#{session.attemptNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="font-semibold text-slate-900">{formatDuration(session.durationSeconds)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="font-semibold text-slate-900">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Session Summary</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {report.summary}
              </p>
              
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 mb-2">Main Pattern Observed</h3>
                    <p className="text-emerald-800">{report.mainPattern}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Metrics Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { 
                  icon: ScanFace, 
                  label: 'Mirror Repositions', 
                  value: metrics.mirrorRepositionCount,
                  color: 'blue'
                },
                { 
                  icon: Eye, 
                  label: 'Field Loss Events', 
                  value: metrics.fieldLossCount,
                  color: 'red'
                },
                { 
                  icon: Target, 
                  label: 'Target Misses', 
                  value: metrics.targetMissCount,
                  color: 'pink'
                },
                { 
                  icon: Pause, 
                  label: 'Pauses', 
                  value: metrics.pauseCount,
                  color: 'gray'
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-white rounded-xl shadow-lg border border-slate-100 p-5"
                >
                  <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                    <metric.icon className={`w-5 h-5 text-${metric.color}-600`} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                  <p className="text-sm text-slate-500">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Event Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #E2E8F0',
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                AI Interpretation
              </h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                {report.interpretation}
              </p>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Practice Recommendations</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Activity className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Immediate Focus</h4>
                    <p className="text-slate-600">{report.practiceRecommendation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Next Attempt Focus</h4>
                    <p className="text-slate-600">{report.nextAttemptFocus}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Profile</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E2E8F0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                    <Radar
                      name="Performance"
                      dataKey="A"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Skill Scores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Skill Scores</h3>
              <div className="space-y-4">
                {[
                  { label: 'Smoothness', value: metrics.smoothnessScore, color: 'bg-blue-500' },
                  { label: 'Stability', value: metrics.stabilityScore, color: 'bg-emerald-500' },
                ].map((skill) => (
                  <div key={skill.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{skill.label}</span>
                      <span className="text-sm font-bold text-slate-900">{skill.value}/100</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-violet-50 rounded-2xl border border-violet-100 p-6"
              >
                <h3 className="text-lg font-bold text-violet-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Faculty Note
                </h3>
                <p className="text-violet-800 italic">&ldquo;{report.facultyComment}&rdquo;</p>
              </motion.div>
            )}

            {/* Review Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">Review Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  report.reviewStatus === 'reviewed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {report.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={() => onNavigate('capture')}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw className="w-5 h-5" />
                Practice Again
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('comparison')}
                className="w-full py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:border-slate-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-5 h-5" />
                Compare Attempts
              </motion.button>

              <motion.button
                className="w-full py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:border-slate-300"
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