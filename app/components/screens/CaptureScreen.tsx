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
  X
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Screen } from '../../types';

interface CaptureScreenProps {
  onNavigate: (screen: Screen) => void;
}

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

  const canSubmit = formData.consent && (selectedFile || true);

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Impeccable: Header - Solid color, no gradient */}
      <section className="pt-24 pb-12 bg-primary-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Video className="w-4 h-4" />
              Session Capture
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4 tracking-tight">
              Record Your Practice
            </h1>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Upload your practice video and provide session details for analysis.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Upload */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary-600" />
                Upload Practice Video
              </h2>

              {!selectedFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-neutral-300 rounded-2xl p-12 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all"
                >
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Video className="w-10 h-10 text-primary-600" />
                  </div>
                  <p className="text-lg font-semibold text-neutral-700 mb-2">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-sm text-neutral-500">
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
                <div className="bg-neutral-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{selectedFile.name}</p>
                        <p className="text-sm text-neutral-500">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>
                  
                  {isUploading ? (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-neutral-600">Uploading...</span>
                        <span className="font-semibold text-primary-600">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <motion.div
                          animate={{ width: `${uploadProgress}%` }}
                          className="h-full bg-primary-600"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-success-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Upload complete</span>
                    </div>
                  )}
                </div>
              )}

              {/* Demo Video Options */}
              <div className="mt-6 pt-6 border-t border-neutral-100">
                <p className="text-sm font-medium text-neutral-700 mb-3">Or select a demo video:</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Attempt 1 (Poor)', 'Attempt 2 (Improved)', 'Attempt 3 (Fatigue)'].map((label, i) => (
                    <button
                      key={label}
                      onClick={() => {
                        setSelectedFile(new File([], `demo_${i + 1}.mp4`));
                        setFormData(prev => ({ ...prev, attemptNumber: String(i + 1) }));
                      }}
                      className="p-3 bg-neutral-50 rounded-lg text-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-700 border border-neutral-200 hover:border-primary-300 transition-all"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Session Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-8"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary-600" />
                Session Details
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Participant ID
                  </label>
                  <select
                    value={formData.participantId}
                    onChange={(e) => setFormData(prev => ({ ...prev, participantId: e.target.value }))}
                    className="input"
                  >
                    <option value="STU-001">STU-001</option>
                    <option value="STU-002">STU-002</option>
                    <option value="STU-DEMO">STU-DEMO</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Attempt Number
                  </label>
                  <select
                    value={formData.attemptNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, attemptNumber: e.target.value }))}
                    className="input"
                  >
                    <option value="1">Attempt 1</option>
                    <option value="2">Attempt 2</option>
                    <option value="3">Attempt 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <Battery className="w-4 h-4 inline mr-1" />
                    Fatigue Level (1-5)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.fatigueRating}
                      onChange={(e) => setFormData(prev => ({ ...prev, fatigueRating: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-semibold text-primary-600">{formData.fatigueRating}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <Activity className="w-4 h-4 inline mr-1" />
                    Difficulty Level (1-5)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.difficultyRating}
                      onChange={(e) => setFormData(prev => ({ ...prev, difficultyRating: parseInt(e.target.value) }))}
                      className="flex-1"
                    />
                    <span className="w-8 text-center font-semibold text-primary-600">{formData.difficultyRating}</span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any observations about this practice session..."
                    rows={3}
                    className="input resize-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Consent Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="card-elevated p-6"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Consent & Privacy</h3>
              
              <div className="bg-accent-50 rounded-xl p-4 mb-4 border border-accent-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-accent-800 leading-relaxed">
                    This prototype is for preclinical practice feedback only. 
                    No patient data should be uploaded.
                  </p>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                  formData.consent 
                    ? 'bg-primary-600 border-primary-600' 
                    : 'border-neutral-300'
                }`}>
                  {formData.consent && <Check className="w-3 h-3 text-white" />}
                </div>
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData(prev => ({ ...prev, consent: e.target.checked }))}
                  className="hidden"
                />
                <span className="text-sm text-neutral-700 leading-relaxed">
                  I understand this is not clinical advice, grading, diagnosis, 
                  or competence certification. I consent to anonymized analysis 
                  of my practice session.
                </span>
              </label>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-primary-700 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">Recording Standards</h3>
              <ul className="space-y-2 text-sm text-primary-100">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Target: Digital display, 2cm × 2cm, 80-100% brightness
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Camera: Macro mode, 15-20cm distance, locked position
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Video: 1080p/4K, 60fps, locked focus/exposure
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Lighting: Ring light or dual LEDs, no screen glare
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Frame: Full target (2cm) + both hands visible
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Audio: State attempt number at start/end
                </li>
              </ul>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                canSubmit
                  ? 'btn-primary'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
            >
              Analyze Session
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
