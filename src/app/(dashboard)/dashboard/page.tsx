"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface DashboardMetrics {
  loginMetrics: {
    loginCount: number;
    lastLogin: string;
  };
  editorMetrics: {
    totalEditorBlogs: number;
    publishedEditorBlogs: number;
    draftEditorBlogs: number;
  };
  authorMetrics: {
    totalAuthoredBlogs: number;
    publishedAuthoredBlogs: number;
    draftAuthoredBlogs: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth(true);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/metrics`, {
          credentials: 'include',
        });

        if (res.status === 401) {
          router.push('/auth/signin');
          return;
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData?.message || 'Failed to fetch metrics');
        }

        const data = await res.json();
        setMetrics(data);
      } catch  {
        setError('An unexpected error occurred');
      } finally {
        setMetricsLoading(false);
      }
    };

    if (user) {
      fetchMetrics();
    }
  }, [user, router]);

  if (loading || metricsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // The hook will redirect if unauthenticated
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
          <h2 className="text-lg font-medium text-destructive">Error</h2>
          <p className="mt-2 text-destructive/80">{error}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with user info */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {user?.name || user?.email}!
          </h1>
          <p className="mt-1 text-muted-foreground">Here's your CMS dashboard</p>
        </div>
        {user?.image && (
          <div className="flex-shrink-0">
            <img
              className="h-12 w-12 rounded-full border-2 border-border"
              src={user.image}
              alt={user.name || "User avatar"}
            />
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard
          title="Total Blogs"
          value={metrics?.editorMetrics.totalEditorBlogs || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          bgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <MetricCard
          title="Published Blogs"
          value={metrics?.editorMetrics.publishedEditorBlogs || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          bgColor="bg-green-100 dark:bg-green-900/30"
          iconColor="text-green-600 dark:text-green-400"
        />
        <MetricCard
          title="Draft Blogs"
          value={metrics?.editorMetrics.draftEditorBlogs || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          }
          bgColor="bg-amber-100 dark:bg-amber-900/30"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <MetricCard
          title="Authored Blogs"
          value={metrics?.authorMetrics.totalAuthoredBlogs || 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          bgColor="bg-purple-100 dark:bg-purple-900/30"
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Login Metrics */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-lg font-medium text-foreground">Login Activity</h2>
          </div>
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Logins</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {metrics?.loginMetrics.loginCount || 0}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="mt-1 text-sm text-foreground">
                  {metrics?.loginMetrics.lastLogin ? formatDate(metrics.loginMetrics.lastLogin) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-border">
            <h2 className="text-lg font-medium text-foreground">Content Overview</h2>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Published Content</p>
                <p className="text-lg font-semibold text-foreground">
                  {(metrics?.editorMetrics.publishedEditorBlogs || 0) + (metrics?.authorMetrics.publishedAuthoredBlogs || 0)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Draft Content</p>
                <p className="text-lg font-semibold text-foreground">
                  {(metrics?.editorMetrics.draftEditorBlogs || 0) + (metrics?.authorMetrics.draftAuthoredBlogs || 0)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Total Content</p>
                <p className="text-lg font-semibold text-foreground">
                  {(metrics?.editorMetrics.totalEditorBlogs || 0) + (metrics?.authorMetrics.totalAuthoredBlogs || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-lg font-medium text-foreground">Recent Activity</h2>
        </div>
        <div className="divide-y divide-border">
          {[
            { action: "New content created", item: "Home Page", time: "2h ago" },
            { action: "API key regenerated", item: "Web App", time: "1d ago" },
            { action: "User added", item: "John Doe", time: "3d ago" },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4 flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.item}</p>
                <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MetricCard = ({ title, value, icon, bgColor, iconColor }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}) => (
  <div className={`bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${bgColor}`}>
    <div className="px-4 py-5 sm:p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0 rounded-md p-3">
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{title}</h3>
          <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  </div>
);