import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/stores/uiStore';
import { FileBarChart, Download, CalendarCheck, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { addToast } = useUIStore();

  const reports = [
    {
      id: 'rep-1',
      title: 'Class 12 Overall Attendance & Truancy Audit',
      description: 'Comprehensive student-by-student presence logs, section averages, and medical leaves.',
      type: 'Attendance',
      generatedDate: 'Sep 18, 2026',
      icon: CalendarCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      id: 'rep-2',
      title: 'Subject Mastery & Board Exam Preparedness Index',
      description: 'Detailed analysis across Math, Physics, Chemistry, and English identifying weak chapters.',
      type: 'Academics',
      generatedDate: 'Sep 15, 2026',
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: 'rep-3',
      title: 'Term 1 Assessment & Unit Test Consolidation',
      description: 'Complete scorecards, percentile distributions, and top performer recognition reports.',
      type: 'Assessment',
      generatedDate: 'Sep 12, 2026',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      id: 'rep-4',
      title: 'AI Intervention Impact & Remediation Efficacy Report',
      description: 'Measures student score recovery after completing automated and teacher-assigned quests.',
      type: 'AI Analytics',
      generatedDate: 'Sep 10, 2026',
      icon: FileBarChart,
      color: 'text-blue-600 bg-blue-50',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Institutional Reports & Audits
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Export certified academic analytics, student mastery records, and attendance audits
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((rep) => {
          const Icon = rep.icon;
          return (
            <Card
              key={rep.id}
              className="p-5 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${rep.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-ai uppercase tracking-wider">
                      {rep.type}
                    </span>
                    <span className="text-xs text-brand-text-secondary">• Generated {rep.generatedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-brand-text-primary mt-0.5">
                    {rep.title}
                  </h3>
                  <p className="text-xs text-brand-text-secondary mt-1 max-w-2xl leading-relaxed">
                    {rep.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => addToast(`Exporting ${rep.title} (PDF)...`, 'info')}
                >
                  Download PDF
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => addToast(`Exporting ${rep.title} (Excel)...`, 'info')}
                >
                  Excel
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
