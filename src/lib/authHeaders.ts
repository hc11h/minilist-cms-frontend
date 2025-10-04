import { getToken } from "@/utils/auth";

export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Handle different types of extraHeaders
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