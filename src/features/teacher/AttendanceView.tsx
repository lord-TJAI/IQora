import React, { useState, useEffect } from 'react';
import { teacherService } from '@/services/teacherService';
import { AttendanceRecord } from '@/types/domain';
import { AttendanceGrid } from '@/components/teacher/AttendanceGrid';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useUIStore } from '@/stores/uiStore';
import { Calendar, Users } from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { addToast } = useUIStore();
  const [classId, setClassId] = useState('12-A');
  const [date, setDate] = useState('2026-09-19');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    teacherService.getAttendance(classId, date).then((data) => {
      setRecords(data);
      setIsLoading(false);
    });
  }, [classId, date]);

  const handleSave = async (updated: AttendanceRecord[]) => {
    setIsSaving(true);
    await teacherService.saveAttendance(updated);
    setIsSaving(false);
    addToast('Attendance marked and saved successfully!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            Daily Class Attendance
          </h1>
          <p className="text-sm text-brand-text-secondary mt-1">
            Record and maintain daily presence for Class 12 sections
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-40">
            <Select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              options={[
                { value: '12-A', label: 'Class 12-A' },
                { value: '12-B', label: 'Class 12-B' },
              ]}
            />
          </div>
          <div className="w-40">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 rounded-full border-4 border-brand-primary border-t-transparent animate-spin mx-auto" />
        </div>
      ) : (
        <AttendanceGrid
          records={records}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};
