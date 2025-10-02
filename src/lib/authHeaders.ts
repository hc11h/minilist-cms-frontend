export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  return {
    ...extraHeaders,
    "Content-Type": "application/json",
  };
}
