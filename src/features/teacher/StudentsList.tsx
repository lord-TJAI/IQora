import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockClass12AStudents } from '@/services/mock/mockData';
import { Table, Column, SearchBar } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Student } from '@/types/domain';
import { cn } from '@/utils/cn';

type StudentItem = (typeof mockClass12AStudents)[0];

export const StudentsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStudents = mockClass12AStudents.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'needs_attention' && st.statusBadge === 'Needs Attention') ||
      (statusFilter === 'needs_support' && st.statusBadge === 'Needs Support') ||
      (statusFilter === 'improving' && st.statusBadge === 'Improving') ||
      (statusFilter === 'strong' && st.statusBadge === 'Strong Progress');

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (badge: StudentItem['statusBadge']) => {
    switch (badge) {
      case 'Needs Attention':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Needs Attention</span>;
      case 'Needs Support':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Needs Support</span>;
      case 'Improving':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Improving</span>;
      case 'Strong Progress':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Strong Progress</span>;
    }
  };

  const columns: Column<StudentItem>[] = [
    {
      key: 'name',
      header: 'Student',
      render: (st) => (
        <div className="flex items-center gap-3">
          <Avatar
            seed={st.name}
            name={st.name}
            role="student"
            size={36}
          />
          <div>
            <span className="font-bold text-brand-text-primary block">{st.name}</span>
            <span className="text-xs text-brand-text-secondary">{st.rollNumber}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'attendancePercentage',
      header: 'Attendance',
      render: (st) => <span className="font-semibold">{st.attendancePercentage}%</span>,
    },
    {
      key: 'overallMastery',
      header: 'Concept Mastery',
      render: (st) => (
        <span className="font-extrabold text-brand-text-primary">{st.overallMastery}%</span>
      ),
    },
    {
      key: 'latestScore',
      header: 'Latest Score',
      render: (st) => <span className="font-semibold">{st.latestScore}%</span>,
    },
    {
      key: 'statusBadge',
      header: 'Status',
      render: (st) => getStatusBadge(st.statusBadge),
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Class 12-A Student Roster
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Monitor individual mastery, attendance, and student intervention needs
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by student name or roll number..."
          className="w-full sm:w-80"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'needs_attention', label: 'Needs Attention' },
            { id: 'needs_support', label: 'Needs Support' },
            { id: 'strong', label: 'Strong Progress' },
          ].map((flt) => (
            <button
              key={flt.id}
              onClick={() => setStatusFilter(flt.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all',
                statusFilter === flt.id
                  ? 'bg-brand-primary text-brand-text-primary font-bold shadow-xs'
                  : 'bg-white text-brand-text-secondary border border-brand-border hover:bg-slate-50'
              )}
            >
              {flt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table with responsive card fallback (Section 100) */}
      <Table
        columns={columns}
        data={filteredStudents}
        keyExtractor={(st) => st.id}
        onRowClick={(st) => navigate(`/teacher/students/${st.id}`)}
        renderMobileCard={(st) => (
          <Card className="p-4 border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  seed={st.name}
                  name={st.name}
                  role="student"
                  size={40}
                />
                <div>
                  <h4 className="text-sm font-bold text-brand-text-primary">{st.name}</h4>
                  <span className="text-xs text-brand-text-secondary">{st.rollNumber}</span>
                </div>
              </div>
              {getStatusBadge(st.statusBadge)}
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
              <div>
                <span className="text-slate-500 block">Attendance</span>
                <span className="font-bold">{st.attendancePercentage}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mastery</span>
                <span className="font-bold">{st.overallMastery}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Latest</span>
                <span className="font-bold">{st.latestScore}%</span>
              </div>
            </div>
          </Card>
        )}
      />
    </div>
  );
};
