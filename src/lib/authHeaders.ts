export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = sessionStorage.getItem("authToken");

  return {
    ...extraHeaders,
    Authorization: token ? `Bearer ${token}` : "",
  };
}
