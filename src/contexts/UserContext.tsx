
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
};

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    password: 'password',
    role: 'manager' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manager'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'password',
    role: 'user' as const,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'
  }
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user by email and validate password
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create a safe user object without the password
      const safeUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      // Store in state and localStorage
      setUser(safeUser);
      localStorage.setItem('user', JSON.stringify(safeUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
