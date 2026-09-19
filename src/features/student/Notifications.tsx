import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotifications } from '@/services/mock/mockData';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Drawer';
import { ArrowLeft, Bell, CheckCircle2, Clock, Sparkles, FileText, Award } from 'lucide-react';
import { cn } from '@/utils/cn';

export const NotificationsView: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const getFiltered = () => {
    if (activeTab === 'all') return mockNotifications;
    return mockNotifications.filter((n) => n.category === activeTab);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'tasks':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'feedback':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-brand-ai" />;
      case 'achievements':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const items = getFiltered();

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/student/home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-text-secondary hover:text-brand-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-semibold text-brand-text-secondary">
          {mockNotifications.filter((n) => !n.read).length} Unread
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-text-primary tracking-tight">
          Notifications & Updates
        </h1>
        <p className="text-sm text-brand-text-secondary mt-1">
          Stay on top of due assignments, teacher feedback, and AI study insights
        </p>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pills"
        tabs={[
          { id: 'all', label: 'All' },
          { id: 'tasks', label: 'Tasks' },
          { id: 'feedback', label: 'Teacher Feedback' },
          { id: 'ai', label: 'AI Insights' },
          { id: 'achievements', label: 'Badges' },
        ]}
      />

      <div className="space-y-3">
        {items.map((notif) => (
          <Card
            key={notif.id}
            variant="interactive"
            onClick={() => notif.actionUrl && navigate(notif.actionUrl)}
            className={cn(
              'p-4 flex items-start gap-3.5 border transition-all',
              !notif.read ? 'border-brand-primary/60 bg-amber-50/20 shadow-2xs' : 'border-brand-border bg-white'
            )}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              {getCategoryIcon(notif.category)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-brand-text-primary truncate">
                  {notif.title}
                </h4>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-brand-text-secondary mt-1 leading-relaxed">
                {notif.message}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
