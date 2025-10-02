"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleAuthSuccess() {
  const router = useRouter();

  useEffect(() => {

    router.replace("/dashboard");

  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-medium">Logging you in...</p>
    </div>
  );
}
