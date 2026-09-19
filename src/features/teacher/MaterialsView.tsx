import React, { useState, useEffect } from 'react';
import { teacherService } from '@/services/teacherService';
import { StudyMaterial } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/stores/uiStore';
import { UploadCloud, FileText, Download, Plus, FolderArchive } from 'lucide-react';

export const MaterialsView: React.FC = () => {
  const { addToast } = useUIStore();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [subject, setSubject] = useState('physics');
  const [chapter, setChapter] = useState('Electrostatics');

  useEffect(() => {
    teacherService.getMaterials().then(setMaterials);
  }, []);

  const handleUpload = () => {
    if (!fileName) {
      addToast('Please provide a material title', 'warning');
      return;
    }
    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      name: `${fileName}.pdf`,
      subjectId: subject as any,
      chapterTitle: chapter,
      topicTitle: 'Course Notes',
      fileType: 'pdf',
      fileSize: '2.8 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
      visibility: 'class_only',
      downloadUrl: '#',
    };
    setMaterials((prev) => [newMat, ...prev]);
    setIsUploadOpen(false);
    setFileName('');
    addToast('Material uploaded and indexed for AI Tutor reference!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Study Materials & Knowledge Base
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Upload notes, NCERT solutions, and reference PDFs that power AI Tutor context
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsUploadOpen(true)}
        >
          Upload Material
        </Button>
      </div>

      <div className="space-y-3">
        {materials.map((mat) => (
          <Card
            key={mat.id}
            className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-brand-border"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-ai flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-text-primary">{mat.name}</h4>
                <div className="flex items-center gap-2 text-xs text-brand-text-secondary mt-0.5">
                  <span className="font-semibold text-brand-ai uppercase">{mat.subjectId}</span>
                  <span>•</span>
                  <span>{mat.chapterTitle}</span>
                  <span>•</span>
                  <span>{mat.fileSize}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {mat.visibility === 'class_only' ? 'Class 12-A Only' : 'Public'}
              </span>
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Download className="w-3.5 h-3.5" />}
                onClick={() => addToast(`Downloading ${mat.name}...`, 'info')}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Study Material"
      >
        <div className="space-y-4">
          <Input
            label="Document / Material Title"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="e.g. Electric Potential Quick Formula Sheet"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'physics', label: 'Physics' },
                { value: 'chemistry', label: 'Chemistry' },
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'english', label: 'English Core' },
              ]}
            />
            <Input
              label="Chapter"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
            />
          </div>

          <div className="border-2 border-dashed border-brand-border rounded-2xl p-6 text-center bg-slate-50">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <span className="text-xs font-bold text-brand-text-primary block">
              Drag and drop PDF or notes here
            </span>
            <span className="text-[11px] text-brand-text-secondary">Up to 30 MB</span>
          </div>

          <div className="pt-3 border-t border-brand-border flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpload}>
              Upload & Index
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
