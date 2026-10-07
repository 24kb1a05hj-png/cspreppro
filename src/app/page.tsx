import Link from 'next/link';
import { ArrowRight, Code2, ShieldCheck, BrainCircuit, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          v1.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Ace Your Technical <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Interviews</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate AI-powered platform for Computer Science students and professionals. Practice with real-time feedback, behavioral analysis, and comprehensive study plans.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Link href="/simulator" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all gap-2">
            Go to Simulator <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/learning" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg shadow-sm transition-all gap-2">
            Explore Study Hub
          </Link>
        </div>
      </div>

      {/* About The Application */}
      <div className="w-full bg-white border-y border-gray-200 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About CS PrepPro Pro</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform bridges the gap between learning theory and passing technical interviews by offering a realistic, proctored testing environment alongside rich educational materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sign in to unlock everything</h3>
                  <p className="text-gray-600 leading-relaxed">Create a personalized profile specifying your role and area of study. Your progress, focus violations, and daily streaks are saved automatically and tied to your account across sessions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Immersive Study Hub</h3>
                  <p className="text-gray-600 leading-relaxed">Read through comprehensive learning materials for Data Structures, OOD, and System Design. Take topic-specific quizzes immediately after reviewing, or challenge yourself with a cumulative quiz.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Core Features</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ShieldCheck className="w-5 h-5"/></div>
                  <div>
                    <span className="block font-bold text-gray-900">Live Proctoring</span>
                    <span className="text-sm text-gray-600">Advanced tab-focus tracking and webcam integration to simulate real testing environments.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><BrainCircuit className="w-5 h-5"/></div>
                  <div>
                    <span className="block font-bold text-gray-900">AI Evaluation</span>
                    <span className="text-sm text-gray-600">Real-time speech-to-text transcription paired with automated code assessment.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Code2 className="w-5 h-5"/></div>
                  <div>
                    <span className="block font-bold text-gray-900">Integrated IDE</span>
                    <span className="text-sm text-gray-600">Built-in code editor tailored for algorithms and system design tasks.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
