import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
      <Outlet />
      <ToastContainer />
    </div>
  );
};
