'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
}

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        if (redirectIfUnauthenticated) {
          router.replace('/login');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [redirectIfUnauthenticated, router]);


  const logout = useCallback(async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      setUser(null);
      router.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [router]);

  return {
    user,
    loading,
    logout,
  };
}
