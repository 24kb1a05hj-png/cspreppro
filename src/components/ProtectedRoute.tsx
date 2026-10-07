"use client";
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowAuthModal(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6 max-w-md">Please sign in or create an account to access the Interview Simulator and Study Hub materials.</p>
        <button onClick={() => setShowAuthModal(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium hover:bg-indigo-700">
          Sign In / Register
        </button>
        <AuthModal isOpen={showAuthModal} onClose={() => {
            setShowAuthModal(false);
            if (!user) {
              router.push('/');
            }
        }} />
      </div>
    );
  }

  return <>{children}</>;
}
