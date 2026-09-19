import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { aiService, ScanResult } from '@/services/aiService';
import { Camera, RefreshCw, Sparkles, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CameraScannerProps {
  onDone?: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = () => {
  const navigate = useNavigate();
  const [scanState, setScanState] = useState<'idle' | 'capturing' | 'processing' | 'result'>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [activeTab, setActiveTab] = useState<'step' | 'explain'>('step');

  const handleCapture = async () => {
    setScanState('processing');
    try {
      const data = await aiService.scanQuestion('mock_camera_frame');
      setResult(data);
      setScanState('result');
    } catch {
      setScanState('idle');
    }
  };

  const handleRetake = () => {
    setResult(null);
    setScanState('idle');
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {scanState !== 'result' ? (
        <div className="w-full flex flex-col items-center">
          {/* Simulated Viewfinder */}
          <div className="relative w-full aspect-[4/5] bg-slate-900 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-elevated flex flex-col items-center justify-center p-6">
            {/* Viewfinder Target Reticle */}
            <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <div className="w-6 h-6 border-t-4 border-l-4 border-brand-primary rounded-tl-lg" />
                <div className="w-6 h-6 border-t-4 border-r-4 border-brand-primary rounded-tr-lg" />
              </div>
              <p className="text-center text-xs font-semibold text-white/80 bg-black/40 backdrop-blur-xs py-1.5 px-3 rounded-full self-center">
                Center question inside the frame
              </p>
              <div className="flex justify-between">
                <div className="w-6 h-6 border-b-4 border-l-4 border-brand-primary rounded-bl-lg" />
                <div className="w-6 h-6 border-b-4 border-r-4 border-brand-primary rounded-br-lg" />
              </div>
            </div>

            {/* Simulation Graphic */}
            <div className="text-center space-y-2 opacity-60">
              <Camera className="w-12 h-12 text-white mx-auto" />
              <p className="text-xs text-slate-300">Physics / Chemistry / Math textbook page</p>
            </div>

            {/* Processing Overlay */}
            {scanState === 'processing' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-brand-primary border-t-transparent animate-spin mb-4" />
                <h4 className="text-base font-bold text-white">Analyzing Question...</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Identifying Subject, Topic, and Concept Mastery
                </p>
              </div>
            )}
          </div>

          {/* Capture button */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={handleCapture}
              disabled={scanState === 'processing'}
              className="w-18 h-18 rounded-full bg-brand-primary text-brand-text-primary flex items-center justify-center shadow-brand ring-4 ring-yellow-200 active:scale-95 transition-transform"
            >
              <Camera className="w-8 h-8" />
            </button>
          </div>
          <span className="text-xs text-brand-text-secondary mt-2">Tap to Scan Question</span>
        </div>
      ) : (
        /* Result Screen */
        <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Card className="p-5 border-2 border-brand-ai/40 bg-white">
            {/* Detected Concept Header */}
            <div className="flex items-start justify-between pb-3 border-b border-brand-border">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-brand-ai text-xs font-bold">
                    {result?.subject}
                  </span>
                  <span className="text-xs text-brand-text-secondary font-medium">
                    {result?.chapter}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-brand-text-primary mt-1">
                  {result?.concept}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-brand-ai">
                  {result?.masteryPercentage}%
                </span>
                <span className="block text-[10px] uppercase font-bold text-brand-text-secondary">
                  Your Mastery
                </span>
              </div>
            </div>

            {/* Detected Problem Text */}
            <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-brand-text-primary">
              <span className="font-bold text-brand-text-secondary block mb-1">
                Detected Question:
              </span>
              "{result?.detectedText}"
            </div>

            {/* Mode switcher: Step by Step vs Explanation */}
            <div className="mt-4 flex gap-2 border-b border-brand-border pb-2">
              <button
                onClick={() => setActiveTab('step')}
                className={`text-xs font-bold px-3 py-1 rounded-lg ${
                  activeTab === 'step' ? 'bg-purple-100 text-brand-ai' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Step-by-Step
              </button>
              <button
                onClick={() => setActiveTab('explain')}
                className={`text-xs font-bold px-3 py-1 rounded-lg ${
                  activeTab === 'explain' ? 'bg-purple-100 text-brand-ai' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Concept Explanation
              </button>
            </div>

            {activeTab === 'step' ? (
              <div className="mt-3 space-y-2">
                {result?.stepByStep.map((step, idx) => (
                  <div key={idx} className="flex gap-2 text-xs">
                    <span className="font-bold text-brand-ai flex-shrink-0">{idx + 1}.</span>
                    <p className="text-brand-text-primary font-medium">{step}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-3 text-xs text-brand-text-primary leading-relaxed">
                <p>{result?.explanation}</p>
                {result?.keyFormula && (
                  <div className="mt-2 p-2.5 rounded-lg bg-amber-50 text-amber-900 font-mono font-bold text-center border border-amber-200">
                    {result.keyFormula}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-brand-border flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="primary"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => navigate('/student/practice')}
              >
                Practice Similar Problems
              </Button>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={handleRetake}
              >
                Scan Another
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
