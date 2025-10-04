export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  

  let token = sessionStorage.getItem('authToken');
  

  if (!token) {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('authToken='));
    if (authCookie) {
      token = authCookie.split('=')[1];
    }
  }
  
  return token;
};


export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  
  // Store in sessionStorage
  sessionStorage.setItem('authToken', token);
  
  // Set cookie with proper production settings
  // Remove 'secure' flag for HTTP in development, add it for HTTPS in production
  const isProduction = window.location.protocol === 'https:';
  const cookieOptions = isProduction 
    ? `authToken=${token}; path=/; max-age=86400; secure; samesite=strict`
    : `authToken=${token}; path=/; max-age=86400; samesite=lax`;
  
  document.cookie = cookieOptions;
  
  console.log('Token set:', { token: token.substring(0, 10) + '...', isProduction });
};


export const clearToken = (): void => {
  if (typeof window === 'undefined') return;
  

  sessionStorage.removeItem('authToken');
  

  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const getCurrentUser = async () => {
    const token = getToken();
    
    if (!token) return null;
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  
    if (!res.ok) {

      clearToken();
      return null;
    }
  
    return await res.json();
  };

export const logout = async (): Promise<void> => {
  try {
    
    const token = getToken();
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
  
    clearToken();
    

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
};
  