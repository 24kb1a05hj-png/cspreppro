"use client";
import { useState } from 'react';
import { useAuth, UserProfile } from './AuthProvider';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [areaOfStudy, setAreaOfStudy] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: Math.random().toString(36).substring(7),
      name: isLogin ? (name || 'Returning User') : name,
      role: isLogin ? 'Student' : role,
      areaOfStudy: role === 'Student' ? areaOfStudy : undefined
    };
    login(newUser);
    onClose();
    router.refresh(); // Refresh state if necessary
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isLogin ? 'Sign In to CS PrepPro' : 'Create an Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white">
                  <option value="Student">Student</option>
                  <option value="Professional">Professional</option>
                  <option value="Educator">Educator</option>
                </select>
              </div>
              {role === 'Student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area of Study / Major</label>
                  <input required type="text" value={areaOfStudy} onChange={e => setAreaOfStudy(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white" placeholder="Computer Science" />
                </div>
              )}
            </>
          )}

          {isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name / Username</label>
              <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white" placeholder="Enter your name" />
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 font-medium hover:underline">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
