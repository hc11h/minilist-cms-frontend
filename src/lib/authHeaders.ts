import { getToken } from "@/utils/auth";

export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = getToken();

  const headers: HeadersInit = {
    ...extraHeaders,
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
