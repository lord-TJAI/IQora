import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/stores/uiStore';
import { School, Plus, Users, BookOpen } from 'lucide-react';

export const AdminClasses: React.FC = () => {
  const { addToast } = useUIStore();
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    adminService.getClasses().then(setClasses);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class Sections & Streams
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Organize academic sections, assigned class teachers, and physical classrooms
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => addToast('Class creation drawer opened', 'info')}
        >
          Add New Section
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {classes.map((cls) => (
          <Card key={cls.id} className="p-5 border border-brand-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-brand-ai flex items-center justify-center">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-text-primary">{cls.name}</h3>
                <span className="text-xs text-brand-text-secondary">{cls.stream} • {cls.room}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-brand-border space-y-1.5 text-xs text-brand-text-secondary">
              <p>
                <strong className="text-brand-text-primary">Class Teacher: </strong>
                {cls.classTeacher}
              </p>
              <p>
                <strong className="text-brand-text-primary">Capacity: </strong>
                {cls.studentsCount} / 45 Students Enrolled
              </p>
            </div>

            <div className="pt-2 border-t border-brand-border flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => addToast(`Configuring ${cls.name}`, 'info')}
              >
                Configure
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
