import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { email: string; id: string } | null;
  session: { access_token: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string; id: string } | null>(null);
  const [session, setSession] = useState<{ access_token: string } | null>(null);
  const [loading] = useState(false);
  const [isAdmin] = useState(false);

  const signIn = async (_email: string, _password: string) => {
    return { error: 'Authentication disabled. Use admin panel for management.' };
  };

  const signUp = async (_email: string, _password: string) => {
    return { error: 'Registration disabled. Use admin panel for management.' };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
