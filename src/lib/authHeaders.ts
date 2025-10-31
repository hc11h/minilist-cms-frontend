const getToken = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookieToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  return sessionStorage.getItem('authToken') || cookieToken || null;
};


export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (extraHeaders instanceof Headers) {
    extraHeaders.forEach((value, key) => {
      headers[key] = value;
    });
  } else if (Array.isArray(extraHeaders)) {
    extraHeaders.forEach(([key, value]) => {
      headers[key] = value;
    });
  } else {
    Object.assign(headers, extraHeaders);
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}