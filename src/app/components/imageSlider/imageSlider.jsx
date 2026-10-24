// // // // "use client";

// // // // import { useState, useEffect, useRef, useCallback } from "react";
// // // // import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// // // // const AUTOPLAY_MS = 4000;
// // // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // // // export default function ImageSlider() {
// // // //   const [slides, setSlides] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [current, setCurrent] = useState(0);
// // // //   const [isPaused, setIsPaused] = useState(false);
// // // //   const touchStartX = useRef(null);
// // // //   const timerRef = useRef(null);

// // // //   const total = slides.length;

// // // //   // Backend se slider images fetch karna
// // // //   useEffect(() => {
// // // //     const fetchSlides = async () => {
// // // //       try {
// // // //         const res = await fetch(`${API_BASE_URL}/api/slider`);
// // // //         const data = await res.json();
// // // //         if (data.success) {
// // // //           setSlides(
// // // //             data.items.map((item) => ({
// // // //               src: item.imgUrl, // Cloudinary ka poora URL, prefix ki zaroorat nahi
// // // //               caption: item.caption,
// // // //             }))
// // // //           );
// // // //         }
// // // //       } catch (err) {
// // // //         console.error("Slider fetch error:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchSlides();
// // // //   }, []);

// // // //   const goTo = useCallback(
// // // //     (index) => {
// // // //       if (total === 0) return;
// // // //       setCurrent(((index % total) + total) % total);
// // // //     },
// // // //     [total]
// // // //   );

// // // //   const next = useCallback(() => goTo(current + 1), [current, goTo]);
// // // //   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

// // // //   // Autoplay
// // // //   useEffect(() => {
// // // //     if (isPaused || total <= 1) return;
// // // //     timerRef.current = setInterval(next, AUTOPLAY_MS);
// // // //     return () => clearInterval(timerRef.current);
// // // //   }, [next, isPaused, total]);

// // // //   // Keyboard navigation
// // // //   useEffect(() => {
// // // //     const handleKey = (e) => {
// // // //       if (e.key === "ArrowRight") next();
// // // //       if (e.key === "ArrowLeft") prev();
// // // //     };
// // // //     window.addEventListener("keydown", handleKey);
// // // //     return () => window.removeEventListener("keydown", handleKey);
// // // //   }, [next, prev]);

// // // //   // Touch / swipe support
// // // //   const handleTouchStart = (e) => {
// // // //     touchStartX.current = e.touches[0].clientX;
// // // //   };
// // // //   const handleTouchEnd = (e) => {
// // // //     if (touchStartX.current === null) return;
// // // //     const diff = e.changedTouches[0].clientX - touchStartX.current;
// // // //     if (diff > 50) prev();
// // // //     else if (diff < -50) next();
// // // //     touchStartX.current = null;
// // // //   };

// // // //   // Loading state
// // // //   if (loading) {
// // // //     return (
// // // //       <main className="w-full bg-neutral-950">
// // // //         <div className="relative w-full aspect-[16/9] flex items-center justify-center">
// // // //           <Loader2 className="animate-spin text-white/50" size={32} />
// // // //         </div>
// // // //       </main>
// // // //     );
// // // //   }

// // // //   // YAHAN CHANGE KIYA HAI: Agar slider ki array empty hai toh component gayab (null return) ho jayega
// // // //   if (total === 0) {
// // // //     return null;
// // // //   }

// // // //   return (
// // // //     <main className="w-full bg-neutral-950">
// // // //       <div
// // // //         className="relative w-full aspect-[21/9] overflow-hidden group select-none"
// // // //         onMouseEnter={() => setIsPaused(true)}
// // // //         onMouseLeave={() => setIsPaused(false)}
// // // //         onTouchStart={handleTouchStart}
// // // //         onTouchEnd={handleTouchEnd}
// // // //       >
// // // //         {/* Slides */}
// // // //         <div
// // // //           className="flex h-full transition-transform duration-700 ease-in-out"
// // // //           style={{ transform: `translateX(-${current * 100}%)` }}
// // // //         >
// // // //           {slides.map((slide, i) => (
// // // //             <div key={i} className="relative w-full h-full flex-shrink-0">
// // // //               <img
// // // //                 src={slide.src}
// // // //                 alt={slide.caption || `Slide ${i + 1}`}
// // // //                 className="w-full h-full  object-cover object-top"
// // // //                 draggable={false}
// // // //               />
// // // //               {slide.caption && (
// // // //                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
// // // //                   <p className="text-white text-sm sm:text-base font-medium">
// // // //                     {slide.caption}
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Prev / Next buttons */}
// // // //         {total > 1 && (
// // // //           <>
// // // //             <button
// // // //               onClick={prev}
// // // //               aria-label="Pichli image"
// // // //               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// // // //             >
// // // //               <ChevronLeft size={22} />
// // // //             </button>
// // // //             <button
// // // //               onClick={next}
// // // //               aria-label="Agli image"
// // // //               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// // // //             >
// // // //               <ChevronRight size={22} />
// // // //             </button>

// // // //             {/* Dots */}
// // // //             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
// // // //               {slides.map((_, i) => (
// // // //                 <button
// // // //                   key={i}
// // // //                   onClick={() => goTo(i)}
// // // //                   aria-label={`Slide ${i + 1} par jayein`}
// // // //                   className={`h-2 rounded-full transition-all duration-300 ${
// // // //                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
// // // //                   }`}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }














// // // "use client";

// // // import { useState, useEffect, useRef, useCallback } from "react";
// // // import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// // // const AUTOPLAY_MS = 4000;
// // // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // // export default function ImageSlider() {
// // //   const [slides, setSlides] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [current, setCurrent] = useState(0);
// // //   const [isPaused, setIsPaused] = useState(false);
// // //   const [ratio, setRatio] = useState(21 / 9); // pehli image load hone tak default
// // //   const touchStartX = useRef(null);
// // //   const timerRef = useRef(null);
// // //   const ratioSetRef = useRef(false);

// // //   // Pehli image ka asal (natural) aspect ratio measure kar ke container ko usi
// // //   // ke hisaab se set karna — isse na crop hoga na khaali letterbox bachega
// // //   const handleFirstImageLoad = (e) => {
// // //     if (ratioSetRef.current) return;
// // //     const { naturalWidth, naturalHeight } = e.target;
// // //     if (naturalWidth && naturalHeight) {
// // //       setRatio(naturalWidth / naturalHeight);
// // //       ratioSetRef.current = true;
// // //     }
// // //   };

// // //   const total = slides.length;

// // //   // Backend se slider images fetch karna
// // //   useEffect(() => {
// // //     const fetchSlides = async () => {
// // //       try {
// // //         const res = await fetch(`${API_BASE_URL}/api/slider`);
// // //         const data = await res.json();
// // //         if (data.success) {
// // //           setSlides(
// // //             data.items.map((item) => ({
// // //               src: item.imgUrl, // Cloudinary ka poora URL, prefix ki zaroorat nahi
// // //               caption: item.caption,
// // //             }))
// // //           );
// // //         }
// // //       } catch (err) {
// // //         console.error("Slider fetch error:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchSlides();
// // //   }, []);

// // //   const goTo = useCallback(
// // //     (index) => {
// // //       if (total === 0) return;
// // //       setCurrent(((index % total) + total) % total);
// // //     },
// // //     [total]
// // //   );

// // //   const next = useCallback(() => goTo(current + 1), [current, goTo]);
// // //   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

// // //   // Autoplay
// // //   useEffect(() => {
// // //     if (isPaused || total <= 1) return;
// // //     timerRef.current = setInterval(next, AUTOPLAY_MS);
// // //     return () => clearInterval(timerRef.current);
// // //   }, [next, isPaused, total]);

// // //   // Keyboard navigation
// // //   useEffect(() => {
// // //     const handleKey = (e) => {
// // //       if (e.key === "ArrowRight") next();
// // //       if (e.key === "ArrowLeft") prev();
// // //     };
// // //     window.addEventListener("keydown", handleKey);
// // //     return () => window.removeEventListener("keydown", handleKey);
// // //   }, [next, prev]);

// // //   // Touch / swipe support
// // //   const handleTouchStart = (e) => {
// // //     touchStartX.current = e.touches[0].clientX;
// // //   };
// // //   const handleTouchEnd = (e) => {
// // //     if (touchStartX.current === null) return;
// // //     const diff = e.changedTouches[0].clientX - touchStartX.current;
// // //     if (diff > 50) prev();
// // //     else if (diff < -50) next();
// // //     touchStartX.current = null;
// // //   };

// // //   // Loading state
// // //   if (loading) {
// // //     return (
// // //       <main className="w-full bg-neutral-950">
// // //         <div className="relative w-full aspect-[21/9] flex items-center justify-center">
// // //           <Loader2 className="animate-spin text-white/50" size={32} />
// // //         </div>
// // //       </main>
// // //     );
// // //   }

// // //   // Agar slider ki array empty hai toh component gayab (null return) ho jayega
// // //   if (total === 0) {
// // //     return null;
// // //   }

// // //   return (
// // //     <main className="w-full bg-neutral-950">
// // //       <div
// // //         className="relative w-full overflow-hidden group select-none"
// // //         style={{ aspectRatio: ratio }}
// // //         onMouseEnter={() => setIsPaused(true)}
// // //         onMouseLeave={() => setIsPaused(false)}
// // //         onTouchStart={handleTouchStart}
// // //         onTouchEnd={handleTouchEnd}
// // //       >
// // //         {/* Slides */}
// // //         <div
// // //           className="flex h-full transition-transform duration-700 ease-in-out"
// // //           style={{ transform: `translateX(-${current * 100}%)` }}
// // //         >
// // //           {slides.map((slide, i) => (
// // //             <div key={i} className="relative w-full h-full flex-shrink-0">
// // //               <img
// // //                 src={slide.src}
// // //                 alt={slide.caption || `Slide ${i + 1}`}
// // //                 className="w-full h-full object-contain"
// // //                 draggable={false}
// // //                 onLoad={i === 0 ? handleFirstImageLoad : undefined}
// // //               />
// // //               {slide.caption && (
// // //                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
// // //                   <p className="text-white text-sm sm:text-base font-medium">
// // //                     {slide.caption}
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Prev / Next buttons */}
// // //         {total > 1 && (
// // //           <>
// // //             <button
// // //               onClick={prev}
// // //               aria-label="Pichli image"
// // //               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// // //             >
// // //               <ChevronLeft size={22} />
// // //             </button>
// // //             <button
// // //               onClick={next}
// // //               aria-label="Agli image"
// // //               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// // //             >
// // //               <ChevronRight size={22} />
// // //             </button>

// // //             {/* Dots */}
// // //             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
// // //               {slides.map((_, i) => (
// // //                 <button
// // //                   key={i}
// // //                   onClick={() => goTo(i)}
// // //                   aria-label={`Slide ${i + 1} par jayein`}
// // //                   className={`h-2 rounded-full transition-all duration-300 ${
// // //                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
// // //                   }`}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>
// // //     </main>
// // //   );
// // // }




















// // // components/ImageSlider.jsx
// // "use client";

// // import { useState, useEffect, useRef, useCallback } from "react";
// // import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// // const AUTOPLAY_MS = 4000;
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // export default function ImageSlider() {
// //   const [slides, setSlides] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [current, setCurrent] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const [ratio, setRatio] = useState(21 / 9);
// //   const [navHeight, setNavHeight] = useState(0); // navbar ki asal height
// //   const touchStartX = useRef(null);
// //   const timerRef = useRef(null);
// //   const ratioSetRef = useRef(false);

// //   // Navbar fixed hai to uski height jitni jagah upar chhodni hai,
// //   // warna image ka top hissa navbar ke neeche chhup jata hai
// //   useEffect(() => {
// //     const measureNav = () => {
// //       const nav =
// //         document.querySelector("header") || document.querySelector("nav");
// //       if (!nav) return setNavHeight(0);
// //       const pos = window.getComputedStyle(nav).position;
// //       // sirf fixed/sticky navbar overlap karta hai
// //       if (pos === "fixed" || pos === "sticky") {
// //         setNavHeight(nav.getBoundingClientRect().height);
// //       } else {
// //         setNavHeight(0);
// //       }
// //     };

// //     measureNav();
// //     window.addEventListener("resize", measureNav);
// //     const t = setTimeout(measureNav, 300); // fonts/logo load hone ke baad dobara
// //     return () => {
// //       window.removeEventListener("resize", measureNav);
// //       clearTimeout(t);
// //     };
// //   }, []);

// //   const handleFirstImageLoad = (e) => {
// //     if (ratioSetRef.current) return;
// //     const { naturalWidth, naturalHeight } = e.target;
// //     if (naturalWidth && naturalHeight) {
// //       setRatio(naturalWidth / naturalHeight);
// //       ratioSetRef.current = true;
// //     }
// //   };

// //   const total = slides.length;

// //   useEffect(() => {
// //     const fetchSlides = async () => {
// //       try {
// //         const res = await fetch(`${API_BASE_URL}/api/slider`);
// //         const data = await res.json();
// //         if (data.success) {
// //           setSlides(
// //             data.items.map((item) => ({
// //               src: item.imgUrl,
// //               caption: item.caption,
// //             }))
// //           );
// //         }
// //       } catch (err) {
// //         console.error("Slider fetch error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchSlides();
// //   }, []);

// //   const goTo = useCallback(
// //     (index) => {
// //       if (total === 0) return;
// //       setCurrent(((index % total) + total) % total);
// //     },
// //     [total]
// //   );

// //   const next = useCallback(() => goTo(current + 1), [current, goTo]);
// //   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

// //   useEffect(() => {
// //     if (isPaused || total <= 1) return;
// //     timerRef.current = setInterval(next, AUTOPLAY_MS);
// //     return () => clearInterval(timerRef.current);
// //   }, [next, isPaused, total]);

// //   useEffect(() => {
// //     const handleKey = (e) => {
// //       if (e.key === "ArrowRight") next();
// //       if (e.key === "ArrowLeft") prev();
// //     };
// //     window.addEventListener("keydown", handleKey);
// //     return () => window.removeEventListener("keydown", handleKey);
// //   }, [next, prev]);

// //   const handleTouchStart = (e) => {
// //     touchStartX.current = e.touches[0].clientX;
// //   };
// //   const handleTouchEnd = (e) => {
// //     if (touchStartX.current === null) return;
// //     const diff = e.changedTouches[0].clientX - touchStartX.current;
// //     if (diff > 50) prev();
// //     else if (diff < -50) next();
// //     touchStartX.current = null;
// //   };

// //   if (loading) {
// //     return (
// //       <main className="w-full " style={{ paddingTop: navHeight }}>
// //         <div className="relative w-full aspect-[21/9] flex items-center justify-center">
// //           <Loader2 className="animate-spin text-white/50" size={32} />
// //         </div>
// //       </main>
// //     );
// //   }

// //   if (total === 0) return null;

// //   return (
// //     <main className="w-full bg-neutral-950" style={{ paddingTop: navHeight }}>
// //       <div
// //         className="relative w-full overflow-hidden group select-none"
// //         style={{ aspectRatio: ratio }}
// //         onMouseEnter={() => setIsPaused(true)}
// //         onMouseLeave={() => setIsPaused(false)}
// //         onTouchStart={handleTouchStart}
// //         onTouchEnd={handleTouchEnd}
// //       >
// //         <div
// //           className="flex h-full transition-transform duration-700 ease-in-out"
// //           style={{ transform: `translateX(-${current * 100}%)` }}
// //         >
// //           {slides.map((slide, i) => (
// //             <div key={i} className="relative w-full h-full flex-shrink-0">
// //               <img
// //                 src={slide.src}
// //                 alt={slide.caption || `Slide ${i + 1}`}
// //                 className="w-full h-full object-contain object-top"
// //                 draggable={false}
// //                 onLoad={i === 0 ? handleFirstImageLoad : undefined}
// //               />
// //               {slide.caption && (
// //                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
// //                   <p className="text-white text-sm sm:text-base font-medium">
// //                     {slide.caption}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {total > 1 && (
// //           <>
// //             <button
// //               onClick={prev}
// //               aria-label="Pichli image"
// //               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// //             >
// //               <ChevronLeft size={22} />
// //             </button>
// //             <button
// //               onClick={next}
// //               aria-label="Agli image"
// //               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// //             >
// //               <ChevronRight size={22} />
// //             </button>

// //             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
// //               {slides.map((_, i) => (
// //                 <button
// //                   key={i}
// //                   onClick={() => goTo(i)}
// //                   aria-label={`Slide ${i + 1} par jayein`}
// //                   className={`h-2 rounded-full transition-all duration-300 ${
// //                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
// //                   }`}
// //                 />
// //               ))}
// //             </div>
// //           </>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }






















// // components/ImageSlider.jsx
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// const AUTOPLAY_MS = 4000;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function ImageSlider() {
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [ratio, setRatio] = useState(21 / 9);
//   const [navHeight, setNavHeight] = useState(0); // navbar ki asal height
//   const touchStartX = useRef(null);
//   const timerRef = useRef(null);
//   const ratioSetRef = useRef(false);

//   // Navbar fixed/sticky hai to uski height jitni jagah upar chhodni hai,
//   // warna image ka top hissa navbar ke neeche chhup jata hai.
//   // ResizeObserver use kar rahe hain taake logo/font load hone ke baad bhi
//   // height turant aur sahi update ho — isse koi khaali gap nahi bachega.
//   useEffect(() => {
//     const nav = document.querySelector("header") || document.querySelector("nav");
//     if (!nav) {
//       setNavHeight(0);
//       return;
//     }

//     const pos = window.getComputedStyle(nav).position;
//     if (pos !== "fixed" && pos !== "sticky") {
//       setNavHeight(0);
//       return;
//     }

//     const updateHeight = () => {
//       // Math.ceil taake sub-pixel rounding ki wajah se gap na bache
//       setNavHeight(Math.ceil(nav.getBoundingClientRect().height));
//     };

//     updateHeight();

//     const resizeObserver = new ResizeObserver(updateHeight);
//     resizeObserver.observe(nav);

//     window.addEventListener("resize", updateHeight);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener("resize", updateHeight);
//     };
//   }, []);

//   const handleFirstImageLoad = (e) => {
//     if (ratioSetRef.current) return;
//     const { naturalWidth, naturalHeight } = e.target;
//     if (naturalWidth && naturalHeight) {
//       setRatio(naturalWidth / naturalHeight);
//       ratioSetRef.current = true;
//     }
//   };

//   const total = slides.length;

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/slider`);
//         const data = await res.json();
//         if (data.success) {
//           setSlides(
//             data.items.map((item) => ({
//               src: item.imgUrl,
//               caption: item.caption,
//             }))
//           );
//         }
//       } catch (err) {
//         console.error("Slider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlides();
//   }, []);

//   const goTo = useCallback(
//     (index) => {
//       if (total === 0) return;
//       setCurrent(((index % total) + total) % total);
//     },
//     [total]
//   );

//   const next = useCallback(() => goTo(current + 1), [current, goTo]);
//   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

//   useEffect(() => {
//     if (isPaused || total <= 1) return;
//     timerRef.current = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [next, isPaused, total]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [next, prev]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
//     const diff = e.changedTouches[0].clientX - touchStartX.current;
//     if (diff > 50) prev();
//     else if (diff < -50) next();
//     touchStartX.current = null;
//   };

//   if (loading) {
//     return (
//       <main className="w-full bg-neutral-950" style={{ paddingTop: navHeight }}>
//         <div className="relative w-full aspect-[21/9] flex items-center justify-center">
//           <Loader2 className="animate-spin text-white/50" size={32} />
//         </div>
//       </main>
//     );
//   }

//   if (total === 0) return null;

//   return (
//     <main className="w-full bg-neutral-950" style={{ paddingTop: navHeight }}>
//       <div
//         className="relative w-full overflow-hidden group select-none"
//         style={{ aspectRatio: ratio }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex h-full transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {slides.map((slide, i) => (
//             <div key={i} className="relative w-full h-full flex-shrink-0">
//               <img
//                 src={slide.src}
//                 alt={slide.caption || `Slide ${i + 1}`}
//                 className="w-full h-full object-contain object-top"
//                 draggable={false}
//                 onLoad={i === 0 ? handleFirstImageLoad : undefined}
//               />
//               {slide.caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
//                   <p className="text-white text-sm sm:text-base font-medium">
//                     {slide.caption}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {total > 1 && (
//           <>
//             <button
//               onClick={prev}
//               aria-label="Pichli image"
//               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronLeft size={22} />
//             </button>
//             <button
//               onClick={next}
//               aria-label="Agli image"
//               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronRight size={22} />
//             </button>

//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   aria-label={`Slide ${i + 1} par jayein`}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }


























// // components/ImageSlider.jsx
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// const AUTOPLAY_MS = 4000;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function ImageSlider() {
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [ratio, setRatio] = useState(21 / 9);

//   const touchStartX = useRef(null);
//   const timerRef = useRef(null);
//   const ratioSetRef = useRef(false);

//   const handleFirstImageLoad = (e) => {
//     if (ratioSetRef.current) return;
//     const { naturalWidth, naturalHeight } = e.target;
//     if (naturalWidth && naturalHeight) {
//       setRatio(naturalWidth / naturalHeight);
//       ratioSetRef.current = true;
//     }
//   };

//   const total = slides.length;

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/slider`);
//         const data = await res.json();
//         if (data.success) {
//           setSlides(
//             data.items.map((item) => ({
//               src: item.imgUrl,
//               caption: item.caption,
//             }))
//           );
//         }
//       } catch (err) {
//         console.error("Slider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlides();
//   }, []);

//   const goTo = useCallback(
//     (index) => {
//       if (total === 0) return;
//       setCurrent(((index % total) + total) % total);
//     },
//     [total]
//   );

//   const next = useCallback(() => goTo(current + 1), [current, goTo]);
//   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

//   useEffect(() => {
//     if (isPaused || total <= 1) return;
//     timerRef.current = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [next, isPaused, total]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [next, prev]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
//     const diff = e.changedTouches[0].clientX - touchStartX.current;
//     if (diff > 50) prev();
//     else if (diff < -50) next();
//     touchStartX.current = null;
//   };

//   if (loading) {
//     return (
//       <main className="w-full bg-neutral-950 -mt-2">
//         <div className="relative w-full aspect-[21/9] flex items-center justify-center">
//           <Loader2 className="animate-spin text-white/50" size={32} />
//         </div>
//       </main>
//     );
//   }

//   if (total === 0) return null;

//   return (
//     <main className="w-full bg-neutral-950">
//       <div
//         className="relative w-full overflow-hidden group select-none"
//         style={{ aspectRatio: ratio }}
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex h-full transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {slides.map((slide, i) => (
//             <div key={i} className="relative w-full h-full flex-shrink-0">
//               <img
//                 src={slide.src}
//                 alt={slide.caption || `Slide ${i + 1}`}
//                 className="w-full h-full object-contain object-top"
//                 draggable={false}
//                 onLoad={i === 0 ? handleFirstImageLoad : undefined}
//               />
//               {slide.caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
//                   <p className="text-white text-sm sm:text-base font-medium">
//                     {slide.caption}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {total > 1 && (
//           <>
//             <button
//               onClick={prev}
//               aria-label="Pichli image"
//               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronLeft size={22} />
//             </button>
//             <button
//               onClick={next}
//               aria-label="Agli image"
//               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronRight size={22} />
//             </button>

//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   aria-label={`Slide ${i + 1} par jayein`}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }














// // components/ImageSlider.jsx
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// const AUTOPLAY_MS = 4000;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function ImageSlider() {
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const touchStartX = useRef(null);
//   const timerRef = useRef(null);

//   const total = slides.length;

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/slider`);
//         const data = await res.json();
//         if (data.success) {
//           setSlides(
//             data.items.map((item) => ({
//               src: item.imgUrl,
//               caption: item.caption,
//             }))
//           );
//         }
//       } catch (err) {
//         console.error("Slider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlides();
//   }, []);

//   const goTo = useCallback(
//     (index) => {
//       if (total === 0) return;
//       setCurrent(((index % total) + total) % total);
//     },
//     [total]
//   );

//   const next = useCallback(() => goTo(current + 1), [current, goTo]);
//   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

//   useEffect(() => {
//     if (isPaused || total <= 1) return;
//     timerRef.current = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [next, isPaused, total]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [next, prev]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
//     const diff = e.changedTouches[0].clientX - touchStartX.current;
//     if (diff > 50) prev();
//     else if (diff < -50) next();
//     touchStartX.current = null;
//   };

//   if (loading) {
//     return (
//       <main className="w-full bg-neutral-950">
//         {/* Height ko yahan badha diya hai */}
//         <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] flex items-center justify-center">
//           <Loader2 className="animate-spin text-white/50" size={32} />
//         </div>
//       </main>
//     );
//   }

//   if (total === 0) return null;

//   return (
//     <main className="w-full bg-neutral-950">
//       <div
//         // Height ko yahan badha diya hai
//         className="relative w-full overflow-hidden group select-none h-[50vh] md:h-[60vh] lg:h-[80vh]"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex h-full transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {slides.map((slide, i) => (
//             <div key={i} className="relative w-full h-full flex-shrink-0">
//               <img
//                 src={slide.src}
//                 alt={slide.caption || `Slide ${i + 1}`}
//                 className="w-full h-full object-cover object-center"
//                 draggable={false}
//               />
//               {slide.caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
//                   <p className="text-white text-sm sm:text-base font-medium">
//                     {slide.caption}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {total > 1 && (
//           <>
//             <button
//               onClick={prev}
//               aria-label="Pichli image"
//               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronLeft size={22} />
//             </button>
//             <button
//               onClick={next}
//               aria-label="Agli image"
//               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronRight size={22} />
//             </button>

//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   aria-label={`Slide ${i + 1} par jayein`}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }





























// // components/ImageSlider.jsx
// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

// const AUTOPLAY_MS = 4000;
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function ImageSlider() {
//   const [slides, setSlides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [current, setCurrent] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const touchStartX = useRef(null);
//   const timerRef = useRef(null);

//   const total = slides.length;

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/slider`);
//         const data = await res.json();
//         if (data.success) {
//           setSlides(
//             data.items.map((item) => ({
//               src: item.imgUrl,
//               caption: item.caption,
//             }))
//           );
//         }
//       } catch (err) {
//         console.error("Slider fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSlides();
//   }, []);

//   const goTo = useCallback(
//     (index) => {
//       if (total === 0) return;
//       setCurrent(((index % total) + total) % total);
//     },
//     [total]
//   );

//   const next = useCallback(() => goTo(current + 1), [current, goTo]);
//   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

//   useEffect(() => {
//     if (isPaused || total <= 1) return;
//     timerRef.current = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [next, isPaused, total]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [next, prev]);

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
//     const diff = e.changedTouches[0].clientX - touchStartX.current;
//     if (diff > 50) prev();
//     else if (diff < -50) next();
//     touchStartX.current = null;
//   };

//   if (loading) {
//     return (
//       <main className="w-full bg-neutral-950">
//         {/* Height chhoti karne ke liye aspect-[2.5/1] */}
//         <div className="relative w-full aspect-[2.5/1] flex items-center justify-center">
//           <Loader2 className="animate-spin text-white/50" size={32} />
//         </div>
//       </main>
//     );
//   }

//   if (total === 0) return null;

//   return (
//     <main className="w-full bg-neutral-950">
//       <div
//         // Yahan bhi aspect-[2.5/1] laga diya gaya hai
//         className="relative w-full overflow-hidden group select-none aspect-[2.5/1]"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="flex h-full transition-transform duration-700 ease-in-out"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {slides.map((slide, i) => (
//             <div key={i} className="relative w-full h-full flex-shrink-0">
//               <img
//                 src={slide.src}
//                 alt={slide.caption || `Slide ${i + 1}`}
//                 className="w-full h-full object-cover"
//                 draggable={false}
//               />
//               {slide.caption && (
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
//                   <p className="text-white text-sm sm:text-base font-medium">
//                     {slide.caption}
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {total > 1 && (
//           <>
//             <button
//               onClick={prev}
//               aria-label="Pichli image"
//               className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronLeft size={22} />
//             </button>
//             <button
//               onClick={next}
//               aria-label="Agli image"
//               className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
//             >
//               <ChevronRight size={22} />
//             </button>

//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
//               {slides.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goTo(i)}
//                   aria-label={`Slide ${i + 1} par jayein`}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
//                   }`}
//                 />
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   );
// }



































// components/ImageSlider.jsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const AUTOPLAY_MS = 4000;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ImageSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const total = slides.length;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/slider`);
        const data = await res.json();
        if (data.success) {
          setSlides(
            data.items.map((item) => ({
              src: item.imgUrl,
              caption: item.caption,
            }))
          );
        }
      } catch (err) {
        console.error("Slider fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const goTo = useCallback(
    (index) => {
      if (total === 0) return;
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next, isPaused, total]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) prev();
    else if (diff < -50) next();
    touchStartX.current = null;
  };

  if (loading) {
    return (
      <main className="w-full bg-neutral-950">
        {/* Height mazeed chhoti karne ke liye aspect-[3/1] */}
        <div className="relative w-full aspect-[3/1] flex items-center justify-center">
          <Loader2 className="animate-spin text-white/50" size={32} />
        </div>
      </main>
    );
  }

  if (total === 0) return null;

  return (
    <main className="w-full bg-neutral-950">
      <div
        // Yahan aspect-[3/1] laga diya gaya hai
        className="relative w-full overflow-hidden group select-none aspect-[3/1]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="relative w-full h-full flex-shrink-0">
              <img
                src={slide.src}
                alt={slide.caption || `Slide ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {slide.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                  <p className="text-white text-sm sm:text-base font-medium">
                    {slide.caption}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Pichli image"
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Agli image"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1} par jayein`}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}