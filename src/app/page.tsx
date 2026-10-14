import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import { 
  ArrowRight, 
  Code2, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Activity, 
  Terminal, 
  Mic, 
  Video, 
  Zap,
  Flame,
  Check
} from 'lucide-react';

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center py-10 md:py-16 overflow-hidden">
      
      {/* 2. Ambient Hero Background Glow Effects */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[320px] md:w-[850px] md:h-[420px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-72 left-1/3 -translate-x-1/2 w-[400px] h-[250px] bg-gradient-to-br from-indigo-400/10 to-pink-500/10 blur-3xl pointer-events-none -z-10 rounded-full" 
        aria-hidden="true"
      />

      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mb-16 relative z-10">
        
        {/* 2. Animated Status Beacon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          <span>v1.0 is now live</span>
        </div>

        {/* 1. Typography & Refined Gradient Polish */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          <span 
            className="inline-block pb-1"
            style={{ 
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            Ace Your Technical
          </span>{' '}
          <br className="hidden md:block" />
          <span 
            className="inline-block pb-1"
            style={{ 
              background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #c026d3 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}
          >
            Interviews
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          The ultimate AI-powered platform for Computer Science students and professionals. Practice with real-time feedback, behavioral analysis, and comprehensive study plans.
        </p>
        
        {/* 3. CTA Buttons & Micro-Interactions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/simulator" 
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 gap-2"
          >
            <span>Go to Simulator</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link 
            href="/learning" 
            className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 gap-2"
          >
            <BookOpen className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors duration-200" />
            <span>Explore Study Hub</span>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-12 pt-8 border-t border-gray-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Live Voice Transcription</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Anti-Cheat Tab Proctoring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>DSA, OOD & System Design</span>
          </div>
        </div>

        {/* 4. Hero Feature Mockup / Interactive Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto text-left rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl overflow-hidden transition-all duration-300 hover:border-gray-700">
          {/* Mock Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-950/80 border-b border-gray-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="ml-3 font-mono text-gray-400 hidden sm:inline">simulator/twoSum.ts — CS PrepPro Pro</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Audio Proctored
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 text-[11px] font-medium">
                <ShieldCheck className="w-3 h-3" />
                Focus Locked
              </span>
            </div>
          </div>

          {/* Mock Editor Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 font-mono text-xs sm:text-sm">
            {/* Code Editor Pane */}
            <div className="lg:col-span-7 p-5 bg-gray-900 overflow-x-auto text-gray-300 leading-relaxed border-b lg:border-b-0 lg:border-r border-gray-800">
              <div className="text-gray-500 mb-2">// Question 1: Two Sum (Optimal Hash Map)</div>
              <div><span className="text-purple-400">function</span> <span className="text-blue-400">twoSum</span>(nums: <span className="text-yellow-400">number[]</span>, target: <span className="text-yellow-400">number</span>): <span className="text-yellow-400">number[]</span> {'{'}</div>
              <div className="pl-4 text-gray-400"><span className="text-purple-400">const</span> map = <span className="text-purple-400">new</span> <span className="text-yellow-400">Map</span>&lt;<span className="text-yellow-400">number</span>, <span className="text-yellow-400">number</span>&gt;();</div>
              <div className="pl-4"><span className="text-purple-400">for</span> (<span className="text-purple-400">let</span> i = 0; i &lt; nums.length; i++) {'{'}</div>
              <div className="pl-8 text-gray-400"><span className="text-purple-400">const</span> comp = target - nums[i];</div>
              <div className="pl-8"><span className="text-purple-400">if</span> (map.has(comp)) {'{'}</div>
              <div className="pl-12 text-emerald-400"><span className="text-purple-400">return</span> [map.get(comp)!, i];</div>
              <div className="pl-8">{'}'}</div>
              <div className="pl-8 text-gray-400">map.set(nums[i], i);</div>
              <div className="pl-4">{'}'}</div>
              <div className="pl-4 text-purple-400"><span className="text-purple-400">return</span> [];</div>
              <div>{'}'}</div>
            </div>

            {/* AI Real-time Feedback & Speech Pane */}
            <div className="lg:col-span-5 p-5 bg-gray-950/60 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs tracking-wider uppercase mb-3">
                  <Mic className="w-3.5 h-3.5" />
                  <span>Live Speech Transcription</span>
                </div>
                <div className="bg-gray-900/90 rounded-lg p-3 border border-gray-800 text-gray-300 text-xs italic leading-relaxed">
                  &ldquo;I am caching previous values into a hash map so we find complements in single pass O(N) time.&rdquo;
                </div>
              </div>

              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold text-xs mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Proctor Evaluation</span>
                </div>
                <p className="text-gray-300 text-xs leading-normal">
                  Optimal linear time complexity verified. Articulation score is <strong className="text-emerald-400">96%</strong>. Good job vocalizing edge conditions.
                </p>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] font-sans">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Complexity: O(N)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">Tests: 3/3 Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Modern Bento-Grid for Features */}
      <div className="w-full bg-white border-y border-gray-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              Engineered for Success
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              Everything You Need to Clear Technical Loops
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Our platform bridges the gap between learning theory and passing technical interviews with a realistic proctored testing environment and comprehensive study tracks.
            </p>
          </div>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Card 1 (Span 2) */}
            <div className="md:col-span-2 group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                  Anti-Cheat Simulator
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Live Proctoring & Tab-Switch Detection
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Simulate authentic high-stakes interview conditions. Our integrated proctoring monitors tab switches, blur events, and webcam presence to build real focus and confidence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Tab Focus & Blur Tracking</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Optional Webcam Feed</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Strict Countdown Timer</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-gray-200/80 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Interview Session Report</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
                  Voice & Code
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                AI Speech & Code Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Practice vocalizing your thought process. Live speech-to-text captures explanations while our evaluator measures algorithmic accuracy and complexity.
              </p>
              <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-purple-900 text-xs leading-relaxed">
                <strong className="font-semibold block mb-1">Dual-Signal Evaluation:</strong>
                Combines code correctness with communication cadence and articulation metrics.
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  Knowledge Hub
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Immersive Study Hub
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Deep dive into structured curricula for Data Structures, Object-Oriented Design, and Distributed Systems with interactive knowledge checks.
              </p>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Topic-specific flash quizzes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>System design architectures</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>OOD clean patterns & SOLID</span>
                </li>
              </ul>
            </div>

            {/* Bento Card 4 (Span 2) */}
            <div className="md:col-span-2 group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
                  Personal Analytics
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Profile Streaks & Performance Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Personalized accounts track solved problems, question difficulty distribution, focus violations, and daily consistency streaks tied automatically to your account across sessions.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                  <Flame className="w-4 h-4 text-amber-500" />
                  Daily Practice Streaks
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  Full Code Replays
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  Readiness Score
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 7. Modern Page Footer */}
      <footer className="w-full pt-16 pb-12 mt-10 border-t border-gray-200 text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Code2 className="h-7 w-7 text-indigo-500" />
                <span 
                  className="font-extrabold text-xl tracking-tight inline-block"
                  style={{
                    background: 'linear-gradient(to right, #f1f5f9, #c7d2fe, #e9d5ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  CS PrepPro Pro
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                The next-generation technical interview training platform. Featuring live AI proctoring, speech evaluation, and comprehensive CS curricula.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>All Systems Operational</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/simulator" className="hover:text-indigo-600 transition-colors">
                    Interview Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/learning" className="hover:text-indigo-600 transition-colors">
                    Study Hub
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                    Performance Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Curriculum</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/learning" className="hover:text-indigo-600 transition-colors">
                    Data Structures & Algorithms
                  </Link>
                </li>
                <li>
                  <Link href="/learning" className="hover:text-indigo-600 transition-colors">
                    Object-Oriented Design
                  </Link>
                </li>
                <li>
                  <Link href="/learning" className="hover:text-indigo-600 transition-colors">
                    Distributed System Design
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>
              &copy;{' '}
              <Suspense fallback={<span>2026</span>}>
                <CurrentYear />
              </Suspense>{' '}
              CS PrepPro Pro. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="hover:text-gray-700 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-700 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-700 cursor-pointer">System Status</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
