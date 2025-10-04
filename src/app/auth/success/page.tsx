"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthSuccess() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsRedirecting(true); 
        
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
  credentials: 'include',
});

        
        if (response.ok) {
       
          router.replace("/dashboard");
        } else {
          setIsRedirecting(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsRedirecting(false);
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