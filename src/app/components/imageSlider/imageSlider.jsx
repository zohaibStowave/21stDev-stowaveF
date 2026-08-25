// // "use client";

// // import { useState, useEffect, useRef, useCallback } from "react";
// // import { ChevronLeft, ChevronRight } from "lucide-react";

// // // Apni images yahan daal dein (URL ya local /public path bhi chal jayega)
// // const slides = [
// //   {
// //     src: "/ali-zohaib.png",
// //     caption: "Pahaadon ka nazara",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80",
// //     caption: "Samandar ka kinara",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
// //     caption: "Sabz jangal",
// //   },
// //   {
// //     src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80",
// //     caption: "Barfeeli chotiyan",
// //   },
// // ];

// // const AUTOPLAY_MS = 4000;

// // export default function ImageSlider() {
// //   const [current, setCurrent] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const touchStartX = useRef(null);
// //   const timerRef = useRef(null);

// //   const total = slides.length;

// //   const goTo = useCallback(
// //     (index) => {
// //       setCurrent(((index % total) + total) % total);
// //     },
// //     [total]
// //   );

// //   const next = useCallback(() => goTo(current + 1), [current, goTo]);
// //   const prev = useCallback(() => goTo(current - 1), [current, goTo]);

// //   // Autoplay
// //   useEffect(() => {
// //     if (isPaused) return;
// //     timerRef.current = setInterval(next, AUTOPLAY_MS);
// //     return () => clearInterval(timerRef.current);
// //   }, [next, isPaused]);

// //   // Keyboard navigation
// //   useEffect(() => {
// //     const handleKey = (e) => {
// //       if (e.key === "ArrowRight") next();
// //       if (e.key === "ArrowLeft") prev();
// //     };
// //     window.addEventListener("keydown", handleKey);
// //     return () => window.removeEventListener("keydown", handleKey);
// //   }, [next, prev]);

// //   // Touch / swipe support
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

// //   // return (
// //   //   <main className="min-h-screen flex items-center justify-center bg-neutral-950 p-4 sm:p-8">
// //   //     <div
// //   //       className="relative w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl group select-none"
// //   //       onMouseEnter={() => setIsPaused(true)}
// //   //       onMouseLeave={() => setIsPaused(false)}
// //   //       onTouchStart={handleTouchStart}
// //   //       onTouchEnd={handleTouchEnd}
// //   //     >
// // return (
// //   <main className="w-full bg-neutral-950">
// //     <div
// //       className="relative w-full aspect-[16/9] overflow-hidden group select-none"
// //       onMouseEnter={() => setIsPaused(true)}
// //       onMouseLeave={() => setIsPaused(false)}
// //       onTouchStart={handleTouchStart}
// //       onTouchEnd={handleTouchEnd}
// //     >
// //       {/* rest stays the same */}

// //         {/* Slides */}
// //         <div
// //           className="flex h-full transition-transform duration-700 ease-in-out"
// //           style={{ transform: `translateX(-${current * 100}%)` }}
// //         >
// //           {slides.map((slide, i) => (
// //             <div key={i} className="relative w-full h-full flex-shrink-0">
// //               <img
// //                 src={slide.src}
// //                 alt={slide.caption}
// //                 className="w-full h-full object-cover"
// //                 draggable={false}
// //               />
// //               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
// //                 <p className="text-white text-sm sm:text-base font-medium">
// //                   {slide.caption}
// //                 </p>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Prev / Next buttons */}
// //         <button
// //           onClick={prev}
// //           aria-label="Pichli image"
// //           className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// //         >
// //           <ChevronLeft size={22} />
// //         </button>
// //         <button
// //           onClick={next}
// //           aria-label="Agli image"
// //           className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none"
// //         >
// //           <ChevronRight size={22} />
// //         </button>

// //         {/* Dots */}
// //         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
// //           {slides.map((_, i) => (
// //             <button
// //               key={i}
// //               onClick={() => goTo(i)}
// //               aria-label={`Slide ${i + 1} par jayein`}
// //               className={`h-2 rounded-full transition-all duration-300 ${
// //                 i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
// //               }`}
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }
























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

//   // Backend se slider images fetch karna
//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/api/slider`);
//         const data = await res.json();
//         if (data.success) {
//           setSlides(
//             data.items.map((item) => ({
//               src: item.imgUrl, // Cloudinary ka poora URL, prefix ki zaroorat nahi
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

//   // Autoplay
//   useEffect(() => {
//     if (isPaused || total <= 1) return;
//     timerRef.current = setInterval(next, AUTOPLAY_MS);
//     return () => clearInterval(timerRef.current);
//   }, [next, isPaused, total]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [next, prev]);

//   // Touch / swipe support
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

//   // Loading state
//   if (loading) {
//     return (
//       <main className="w-full bg-neutral-950">
//         <div className="relative w-full aspect-[16/9] flex items-center justify-center">
//           <Loader2 className="animate-spin text-white/50" size={32} />
//         </div>
//       </main>
//     );
//   }

//   // Koi image na ho backend mein
//   if (total === 0) {
//     return (
//       <main className="w-full bg-neutral-950">
//         <div className="relative w-full aspect-[16/9] flex items-center justify-center">
//           <p className="text-white/40 text-sm">Koi slider image nahi mili</p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="w-full bg-neutral-950">
//       <div
//         className="relative w-full aspect-[16/9] overflow-hidden group select-none"
//         onMouseEnter={() => setIsPaused(true)}
//         onMouseLeave={() => setIsPaused(false)}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         {/* Slides */}
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

//         {/* Prev / Next buttons */}
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

//             {/* Dots */}
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

  // Backend se slider images fetch karna
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/slider`);
        const data = await res.json();
        if (data.success) {
          setSlides(
            data.items.map((item) => ({
              src: item.imgUrl, // Cloudinary ka poora URL, prefix ki zaroorat nahi
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

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [next, isPaused, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Touch / swipe support
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

  // Loading state
  if (loading) {
    return (
      <main className="w-full bg-neutral-950">
        <div className="relative w-full aspect-[16/9] flex items-center justify-center">
          <Loader2 className="animate-spin text-white/50" size={32} />
        </div>
      </main>
    );
  }

  // YAHAN CHANGE KIYA HAI: Agar slider ki array empty hai toh component gayab (null return) ho jayega
  if (total === 0) {
    return null;
  }

  return (
    <main className="w-full bg-neutral-950">
      <div
        className="relative w-full aspect-[16/9] overflow-hidden group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides */}
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

        {/* Prev / Next buttons */}
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

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1} par jayein`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
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