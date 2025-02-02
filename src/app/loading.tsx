"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [fade, setFade] = useState("opacity-0");

  useEffect(() => {
    setTimeout(() => setFade("opacity-100"), 50); // Fade in 0.5s
    setTimeout(() => setFade("opacity-0"), 1500); // Fade out 0.5s after 2s display
  }, []);

  return (
    <div data-theme="night" className={`fixed inset-0 w-screen h-screen flex items-center justify-center bg-gradient-to-r from-base-300 via-base-200 to-base-100 z-50 transition-opacity duration-500 ${fade}`}>
      <span className="loading loading-infinity loading-lg text-primary mr-2"></span>
      <span className="loading loading-ring loading-lg text-primary mr-2"></span>
      <span className="loading loading-infinity loading-lg text-primary mr-2"></span>
      <span className="loading loading-ring loading-lg text-primary mr-2"></span>
      <span className="loading loading-infinity loading-lg text-primary"></span>
    </div>
  );
}
