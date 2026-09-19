import React, { useState } from 'react';
import { AttendanceRecord } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import { Check, X, Clock, CheckCheck, Save } from 'lucide-react';
import { cn } from '@/utils/cn';

interface AttendanceGridProps {
  records: AttendanceRecord[];
  onSave: (updated: AttendanceRecord[]) => void;
  isSaving?: boolean;
}

export const AttendanceGrid: React.FC<AttendanceGridProps> = ({
  records: initialRecords,
  onSave,
  isSaving,
}) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);

  const updateStatus = (id: string, status: AttendanceRecord['status']) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const markAll = (status: AttendanceRecord['status']) => {
    setRecords((prev) => prev.map((r) => ({ ...r, status })));
  };

  const presentCount = records.filter((r) => r.status === 'present').length;
  const absentCount = records.filter((r) => r.status === 'absent').length;
  const lateCount = records.filter((r) => r.status === 'late').length;

  return (
    <div className="space-y-4">
      {/* Top summary row & bulk actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-card border border-brand-border">
        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            Present: {presentCount}
          </span>
          <span className="text-rose-700 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
            Absent: {absentCount}
          </span>
          <span className="text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            Late: {lateCount}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
            onClick={() => markAll('present')}
          >
            Mark All Present
          </Button>
          <Button
            size="sm"
            variant="primary"
            isLoading={isSaving}
            leftIcon={<Save className="w-3.5 h-3.5" />}
            onClick={() => onSave(records)}
          >
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Grid of students */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="p-3.5 bg-white rounded-xl border border-brand-border shadow-2xs flex items-center justify-between gap-2"
          >
            <div className="min-w-0">
              <span className="text-[11px] font-bold text-brand-text-secondary">
                {record.rollNumber}
              </span>
              <h5 className="text-sm font-bold text-brand-text-primary truncate">
                {record.studentName}
              </h5>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => updateStatus(record.id, 'present')}
                className={cn(
                  'w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all',
                  record.status === 'present'
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-100'
                )}
                title="Present"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStatus(record.id, 'late')}
                className={cn(
                  'w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all',
                  record.status === 'late'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
                )}
                title="Late"
              >
                <Clock className="w-4 h-4" />
              </button>
              <button
                onClick={() => updateStatus(record.id, 'absent')}
                className={cn(
                  'w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center transition-all',
                  record.status === 'absent'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-100'
                )}
                title="Absent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
