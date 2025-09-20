"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Store token in sessionStorage (or localStorage if you prefer)
      sessionStorage.setItem("authToken", token);

      // Optional: decode JWT to get user info if needed
      // const payload = JSON.parse(atob(token.split('.')[1]));

      // Redirect to dashboard
      router.replace("/dashboard");
    } else {
      // If no token, redirect back to login
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Logging you in...</p>
    </div>
  );
}
