import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { Subject } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/stores/uiStore';
import { BookOpen, Layers, Plus, ChevronRight } from 'lucide-react';

export const AdminSubjects: React.FC = () => {
  const { addToast } = useUIStore();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    adminService.getSubjects().then(setSubjects);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Curriculum & Subject Taxonomy
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Configure Class 12 NCERT curriculum chapters, topics, and concept taxonomy
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => addToast('Add subject modal opened', 'info')}
        >
          Add Curriculum Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {subjects.map((sub) => (
          <Card key={sub.id} className="p-6 border border-brand-border space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: sub.lightColor, color: sub.color }}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-text-primary">{sub.name}</h3>
                  <span className="text-xs text-brand-text-secondary">
                    {sub.totalChapters} Chapters • {sub.totalLessons} Lessons
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-text-secondary leading-relaxed">
              {sub.description}
            </p>

            <div className="pt-2 border-t border-brand-border flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-text-secondary">
                Curriculum Status: <strong className="text-emerald-600">Active</strong>
              </span>
              <Button
                size="sm"
                variant="outline"
                rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                onClick={() => addToast(`Opening taxonomy editor for ${sub.name}`, 'info')}
              >
                Manage Chapters
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
