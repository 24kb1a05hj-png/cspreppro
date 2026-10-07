"use client";
import { useState } from 'react';
import { useProctoring } from '@/hooks/useProctoring';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Mic, MicOff, Video, VideoOff, AlertTriangle, Play, Square, Code as CodeIcon, Settings } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Simulator() {
  const { violations, isTracking, error: proctorError, startProctoring, stopProctoring, videoRef } = useProctoring();
  const { transcript, isListening, startListening, stopListening } = useSpeechRecognition();
  const [code, setCode] = useState('// Write your solution here...\nfunction twoSum(nums, target) {\n\n}');
  const [feedback, setFeedback] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [track, setTrack] = useState('DSA');
  const [setupMode, setSetupMode] = useState(true);

  const handleStart = () => {
    setSetupMode(false);
    startProctoring();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/interview/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          track,
          question_title: 'Custom Evaluation',
          code_submission: code,
          transcript_text: transcript,
          violations_count: violations,
        }),
      });
      const data = await res.json();
      setFeedback(data);
    } catch (err) {
      console.error(err);
    }
    setIsSubmitting(false);
  };

  if (setupMode) {
    return (
      <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md w-full">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mb-6 mx-auto">
              <Settings className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Configure Session</h2>
            <p className="text-center text-gray-500 mb-8">Select your interview track to begin the live proctored session.</p>

            <div className="space-y-2 mb-8">
              <label className="block text-sm font-medium text-gray-700">Interview Track</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900"
              >
                <option value="DSA">Data Structures &amp; Algorithms</option>
                <option value="OOD">Object-Oriented Design</option>
                <option value="SystemDesign">System Design</option>
              </select>
            </div>

            <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-8">
              <p className="font-semibold mb-1">Before you start:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure you are in a quiet environment.</li>
                <li>Your webcam and microphone will be recorded.</li>
                <li>Tab switching will result in integrity violations.</li>
              </ul>
            </div>

            <button
              onClick={handleStart}
              className="w-full bg-indigo-600 text-white px-4 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Begin Interview
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Interview Simulator</h1>
            <p className="text-gray-500">Track: {track}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${violations > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              <AlertTriangle className="w-4 h-4" />
              {violations} Focus Violations
            </div>
            {!isTracking ? (
              <button onClick={startProctoring} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center gap-2">
                <Play className="w-4 h-4" /> Resume Proctoring
              </button>
            ) : (
              <button onClick={stopProctoring} className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 flex items-center gap-2">
                <Square className="w-4 h-4" /> Pause Proctoring
              </button>
            )}
          </div>
        </div>

        {proctorError && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            {proctorError}
          </div>
        )}

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          <div className="lg:col-span-2 flex flex-col gap-4 h-full overflow-hidden">
            <div className="bg-gray-900 rounded-lg shadow-lg flex-1 overflow-hidden flex flex-col">
              <div className="bg-gray-800 px-4 py-2 flex items-center text-gray-300 text-sm border-b border-gray-700">
                <CodeIcon className="w-4 h-4 mr-2" /> Code Editor
              </div>
              <textarea
                className="flex-1 w-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-4 overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex-shrink-0">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <Video className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Proctoring Feed</span>
              </div>
              <div className="aspect-video bg-gray-900 relative">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                {!isTracking && (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 flex-col gap-2 p-4 text-center">
                    <VideoOff className="w-8 h-8" />
                    <span className="text-sm">Webcam paused. Click &quot;Resume&quot; to continue.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 flex flex-col overflow-hidden min-h-[160px]">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mic className="w-4 h-4" /> Transcript Log
                </span>
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                  title={isListening ? 'Stop Listening' : 'Start Listening'}
                >
                  {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto text-sm text-gray-600 break-words">
                {transcript || (
                  <span className="text-gray-400 italic">
                    No speech recorded yet. Click the mic icon above to start. Requires Chrome / Edge / Safari.
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isTracking}
              className="w-full bg-green-600 text-white px-4 py-3 rounded-md font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex-shrink-0"
            >
              {isSubmitting ? 'Evaluating...' : 'Submit Interview'}
            </button>
          </div>
        </div>

        {feedback && (
          <div className="mt-6 p-6 bg-indigo-50 rounded-lg border border-indigo-100 mb-8 flex-shrink-0">
            <h3 className="text-lg font-semibold text-indigo-900 mb-3">Evaluation Report</h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="bg-white rounded-lg p-4 border border-indigo-100 text-center">
                <p className="text-xs text-indigo-500 uppercase font-medium mb-1">Final Score</p>
                <p className="text-3xl font-bold text-indigo-700">{feedback.final_score}<span className="text-lg text-indigo-400">/100</span></p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-indigo-100 text-center">
                <p className="text-xs text-indigo-500 uppercase font-medium mb-1">Integrity Score</p>
                <p className="text-3xl font-bold text-indigo-700">{feedback.integrity_score}<span className="text-lg text-indigo-400">/100</span></p>
              </div>
            </div>
            <p className="text-indigo-800 text-sm whitespace-pre-wrap">{feedback.ai_feedback}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
