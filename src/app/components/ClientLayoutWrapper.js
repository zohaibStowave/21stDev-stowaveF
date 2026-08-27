"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
// import { clarity } from "@microsoft/clarity";
import clarity from "@microsoft/clarity";

import AcmeHero from "../components/navbar/Navbar"; // Agar path ka issue ho tou correct kr lein
import { Footer7 } from "../components/Footer/Footer";
import ChatAssistant from "../components/hopingAssistant/assistant";
import VisitorTracker from "../components/VisitorTracker";
import CookieBanner from "../components/CookieBanner";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/i/t/s/a/d/m/i/n/admin");

  useEffect(() => {
    // 1. Clarity sirf tab initialize ho jab page admin panel na ho
    // 2. Production check (Optional): Agar localhost ka data bhi chahiye to if condition hata dein
    if (!isAdminPage && process.env.NODE_ENV === "production") {
      clarity.init("xwgwu4dvdz");
    }
  }, [isAdminPage]);

  return (
    <>
      {/* 0. Live Visitor Tracking — sirf storefront pages pe, admin panel pe nahi */}
      {!isAdminPage && <VisitorTracker />}

      {/* 1. Global Fixed Layer Container — Admin page pr nahi dikhay ga */}
      {!isAdminPage && (
        <div className="  w-full  pointer-events-auto">
          <AcmeHero />
        </div>
      )}
{/* {!isAdminPage && <AcmeHero />} */}

      {/* 2. Chat Assistant — Admin page pr nahi dikhay ga */}
      {!isAdminPage && <ChatAssistant />}

      {/* 3. Page Content Render Area */}
      <main className="relative min-h-screen">
        {children}

        {/* Footer — Admin page pr nahi dikhay ga */}
        {!isAdminPage && <Footer7 />}
        {!isAdminPage && <CookieBanner />}
      </main>
    </>
  );
}
