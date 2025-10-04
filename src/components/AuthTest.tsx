"use client";

import { useAuth } from '@/hooks/useAuth';
import { getToken, setToken, clearToken } from '@/utils/auth';

export function AuthTest() {
  const { user, isLoading, isAuthenticated, error, logout } = useAuth();

  const handleSetTestToken = () => {
    const testToken = 'test-token-123';
    setToken(testToken);
    console.log('Test token set:', testToken);
  };

  const handleClearToken = () => {
    clearToken();
    console.log('Token cleared');
  };

  const handleGetToken = () => {
    const token = getToken();
    console.log('Current token:', token);
  };

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Auth Test</h3>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Auth Test</h3>
      
      <div className="space-y-2">
        <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
        {user && (
          <div>
            <p><strong>User:</strong></p>
            <pre className="text-xs bg-gray-100 p-2 rounded">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}
        {error && (
          <p className="text-red-600"><strong>Error:</strong> {error}</p>
        )}
      </div>

      <div className="space-x-2">
        <button
          onClick={handleSetTestToken}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Set Test Token
        </button>
        <button
          onClick={handleClearToken}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Clear Token
        </button>
        <button
          onClick={handleGetToken}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Get Token
        </button>
        {isAuthenticated && (
          <button
            onClick={logout}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
