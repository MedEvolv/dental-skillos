export type TaskType = 'indirect-vision' | 'wire-bend' | 'demo';

export type EventType = 
  | 'mirror_reposition'
  | 'field_loss'
  | 'direct_vision_switch'
  | 'pause'
  | 'target_miss'
  | 'hand_occlusion'
  | 'posture_drift'
  | 'correction_event';

export interface Session {
  id: string;
  participantId: string;
  taskType: TaskType;
  attemptNumber: number;
  videoUrl: string;
  createdAt: string;
  durationSeconds: number;
  fatigueRating: number;
  difficultyRating: number;
  notes?: string;
  consentStatus: boolean;
}

export interface Event {
  id: string;
  sessionId: string;
  eventType: EventType;
  timestampStart: number;
  timestampEnd: number;
  confidence: number;
  taggedBy: 'manual' | 'auto' | 'simulated';
  notes?: string;
}

export interface Metrics {
  id: string;
  sessionId: string;
  taskTime: number;
  mirrorRepositionCount: number;
  fieldLossCount: number;
  directVisionSwitchCount: number;
  pauseCount: number;
  targetMissCount: number;
  correctionCount: number;
  smoothnessScore: number;
  stabilityScore: number;
  improvementScore?: number;
}

export interface FeedbackReport {
  id: string;
  sessionId: string;
  summary: string;
  mainPattern: string;
  interpretation: string;
  practiceRecommendation: string;
  nextAttemptFocus: string;
  facultyComment?: string;
  reviewStatus: 'pending' | 'reviewed';
  createdAt: string;
}

export type Screen = 
  | 'landing'
  | 'setup'
  | 'capture'
  | 'processing'
  | 'report'
  | 'comparison'
  | 'faculty'
  | 'venture';