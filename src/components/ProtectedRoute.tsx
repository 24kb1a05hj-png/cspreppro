"use client";
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import AuthModal from './AuthModal';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auth still hydrating from localStorage — show a small inline spinner
  // instead of the blocking full-page guard that prevented page.tsx from rendering
  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-500 font-medium">Checking session...</p>
      </div>
    );
  }

  // Fully loaded and no user — show auth wall
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Sign in to continue</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          Please sign in or create a free account to access this feature.
        </p>
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Sign In / Register
        </button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="login"
        />
      </div>
    );
  }

  return <>{children}</>;
}
