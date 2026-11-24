import React, { useState, useEffect } from 'react';
import { AdminLoginPage } from '../components/admin/AdminLoginPage';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { PageRoute } from '../types';
import { signOutAdmin, subscribeToAdmin, type AdminUser } from '../auth/adminAuth';

interface AdminPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAdmin((user) => {
      setCurrentUser(user);
      setIsCheckingSession(false);
    });
    return unsubscribe;
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    await signOutAdmin();
    setCurrentUser(null);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <AdminLoginPage 
        onLoginSuccess={handleLoginSuccess}
        onNavigateHome={() => onNavigate('/')}
      />
    );
  }

  return (
    <AdminDashboard 
      user={currentUser}
      onLogout={handleLogout}
      onNavigateHome={() => onNavigate('/')}
    />
  );
};
