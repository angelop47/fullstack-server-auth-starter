import { createContext, useContext, type ReactNode } from 'react';
import type { User } from '../types/types';
import { useUserQuery, useLogoutMutation } from '../hooks/useAuthQueries';

interface AuthContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isLoading: loading } = useUserQuery();
  const logoutMutation = useLogoutMutation();

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
