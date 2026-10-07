"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Clock, AlertCircle } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';

const data = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 72 },
  { name: 'Wed', score: 78 },
  { name: 'Thu', score: 85 },
  { name: 'Fri', score: 82 },
  { name: 'Sat', score: 90 },
  { name: 'Sun', score: 95 },
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
          <p className="text-gray-500">Track your interview preparation progress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Activity Streak', value: '12 Days', icon: Trophy, color: 'text-yellow-500' },
            { label: 'Avg. Score', value: '82%', icon: Target, color: 'text-green-500' },
            { label: 'Interviews Done', value: '24', icon: Clock, color: 'text-blue-500' },
            { label: 'Focus Violations', value: '3', icon: AlertCircle, color: 'text-red-500' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Integrity & Score Trends</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
