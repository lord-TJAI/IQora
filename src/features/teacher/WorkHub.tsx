import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssignmentsList } from './AssignmentsList';
import { HomeworkList } from './HomeworkList';
import { TestsList } from './TestsList';
import { SubmissionsList } from './SubmissionsList';
import { Plus, FileText, BookOpenCheck, CheckSquare, Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

type WorkTab = 'assignments' | 'homework' | 'tests' | 'submissions';

export const WorkHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<WorkTab>('assignments');

  const tabs: { id: WorkTab; label: string; icon: any; count?: number }[] = [
    { id: 'assignments', label: 'Assignments', icon: FileText, count: 6 },
    { id: 'homework', label: 'Homework', icon: BookOpenCheck, count: 4 },
    { id: 'tests', label: 'Tests', icon: CheckSquare, count: 2 },
    { id: 'submissions', label: 'Submissions', icon: Inbox, count: 11 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#172033] tracking-tight">
            Class Work & Assessments
          </h1>
          <p className="text-xs sm:text-sm font-medium text-[#667085] mt-0.5">
            Manage assignments, homework, tests, and pending student submissions in one place.
          </p>
        </div>

        {/* Action Button based on active tab */}
        {activeTab === 'assignments' && (
          <button
            onClick={() => navigate('/teacher/assignments/create')}
            className="px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs inline-flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
        {activeTab === 'tests' && (
          <button
            onClick={() => navigate('/teacher/tests/create')}
            className="px-4 py-2.5 rounded-xl bg-[#172033] hover:bg-slate-800 text-white font-black text-xs inline-flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Test</span>
          </button>
        )}
      </div>

      {/* Segmented Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                isActive
                  ? 'bg-[#172033] text-white shadow-xs'
                  : 'bg-white text-[#667085] hover:text-[#172033] border border-slate-200'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'px-2 py-0.2 rounded-full text-[10px] font-black',
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-[#667085]'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === 'assignments' && <AssignmentsList />}
        {activeTab === 'homework' && <HomeworkList />}
        {activeTab === 'tests' && <TestsList />}
        {activeTab === 'submissions' && <SubmissionsList />}
      </div>
    </div>
  );
};
