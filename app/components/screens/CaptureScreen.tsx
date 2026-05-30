'use client';

import { motion } from 'framer-motion';
import { 
  Upload, 
  Video, 
  User, 
  Hash, 
  Activity, 
  Battery, 
  FileText,
  ChevronRight,
  Check,
  AlertCircle,
  Play,
  X,
  ArrowLeft
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Screen } from '../../types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface CaptureScreenProps {
  onNavigate: (screen: Screen) => void;
}

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
};

export default function CaptureScreen({ onNavigate }: CaptureScreenProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    participantId: 'STU-001',
    attemptNumber: '1',
    fatigueRating: 3,
    difficultyRating: 3,
    notes: '',
    consent: false,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSubmit = () => {
    if (!formData.consent) return;
    onNavigate('processing');
  };

  const canSubmit = formData.consent;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="clinical-header">
        <div className="clinical-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-stone-900 rounded-md flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-stone-900">Dental SkillOS</h1>
                <p className="text-xs text-stone-500">Session Capture</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Step 2 of 3</Badge>
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
                <Check className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-stone-900">Setup</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-stone-900">Record</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-stone-500">Analyze</span>
            </div>
          </div>
        </div>
      </div>

      <main className="clinical-section">
        <div className="clinical-container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Video Upload */}
              <motion.div {...fadeIn}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Upload className="w-5 h-5 text-stone-600" />
                      Upload Practice Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!selectedFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-stone-300 rounded-lg p-12 text-center cursor-pointer hover:border-stone-400 hover:bg-stone-50 transition-all"
                      >
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Video className="w-8 h-8 text-stone-600" />
                        </div>
                        <p className="text-base font-medium text-stone-700 mb-2">
                          Drop your video here or click to browse
                        </p>
                        <p className="text-sm text-stone-500">
                          Supports MP4, MOV, AVI up to 500MB
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="bg-stone-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-stone-200 rounded-lg flex items-center justify-center">
                              <Play className="w-5 h-5 text-stone-700" />
                            </div>
                            <div>
                              <p className="font-medium text-stone-900 text-sm">{selectedFile.name}</p>
                              <p className="text-xs text-stone-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedFile(null)}
                            className="p-2 hover:bg-stone-200 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4 text-stone-500" />
                          </button>
                        </div>
                        
                        {isUploading ? (
                          <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-stone-600">Uploading...</span>
                              <span className="font-medium text-stone-900">{uploadProgress}%</span>
                            </div>
                            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                              <motion.div
                                animate={{ width: `${uploadProgress}%` }}
                                className="h-full bg-stone-900 rounded-full"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-teal-600">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">Upload complete</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Demo Videos */}
                    <div className="mt-6 pt-6 border-t border-stone-100">
                      <p className="text-sm font-medium text-stone-700 mb-3">Or select a demo video:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {['Attempt 1 (Poor)', 'Attempt 2 (Improved)', 'Attempt 3 (Fatigue)'].map((label, i) => (
                          <button
                            key={label}
                            onClick={() => {
                              setSelectedFile(new File([], `demo_${i + 1}.mp4`));
                              setFormData(prev => ({ ...prev, attemptNumber: String(i + 1) }));
                            }}
                            className="p-3 bg-stone-50 rounded-lg text-sm text-stone-700 hover:bg-stone-100 border border-stone-200 hover:border-stone-300 transition-all text-left"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Session Details */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5 text-stone-600" />
                      Session Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <User className="w-4 h-4 text-stone-500" />
                          Participant ID
                        </Label>
                        <Select 
                          value={formData.participantId}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, participantId: value || 'STU-001' }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="STU-001">STU-001</SelectItem>
                            <SelectItem value="STU-002">STU-002</SelectItem>
                            <SelectItem value="STU-DEMO">STU-DEMO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-stone-500" />
                          Attempt Number
                        </Label>
                        <Select 
                          value={formData.attemptNumber}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, attemptNumber: value || '1' }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Attempt 1</SelectItem>
                            <SelectItem value="2">Attempt 2</SelectItem>
                            <SelectItem value="3">Attempt 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-stone-500" />
                          Fatigue Level (1-5)
                        </Label>
                        <Slider
                          value={[formData.fatigueRating]}
                          onValueChange={(values) => setFormData(prev => ({ ...prev, fatigueRating: values[0] }))}
                          min={1}
                          max={5}
                          step={1}
                        />
                        <div className="flex justify-between text-xs text-stone-500">
                          <span>Fresh</span>
                          <span className="font-medium text-stone-900">{formData.fatigueRating}</span>
                          <span>Exhausted</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-stone-500" />
                          Difficulty Level (1-5)
                        </Label>
                        <Slider
                          value={[formData.difficultyRating]}
                          onValueChange={(values) => setFormData(prev => ({ ...prev, difficultyRating: values[0] }))}
                          min={1}
                          max={5}
                          step={1}
                        />
                        <div className="flex justify-between text-xs text-stone-500">
                          <span>Easy</span>
                          <span className="font-medium text-stone-900">{formData.difficultyRating}</span>
                          <span>Hard</span>
                        </div>
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <Label>Notes (Optional)</Label>
                        <Textarea
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Any observations about this practice session..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Consent */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consent & Privacy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                          This prototype is for preclinical practice feedback only. 
                          No patient data should be uploaded.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, consent: checked as boolean }))
                        }
                      />
                      <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer">
                        I understand this is not clinical advice, grading, diagnosis, 
                        or competence certification. I consent to anonymized analysis 
                        of my practice session.
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recording Standards */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Card className="bg-stone-900 text-white border-stone-800">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">Recording Standards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-stone-300">
                      {[
                        'Target: Digital display, 2cm × 2cm, 80-100% brightness',
                        'Camera: Macro mode, 15-20cm distance, locked position',
                        'Video: 1080p/4K, 60fps, locked focus/exposure',
                        'Lighting: Ring light or dual LEDs, no screen glare',
                        'Frame: Full target (2cm) + both hands visible',
                        'Audio: State attempt number at start/end'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Button 
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  Analyze Session
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                {!canSubmit && (
                  <p className="text-xs text-stone-500 text-center mt-2">
                    Please provide consent to continue
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-10 flex items-center justify-between"
          >
            <Button variant="outline" onClick={() => onNavigate('setup')} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Setup
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
