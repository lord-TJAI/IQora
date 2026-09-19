import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { UserRole } from '@/types/domain';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, activeRole } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(activeRole)) {
    // Redirect to the appropriate home for their role
    if (activeRole === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
    if (activeRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/student/home" replace />;
  }

  return <Outlet />;
};
