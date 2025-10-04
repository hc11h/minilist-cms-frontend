"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthSuccess() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
  const checkCookie = () => {
    const cookies = document.cookie;
    console.log("Current cookies:", cookies);
    console.log("authToken present:", cookies.includes("authToken"));
  };
  
  checkCookie();
  const timer = setTimeout(() => {
    checkCookie();
    router.replace("/dashboard");
  }, 500);

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