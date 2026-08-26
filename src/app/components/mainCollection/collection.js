// import Link from 'next/link';

// export default function Collections() {
//   return (
//     <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
//           Explore Our Collections
//         </h2>
//         <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
//           Discover the latest trends in premium apparel and exclusive footwear.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
//         {/* Stowave Collection Card */}
//         <Link 
//           href="/collections/stowave" 
//           className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block h-[400px] cursor-pointer"
//         >
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
          
//           {/* Background Image (Clothing placeholder) */}
//           <img
//             src="/stowaveCollection.jpeg"
//             alt="Stowave Apparel"
//             className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
//           />
          
//           {/* Content */}
//           <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
//             <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
//               Stowave
//             </h3>
//             <p className="text-gray-200 mb-6 font-medium">
//               Premium Apparel Collection
//             </p>
//             <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
//               Shop Stowave
//               <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </span>
//           </div>
//         </Link>

//         {/* Ezzywalk Collection Card */}
//         <Link 
//           href="/collections/ezzywalk" 
//           className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 block h-[400px] cursor-pointer"
//         >
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
          
//           {/* Background Image (Footwear placeholder) */}
//           <img
//             src="/ezzywalkCollection.jpeg"
//             alt="Ezzywalk Footwear"
//             className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
//           />
          
//           {/* Content */}
//           <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
//             <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
//               Ezzywalk
//             </h3>
//             <p className="text-gray-200 mb-6 font-medium">
//               Exclusive Footwear Collection
//             </p>
//             <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
//               Shop Ezzywalk
//               <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//               </svg>
//             </span>
//           </div>
//         </Link>

//       </div>
//     </section>
//   );
// }














"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Collections() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-black">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl tracking-tight">
          Explore Our Collections
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the latest trends in premium apparel and exclusive footwear.
        </p>
      </div>

      {/* ------- Wrapper: relative for arrow positioning ------- */}
      <div className="relative">
        {/* Left Arrow — mobile only */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="md:hidden absolute left-1 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white shadow-lg backdrop-blur-sm active:scale-95 transition-transform"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow — mobile only */}
        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-black/70 text-gray-900 dark:text-white shadow-lg backdrop-blur-sm active:scale-95 transition-transform"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* ------- Cards row: horizontal scroll on mobile, grid on desktop ------- */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 gap-8 lg:gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Stowave Collection Card */}
          <Link
            href="/collections/stowave"
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-2 block h-[400px] w-[85%] shrink-0 md:w-full snap-center cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />

            <img
              src="/stowaveCollection.jpeg"
              alt="Stowave Apparel"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />

            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Stowave
              </h3>
              <p className="text-gray-200 mb-6 font-medium">
                Premium Apparel Collection
              </p>
              <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
                Shop Stowave
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Ezzywalk Collection Card */}
          <Link
            href="/collections/ezzywalk"
            className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform md:hover:-translate-y-2 block h-[400px] w-[85%] shrink-0 md:w-full snap-center cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />

            <img
              src="/ezzywalkCollection.jpeg"
              alt="Ezzywalk Footwear"
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />

            <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Ezzywalk
              </h3>
              <p className="text-gray-200 mb-6 font-medium">
                Exclusive Footwear Collection
              </p>
              <span className="inline-flex items-center justify-center bg-white text-black px-6 py-3 rounded-full font-semibold text-sm group-hover:bg-gray-100 transition-colors">
                Shop Ezzywalk
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}