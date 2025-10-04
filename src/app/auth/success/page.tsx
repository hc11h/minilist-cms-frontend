"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth";

export default function GoogleAuthSuccess() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsRedirecting(true); 
        
        // Get token from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        console.log('Auth success page - token from URL:', token ? token.substring(0, 10) + '...' : 'none');
        
        if (token) {
          setToken(token);
          
          // Wait a bit for cookie to be set
          await new Promise(resolve => setTimeout(resolve, 200));
        } else {
          // If no token in URL, check if we already have one stored
          const existingToken = sessionStorage.getItem('authToken');
          if (existingToken) {
            console.log('Using existing token from storage');
          } else {
            console.log('No token found in URL or storage');
          }
        }
        
        // Check authentication with the backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Auth check response:', response.status, response.statusText);

        if (response.ok) {
          const userData = await response.json();
          console.log('Authentication successful:', userData);
          
          // Use window.location instead of router to ensure full page reload
          // This ensures the middleware runs with the updated cookie
          window.location.href = "/dashboard";
        } else {
          console.error('Authentication failed:', response.status, response.statusText);
          setIsRedirecting(false);
          router.replace("/login");
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsRedirecting(false);
        router.replace("/login");
      }
    };

    const timer = setTimeout(checkAuthentication, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-medium mb-4">
          {isRedirecting ? "Redirecting to dashboard..." : "Logging you in..."}
        </p>
        {!isRedirecting && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        )}
      </div>
    </div>
  );
}