import React, { useState, useEffect } from 'react';
import { AdminLoginPage } from '../components/admin/AdminLoginPage';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { PageRoute } from '../types';

interface AdminPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('nexo_admin_user');
      const token = localStorage.getItem('nexo_admin_token');
      if (savedUser && token) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch {
      // Ignorar error de parsing
    } finally {
      setIsCheckingSession(false);
    }
  }, []);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexo_admin_token');
    localStorage.removeItem('nexo_admin_user');
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
