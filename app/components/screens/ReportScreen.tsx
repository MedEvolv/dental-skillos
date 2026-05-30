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
  RotateCcw,
  BarChart3,
  ChevronLeft,
  ArrowRight
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ReportScreenProps {
  onNavigate: (screen: Screen) => void;
  sessionId: string;
}

const eventTypeColors: Record<EventType, string> = {
  mirror_reposition: '#0d9488',
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

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

export default function ReportScreen({ onNavigate, sessionId }: ReportScreenProps) {
  const session = sampleSessions.find(s => s.id === sessionId) || sampleSessions[0];
  const events = getSessionEvents(session.id);
  const metrics = getSessionMetrics(session.id);
  const report = getSessionReport(session.id);

  if (!metrics || !report) return null;

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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="clinical-header">
        <div className="clinical-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-stone-900 rounded-md flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-stone-900">Dental SkillOS</h1>
                <p className="text-xs text-stone-500">Session Analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Step 3 of 3</Badge>
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
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-stone-900">Setup</span>
            </div>
            <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-stone-900">Record</span>
            </div>
            <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm font-medium text-stone-900">Analyze</span>
            </div>
          </div>
        </div>
      </div>

      <main className="clinical-section">
        <div className="clinical-container">
          {/* Session Info */}
          <motion.div {...fadeIn} className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="clinical-icon-box shrink-0">
                      <User className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Participant</p>
                      <p className="font-medium text-stone-900">{session.participantId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="clinical-icon-box shrink-0">
                      <Hash className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Attempt</p>
                      <p className="font-medium text-stone-900">#{session.attemptNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="clinical-icon-box shrink-0">
                      <Clock className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Duration</p>
                      <p className="font-medium text-stone-900">{formatDuration(session.durationSeconds)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="clinical-icon-box shrink-0">
                      <Calendar className="w-5 h-5 text-stone-600" />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Date</p>
                      <p className="font-medium text-stone-900">
                        {new Date(session.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Session Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-stone-700 leading-relaxed">
                      {report.summary}
                    </p>
                    
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <div className="flex items-start gap-4">
                        <div className="clinical-icon-box-accent shrink-0">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-teal-900 mb-1">Main Pattern Observed</h3>
                          <p className="text-sm text-teal-800">{report.mainPattern}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Metrics */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: ScanFace, label: 'Mirror Repositions', value: metrics.mirrorRepositionCount },
                    { icon: Eye, label: 'Field Loss Events', value: metrics.fieldLossCount },
                    { icon: Target, label: 'Target Misses', value: metrics.targetMissCount },
                    { icon: Pause, label: 'Pauses', value: metrics.pauseCount },
                  ].map((metric, index) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="clinical-icon-box mb-3">
                            <metric.icon className="w-4 h-4 text-stone-600" />
                          </div>
                          <p className="text-2xl font-semibold text-stone-900">{metric.value}</p>
                          <p className="text-xs text-stone-500">{metric.label}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Event Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-45} textAnchor="end" height={80} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#fff', 
                              border: '1px solid #e7e5e4',
                              borderRadius: '6px',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }} 
                          />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Interpretation */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Card className="bg-stone-900 text-white border-stone-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      AI Interpretation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-300 leading-relaxed">
                      {report.interpretation}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recommendations */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Practice Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="clinical-icon-box-warning shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900 mb-1">Immediate Focus</h4>
                        <p className="text-sm text-stone-600">{report.practiceRecommendation}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-start gap-4">
                      <div className="clinical-icon-box-accent shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-stone-900 mb-1">Next Attempt Focus</h4>
                        <p className="text-sm text-stone-600">{report.nextAttemptFocus}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Radar Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Performance Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e7e5e4" />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                          <Radar
                            name="Performance"
                            dataKey="A"
                            stroke="#0d9488"
                            fill="#0d9488"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skill Scores */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Skill Scores</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: 'Smoothness', value: metrics.smoothnessScore, color: 'bg-teal-600' },
                      { label: 'Stability', value: metrics.stabilityScore, color: 'bg-stone-800' },
                    ].map((skill) => (
                      <div key={skill.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-stone-600">{skill.label}</span>
                          <span className="text-sm font-medium text-stone-900">{skill.value}/100</span>
                        </div>
                        <div className="clinical-progress">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full ${skill.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Faculty Comment */}
              {report.facultyComment && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <Card className="bg-stone-100 border-stone-200">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Faculty Note
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-stone-700 italic">&ldquo;{report.facultyComment}&rdquo;</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Status */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-stone-600">Review Status</span>
                      <Badge 
                        variant={report.reviewStatus === 'reviewed' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.reviewStatus === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.6, duration: 0.3 }}
                className="space-y-3"
              >
                <Button 
                  onClick={() => onNavigate('capture')}
                  className="w-full gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Practice Again
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('comparison')}
                  className="w-full gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  Compare Attempts
                </Button>

                <Button 
                  variant="ghost"
                  className="w-full gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Report
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-10 flex items-center justify-between"
          >
            <Button variant="outline" onClick={() => onNavigate('capture')} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Back to Capture
            </Button>
            <Button onClick={() => onNavigate('landing')} className="gap-2">
              Finish
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
