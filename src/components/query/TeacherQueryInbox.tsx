import React, { useState } from 'react';
import { getTeacherQueries, replyToQuery } from '@/services/query/queryService';
import { StudentQuery } from '@/types/query';
import { MessageSquare, Send, CheckCircle2, Clock, Paperclip, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TeacherQueryInboxProps {
  className?: string;
}

export const TeacherQueryInbox: React.FC<TeacherQueryInboxProps> = ({ className }) => {
  const [queries, setQueries] = useState<StudentQuery[]>(getTeacherQueries());
  const [filter, setFilter] = useState<'unanswered' | 'all'>('unanswered');
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>('query-2');
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const filteredQueries =
    filter === 'unanswered'
      ? queries.filter((q) => q.status !== 'answered')
      : queries;

  const handleSendReply = (queryId: string) => {
    const text = replyText[queryId];
    if (!text?.trim()) return;

    replyToQuery(queryId, text.trim());
    setQueries(getTeacherQueries());
    setReplyText({ ...replyText, [queryId]: '' });
  };

  return (
    <div className={cn('bg-white rounded-3xl border border-[#E6EAF0] p-6 shadow-subtle space-y-5', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#172033]">
              Student Academic Questions
            </h3>
            <p className="text-xs text-[#667085]">
              Direct queries from Class 12-A students during lessons & practice
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border border-slate-200 text-xs font-bold text-[#667085]">
          <button
            onClick={() => setFilter('unanswered')}
            className={cn(
              'px-3 py-1 rounded-lg transition-all',
              filter === 'unanswered'
                ? 'bg-white text-[#172033] shadow-xs font-black'
                : 'hover:text-[#172033]'
            )}
          >
            Pending ({queries.filter((q) => q.status !== 'answered').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-3 py-1 rounded-lg transition-all',
              filter === 'all'
                ? 'bg-white text-[#172033] shadow-xs font-black'
                : 'hover:text-[#172033]'
            )}
          >
            All Questions ({queries.length})
          </button>
        </div>
      </div>

      {/* Query List */}
      <div className="space-y-3">
        {filteredQueries.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#667085]">
            <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
            No pending questions. All student queries have been answered!
          </div>
        ) : (
          filteredQueries.map((query) => {
            const isExpanded = expandedQueryId === query.id;

            return (
              <div
                key={query.id}
                className={cn(
                  'rounded-2xl border transition-all overflow-hidden',
                  query.status === 'answered'
                    ? 'border-slate-200 bg-white'
                    : 'border-purple-200 bg-purple-50/20'
                )}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedQueryId(isExpanded ? null : query.id)}
                  className="p-4 cursor-pointer flex items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={query.studentAvatar}
                      alt={query.studentName}
                      className="w-8 h-8 rounded-full object-cover border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-[#172033]">
                          {query.studentName}
                        </span>
                        <span className="text-[10px] text-[#667085] bg-slate-100 px-2 py-0.2 rounded-full">
                          {query.className}
                        </span>
                        <span
                          className={cn(
                            'text-[10px] font-black uppercase px-2 py-0.2 rounded-full',
                            query.status === 'answered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          )}
                        >
                          {query.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667085] mt-0.5">
                        {query.subjectName} • {query.chapterTitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#667085]">
                      {query.createdAt}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#667085]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#667085]" />
                    )}
                  </div>
                </div>

                {/* Expanded Thread Body */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-4 border-t border-slate-100 text-xs">
                    {/* Student Question */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[#667085]">
                        <span className="font-bold">Student Query:</span>
                        <span className="text-[10px]">Context: {query.contextSource}</span>
                      </div>
                      <p className="text-[#172033] leading-relaxed">
                        "{query.message}"
                      </p>
                    </div>

                    {/* Teacher Reply if already answered */}
                    {query.teacherReply ? (
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                        <div className="flex items-center justify-between text-emerald-900 font-bold">
                          <span>Your Reply:</span>
                          <span className="text-[10px] text-[#667085]">
                            {query.teacherReply.repliedAt}
                          </span>
                        </div>
                        <p className="text-[#172033] leading-relaxed">
                          {query.teacherReply.replyText}
                        </p>
                      </div>
                    ) : (
                      /* Reply Composer */
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={replyText[query.id] || ''}
                          onChange={(e) =>
                            setReplyText({ ...replyText, [query.id]: e.target.value })
                          }
                          placeholder="Type your explanation or hint for the student..."
                          className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#172033] focus:outline-none focus:border-[#7C4DFF] resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleSendReply(query.id)}
                            disabled={!replyText[query.id]?.trim()}
                            className="px-4 py-2 bg-[#172033] hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-black flex items-center gap-1.5 transition-all"
                          >
                            <Send className="w-3 h-3" />
                            <span>SEND REPLY</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
