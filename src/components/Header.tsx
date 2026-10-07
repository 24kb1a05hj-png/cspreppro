"use client";
import Link from 'next/link';
import { User, Activity, BookOpen, Code, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                <Code className="h-8 w-8 text-indigo-600" />
                <span className="font-bold text-xl text-gray-900">CS PrepPro Pro</span>
              </Link>
              <nav className="ml-6 flex space-x-8">
                <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700">
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link href="/simulator" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700">
                  <Code className="w-4 h-4 mr-2" />
                  Simulator
                </Link>
                <Link href="/learning" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium text-gray-500 hover:text-gray-700">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Hub
                </Link>
              </nav>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-gray-900">{user.name}</span>
                    <span className="text-xs text-gray-500">{user.role} {user.areaOfStudy ? `• ${user.areaOfStudy}` : ''}</span>
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <button onClick={logout} className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm font-medium ml-4 border-l pl-4 border-gray-200">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowAuth(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultMode="login" />
    </>
  );
}
