'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  BarChart3,
  MessageSquare,
  MoreHorizontal,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../../types';
import { sampleSessions, sampleReports, getSessionReport } from '../../data/sampleData';
import { formatDuration } from '../../lib/utils';

interface FacultyScreenProps {
  onNavigate: (screen: Screen, sessionId?: string) => void;
}

export default function FacultyScreen({ onNavigate }: FacultyScreenProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = sampleSessions.filter(session => {
    const report = getSessionReport(session.id);
    const matchesSearch = session.participantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.taskType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report?.reviewStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalStudents: new Set(sampleSessions.map(s => s.participantId)).size,
    totalSessions: sampleSessions.length,
    pendingReviews: sampleReports.filter(r => r.reviewStatus === 'pending').length,
    reviewedSessions: sampleReports.filter(r => r.reviewStatus === 'reviewed').length,
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Faculty Dashboard
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Student Practice Review
            </h1>
            <p className="text-xl text-slate-300">
              Review student attempts, provide feedback, and track progress across sessions.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Students', value: stats.totalStudents, icon: Users, color: 'blue' },
            { label: 'Total Sessions', value: stats.totalSessions, icon: FileText, color: 'indigo' },
            { label: 'Pending Review', value: stats.pendingReviews, icon: Clock, color: 'amber' },
            { label: 'Reviewed', value: stats.reviewedSessions, icon: CheckCircle, color: 'emerald' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6"
            >
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student or task..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400 mr-2" />
              {(['all', 'pending', 'reviewed'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sessions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Recent Sessions</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Student</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Task</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Attempt</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Duration</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session, index) => {
                  const report = getSessionReport(session.id);
                  return (
                    <motion.tr
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {session.participantId.split('-')[1]}
                          </div>
                          <span className="font-medium text-slate-900">{session.participantId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                          <Eye className="w-3.5 h-3.5" />
                          Indirect Vision
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-slate-700">#{session.attemptNumber}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {formatDuration(session.durationSeconds)}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          report?.reviewStatus === 'reviewed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {report?.reviewStatus === 'reviewed' ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          {report?.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => onNavigate('report', session.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="View Report"
                          >
                            <FileText className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Add Comment"
                          >
                            <MessageSquare className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="More Options"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mt-8"
        >
          {[
            {
              icon: BarChart3,
              title: 'Class Analytics',
              description: 'View aggregate statistics and trends across all students.',
              color: 'blue',
              action: 'View Analytics',
            },
            {
              icon: TrendingUp,
              title: 'Progress Tracking',
              description: 'Monitor individual student improvement over time.',
              color: 'emerald',
              action: 'Track Progress',
            },
            {
              icon: Download,
              title: 'Export Data',
              description: 'Download session data and reports for offline review.',
              color: 'violet',
              action: 'Export Reports',
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{item.description}</p>
              <button className={`text-sm font-semibold text-${item.color}-600 flex items-center gap-1 hover:gap-2 transition-all`}>
                {item.action}
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Common Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100 p-8 mt-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Common Patterns Observed</h3>
              <p className="text-amber-800 mb-4">
                Based on recent sessions, here are the most frequent areas where students need support:
              </p>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  Mirror stability before instrument movement (75% of students)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  Maintaining field of view during complex paths (60% of students)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  Posture drift after 2+ minutes of practice (45% of students)
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}