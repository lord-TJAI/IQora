import React from 'react';
import { School, ChevronDown } from 'lucide-react';

interface ClassSelectorProps {
  selectedClass: string;
  onSelectClass: (classId: string) => void;
  classes?: { id: string; name: string }[];
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClass,
  onSelectClass,
  classes = [
    { id: '12-A', name: 'Class 12-A (Physics & Chem)' },
    { id: '12-B', name: 'Class 12-B (Physics & Math)' },
  ],
}) => {
  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-brand-border text-xs font-bold text-brand-text-primary hover:bg-slate-200/70 transition-colors cursor-pointer">
        <School className="w-3.5 h-3.5 text-brand-ai" />
        <select
          value={selectedClass}
          onChange={(e) => onSelectClass(e.target.value)}
          aria-label="Select Class"
          className="bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none"
        >
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-brand-text-secondary pointer-events-none -ml-4" />
      </div>
    </div>
  );
};
