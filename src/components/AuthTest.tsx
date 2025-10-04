"use client";

import { useAuth } from '@/hooks/useAuth';


export function AuthTest() {
   const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <div>Welcome to your dashboard, {user?.email}!</div>;
}