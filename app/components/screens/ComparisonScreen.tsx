'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock, 
  ScanFace, 
  Target,
  ChevronLeft,
  Award,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';
import { Screen } from '../../types';
import { sampleSessions, getSessionMetrics } from '../../data/sampleData';
import { formatDuration } from '../../lib/utils';

interface ComparisonScreenProps {
  onNavigate: (screen: Screen) => void;
  participantId: string;
}

export default function ComparisonScreen({ onNavigate, participantId }: ComparisonScreenProps) {
  const sessions = sampleSessions.filter(s => s.participantId === participantId).sort((a, b) => a.attemptNumber - b.attemptNumber);
  
  const comparisonData = sessions.map(session => {
    const metrics = getSessionMetrics(session.id);
    return {
      attempt: `Attempt ${session.attemptNumber}`,
      time: session.durationSeconds,
      mirrorRepos: metrics?.mirrorRepositionCount || 0,
      fieldLoss: metrics?.fieldLossCount || 0,
      directVision: metrics?.directVisionSwitchCount || 0,
      targetMisses: metrics?.targetMissCount || 0,
      smoothness: metrics?.smoothnessScore || 0,
      stability: metrics?.stabilityScore || 0,
    };
  });

  const improvementMetrics = [
    {
      label: 'Task Time',
      attempt1: comparisonData[0]?.time || 0,
      attempt2: comparisonData[1]?.time || 0,
      unit: 'sec',
      lowerIsBetter: true,
    },
    {
      label: 'Mirror Repositions',
      attempt1: comparisonData[0]?.mirrorRepos || 0,
      attempt2: comparisonData[1]?.mirrorRepos || 0,
      unit: '',
      lowerIsBetter: true,
    },
    {
      label: 'Field Loss Events',
      attempt1: comparisonData[0]?.fieldLoss || 0,
      attempt2: comparisonData[1]?.fieldLoss || 0,
      unit: '',
      lowerIsBetter: true,
    },
    {
      label: 'Target Misses',
      attempt1: comparisonData[0]?.targetMisses || 0,
      attempt2: comparisonData[1]?.targetMisses || 0,
      unit: '',
      lowerIsBetter: true,
    },
    {
      label: 'Smoothness Score',
      attempt1: comparisonData[0]?.smoothness || 0,
      attempt2: comparisonData[1]?.smoothness || 0,
      unit: '',
      lowerIsBetter: false,
    },
  ];

  const radarData = [
    { subject: 'Time Efficiency', A: Math.min(100, (comparisonData[0]?.time / comparisonData[1]?.time) * 100), B: 100 },
    { subject: 'Mirror Stability', A: comparisonData[0]?.stability || 0, B: comparisonData[1]?.stability || 0 },
    { subject: 'Smoothness', A: comparisonData[0]?.smoothness || 0, B: comparisonData[1]?.smoothness || 0 },
    { subject: 'Field Control', A: 100 - (comparisonData[0]?.fieldLoss * 10), B: 100 - (comparisonData[1]?.fieldLoss * 10) },
    { subject: 'Target Accuracy', A: 100 - (comparisonData[0]?.targetMisses * 8), B: 100 - (comparisonData[1]?.targetMisses * 8) },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-violet-600 to-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <motion.button
                onClick={() => onNavigate('report')}
                className="inline-flex items-center gap-2 text-violet-200 hover:text-white mb-4 transition-colors"
                whileHover={{ x: -4 }}
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Report
              </motion.button>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Progress Comparison
              </h1>
              <p className="text-violet-100">
                Track improvement across practice attempts
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Student Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
              {participantId.split('-')[1]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{participantId}</h2>
              <p className="text-slate-500">Indirect Vision Practice • {sessions.length} attempts recorded</p>
            </div>
          </div>
        </motion.div>

        {/* Improvement Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 text-white mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Overall Improvement</h2>
              <p className="text-emerald-100">Great progress from Attempt 1 to Attempt 2</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div className="text-center">
              <p className="text-3xl font-bold">16%</p>
              <p className="text-sm text-emerald-100">Faster completion</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">50%</p>
              <p className="text-sm text-emerald-100">Fewer mirror adjustments</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">43%</p>
              <p className="text-sm text-emerald-100">Better field control</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">+16</p>
              <p className="text-sm text-emerald-100">Smoothness points</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Detailed Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-sm font-semibold text-slate-600">Metric</th>
                    <th className="text-center py-3 text-sm font-semibold text-slate-600">Attempt 1</th>
                    <th className="text-center py-3 text-sm font-semibold text-slate-600">Attempt 2</th>
                    <th className="text-center py-3 text-sm font-semibold text-slate-600">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {improvementMetrics.map((metric) => {
                    const change = metric.attempt2 - metric.attempt1;
                    const improved = metric.lowerIsBetter ? change < 0 : change > 0;
                    const changePercent = metric.attempt1 !== 0 
                      ? Math.round((change / metric.attempt1) * 100) 
                      : 0;

                    return (
                      <tr key={metric.label} className="border-b border-slate-100">
                        <td className="py-4 text-sm font-medium text-slate-700">{metric.label}</td>
                        <td className="py-4 text-center text-sm text-slate-600">
                          {metric.label === 'Task Time' 
                            ? formatDuration(metric.attempt1)
                            : `${metric.attempt1}${metric.unit}`}
                        </td>
                        <td className="py-4 text-center text-sm text-slate-600">
                          {metric.label === 'Task Time' 
                            ? formatDuration(metric.attempt2)
                            : `${metric.attempt2}${metric.unit}`}
                        </td>
                        <td className="py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                            improved 
                              ? 'bg-green-100 text-green-700' 
                              : change === 0 
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-red-100 text-red-700'
                          }`}>
                            {improved ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : change === 0 ? (
                              <Minus className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(changePercent)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-6">Skill Profile Comparison</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar
                    name="Attempt 1"
                    dataKey="A"
                    stroke="#94A3B8"
                    fill="#94A3B8"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Attempt 2"
                    dataKey="B"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-400 rounded-full" />
                <span className="text-sm text-slate-600">Attempt 1</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-violet-500 rounded-full" />
                <span className="text-sm text-slate-600">Attempt 2</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Over Time Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mt-8"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6">Progress Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="smoothness" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  name="Smoothness"
                />
                <Line 
                  type="monotone" 
                  dataKey="stability" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  name="Stability"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          {[
            {
              icon: ScanFace,
              title: 'Mirror Control',
              description: 'Reposition events reduced from 6 to 3, showing improved field stabilization before movement.',
              color: 'blue',
            },
            {
              icon: Target,
              title: 'Target Accuracy',
              description: 'Target misses decreased from 3 to 1, indicating better hand-eye coordination through the mirror.',
              color: 'emerald',
            },
            {
              icon: Clock,
              title: 'Efficiency',
              description: 'Task completion time improved by 32 seconds while maintaining accuracy gains.',
              color: 'violet',
            },
          ].map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6"
            >
              <div className={`w-12 h-12 bg-${insight.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <insight.icon className={`w-6 h-6 text-${insight.color}-600`} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{insight.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={() => onNavigate('capture')}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-lg rounded-xl shadow-xl flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="w-6 h-6" />
            Schedule Next Practice
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}