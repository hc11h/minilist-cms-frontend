"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/utils/auth";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  lastLogin?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {

    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setError("Failed to authenticate. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-20 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => router.push("/login")}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with user info */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name || user?.email}!
          </h1>
          <p className="mt-1 text-gray-600">Here’s your CMS dashboard</p>
        </div>
        {user?.image && (
          <div className="flex-shrink-0">
            <img 
              className="h-12 w-12 rounded-full border-2 border-gray-200" 
              src={user.image} 
              alt={user.name || "User avatar"} 
            />
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Content"
          value="24"
          icon={
            <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          bgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="API Keys"
          value="3"
          icon={
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          bgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Users"
          value="8"
          icon={
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          bgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Views"
          value="1.2k"
          icon={
            <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
          bgColor="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { action: "New content created", item: "Home Page", time: "2h ago" },
            { action: "API key regenerated", item: "Web App", time: "1d ago" },
            { action: "User added", item: "John Doe", time: "3d ago" },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.item}</p>
                <p className="mt-1 text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


const StatCard = ({ title, value, icon, bgColor, iconColor }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}) => (
  <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 ${bgColor} rounded-md p-3`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  </div>
);