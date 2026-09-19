import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { adminData } = useAuthStore();
  const { addToast } = useUIStore();

  const handleSave = () => {
    addToast('Institution settings successfully updated!', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-brand-text-primary tracking-tight">
          Institutional Administration Settings
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Configure school metadata, authentication policies, and security
        </p>
      </div>

      <Card className="p-6 sm:p-8 border border-brand-border space-y-5 bg-white shadow-subtle">
        <Input
          label="Institution Legal Name"
          defaultValue={adminData?.institutionName || 'Apex Senior Secondary Academy'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Principal / Director"
            defaultValue={adminData?.name || 'Dr. V. Raman'}
          />
          <Input
            label="Administrative Contact"
            defaultValue="director@iqora.edu"
            disabled
          />
        </div>

        <div className="pt-4 border-t border-brand-border space-y-3">
          <span className="text-xs font-bold text-brand-text-primary uppercase tracking-wider block">
            Security & Student Access Controls
          </span>
          <label className="flex items-center gap-3 text-xs font-semibold text-brand-text-primary cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-brand-primary" />
            <span>Enforce timed test integrity safeguards</span>
          </label>
          <label className="flex items-center gap-3 text-xs font-semibold text-brand-text-primary cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-brand-primary" />
            <span>Allow teachers to assign AI remediation quests directly</span>
          </label>
        </div>

        <div className="pt-4 border-t border-brand-border flex justify-end">
          <Button variant="primary" onClick={handleSave}>
            Save Configuration
          </Button>
        </div>
      </Card>
    </div>
  );
};
