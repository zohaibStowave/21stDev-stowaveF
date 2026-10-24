"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import clarity from "@microsoft/clarity";

import AcmeHero from "../components/navbar/Navbar"; // Agar path ka issue ho tou correct kr lein
import { Footer7 } from "../components/Footer/Footer";
import ChatAssistant from "../components/hopingAssistant/assistant";
import VisitorTracker from "../components/VisitorTracker";
import CookieBanner from "../components/CookieBanner";
import { Marquee } from "./aboutUs/aboutUs2part";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/i/t/s/a/d/m/i/n/admin");

  useEffect(() => {
    // 1. Clarity sirf tab initialize ho jab page admin panel na ho
    if (!isAdminPage && process.env.NODE_ENV === "production") {
      clarity.init("xwgwu4dvdz");
    }
  }, [isAdminPage]);

  return (
    <>
      {/* 0. Live Visitor Tracking */}
      {!isAdminPage && <VisitorTracker />}

      {/* Marquee (Ye upar chala jayega scroll hone pe) */}
      {!isAdminPage && (
        <Marquee pauseOnHover className="[--duration:20s] !p-0" />
      )}

      {/* 🟢 YAHAN FIX KIYA HAI: 'sticky' ke sath 'top-0' aur 'z-[60]' lagaya hai */}
      {!isAdminPage && (
        <div className="w-full pointer-events-auto sticky top-0 z-[60]">
          <AcmeHero />
        </div>
      )}

      {/* 2. Chat Assistant */}
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