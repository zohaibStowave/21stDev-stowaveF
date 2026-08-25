// // COMPONENT: Navbar (AcmeHero) 

// "use client";

// import React, { useState, useEffect } from "react";
// import { Menu, Moon, Sun, X } from "lucide-react";
// import { HiOutlineShoppingBag } from "react-icons/hi2";
// import Link from "next/link";
// import Image from "next/image";
// import { BsPersonCircle } from "react-icons/bs";

// export default function AcmeHero() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // ====== LIVE SESSION CAPTURE PIPELINE ======
//   useEffect(() => {
//     const checkUserAuthStatus = () => {
//       const savedUser = localStorage.getItem("stowave_user");
//       const savedToken = localStorage.getItem("stowave_user_token");
      
//       if (savedUser && savedToken) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//       }
//     };

//     // Initial load checks execution
//     checkUserAuthStatus();

//     window.addEventListener("auth-change", checkUserAuthStatus);
//     return () => window.removeEventListener("auth-change", checkUserAuthStatus);
//   }, []);

//   return (
//     <div className="w-full max-w-full mx-auto ">
//       <header className="relative pt-4">
//         <nav className="flex items-center justify-between  bg-background py-2 px-4 shadow-lg ">
//           <div className="flex items-center space-x-6">
            
//             {/* Logo Link with Fixed Absolute Path Slash */}
//             <Link href="/" className="flex items-center gap-2">
//               <Image 
//                 src="/black-red-transparent.png" 
//                 alt="Stowave Logo"
//                 width={120}           
//                 height={40}          
//                 className="object-contain"
//                 priority
//               />
//             </Link>

//             <div className="hidden md:flex items-center space-x-6">
//               <a
//                 href="/"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 Home
//               </a>
//               <a
//                 href="/regularFitt"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 Regular Fitt
//               </a>
//               <a
//                 href="/overSized"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 Oversized
//               </a>
//               <a
//                 href="/sweatShirt"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 SweatShirt
//               </a>
//               <a
//                 href="/aboutUs"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 About Us
//               </a>
//               <a
//                 href="/contactUs"
//                 className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
//               >
//                 Contact Us
//               </a>
//               <div className="relative group">
//                 <button className="... cursor-pointer">Collection</button>
//                 <div className=" absolute left-0 top-full  hidden w-52 group-hover:flex flex-col  
//                 rounded-xl bg-background/95 backdrop-blur-md p-1.5 shadow-2xl border border-border/60 z-50 animation-in fade-in slider-in-from-top-2 duration-150">
//                   <a href="/collections/ezzywalk" className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-colors" >Ezzywalk Collection</a>
//                   <a href="/collections/stowave" className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-colors" >Stowave Collection</a>
//                 </div>

//               </div>
//             </div>
//           </div>
//           <div className="flex items-center space-x-3">
//             {/* Vertical Separator Line */}
//             <div className="h-6 w-[1px] bg-border" />
            
//             {/* =======================================================================
//                 ✅ DESKTOP ROUTING FILTER: User state authentication determines destination route link
//                ======================================================================= */}
//             <Link
//               href={isLoggedIn ? "/profile" : "/signUp"}
//               className={`hidden md:inline-flex h-10 px-2 items-center text-sm font-normal transition-colors ${
//                 isLoggedIn ? "text-blue-500 hover:text-blue-600" : "text-muted-foreground/60 hover:text-foreground/80"
//               }`}
//             >
//               <BsPersonCircle className="h-6 w-6" />
//             </Link>

//           <Link
//   href="/bag"
//   className="hidden md:inline-flex h-8 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-md hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
// >
//   Bag <HiOutlineShoppingBag className="h-4 w-4" />
// </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="h-7 w-7 flex items-center justify-center md:hidden text-foreground hover:bg-muted rounded-md transition-colors"
//             >
//               <Menu className="h-[15px] w-[15px]" />
//             </button>

//             {/* Mobile Sidebar Drawer */}
//             {isOpen && (
//               <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
//                 <div 
//                   className="absolute right-0 top-0 h-full w-[240px] sm:w-[300px] bg-background p-6 shadow-xl border-l border-border flex flex-col space-y-4"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <button onClick={() => setIsOpen(false)} className="self-end p-1 rounded-md hover:bg-muted text-foreground transition-colors">
//                     <X className="h-5 w-5" />
//                   </button>
//                   <nav className="flex flex-col space-y-4 pt-4">
//                     <a href="/" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Home</a>
//                     <a href="/regularFitt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Regular Fitt</a>
//                     <a href="/overSized" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Oversized</a>
//                     <a href="/sweatShirt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">SweatShirt</a>
//                     <a href="/aboutUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">About Us</a>
//                     <a href="/contactUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Contact Us</a>
                    
//                     {/* =======================================================================
//                         ✅ MOBILE MOBILE ROUTING RE-DIRECTION LAYER
//                        ======================================================================= */}
//                     <Link
//                       href={isLoggedIn ? "/profile" : "/signUp"}
//                       onClick={() => setIsOpen(false)}
//                       className={`text-left h-7 text-sm font-normal transition-colors ${
//                         isLoggedIn ? "text-blue-500 font-medium" : "text-muted-foreground/60 hover:text-foreground/80"
//                       }`}
//                     >
//                       {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
//                     </Link>

//                     <Link 
//                       href="/bag"
//                       onClick={() => setIsOpen(false)}
//                       className="h-9 flex items-center justify-center rounded-full bg-foreground px-3 text-sm font-normal text-background hover:bg-foreground/90 transition-colors"
//                     >
//                       Bag <HiOutlineShoppingBag className="inline ml-1"/> 
//                     </Link>
//                   </nav>
//                 </div>
//               </div>
//             )}
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }




























"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsPersonCircle } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  // { href: "/regularFitt", label: "Regular Fitt" },
  // { href: "/overSized", label: "Oversized" },
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

  // ====== LIVE SESSION CAPTURE PIPELINE (unchanged logic) ======
  useEffect(() => {
    const checkUserAuthStatus = () => {
      const savedUser = localStorage.getItem("stowave_user");
      const savedToken = localStorage.getItem("stowave_user_token");

      if (savedUser && savedToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserAuthStatus();

    window.addEventListener("auth-change", checkUserAuthStatus);
    return () => window.removeEventListener("auth-change", checkUserAuthStatus);
  }, []);

  // subtle scroll-aware bar, purely cosmetic
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="w-full h-[3px] sticky  top-0 z-50 bg-[blue] text-[#f2f0ea]">
      <header
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "border-white/10 bg-[black]"
            : "border-transparent bg-[black]"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          {/* ------- Logo ------- */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image
              src="/white_transparent_logo.png"
              alt="Stowave Logo"
              width={116}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          {/* ------- Desktop links ------- */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[13px] uppercase tracking-[0.14em] font-medium text-[#f2f0ea]/60 hover:text-[#f2f0ea] transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-[#e3402b] after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}

            {/* Collection dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[13px] uppercase tracking-[0.14em] font-medium text-[#f2f0ea]/60 hover:text-[#f2f0ea] transition-colors duration-200 cursor-pointer">
                Collection
                <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 opacity-0 group-hover:opacity-100 group-hover:rotate-0 transition-all duration-300" />
              </button>
              <div
                className="absolute left-0 top-full pt-3 hidden group-hover:flex flex-col w-56 z-50 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200"
              >
                <div className="rounded-lg bg-[#151517] border border-white/10 shadow-2xl overflow-hidden">
                  {COLLECTIONS.map((c) => (
                    <a
                      key={c.href}
                      href={c.href}
                      className="flex items-center justify-between px-4 py-3 text-[13px] text-[#f2f0ea]/70 hover:text-[#f2f0ea] hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
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
            <div className="hidden lg:block h-6 w-[1px] bg-white/10" />

            {/* Auth-aware profile route */}
            <Link
              href={isLoggedIn ? "/profile" : "/signUp"}
              className={`hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                isLoggedIn
                  ? "text-[#e3402b] hover:bg-[#e3402b]/10"
                  : "text-[#f2f0ea]/60 hover:text-[#f2f0ea] hover:bg-white/5"
              }`}
              title={isLoggedIn ? "My Account" : "Sign in / Sign up"}
            >
              <BsPersonCircle className="h-5 w-5" />
            </Link>

            {/* Bag */}
            <Link
              href="/bag"
              className="hidden lg:inline-flex h-9 items-center gap-2 rounded-full bg-[#f2f0ea] px-4 text-[13px] font-semibold text-[#0b0b0c] hover:bg-[#e3402b] hover:text-[#f2f0ea] transition-colors duration-200"
            >
              Bag
              <HiOutlineShoppingBag className="h-4 w-4" />
            </Link>

            {/* Mobile trigger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="h-9 w-9 flex items-center justify-center lg:hidden rounded-md text-[#f2f0ea] hover:bg-white/5 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ------- Mobile drawer ------- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[82%] max-w-[320px] bg-[#0b0b0c] border-l border-white/10 flex flex-col shadow-2xl animate-[slideIn_0.28s_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#f2f0ea]/50">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-md hover:bg-white/5 text-[#f2f0ea] transition-colors"
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
                  className="py-3 text-[15px] font-medium text-[#f2f0ea]/80 hover:text-[#e3402b] transition-colors border-b border-white/5"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {link.label}
                </a>
              ))}

              <span className="mt-4 mb-1 text-[11px] uppercase tracking-[0.2em] text-[#f2f0ea]/40">
                Collections
              </span>
              {COLLECTIONS.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 text-[14px] text-[#f2f0ea]/70 hover:text-[#e3402b] transition-colors"
                >
                  {c.label}
                </a>
              ))}
            </nav>

            <div className="px-5 py-5 border-t border-white/10 flex flex-col gap-3">
              <Link
                href={isLoggedIn ? "/profile" : "/signUp"}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 text-[14px] font-medium transition-colors ${
                  isLoggedIn ? "text-[#e3402b]" : "text-[#f2f0ea]/70 hover:text-[#f2f0ea]"
                }`}
              >
                <BsPersonCircle className="h-5 w-5" />
                {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
              </Link>

              <Link
                href="/bag"
                onClick={() => setIsOpen(false)}
                className="h-11 flex items-center justify-center gap-2 rounded-full bg-[#f2f0ea] text-[#0b0b0c] text-[14px] font-semibold hover:bg-[#e3402b] hover:text-[#f2f0ea] transition-colors"
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

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0b0b0c]">
      <Navbar />
      {/* Baaqi page ka content yahan neeche aayega */}
    </main>
  );
}