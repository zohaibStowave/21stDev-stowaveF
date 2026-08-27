"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/sweatShirt", label: "SweatShirt" },
  { href: "/aboutUs", label: "About Us" },
  { href: "/contactUs", label: "Contact Us" },
];

const COLLECTIONS = [
  { href: "/collections/ezzywalk", label: "Ezzywalk Collection" },
  { href: "/collections/stowave", label: "Stowave Collection" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkUserAuthStatus = () => {
      const savedUser = localStorage.getItem("stowave_user");
      const savedToken = localStorage.getItem("stowave_user_token");
      setIsLoggedIn(!!(savedUser && savedToken));
    };

    checkUserAuthStatus();
    window.addEventListener("auth-change", checkUserAuthStatus);
    return () => window.removeEventListener("auth-change", checkUserAuthStatus);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="w-full sticky top-0 z-50  text-[#0b0b0c] dark:text-[#f2f0ea] ">
      <header
        className={`transition-all duration-300 border-b bg-white dark:bg-black  `}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* ------- Logo (switches with theme) ------- */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-[116px] h-[50px]">
              <Image
                src="/black-red-transparent.png"
                alt="Stowave Logo"
                fill
                className="object-contain block dark:hidden"
                priority
              />
              <Image
                src="/white_transparent_logo.png"
                alt="Stowave Logo"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
          </Link>

          {/* ------- Desktop links ------- */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] uppercase tracking-[0.14em] font-medium text-black/60 dark:text-[#f2f0ea]/60 hover:text-black dark:hover:text-[#f2f0ea] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-[#e3402b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            <div className="relative group">
              <button className="flex items-center gap-1 text-[13px] uppercase tracking-[0.14em] font-medium text-black/60 dark:text-[#f2f0ea]/60 hover:text-black dark:hover:text-[#f2f0ea] transition-colors duration-200 cursor-pointer">
                Collection
                <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-300" />
              </button>
              <div className="absolute left-0 top-full pt-3 hidden group-hover:flex flex-col w-56 z-50 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                <div className="rounded-lg bg-white dark:bg-[#151517] border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden">
                  {COLLECTIONS.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="flex items-center justify-between px-4 py-3 text-[13px] text-black/70 dark:text-[#f2f0ea]/70 hover:text-black dark:hover:text-[#f2f0ea] hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-black/5 dark:border-white/5 last:border-b-0"
                    >
                      {c.label}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ------- Right side actions ------- */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block h-6 w-[1px] bg-black/10 dark:bg-white/10" />

            <Link
              href={isLoggedIn ? "/profile" : "/signUp"}
              className={`hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                isLoggedIn
                  ? "text-[#e3402b] hover:bg-[#e3402b]/10"
                  : "text-black/60 dark:text-[#f2f0ea]/60 hover:text-black dark:hover:text-[#f2f0ea] hover:bg-black/5 dark:hover:bg-white/5"
              }`}
              title={isLoggedIn ? "My Account" : "Sign in / Sign up"}
            >
              <BsPersonCircle className="h-5 w-5" />
            </Link>

            <Link
              href="/bag"
              className="hidden lg:inline-flex h-9 items-center gap-2 rounded-full bg-black dark:bg-[#f2f0ea] px-4 text-[13px] font-semibold text-white dark:text-[#0b0b0c] hover:bg-[#e3402b] hover:text-white dark:hover:bg-[#e3402b] dark:hover:text-[#f2f0ea] transition-colors duration-200"
            >
              Bag
              <HiOutlineShoppingBag className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="h-9 w-9 flex items-center justify-center lg:hidden rounded-md text-black dark:text-[#f2f0ea] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-white dark:bg-[#0b0b0c] border-l border-black/10 dark:border-white/10 flex flex-col shadow-2xl animate-[slideIn_0.28s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
              <span className="text-[12px] uppercase tracking-[0.2em] text-black/50 dark:text-[#f2f0ea]/50">
                Menu
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-[#f2f0ea] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-[15px] font-medium text-black/80 dark:text-[#f2f0ea]/80 hover:text-[#e3402b] transition-colors border-b border-black/5 dark:border-white/5"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {link.label}
                </a>
              ))}

              <span className="mt-4 mb-1 text-[11px] uppercase tracking-[0.2em] text-black/40 dark:text-[#f2f0ea]/40">
                Collections
              </span>
              {COLLECTIONS.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 text-[14px] text-black/70 dark:text-[#f2f0ea]/70 hover:text-[#e3402b] transition-colors"
                >
                  {c.label}
                </a>
              ))}
            </nav>

            <div className="px-5 py-5 border-t border-black/10 dark:border-white/10 flex flex-col gap-3">
              <Link
                href={isLoggedIn ? "/profile" : "/signUp"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 text-[14px] font-medium transition-colors ${
                  isLoggedIn
                    ? "text-[#e3402b]"
                    : "text-black/70 dark:text-[#f2f0ea]/70 hover:text-black dark:hover:text-[#f2f0ea]"
                }`}
              >
                <BsPersonCircle className="h-5 w-5" />
                {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
              </Link>

              <Link
                href="/bag"
                onClick={() => setIsOpen(false)}
                className="h-11 flex items-center justify-center gap-2 rounded-full bg-black dark:bg-[#f2f0ea] text-white dark:text-[#0b0b0c] text-[14px] font-semibold hover:bg-[#e3402b] hover:text-white dark:hover:bg-[#e3402b] dark:hover:text-[#f2f0ea] transition-colors"
              >
                Bag <HiOutlineShoppingBag className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default Navbar;