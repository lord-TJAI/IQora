import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { Teacher } from '@/types/domain';
import { Table, Column } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/stores/uiStore';
import { UserPlus, School, BookOpen } from 'lucide-react';

export const AdminTeachers: React.FC = () => {
  const { addToast } = useUIStore();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    adminService.getTeachers().then(setTeachers);
  }, []);

  const columns: Column<Teacher>[] = [
    {
      key: 'name',
      header: 'Faculty Member',
      render: (t) => (
        <div className="flex items-center gap-3">
          <img
            src={t.avatarUrl}
            alt={t.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <span className="font-bold text-brand-text-primary block">{t.name}</span>
            <span className="text-xs text-brand-text-secondary">{t.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'subjects',
      header: 'Assigned Subjects',
      render: (t) => (
        <div className="flex gap-1">
          {t.subjects.map((sub) => (
            <span
              key={sub}
              className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-brand-ai uppercase"
            >
              {sub}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'classes',
      header: 'Sections',
      render: (t) => (
        <div className="flex gap-1 text-xs font-semibold">
          {t.classIds.map((c) => (
            <span key={c} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
              {c}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: 'students',
      header: 'Students Managed',
      render: (t) => <span className="font-bold">{t.totalStudents}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
          Active
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (t) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => addToast(`Managing assignments for ${t.name}`, 'info')}
        >
          Assign Classes
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Faculty & Teacher Management
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Assign teaching loads, configure class assignments, and monitor department performance
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
          onClick={() => addToast('Add faculty modal opened', 'info')}
        >
          Add Faculty Member
        </Button>
      </div>

      <Table
        columns={columns}
        data={teachers}
        keyExtractor={(t) => t.id}
      />
    </div>
  );
};
