import React, { useState, useEffect } from 'react';
import LoadingState from '../../components/shared/LoadingState.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import ProcessingStep from '../../components/ui/ProcessingStep.jsx';
import Icon from '../../components/ui/Icon.jsx';

const mockScanData = {
  recentHistory: [
    { label: 'Amoxicillin 500mg', id: '#RX-2942', when: '2h ago', tone: 'success' },
    { label: 'Lisinopril + Warfarin', id: '#RX-2810', when: 'Yesterday', tone: 'warning' },
    { label: 'Ibuprofen 800mg', id: '#RX-2751', when: '3 days ago', tone: 'success' },
  ],
};

function PharmacistScanPrescriptionPage() {
  const [data] = useState(mockScanData);
  const [scanState, setScanState] = useState('idle'); // idle, selected, analyzing, complete
  const [progress, setProgress] = useState(0);

  // Simulate analysis progress
  useEffect(() => {
    let interval;
    if (scanState === 'analyzing') {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setScanState('complete'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  const handleSelectFile = () => setScanState('selected');
  const handleAnalyze = () => setScanState('analyzing');
  const handleReset = () => setScanState('idle');

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Scan prescription</h1>
        <p className="text-sm text-muted">
          Upload handwritten or printed prescriptions for AI‑assisted safety checks.
        </p>
      </header>

      <div className="space-y-8">
        {/* Upload area + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">

            {scanState === 'idle' && (
              <div className="bg-surface rounded-xl border-2 border-dashed border-border p-12 flex flex-col items-center justify-center text-center transition-all hover:border-primary/50 cursor-pointer" onClick={handleSelectFile}>
                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-sm shadow-primary/20">
                  <Icon name="upload_file" size={36} className="text-primary" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-xl font-bold mb-2 text-foreground tracking-tight">
                    Drop your prescription here
                  </h3>
                  <p className="text-sm text-muted mb-8 leading-relaxed">
                    Support for printed and handwritten prescriptions in JPG, PNG or PDF
                    format.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="primary" icon="add_photo_alternate" onClick={(e) => { e.stopPropagation(); handleSelectFile(); }}>
                    Select file
                  </Button>
                  <Button variant="secondary" icon="photo_camera" onClick={(e) => { e.stopPropagation(); handleSelectFile(); }}>
                    Camera
                  </Button>
                </div>
              </div>
            )}

            {scanState !== 'idle' && (
              <Card className="shadow-sm">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-3">
                    <Icon name="task_alt" size={20} className="text-primary" />
                    <span className="font-bold text-sm text-foreground">
                      prescription_0812.jpg
                    </span>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-widest bg-surface-muted px-2 py-1 rounded-md">
                      Selected
                    </span>
                  </div>
                  {scanState !== 'analyzing' && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-muted hover:text-danger transition-colors p-2"
                      aria-label="Remove file"
                    >
                      <Icon name="delete" size={20} />
                    </button>
                  )}
                </div>
                <div className="relative rounded-lg overflow-hidden h-64 bg-surface-muted border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-surface-muted" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur px-4 py-2 rounded-lg flex justify-between items-center shadow-sm">
                    <span className="text-xs font-semibold text-muted">
                      Resolution: 1200 × 1800 px
                    </span>
                    <span className="text-xs font-semibold text-muted">Size: 1.2 MB</span>
                  </div>
                </div>
              </Card>
            )}

            {scanState === 'selected' && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  className="flex-1 py-4 text-base"
                  icon="analytics"
                  onClick={handleAnalyze}
                >
                  Analyze prescription
                </Button>
                <Button
                  variant="secondary"
                  className="py-4 px-8 text-base"
                >
                  Use sample
                </Button>
              </div>
            )}

            {scanState === 'complete' && (
              <Card className="bg-success/5 border-success/20 flex flex-col items-center justify-center text-center space-y-4 py-8">
                <div className="size-16 bg-success text-white rounded-full flex items-center justify-center shadow-lg shadow-success/20">
                  <Icon name="check" size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Analysis Complete</h3>
                  <p className="text-sm text-muted mt-1">Prescription digitized successfully. 1 issue found.</p>
                </div>
                <Button variant="primary" icon="visibility">
                  Review Results
                </Button>
              </Card>
            )}

          </div>

          {/* Tips + history */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-foreground tracking-tight">
                <Icon name="info" size={20} className="text-primary" />
                Scanning tips
              </h3>
              <ul className="space-y-4 text-sm text-foreground">
                <li className="flex gap-3">
                  <Icon name="light_mode" size={20} className="text-primary shrink-0" />
                  <p className="leading-snug font-medium">
                    Ensure good lighting and avoid reflections on glossy paper.
                  </p>
                </li>
                <li className="flex gap-3">
                  <Icon name="center_focus_strong" size={20} className="text-primary shrink-0" />
                  <p className="leading-snug font-medium">
                    Hold the camera steady and keep the entire page within the frame.
                  </p>
                </li>
                <li className="flex gap-3">
                  <Icon name="security" size={20} className="text-primary shrink-0" />
                  <p className="leading-snug font-medium text-muted">
                    Your data is encrypted and HIPAA compliant. We never store personal
                    identity photos.
                  </p>
                </li>
              </ul>
            </Card>

            <Card noPadding>
              <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-muted/50">
                <h3 className="font-bold text-foreground tracking-tight">Recent history</h3>
                <button
                  type="button"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View all
                </button>
              </div>
              <div className="divide-y divide-border">
                {data.recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 hover:bg-surface-muted transition-colors cursor-pointer flex items-center gap-4"
                  >
                    <div
                      className={`size-10 rounded-lg flex items-center justify-center ${item.tone === 'success'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                        }`}
                    >
                      <Icon name={item.tone === 'success' ? 'check_circle' : 'warning'} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted font-medium mt-0.5">
                        {item.id} • {item.when}
                      </p>
                    </div>
                    <Icon name="chevron_right" size={20} className="text-muted" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Processing overlay mock */}
        {scanState === 'analyzing' && (
          <div className="mt-12 p-1 bg-gradient-to-r from-primary/30 via-accent-pink/30 to-primary/30 rounded-2xl shadow-xl relative overflow-hidden animate-pulse">
            <div className="bg-surface dark:bg-background-dark rounded-[0.9rem] p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative size-24 lg:size-32 shrink-0">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      className="text-border"
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-primary transition-all duration-300 ease-out"
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * progress) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl lg:text-2xl font-black text-primary">{progress}%</span>
                    <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-muted mt-1">
                      Working
                    </span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                  <ProcessingStep icon="image" label="Analysis" completed={progress > 10} active={progress <= 10} />
                  <ProcessingStep icon="font_download" label="OCR text" completed={progress > 40} active={progress > 10 && progress <= 40} />
                  <ProcessingStep icon="pill" label="Drug matching" completed={progress > 70} active={progress > 40 && progress <= 70} />
                  <ProcessingStep icon="hub" label="Checks" completed={progress > 90} active={progress > 70 && progress <= 90} />
                  <ProcessingStep icon="description" label="Report" completed={progress === 100} active={progress > 90 && progress < 100} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PharmacistScanPrescriptionPage;

