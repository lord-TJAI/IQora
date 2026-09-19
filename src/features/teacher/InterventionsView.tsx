import React, { useState, useEffect } from 'react';
import { teacherService } from '@/services/teacherService';
import { AIIntervention } from '@/types/domain';
import { InterventionCard } from '@/components/teacher/InterventionCard';
import { Tabs } from '@/components/ui/Drawer';
import { useUIStore } from '@/stores/uiStore';
import { Sparkles, BrainCircuit } from 'lucide-react';

export const InterventionsView: React.FC = () => {
  const { addToast } = useUIStore();
  const [interventions, setInterventions] = useState<AIIntervention[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    teacherService.getInterventions().then(setInterventions);
  }, []);

  const handleApprove = async (id: string) => {
    const updated = await teacherService.updateInterventionStatus(id, 'approved');
    setInterventions((prev) => prev.map((i) => (i.id === id ? updated : i)));
    addToast('Intervention approved! Ready to assign.', 'success');
  };

  const handleAssign = async (id: string) => {
    const updated = await teacherService.updateInterventionStatus(id, 'assigned');
    setInterventions((prev) => prev.map((i) => (i.id === id ? updated : i)));
    addToast('Assigned intervention directly into students’ task lists!', 'success');
  };

  const handleReject = async (id: string) => {
    setInterventions((prev) => prev.filter((i) => i.id !== id));
    addToast('Intervention dismissed.', 'info');
  };

  const filtered = interventions.filter((item) => {
    if (activeTab === 'pending') return item.status === 'pending_review';
    if (activeTab === 'approved') return item.status === 'approved';
    if (activeTab === 'assigned') return item.status === 'assigned';
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-ai" />
          <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
            AI-Assisted Interventions
          </h1>
        </div>
        <p className="text-sm text-brand-text-secondary mt-1">
          Review, approve, and deploy targeted remediation sequences for struggling concepts
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
        tabs={[
          { id: 'all', label: 'All Interventions', count: interventions.length },
          { id: 'pending', label: 'Pending Review', count: interventions.filter((i) => i.status === 'pending_review').length },
          { id: 'approved', label: 'Approved', count: interventions.filter((i) => i.status === 'approved').length },
          { id: 'assigned', label: 'Active Quests', count: interventions.filter((i) => i.status === 'assigned').length },
        ]}
      />

      <div className="space-y-4">
        {filtered.map((item) => (
          <InterventionCard
            key={item.id}
            intervention={item}
            onApprove={handleApprove}
            onAssign={handleAssign}
            onReject={handleReject}
          />
        ))}
      </div>
    </div>
  );
};
