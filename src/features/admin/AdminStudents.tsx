import React, { useState, useEffect } from 'react';
import { adminService } from '@/services/adminService';
import { Student } from '@/types/domain';
import { Table, Column, SearchBar } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useUIStore } from '@/stores/uiStore';
import { UserPlus, Download } from 'lucide-react';

export const AdminStudents: React.FC = () => {
  const { addToast } = useUIStore();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    adminService.getStudents().then(setStudents);
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const columns: Column<Student>[] = [
    {
      key: 'name',
      header: 'Student Name',
      render: (s) => (
        <div>
          <span className="font-bold text-brand-text-primary block">{s.name}</span>
          <span className="text-xs text-brand-text-secondary">{s.email}</span>
        </div>
      ),
    },
    { key: 'className', header: 'Class' },
    { key: 'rollNumber', header: 'Roll Number' },
    {
      key: 'attendancePercentage',
      header: 'Attendance',
      render: (s) => <span className="font-bold">{s.attendancePercentage}%</span>,
    },
    {
      key: 'overallMastery',
      header: 'Mastery',
      render: (s) => <span className="font-extrabold text-brand-text-primary">{s.overallMastery}%</span>,
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
      render: (s) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => addToast(`Editing record for ${s.name}`, 'info')}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Student Management
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Directory of enrolled students across all Class 12 sections
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={() => addToast('Exporting student roster to CSV...', 'info')}
          >
            Export Roster
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={<UserPlus className="w-4 h-4" />}
            onClick={() => addToast('Student onboarding modal opened', 'info')}
          >
            Enrol Student
          </Button>
        </div>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search students by name, email, or roll number..."
        className="max-w-md"
      />

      <Table
        columns={columns}
        data={filtered}
        keyExtractor={(s) => s.id}
      />
    </div>
  );
};
