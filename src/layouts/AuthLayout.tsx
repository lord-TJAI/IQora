import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo and Brand */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary text-brand-text-primary font-black text-2xl shadow-brand mb-3">
          IQ
        </div>
        <h1 className="text-3xl font-black tracking-tight text-brand-text-primary">
          IQora
        </h1>
        <p className="mt-1 text-sm font-semibold text-brand-text-secondary">
          Learn. Play. Master.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Outlet />
      </div>

      <ToastContainer />
    </div>
  );
};
