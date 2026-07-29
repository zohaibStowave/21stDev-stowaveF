// COMPONENT: Navbar (AcmeHero) 

"use client";

import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";

export default function AcmeHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ====== LIVE SESSION CAPTURE PIPELINE ======
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

    // Initial load checks execution
    checkUserAuthStatus();

    window.addEventListener("auth-change", checkUserAuthStatus);
    return () => window.removeEventListener("auth-change", checkUserAuthStatus);
  }, []);

  return (
    <div className="w-full max-w-full mx-auto px-4">
      <header className="relative pt-4">
        <nav className="flex items-center justify-between rounded-xl bg-background py-2 px-4 shadow-lg border border-border">
          <div className="flex items-center space-x-6">
            
            {/* Logo Link with Fixed Absolute Path Slash */}
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/black-red-transparent.png" 
                alt="Stowave Logo"
                width={120}           
                height={40}          
                className="object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Home
              </a>
              <a
                href="/regularFitt"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Regular Fitt
              </a>
              <a
                href="/overSized"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Oversized
              </a>
              <a
                href="/sweatShirt"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                SweatShirt
              </a>
              <a
                href="/aboutUs"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                About Us
              </a>
              <a
                href="/contactUs"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Contact Us
              </a>
              <div className="relative group">
                <button className="... cursor-pointer">Collection</button>
                <div className=" absolute left-0 top-full  hidden w-52 group-hover:flex flex-col  
                rounded-xl bg-background/95 backdrop-blur-md p-1.5 shadow-2xl border border-border/60 z-50 animation-in fade-in slider-in-from-top-2 duration-150">
                  <a href="/collections/ezzywalk" className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-colors" >Ezzywalk Collection</a>
                  <a href="/collections/stowave" className="flex items-center px-3 py-2.5 text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-colors" >Stowave Collection</a>
                </div>

              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Vertical Separator Line */}
            <div className="h-6 w-[1px] bg-border" />
            
            {/* =======================================================================
                ✅ DESKTOP ROUTING FILTER: User state authentication determines destination route link
               ======================================================================= */}
            <Link
              href={isLoggedIn ? "/profile" : "/signUp"}
              className={`hidden md:inline-flex h-10 px-2 items-center text-sm font-normal transition-colors ${
                isLoggedIn ? "text-blue-500 hover:text-blue-600" : "text-muted-foreground/60 hover:text-foreground/80"
              }`}
            >
              <BsPersonCircle className="h-6 w-6" />
            </Link>

          <Link
  href="/bag"
  className="hidden md:inline-flex h-8 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background shadow-md hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
>
  Bag <HiOutlineShoppingBag className="h-4 w-4" />
</Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="h-7 w-7 flex items-center justify-center md:hidden text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <Menu className="h-[15px] w-[15px]" />
            </button>

            {/* Mobile Sidebar Drawer */}
            {isOpen && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
                <div 
                  className="absolute right-0 top-0 h-full w-[240px] sm:w-[300px] bg-background p-6 shadow-xl border-l border-border flex flex-col space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setIsOpen(false)} className="self-end p-1 rounded-md hover:bg-muted text-foreground transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                  <nav className="flex flex-col space-y-4 pt-4">
                    <a href="/" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Home</a>
                    <a href="/regularFitt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Regular Fitt</a>
                    <a href="/overSized" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Oversized</a>
                    <a href="/sweatShirt" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">SweatShirt</a>
                    <a href="/aboutUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">About Us</a>
                    <a href="/contactUs" className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors">Contact Us</a>
                    
                    {/* =======================================================================
                        ✅ MOBILE MOBILE ROUTING RE-DIRECTION LAYER
                       ======================================================================= */}
                    <Link
                      href={isLoggedIn ? "/profile" : "/signUp"}
                      onClick={() => setIsOpen(false)}
                      className={`text-left h-7 text-sm font-normal transition-colors ${
                        isLoggedIn ? "text-blue-500 font-medium" : "text-muted-foreground/60 hover:text-foreground/80"
                      }`}
                    >
                      {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
                    </Link>

                    <Link 
                      href="/bag"
                      onClick={() => setIsOpen(false)}
                      className="h-9 flex items-center justify-center rounded-full bg-foreground px-3 text-sm font-normal text-background hover:bg-foreground/90 transition-colors"
                    >
                      Bag <HiOutlineShoppingBag className="inline ml-1"/> 
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
















// import { useEffect, useState } from "react";
// import { Link } from "@tanstack/react-router";
// import { Menu, X, ShoppingBag, CircleUserRound, ChevronDown } from "lucide-react";

// const LINKS = [
//   { to: "/", label: "Home" },
//   { to: "/regularFitt", label: "Regular Fitt" },
//   { to: "/overSized", label: "Oversized" },
//   { to: "/sweatShirt", label: "SweatShirt" },
//   { to: "/aboutUs", label: "About Us" },
//  { to: "/contactUs", label: "Contact Us" },
// ];
// const COLLECTIONS = [
//   { to: "/collections/ezzywalk", label: "Ezzywalk Collection" },
// { to: "/collections/stowave", label: "Stowave Collection" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkUserAuthStatus = () => {
//       const savedUser = localStorage.getItem("stowave_user");
//       const savedToken = localStorage.getItem("stowave_user_token");
//       setIsLoggedIn(Boolean(savedUser && savedToken));
//     };

//     checkUserAuthStatus();
//     window.addEventListener("auth-change", checkUserAuthStatus);
//     return () => window.removeEventListener("auth-change", checkUserAuthStatus);
//   }, []);

//   return (
//     <div className="relative z-30 w-full max-w-full">
//       <header className="pt-2">
//         <nav className="hero-pill flex items-center justify-between rounded-xl px-4 py-2 backdrop-blur-md">
//           <div className="flex items-center space-x-6">
//             <Link to="/" className="flex items-center gap-2">
//               <span className="font-display text-lg font-bold tracking-[0.35em]">
//                 STOWAVE
//               </span>
//             </Link>

//             <div className="hidden items-center space-x-6 md:flex">
//               {LINKS.map((l) => (
//                 <Link
//                   key={l.to}
//                   to={l.to}
//                   className="hero-muted text-sm transition-opacity hover:opacity-100"
//                   activeProps={{ className: "text-sm opacity-100 font-medium" }}
//                   activeOptions={{ exact: l.to === "/" }}
//                 >
//                   {l.label}
//                 </Link>
//               ))}

//               <div className="group relative">
//                 <button className="hero-muted inline-flex cursor-pointer items-center gap-1 text-sm transition-opacity hover:opacity-100">
//                   Collection <ChevronDown className="h-3.5 w-3.5" />
//                 </button>
//                 <div className="absolute left-0 top-full z-50 hidden w-52 flex-col rounded-xl border border-border/60 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md group-hover:flex">
//                   {COLLECTIONS.map((c) => (
//                     <Link
//                       key={c.to}
//                       to={c.to}
//                       className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
//                     >
//                       {c.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div className="hero-muted hidden h-6 w-[1px] bg-current opacity-40 md:block" />

//             <Link
//               to={isLoggedIn ? "/profile" : "/signUp"}
//               className="hero-muted hidden h-10 items-center px-2 text-sm font-normal transition-opacity hover:opacity-100 md:inline-flex"
//             >
//               <CircleUserRound className="h-6 w-6" strokeWidth={1.6} />
//             </Link>

//             <Link
//               to="/bag"
//               className="hero-cta hidden h-8 items-center gap-2 rounded-full px-4 text-sm font-medium shadow-md md:inline-flex"
//             >
//               Bag <ShoppingBag className="h-4 w-4" />
//             </Link>

//             <button
//               aria-label="Open menu"
//               onClick={() => setIsOpen(true)}
//               className="flex h-7 w-7 items-center justify-center rounded-md transition-colors md:hidden"
//             >
//               <Menu className="h-4 w-4" />
//             </button>

//             {isOpen && (
//               <div
//                 className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <div
//                   className="absolute right-0 top-0 flex h-full w-[240px] flex-col space-y-4 border-l border-border bg-background p-6 text-foreground shadow-xl sm:w-[300px]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <button
//                     aria-label="Close menu"
//                     onClick={() => setIsOpen(false)}
//                     className="self-end rounded-md p-1 transition-colors hover:bg-muted"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                   <nav className="flex flex-col space-y-4 pt-4">
//                     {[...LINKS, ...COLLECTIONS].map((l) => (
//                       <Link
//                         key={l.to}
//                         to={l.to}
//                         onClick={() => setIsOpen(false)}
//                         className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//                       >
//                         {l.label}
//                       </Link>
//                     ))}

//                     <Link
//                       to={isLoggedIn ? "/profile" : "/signUp"}
//                       onClick={() => setIsOpen(false)}
//                       className={`h-7 text-left text-sm transition-colors ${
//                         isLoggedIn
//                           ? "font-medium text-primary"
//                           : "text-muted-foreground hover:text-foreground"
//                       }`}
//                     >
//                       {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
//                     </Link>

//                     <Link
//                       to="/bag"
//                       onClick={() => setIsOpen(false)}
//                       className="flex h-9 items-center justify-center gap-1 rounded-full bg-foreground px-3 text-sm text-background transition-colors hover:bg-foreground/90"
//                     >
//                       Bag <ShoppingBag className="h-4 w-4" />
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











// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, ShoppingBag, CircleUserRound, ChevronDown } from "lucide-react";

// const LINKS = [
//   { to: "/", label: "Home" },
//   { to: "/regularFitt", label: "Regular Fitt" },
//   { to: "/overSized", label: "Oversized" },
//   { to: "/sweatShirt", label: "SweatShirt" },
//   { to: "/aboutUs", label: "About Us" },
//   { to: "/contactUs", label: "Contact Us" },
// ];

// const COLLECTIONS = [
//   { to: "/collections/ezzywalk", label: "Ezzywalk Collection" },
//   { to: "/collections/stowave", label: "Stowave Collection" },
// ];

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     const checkUserAuthStatus = () => {
//       const savedUser = localStorage.getItem("stowave_user");
//       const savedToken = localStorage.getItem("stowave_user_token");
//       setIsLoggedIn(Boolean(savedUser && savedToken));
//     };

//     checkUserAuthStatus();
//     window.addEventListener("auth-change", checkUserAuthStatus);
//     return () => window.removeEventListener("auth-change", checkUserAuthStatus);
//   }, []);

//   const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

//   return (
//     <div className="relative z-30 w-full max-w-full">
//       <header className="pt-2">
//         <nav className="hero-pill flex items-center justify-between rounded-xl px-4 py-2 backdrop-blur-md">
//           <div className="flex items-center space-x-6">
//             <Link href="/" className="flex items-center gap-2">
//               <span className="font-display text-lg font-bold tracking-[0.35em]">
//                 STOWAVE
//               </span>
//             </Link>

//             <div className="hidden items-center space-x-6 md:flex">
//               {LINKS.map((l) => (
//                 <Link
//                   key={l.to}
//                   href={l.to}
//                   className={`hero-muted text-sm transition-opacity hover:opacity-100 ${
//                     isActive(l.to) ? "text-sm opacity-100 font-medium" : ""
//                   }`}
//                 >
//                   {l.label}
//                 </Link>
//               ))}

//               <div className="group relative">
//                 <button className="hero-muted inline-flex cursor-pointer items-center gap-1 text-sm transition-opacity hover:opacity-100">
//                   Collection <ChevronDown className="h-3.5 w-3.5" />
//                 </button>
//                 <div className="absolute left-0 top-full z-50 hidden w-52 flex-col rounded-xl border border-border/60 bg-background/95 p-1.5 shadow-2xl backdrop-blur-md group-hover:flex">
//                   {COLLECTIONS.map((c) => (
//                     <Link
//                       key={c.to}
//                       href={c.to}
//                       className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
//                     >
//                       {c.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             <div className="hero-muted hidden h-6 w-[1px] bg-current opacity-40 md:block" />

//             <Link
//               href={isLoggedIn ? "/profile" : "/signUp"}
//               className="hero-muted hidden h-10 items-center px-2 text-sm font-normal transition-opacity hover:opacity-100 md:inline-flex"
//             >
//               <CircleUserRound className="h-6 w-6" strokeWidth={1.6} />
//             </Link>

//             <Link
//               href="/bag"
//               className="hero-cta hidden h-8 items-center gap-2 rounded-full px-4 text-sm font-medium shadow-md md:inline-flex"
//             >
//               Bag <ShoppingBag className="h-4 w-4" />
//             </Link>

//             <button
//               aria-label="Open menu"
//               onClick={() => setIsOpen(true)}
//               className="flex h-7 w-7 items-center justify-center rounded-md transition-colors md:hidden"
//             >
//               <Menu className="h-4 w-4" />
//             </button>

//             {isOpen && (
//               <div
//                 className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <div
//                   className="absolute right-0 top-0 flex h-full w-[240px] flex-col space-y-4 border-l border-border bg-background p-6 text-foreground shadow-xl sm:w-[300px]"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <button
//                     aria-label="Close menu"
//                     onClick={() => setIsOpen(false)}
//                     className="self-end rounded-md p-1 transition-colors hover:bg-muted"
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                   <nav className="flex flex-col space-y-4 pt-4">
//                     {[...LINKS, ...COLLECTIONS].map((l) => (
//                       <Link
//                         key={l.to}
//                         href={l.to}
//                         onClick={() => setIsOpen(false)}
//                         className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//                       >
//                         {l.label}
//                       </Link>
//                     ))}

//                     <Link
//                       href={isLoggedIn ? "/profile" : "/signUp"}
//                       onClick={() => setIsOpen(false)}
//                       className={`h-7 text-left text-sm transition-colors ${
//                         isLoggedIn
//                           ? "font-medium text-primary"
//                           : "text-muted-foreground hover:text-foreground"
//                       }`}
//                     >
//                       {isLoggedIn ? "My Profile Account" : "Sign in / Sign up"}
//                     </Link>

//                     <Link
//                       href="/bag"
//                       onClick={() => setIsOpen(false)}
//                       className="flex h-9 items-center justify-center gap-1 rounded-full bg-foreground px-3 text-sm text-background transition-colors hover:bg-foreground/90"
//                     >
//                       Bag <ShoppingBag className="h-4 w-4" />
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