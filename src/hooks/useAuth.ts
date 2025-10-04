
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

export function useAuth(redirectIfUnauthenticated = true) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => {
        if (redirectIfUnauthenticated) {
          router.replace('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  return { user, loading };
}
