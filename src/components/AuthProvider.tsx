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
  login: (user: UserProfile) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({ user: null, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('cs_preppro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const login = (userData: UserProfile) => {
    setUser(userData);
    localStorage.setItem('cs_preppro_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cs_preppro_user');
  };

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm font-medium">Loading CS PrepPro Pro...</p>
      </div>
    </div>
  );

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
