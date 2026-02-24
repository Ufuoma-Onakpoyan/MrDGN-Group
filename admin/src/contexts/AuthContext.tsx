import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '@/lib/api-client';

const TOKEN_KEY = 'admin_token';
const useApi = !!import.meta.env.VITE_API_URL;

interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: 'super_admin' | 'editor' | 'viewer';
  created_at: string;
}

interface AuthContextType {
  user: { email: string; id: string } | null;
  adminUser: AdminUser | null;
  session: { access_token: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }

    if (!useApi) {
      try {
        const data = JSON.parse(localStorage.getItem('admin_user') || '{}');
        setUser({ email: data.email || '', id: data.id || 'mock' });
        setAdminUser({
          id: data.id || 'mock',
          email: data.email || '',
          name: data.name || 'Admin',
          role: (data.role || 'super_admin') as 'super_admin' | 'editor' | 'viewer',
          created_at: new Date().toISOString(),
        });
        setSession({ access_token: token });
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      }
      setIsLoading(false);
      return;
    }

    authApi
      .me()
      .then((data) => {
        setUser({ email: data.email, id: data.id });
        setAdminUser({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role as 'super_admin' | 'editor' | 'viewer',
          created_at: new Date().toISOString(),
        });
        setSession({ access_token: token });
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      if (useApi) {
        const { token, user: u } = await authApi.login(email, password);
        localStorage.setItem(TOKEN_KEY, token);
        setUser({ email: u.email, id: u.id });
        setAdminUser({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role as 'super_admin' | 'editor' | 'viewer',
          created_at: new Date().toISOString(),
        });
        setSession({ access_token: token });
      } else {
        const mockUser = { id: 'mock', email, name: 'Admin', role: 'super_admin' };
        localStorage.setItem(TOKEN_KEY, 'mock');
        localStorage.setItem('admin_user', JSON.stringify(mockUser));
        setUser({ email, id: mockUser.id });
        setAdminUser({
          ...mockUser,
          created_at: new Date().toISOString(),
        } as AdminUser);
        setSession({ access_token: 'mock' });
      }
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('admin_user');
      setAdminUser(null);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    adminUser,
    session,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: !!adminUser && ['super_admin', 'editor'].includes(adminUser.role),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
