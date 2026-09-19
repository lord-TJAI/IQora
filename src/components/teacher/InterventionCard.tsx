import React from 'react';
import { AIIntervention } from '@/types/domain';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Users, Clock, Check, X, Send } from 'lucide-react';
import { cn } from '@/utils/cn';

interface InterventionCardProps {
  intervention: AIIntervention;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onAssign?: (id: string) => void;
  className?: string;
}

export const InterventionCard: React.FC<InterventionCardProps> = ({
  intervention,
  onApprove,
  onReject,
  onAssign,
  className,
}) => {
  const getStatusBadge = (status: AIIntervention['status']) => {
    switch (status) {
      case 'pending_review':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending Review</span>;
      case 'approved':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">Approved</span>;
      case 'assigned':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Assigned to Students</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Completed</span>;
    }
  };

  return (
    <Card className={cn('p-5 border-2 border-purple-200/80 bg-gradient-to-br from-white to-purple-50/20', className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-100">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-purple-100 text-brand-ai">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <span className="text-xs font-bold text-brand-ai uppercase tracking-wider">
              AI-Assisted Intervention
            </span>
            <h4 className="text-base font-bold text-brand-text-primary">
              {intervention.title}
            </h4>
          </div>
        </div>
        <div>{getStatusBadge(intervention.status)}</div>
      </div>

      <div className="mt-3 space-y-2 text-xs sm:text-sm">
        <div className="flex items-center gap-4 text-brand-text-secondary">
          <span className="flex items-center gap-1.5 font-semibold text-rose-600">
            <Users className="w-4 h-4" />
            {intervention.affectedStudentsCount} students needing support
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-4 h-4" />
            {intervention.estimatedMinutes} mins
          </span>
        </div>

        <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
          <strong className="font-semibold text-brand-text-primary">Diagnosis: </strong>
          {intervention.reason}
        </p>

        <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
          <strong className="font-semibold text-purple-900 block mb-1">
            Generated Remediation:
          </strong>
          <p className="text-purple-950 font-medium">{intervention.suggestedActivity}</p>
          <p className="text-[11px] text-purple-800/80 mt-1 italic">
            "{intervention.generatedContent.recapNotes}"
          </p>
        </div>
      </div>

      {/* Teacher Actions */}
      <div className="mt-5 pt-3 border-t border-purple-100 flex flex-wrap items-center justify-end gap-2">
        {intervention.status === 'pending_review' && (
          <>
            <Button
              size="sm"
              variant="outline"
              leftIcon={<X className="w-3.5 h-3.5" />}
              onClick={() => onReject && onReject(intervention.id)}
            >
              Dismiss
            </Button>
            <Button
              size="sm"
              variant="ai"
              leftIcon={<Check className="w-3.5 h-3.5" />}
              onClick={() => onApprove && onApprove(intervention.id)}
            >
              Approve Intervention
            </Button>
          </>
        )}

        {intervention.status === 'approved' && (
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Send className="w-3.5 h-3.5" />}
            onClick={() => onAssign && onAssign(intervention.id)}
          >
            Assign as Student Quest
          </Button>
        )}

        {intervention.status === 'assigned' && (
          <span className="text-xs text-brand-text-secondary font-medium italic">
            Active in student task feeds
          </span>
        )}
      </div>
    </Card>
  );
};
