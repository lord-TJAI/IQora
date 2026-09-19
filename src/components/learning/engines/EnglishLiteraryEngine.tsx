import React, { useState } from 'react';
import { BookOpen, Edit3, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

export type EnglishMode = 'reading_comprehension' | 'writing_canvas';

export const EnglishLiteraryEngine: React.FC = () => {
  const [mode, setMode] = useState<EnglishMode>('reading_comprehension');

  // Reading Comprehension State
  const [selectedTone, setSelectedTone] = useState<'patriotic' | 'melancholic' | 'instructive'>('patriotic');
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  // Writing Canvas State
  const [writingFormat, setWritingFormat] = useState<'notice' | 'article' | 'letter'>('notice');
  const [writingContent, setWritingContent] = useState<string>(
    'ST. MARK SENIOR SECONDARY SCHOOL, NEW DELHI\nNOTICE\n\n19th September 2026\nANNUAL INTER-SCHOOL DEBATE COMPETITION\n\nThis is to inform all students of Classes XI and XII that the Annual Inter-School Debate will be held on 5th October 2026 in the school auditorium. Interested students should submit their names to the undersigned by 25th September.'
  );

  const wordCount = writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0;
  const maxWords = writingFormat === 'notice' ? 50 : 150;

  const passageSentences = [
    {
      id: 1,
      text: '"My children, this is the last lesson I shall give you.',
      tone: 'melancholic',
      explanation: 'Conveys somber finality as Prussian orders mandate German over French.',
    },
    {
      id: 2,
      text: 'The order has come from Berlin to teach only German in the schools of Alsace and Lorraine.',
      tone: 'instructive',
      explanation: 'Historical context illustrating administrative imposition and cultural annexation.',
    },
    {
      id: 3,
      text: 'The new master comes tomorrow. This is your last French lesson. I want you to be very attentive."',
      tone: 'melancholic',
      explanation: 'Heightened emotional plea emphasizing urgency and reverence for the mother tongue.',
    },
    {
      id: 4,
      text: '"When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison."',
      tone: 'patriotic',
      explanation: 'Metaphorical declaration elevating linguistic preservation to the ultimate instrument of freedom.',
    },
    {
      id: 5,
      text: 'Then he turned to the blackboard, took a piece of chalk, and bearing on with all his might, he wrote as large as he could: "Vive La France!"',
      tone: 'patriotic',
      explanation: 'Defiant, emotional climax signifying unyielding national pride despite political subjugation.',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Sub-mode Navigation */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 bg-[#FFF3EB] p-1 rounded-xl text-xs font-bold text-[#FF8A3D]">
          <button
            onClick={() => setMode('reading_comprehension')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'reading_comprehension' ? 'bg-[#FF8A3D] text-white shadow-xs font-black' : 'hover:text-orange-900'
            )}
          >
            Interactive Reading & Evidence
          </button>
          <button
            onClick={() => setMode('writing_canvas')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-all',
              mode === 'writing_canvas' ? 'bg-[#FF8A3D] text-white shadow-xs font-black' : 'hover:text-orange-900'
            )}
          >
            CBSE Writing Canvas & Rubric
          </button>
        </div>

        <span className="text-[11px] font-bold text-[#667085] hidden sm:inline">
          CBSE Class XII • English Core Engine
        </span>
      </div>

      {/* ===================================================================== */}
      {/* 1. READING COMPREHENSION & EVIDENCE                                  */}
      {/* ===================================================================== */}
      {mode === 'reading_comprehension' && (
        <div className="space-y-4">
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E6EAF0] shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#FF8A3D]">
                  Flamingo • Chapter 1: The Last Lesson
                </span>
                <h4 className="text-sm font-bold text-[#172033]">
                  M. Hamel's Discourse on Mother Tongue & Freedom
                </h4>
              </div>
              <span className="text-xs font-semibold text-[#667085]">Click quotes to analyze tone</span>
            </div>

            {/* Interactive Passage Content */}
            <div className="space-y-2.5 font-serif text-base sm:text-lg leading-relaxed text-[#172033]">
              {passageSentences.map((s) => {
                const isSelected = selectedQuote === s.text;
                const matchesTone = s.tone === selectedTone;

                return (
                  <p
                    key={s.id}
                    onClick={() => setSelectedQuote(s.text)}
                    className={cn(
                      'cursor-pointer p-2 rounded-xl transition-all',
                      matchesTone && 'bg-amber-50/80 border-l-4 border-[#FF8A3D] font-medium text-amber-950',
                      !matchesTone && 'hover:bg-slate-50',
                      isSelected && 'ring-2 ring-[#FF8A3D]/40'
                    )}
                  >
                    {s.text}
                  </p>
                );
              })}
            </div>

            {/* Textual Analysis Popover */}
            {selectedQuote && (
              <div className="mt-4 p-4 rounded-xl bg-[#F7F9FC] border border-[#E6EAF0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#FF8A3D] uppercase tracking-wider">
                    Textual Evidence Analysis:
                  </span>
                  <button
                    onClick={() => setSelectedQuote(null)}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs italic text-slate-700 font-serif">"{selectedQuote}"</p>
                <p className="text-xs text-[#172033] font-medium">
                  {passageSentences.find((s) => s.text === selectedQuote)?.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Tone Lens Filter */}
          <div className="bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0] flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-[#172033]">Filter Literary Tone:</span>
            {[
              { id: 'patriotic', label: 'Patriotic (National Dignity & Freedom)' },
              { id: 'melancholic', label: 'Melancholic (Grief & Loss)' },
              { id: 'instructive', label: 'Instructive (Didactic & Imperative)' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTone(t.id as any)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all',
                  selectedTone === t.id
                    ? 'bg-[#FF8A3D] text-white shadow-xs'
                    : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-100'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. CBSE CREATIVE WRITING CANVAS & RUBRIC                              */}
      {/* ===================================================================== */}
      {mode === 'writing_canvas' && (
        <div className="space-y-4">
          {/* Format Selector */}
          <div className="flex items-center gap-2">
            {[
              { id: 'notice', label: 'Notice Writing (Max 50 Words)' },
              { id: 'article', label: 'Article Writing (120–150 Words)' },
              { id: 'letter', label: 'Letter to Editor (120–150 Words)' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setWritingFormat(f.id as any)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all',
                  writingFormat === f.id
                    ? 'bg-[#FF8A3D] text-white shadow-xs'
                    : 'bg-white border border-[#E6EAF0] text-[#172033] hover:bg-slate-50'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Structured Writing Box */}
          <div className="bg-white rounded-2xl border-2 border-slate-800 p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between text-xs text-[#667085] pb-2 border-b border-slate-100">
              <span className="font-bold text-[#172033] uppercase">
                {writingFormat === 'notice' && 'Mandatory Box Format (CBSE Section B)'}
                {writingFormat === 'article' && 'Article Format: Title + Byline + 3 Paragraphs'}
                {writingFormat === 'letter' && 'Formal Letter: Address + Date + Subject + Salutation'}
              </span>
              <span className={cn('font-mono font-bold', wordCount > maxWords ? 'text-rose-600' : 'text-slate-600')}>
                {wordCount} / {maxWords} words
              </span>
            </div>

            <textarea
              rows={8}
              value={writingContent}
              onChange={(e) => setWritingContent(e.target.value)}
              className="w-full text-xs sm:text-sm font-mono text-[#172033] border-none focus:outline-none resize-none leading-relaxed"
              placeholder="Draft your response according to CBSE marking criteria..."
            />
          </div>

          {/* Real-time CBSE Rubric Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#F7F9FC] p-4 rounded-2xl border border-[#E6EAF0]">
            <div className="p-3 rounded-xl bg-white border border-[#E6EAF0]">
              <span className="text-[10px] font-bold text-[#667085] uppercase block">Format (1 Mark)</span>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enclosed in Box</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6EAF0]">
              <span className="text-[10px] font-bold text-[#667085] uppercase block">Content (2 Marks)</span>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Date & Venue present</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6EAF0]">
              <span className="text-[10px] font-bold text-[#667085] uppercase block">Organization (1 Mark)</span>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Clear Paragraphing</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E6EAF0]">
              <span className="text-[10px] font-bold text-[#667085] uppercase block">Accuracy (1 Mark)</span>
              <div className="flex items-center gap-1.5 mt-1 text-emerald-600 font-bold text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Formal Register</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
