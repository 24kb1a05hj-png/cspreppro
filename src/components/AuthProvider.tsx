"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserProfile = {
  id: string;
  name: string;
  role: string;
  areaOfStudy?: string;
};

type AuthContextType = {
  user: UserProfile | null;
  isLoaded: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
};

// Default context — isLoaded starts false so protected routes can gate themselves
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoaded: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cs_preppro_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // localStorage not available (e.g. SSR context)
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('cs_preppro_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cs_preppro_user');
  };

  // ✅ No longer blocking the entire tree — page.tsx renders immediately.
  // Protected pages check isLoaded themselves via context.
  return (
    <AuthContext.Provider value={{ user, isLoaded, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
