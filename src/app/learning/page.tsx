"use client";
import { useState } from 'react';
import { BookOpen, CheckCircle, Circle, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

const modules = [
  { 
    id: 1, 
    title: 'Data Structures & Algorithms', 
    progress: 80, 
    color: 'bg-blue-500',
    content: "Data structures are specialized formats for organizing, processing, retrieving and storing data. Algorithms are step-by-step procedures or formulas for solving problems. Mastery of arrays, linked lists, trees, graphs, and dynamic programming is crucial for technical interviews.",
    questions: [
      {
        question: "Which data structure provides O(1) average time complexity for lookups?",
        options: ["Array", "Linked List", "Hash Table", "Binary Search Tree"],
        correctIndex: 2,
        explanation: "Hash Tables use a hash function to compute an index into an array of buckets or slots, from which the desired value can be found in O(1) average time."
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
        correctIndex: 1,
        explanation: "The worst-case occurs when the pivot chosen is always the greatest or smallest element, resulting in O(n^2) time complexity."
      }
    ]
  },
  { 
    id: 2, 
    title: 'Object-Oriented Design', 
    progress: 45, 
    color: 'bg-green-500',
    content: "OOD involves planning a system of interacting objects for the purpose of solving a software problem. The four pillars are Encapsulation, Abstraction, Inheritance, and Polymorphism. It helps in creating modular, reusable, and maintainable code.",
    questions: [
      {
        question: "Which of the following is NOT a pillar of Object-Oriented Programming?",
        options: ["Polymorphism", "Encapsulation", "Compilation", "Inheritance"],
        correctIndex: 2,
        explanation: "Compilation is a process of converting code to machine language, not an OOP concept."
      },
      {
        question: "What concept restricts direct access to some of an object's components?",
        options: ["Polymorphism", "Encapsulation", "Abstraction", "Inheritance"],
        correctIndex: 1,
        explanation: "Encapsulation restricts direct access to some of an object's components, which is a means of preventing accidental interference."
      }
    ]
  }
];

export default function StudyHub() {
  const [view, setView] = useState<'list' | 'material' | 'quiz' | 'cumulative'>('list');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const activeModule = modules.find(m => m.id === activeModuleId);
  
  // Aggregate all questions for cumulative quiz
  const allQuestions = modules.flatMap(m => m.questions);
  const activeQuestions = view === 'cumulative' ? allQuestions : (activeModule?.questions || []);
  const currentQuestion = activeQuestions[currentQuestionIndex];

  const openMaterial = (id: number) => {
    setActiveModuleId(id);
    setView('material');
  };

  const startQuiz = (type: 'module' | 'cumulative') => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsQuizFinished(false);
    setView(type === 'cumulative' ? 'cumulative' : 'quiz');
  };

  const handleNext = () => {
    if (selectedOption === currentQuestion?.correctIndex) {
      setScore(prev => prev + 1);
    }
    
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setIsQuizFinished(true);
    }
  };

  const goBack = () => {
    setView('list');
    setActiveModuleId(null);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study Hub</h1>
            <p className="text-gray-500">Master core computer science concepts.</p>
          </div>
          {view === 'list' && (
            <button onClick={() => startQuiz('cumulative')} className="bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Take Cumulative Quiz
            </button>
          )}
        </div>

        {view === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map(mod => (
              <div key={mod.id} onClick={() => openMaterial(mod.id)} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${mod.color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                      <BookOpen className={`w-6 h-6 ${mod.color.replace('bg-', 'text-')}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900">{mod.title}</h3>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div className={`${mod.color} h-2 rounded-full`} style={{ width: `${mod.progress}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-semibold text-gray-700">{mod.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'material' && activeModule && (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <button onClick={goBack} className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-6 font-medium">
              <ArrowLeft className="w-4 h-4" /> Back to Modules
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{activeModule.title}</h2>
            <div className="prose max-w-none text-gray-700 mb-8">
              <p className="text-lg leading-relaxed">{activeModule.content}</p>
              {/* Extra mock content to simulate long reading material */}
              <p className="mt-4 text-lg leading-relaxed">Reviewing these concepts thoroughly will give you a strong foundation to tackle the simulated technical interviews. Ensure you understand the underlying trade-offs of the patterns discussed.</p>
            </div>
            
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button onClick={() => startQuiz('module')} className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Take Topic Quiz
              </button>
            </div>
          </div>
        )}

        {(view === 'quiz' || view === 'cumulative') && (
          <div className="bg-white p-6 md:p-10 rounded-xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col max-w-3xl mx-auto">
            <button onClick={goBack} className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-6 font-medium w-max">
              <ArrowLeft className="w-4 h-4" /> Exit Quiz
            </button>
            
            {isQuizFinished ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Quiz Complete!</h3>
                <p className="text-xl text-gray-600 mb-8">You scored <span className="font-bold text-indigo-600">{score}</span> out of {activeQuestions.length}</p>
                <div className="flex gap-4">
                  <button onClick={() => startQuiz(view === 'cumulative' ? 'cumulative' : 'module')} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                    Retake Quiz
                  </button>
                  <button onClick={goBack} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    Back to Hub
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-sm font-medium text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg">
                  <span className="uppercase tracking-wider">{view === 'cumulative' ? 'Cumulative Quiz' : activeModule?.title}</span>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Question {currentQuestionIndex + 1} of {activeQuestions.length}</span>
                </div>
                
                <h3 className="font-semibold text-2xl text-gray-900 mb-6">{currentQuestion?.question}</h3>
                
                <div className="space-y-3 flex-1">
                  {currentQuestion?.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const showResult = selectedOption !== null;
                    
                    let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ";
                    if (!showResult) {
                      btnClass += "border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 cursor-pointer";
                    } else if (isCorrect) {
                      btnClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (isSelected) {
                      btnClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                      btnClass += "border-gray-200 text-gray-400 opacity-60";
                    }

                    return (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedOption(idx)}
                        disabled={showResult}
                        className={btnClass}
                      >
                        <span className="font-medium">{opt}</span>
                        {showResult && isCorrect && <CheckCircle className="w-6 h-6 text-green-500" />}
                        {showResult && isSelected && !isCorrect && <Circle className="w-6 h-6 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
                
                {selectedOption !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex flex-col gap-6"
                  >
                    <div className="p-5 bg-blue-50 text-blue-900 rounded-xl border border-blue-100">
                      <p className="font-bold mb-2 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-blue-600"/> Explanation</p>
                      <p className="leading-relaxed">{currentQuestion.explanation}</p>
                    </div>
                    <button 
                      onClick={handleNext}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold text-lg shadow-sm"
                    >
                      {currentQuestionIndex < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
