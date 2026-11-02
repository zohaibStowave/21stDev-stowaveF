"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import clarity from "@microsoft/clarity";
import dynamic from "next/dynamic";

import AcmeHero from "../components/navbar/Navbar";
import { Footer7 } from "../components/Footer/Footer";
import CookieBanner from "../components/CookieBanner";

// Heavy components: lazy-loaded after first paint so they never block LCP
const ChatAssistant = dynamic(() => import("../components/hopingAssistant/assistant"), {
  ssr: false,
});
const VisitorTracker = dynamic(() => import("../components/VisitorTracker"), {
  ssr: false,
});

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/i/t/s/a/d/m/i/n/admin");

  useEffect(() => {
    // 1. Clarity initialize after page paint to avoid blocking LCP on mobile
    if (!isAdminPage && process.env.NODE_ENV === "production") {
      const timer = setTimeout(() => {
        clarity.init("xwgwu4dvdz");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdminPage]);

  return (
    <>
      {/* 0. Live Visitor Tracking — deferred, never blocks paint */}
      {!isAdminPage && <VisitorTracker />}

      {/* Navbar — sticky top */}
      {!isAdminPage && (
        <div className="w-full pointer-events-auto sticky top-0 z-[60]">
          <AcmeHero />
        </div>
      )}

      {/* 2. Chat Assistant — lazy loaded, doesn't block LCP */}
      {!isAdminPage && <ChatAssistant />}

      {/* 3. Page Content Render Area */}
      <main className="relative min-h-screen">
        {children}

        {/* Footer */}
        {!isAdminPage && <Footer7 />}
        {!isAdminPage && <CookieBanner />}
      </main>
    </>
  );
}