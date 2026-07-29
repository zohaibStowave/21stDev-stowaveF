"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react"; // Icoz ke liye Lucide React use kiya hai

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookie_consent_accepted");
    if (!hasAccepted) {
      // 1 second ka delay taake website load hone ke baad pyara sa animation aaye
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent_accepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* CSS Animation Styles */}
      <style jsx global>{`
        @keyframes slideUpBounce {
          0% {
            transform: translateY(100px) scale(0.95);
            opacity: 0;
          }
          70% {
            transform: translateY(-10px) scale(1.01);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-cookie-slide {
          animation: slideUpBounce 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Banner Grid */}
      <div className="animate-cookie-slide fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80 md:bottom-6 md:right-6 md:left-auto">
        
        {/* Close Icon Button */}
        <button 
          onClick={() => setShowBanner(false)}
          className="absolute right-3 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          {/* Animated Glow Cookie Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
            <Cookie className="h-5 w-5 animate-pulse" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <div>
              <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Cookie Settings
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                We use cookies to personalize your shop experience on Stowave. By browsing, you accept our{" "}
                <Link href="/privacy-policy" className="font-medium text-zinc-900 underline dark:text-zinc-100 hover:text-orange-500 dark:hover:text-orange-400">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            {/* Premium CTA Button */}
            <button
              onClick={acceptCookies}
              className="w-full rounded-xl bg-zinc-950 px-4 py-2 text-center text-xs font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
