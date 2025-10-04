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
        

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
          
          setToken(token);
        }
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('Authentication successful:', userData);
          router.replace("/dashboard");
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