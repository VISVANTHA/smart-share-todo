
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (provider: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (provider: string) => {
    setLoading(true);
    try {
      // Simulate OAuth flow - in real implementation, this would redirect to OAuth provider
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Demo User',
        email: 'demo@smartsharetodo.com',
        avatar: `https://ui-avatars.com/api/?name=Demo+User&background=random`
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Welcome to Smart Share Todo!",
        description: "You've successfully signed in with " + provider,
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tasks');
    toast({
      title: "Signed out successfully",
      description: "Come back soon!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
