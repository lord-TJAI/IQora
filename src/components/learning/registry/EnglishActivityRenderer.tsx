import React, { useState } from 'react';
import { EnglishActivityType, Concept } from '@/types/curriculum';
import { BookOpen, Edit3, CheckCircle2, AlertCircle, Sparkles, HelpCircle, Layers, Quote } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EnglishActivityRendererProps {
  activityType: EnglishActivityType;
  concept?: Concept;
  topic?: string;
  className?: string;
}

export const EnglishActivityRenderer: React.FC<EnglishActivityRendererProps> = ({
  activityType,
  concept,
  topic,
  className,
}) => {
  // 1. Reading Evidence State
  const [selectedQuoteId, setSelectedQuoteId] = useState<number>(4);
  const [selectedTone, setSelectedTone] = useState<'patriotic' | 'melancholic' | 'instructive'>('patriotic');

  // 2. Writing Canvas State
  const [writingFormat, setWritingFormat] = useState<'notice' | 'article' | 'letter'>('notice');
  const [writingContent, setWritingContent] = useState<string>(
    'ST. MARK SENIOR SECONDARY SCHOOL, NEW DELHI\nNOTICE\n\n19th September 2026\nANNUAL INTER-SCHOOL DEBATE COMPETITION\n\nThis is to inform all students of Classes XI and XII that the Annual Inter-School Debate will be held on 5th October 2026 in the school auditorium. Interested students should submit their names to the undersigned by 25th September.'
  );

  // 3. Context Vocabulary State
  const [selectedWord, setSelectedWord] = useState<string>('prancing');

  const wordCount = writingContent.trim() ? writingContent.trim().split(/\s+/).length : 0;
  const maxWords = writingFormat === 'notice' ? 50 : 150;

  const passageQuotes = [
    {
      id: 1,
      text: '"My children, this is the last lesson I shall give you.',
      tone: 'melancholic',
      explanation: 'Conveys somber finality as Prussian orders mandate German over French in Alsace.',
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

  const activeQuote = passageQuotes.find((q) => q.id === selectedQuoteId) || passageQuotes[3];

  const vocabWords = [
    { word: 'prancing', meaning: 'Moving with high springy steps', device: 'Kinetic Imagery', context: 'Tigers prance fearlessly across screen' },
    { word: 'chivalric', meaning: 'Courteous, gallant, and noble', device: 'Metaphor / Epithet', context: 'Sleek chivalric certainty of wild beasts' },
    { word: 'fluttering', meaning: 'Trembling helplessly', device: 'Sensory Imagery', context: 'Fingers fluttering through wool due to marital terror' },
    { word: 'massive weight', meaning: 'Crushing burden of subjugation', device: 'Metaphor', context: 'Uncle\'s wedding band sitting heavily on her hand' },
  ];

  const activeVocab = vocabWords.find((w) => w.word === selectedWord) || vocabWords[0];

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-5 sm:p-6 shadow-subtle space-y-6', className)}>
      {/* Activity Title Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A3D] bg-[#FFF3EB] px-2.5 py-0.5 rounded-full">
              English Core Workbench
            </span>
            <span className="text-xs font-bold text-[#667085]">
              {concept?.name || topic || 'Textual Analysis & Composition'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-[#172033] mt-1">
            {activityType === 'readingEvidence' && 'Textual Evidence & Rhetorical Tone Workbench'}
            {activityType === 'writingCanvas' && 'CBSE Structured Composition Canvas'}
            {activityType === 'contextVocabulary' && 'Literary Diction & Poetic Device Explorer'}
            {activityType === 'comprehensionActivity' && 'Case-Based Factual Comprehension Engine'}
          </h3>
        </div>
      </div>

      {/* 1. READING EVIDENCE & TONE */}
      {(activityType === 'readingEvidence' || activityType === 'comprehensionActivity') && (
        <div className="space-y-6">
          {/* Passage Excerpt */}
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-[#FF8A3D]" />
                Primary Excerpt: Alphonse Daudet — The Last Lesson
              </span>
              <span className="text-[11px] font-bold text-[#FF8A3D]">Click quote to analyze</span>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-[#172033] leading-relaxed">
              {passageQuotes.map((q) => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuoteId(q.id)}
                  className={cn(
                    'p-2.5 rounded-xl cursor-pointer transition-all border',
                    selectedQuoteId === q.id
                      ? 'bg-[#FFF3EB] border-[#FF8A3D] shadow-xs font-medium'
                      : 'border-transparent hover:bg-slate-100'
                  )}
                >
                  <p>{q.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Card */}
          <div className="bg-[#FFF3EB] p-5 rounded-2xl border border-[#FF8A3D]/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#EA580C]">
                Evidence Analysis & Rhetorical Commentary
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#EA580C] capitalize shadow-xs">
                Tone: {activeQuote.tone}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#172033] leading-relaxed">
              {activeQuote.explanation}
            </p>

            <div className="pt-2 border-t border-orange-200 text-xs text-[#64748B] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" />
              <span><strong>CBSE Marking Rubric:</strong> Always quote the exact textual phrase when justifying inference questions in Section A/C.</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. WRITING CANVAS */}
      {activityType === 'writingCanvas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border">
              {(['notice', 'article', 'letter'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setWritingFormat(fmt)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all',
                    writingFormat === fmt
                      ? 'bg-[#FF8A3D] text-white shadow-xs font-black'
                      : 'text-[#64748B] hover:text-[#172033]'
                  )}
                >
                  {fmt === 'notice' ? 'Notice (50 words)' : fmt === 'article' ? 'Article (150 words)' : 'Letter to Editor'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={cn(wordCount > maxWords ? 'text-rose-600' : 'text-[#64748B]')}>
                Words: <strong>{wordCount}</strong> / {maxWords}
              </span>
              {wordCount > maxWords && (
                <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  Exceeds Limit (-1 Mark)
                </span>
              )}
            </div>
          </div>

          {/* Ruled Box (Required for Notice in CBSE) */}
          <div className="border-2 border-[#172033] rounded-xl p-4 bg-white shadow-xs">
            <textarea
              rows={8}
              value={writingContent}
              onChange={(e) => setWritingContent(e.target.value)}
              className="w-full font-sans text-xs sm:text-sm text-[#172033] leading-relaxed outline-none resize-none"
              placeholder="Draft your response following CBSE format requirements..."
            />
          </div>

          <div className="bg-[#FFF3EB] p-4 rounded-2xl border border-[#FF8A3D]/20 text-xs text-[#172033] space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#EA580C] block">
              Format Checklist
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Enclosed inside box</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Date on left margin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sign & Designation at end</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONTEXT VOCABULARY */}
      {activityType === 'contextVocabulary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {vocabWords.map((w) => (
              <button
                key={w.word}
                onClick={() => setSelectedWord(w.word)}
                className={cn(
                  'p-3 rounded-2xl border text-left transition-all',
                  selectedWord === w.word
                    ? 'bg-[#FFF3EB] border-[#FF8A3D] shadow-xs'
                    : 'bg-[#F8FAFC] border-slate-200 hover:border-slate-300'
                )}
              >
                <span className="text-xs font-black text-[#172033] block">{w.word}</span>
                <span className="text-[10px] text-[#EA580C] font-bold block mt-0.5">{w.device}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#FAFBFD] p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-[#172033]">{activeVocab.word}</h4>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF3EB] text-[#EA580C]">
                {activeVocab.device}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex gap-2">
                <span className="text-[#64748B] w-24">Contextual Meaning:</span>
                <span className="font-bold text-[#172033]">{activeVocab.meaning}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#64748B] w-24">Poem Excerpt:</span>
                <span className="italic text-[#172033]">{activeVocab.context}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
