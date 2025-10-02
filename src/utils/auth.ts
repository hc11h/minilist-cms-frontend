// utils/auth.ts
export const getCurrentUser = async () => {
    const token = sessionStorage.getItem('authToken'); // or cookie
    if (!token) return null;
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
  
    if (!res.ok) return null;
  
    return await res.json(); // user info
  };
  