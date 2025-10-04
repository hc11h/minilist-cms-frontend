'use client'
import { useEffect, useState } from 'react';

export default function AuthSuccessPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error('Failed to fetch user:', err);
        setError('You are not logged in or your session has expired.');
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return <div>Welcome, {user.email}!</div>;
}
