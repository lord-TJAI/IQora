import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTasks } from '@/services/mock/mockData';
import { useUIStore } from '@/stores/uiStore';
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  Clock,
  UploadCloud,
  Paperclip,
  Link2,
  Trash2,
  AlertCircle,
  BookOpen,
  Target,
  FileSpreadsheet,
  Image as ImageIcon,
  FileCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  progress: number; // 0-100
  status: 'queued' | 'uploading' | 'uploaded' | 'failed';
}

interface AttachedLink {
  id: string;
  url: string;
  title: string;
}

export const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const task = mockTasks.find((t) => t.id === taskId) || mockTasks[0];

  // Submission State
  const [submitted, setSubmitted] = useState(task.status === 'submitted' || task.status === 'evaluated');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [studentComment, setStudentComment] = useState('');

  // Attached files & links
  const [files, setFiles] = useState<AttachedFile[]>([
    {
      id: 'f-1',
      name: 'electrostatics_project_report.pdf',
      size: '2.4 MB',
      type: 'pdf',
      progress: 100,
      status: 'uploaded',
    },
    {
      id: 'f-2',
      name: 'dipole_field_presentation.pptx',
      size: '5.1 MB',
      type: 'pptx',
      progress: 100,
      status: 'uploaded',
    },
  ]);

  const [links, setLinks] = useState<AttachedLink[]>([
    {
      id: 'l-1',
      url: 'https://drive.google.com/file/d/1a2b3c4d5e/view',
      title: 'Google Drive Lab Video Demonstration',
    },
  ]);

  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [showAddLink, setShowAddLink] = useState(false);

  // Supported extensions
  const ALLOWED_EXTENSIONS = [
    '.pdf',
    '.ppt',
    '.pptx',
    '.doc',
    '.docx',
    '.txt',
    '.jpg',
    '.jpeg',
    '.png',
    '.webp',
  ];

  const getFileBadge = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return { icon: FileText, label: 'PDF', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
    if (ext === 'ppt' || ext === 'pptx') {
      return { icon: FileSpreadsheet, label: 'PPT', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    if (ext === 'doc' || ext === 'docx') {
      return { icon: FileText, label: 'DOC', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext || '')) {
      return { icon: ImageIcon, label: ext?.toUpperCase() || 'IMG', bg: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    return { icon: FileCheck, label: ext?.toUpperCase() || 'TXT', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    const newAttached: AttachedFile[] = [];
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        addToast(`Unsupported file type: ${file.name}. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`, 'error');
        continue;
      }

      if (file.size > 25 * 1024 * 1024) {
        addToast(`${file.name} exceeds the 25 MB size limit.`, 'error');
        continue;
      }

      const sizeStr =
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      newAttached.push({
        id: `file-${Date.now()}-${i}`,
        name: file.name,
        size: sizeStr,
        type: ext.replace('.', ''),
        progress: 100,
        status: 'uploaded',
      });
    }

    if (newAttached.length > 0) {
      setFiles((prev) => [...prev, ...newAttached]);
      addToast(`${newAttached.length} file(s) attached.`, 'success');
    }
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkUrl.trim()) return;

    try {
      new URL(newLinkUrl);
    } catch {
      addToast('Please enter a valid URL (e.g. https://drive.google.com/...)', 'error');
      return;
    }

    const title = newLinkTitle.trim() || newLinkUrl;
    setLinks([...links, { id: `link-${Date.now()}`, url: newLinkUrl.trim(), title }]);
    setNewLinkUrl('');
    setNewLinkTitle('');
    setShowAddLink(false);
    addToast('Link added to submission.', 'success');
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast('Work submitted successfully to Ms. Sharma!', 'success');
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/work')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#667085] hover:text-[#172033] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work Inbox</span>
        </button>

        <span className="text-xs font-bold text-[#667085]">
          Due: <strong className="text-[#172033]">{task.dueDate}</strong>
        </span>
      </div>

      {/* 2-Column Desktop Grid / 1-Column Mobile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Assignment Details & Connected Learning (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#7C4DFF] bg-[#F5F0FF] px-2.5 py-0.5 rounded-full">
                  {task.subjectName}
                </span>
                <span className="text-xs text-[#667085]">Class {task.classId}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#172033] tracking-tight">
                {task.title}
              </h1>
            </div>

            <div className="space-y-2.5 text-xs text-[#667085] border-t border-b border-slate-100 py-3.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-slate-400" /> Assigned By:
                </span>
                <strong className="text-[#172033]">{task.teacherName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" /> Due Date:
                </span>
                <strong className="text-[#172033]">{task.dueDate}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Maximum Marks:</span>
                <strong className="text-[#172033]">{task.maxMarks} Marks</strong>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#667085]">
                Teacher Instructions
              </h3>
              <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
                {task.description ||
                  'Submit your detailed solution for Chapter 2: Electrostatic Potential. Ensure all calculations show step-by-step working and state appropriate SI units.'}
              </p>
            </div>

            {/* Academic Continuity: Learn & Practice Links */}
            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
                Recommended Preparation
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/student/learn/physics')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#7C4DFF]" />
                  <span>Learn Concept</span>
                </button>
                <button
                  onClick={() => navigate('/student/practice')}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-[#172033] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Target className="w-3.5 h-3.5 text-amber-500" />
                  <span>Practice Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Submission Composer (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 sm:p-7 shadow-subtle space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#667085] block">
                  Submission Portal
                </span>
                <h2 className="text-lg font-black text-[#172033]">
                  {submitted ? 'Submitted Work' : 'Submit Your Work'}
                </h2>
              </div>

              <span
                className={cn(
                  'text-xs font-black uppercase px-3 py-1 rounded-full',
                  submitted
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                )}
              >
                {submitted ? 'Submitted' : 'Pending'}
              </span>
            </div>

            {!submitted ? (
              <div className="space-y-5">
                {/* Drag and Drop File Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileUpload(e.dataTransfer.files);
                  }}
                  className="border-2 border-dashed border-slate-300 hover:border-[#FFC800] bg-[#FAFBFD] hover:bg-amber-50/20 rounded-3xl p-6 sm:p-8 text-center cursor-pointer transition-all space-y-3 group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />

                  <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform text-[#667085] group-hover:text-amber-500">
                    <UploadCloud className="w-7 h-7" />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#172033]">
                      Drag & drop files here, or <span className="text-[#4F7CFF] underline font-bold">browse device</span>
                    </p>
                    <p className="text-xs text-[#667085] mt-1">
                      Max file size: 25 MB per file
                    </p>
                  </div>

                  {/* Format Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold">PDF</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">DOC / DOCX</span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold">PPT / PPTX</span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold">Images (JPG, PNG, WEBP)</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold">TXT</span>
                  </div>
                </div>

                {/* Attached Files List */}
                {files.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[#172033]">
                        Attached Files ({files.length})
                      </span>
                      <span className="text-[11px] text-[#667085]">
                        All files within 25 MB limit
                      </span>
                    </div>

                    <div className="space-y-2">
                      {files.map((file) => {
                        const badge = getFileBadge(file.name);
                        const Icon = badge.icon;
                        return (
                          <div
                            key={file.id}
                            className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs shadow-xs hover:border-slate-300 transition-colors"
                          >
                            <div className="flex items-center gap-3 truncate min-w-0">
                              <div className={cn('w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 font-bold', badge.bg)}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="truncate min-w-0">
                                <span className="font-bold text-[#172033] block truncate">
                                  {file.name}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-[#667085] mt-0.5">
                                  <span>{file.size}</span>
                                  <span>•</span>
                                  <span className="text-emerald-600 font-bold">✓ Ready for submission</span>
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setFiles(files.filter((f) => f.id !== file.id))}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                              title="Remove file"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Attached Links List & Link Adder */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#172033]">
                      External Links ({links.length})
                    </span>
                    {!showAddLink && (
                      <button
                        type="button"
                        onClick={() => setShowAddLink(true)}
                        className="text-xs font-bold text-[#4F7CFF] hover:underline flex items-center gap-1"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Add Link</span>
                      </button>
                    )}
                  </div>

                  {showAddLink && (
                    <form onSubmit={handleAddLink} className="p-4 rounded-2xl border border-blue-200 bg-blue-50/30 space-y-3 text-xs">
                      <div>
                        <label className="text-[11px] font-bold text-[#172033] block mb-1">
                          Link Title (e.g. Google Drive Lab Video, Figma Wireframe, GitHub Repo)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Google Drive Lab Video Demonstration"
                          value={newLinkTitle}
                          onChange={(e) => setNewLinkTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#4F7CFF]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#172033] block mb-1">
                          Web URL
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://drive.google.com/..."
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#4F7CFF]"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddLink(false)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#667085]"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-[#172033] text-white text-xs font-black"
                        >
                          Attach Link
                        </button>
                      </div>
                    </form>
                  )}

                  {links.length > 0 && (
                    <div className="space-y-2">
                      {links.map((link) => (
                        <div
                          key={link.id}
                          className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs shadow-xs hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 truncate min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                            <div className="truncate min-w-0">
                              <span className="font-bold text-[#172033] block truncate">
                                {link.title}
                              </span>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-blue-600 hover:underline truncate block"
                              >
                                {link.url}
                              </a>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setLinks(links.filter((l) => l.id !== link.id))}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Remove link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Student Comment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#172033] block">
                    Submission Comments / Notes for Teacher:
                  </label>
                  <textarea
                    rows={3}
                    value={studentComment}
                    onChange={(e) => setStudentComment(e.target.value)}
                    placeholder="e.g. Attached are my handwritten derivations and PPT presentation..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#172033] focus:outline-none focus:border-[#4F7CFF] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  disabled={files.length === 0 && links.length === 0}
                  className="w-full py-4 rounded-2xl bg-[#FFC800] hover:bg-[#E6B400] disabled:opacity-50 text-[#172033] font-black text-sm shadow-brand transition-all flex items-center justify-center gap-2"
                >
                  <span>SUBMIT WORK TO TEACHER</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Already Submitted View */
              <div className="space-y-5 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <strong className="block">Submitted on September 19, 2026</strong>
                      <span>Status: Under Review by Ms. Sharma</span>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-800 uppercase text-[10px] bg-emerald-100 px-2.5 py-1 rounded-full">
                    Awaiting Grade
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <span className="font-bold text-[#172033] block">Submitted Files & Links:</span>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                        <span className="font-bold text-[#172033]">{file.name}</span>
                        <span className="text-[#667085]">{file.size}</span>
                      </div>
                    ))}
                    {links.map((link) => (
                      <div key={link.id} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                        <span className="font-bold text-blue-600">{link.title}</span>
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-[10px] text-[#667085] underline">
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-[#667085] hover:text-[#172033] underline"
                  >
                    Edit Submission
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl border border-[#E6EAF0] p-6 max-w-md w-full shadow-elevated space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-black text-[#172033]">
              Confirm Assignment Submission?
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              You won't be able to edit this submission after submitting unless your teacher allows resubmission.
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#667085]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-5 py-2 rounded-xl bg-[#172033] text-white text-xs font-black"
              >
                {isSubmitting ? 'Submitting...' : 'Yes, Submit Work'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
