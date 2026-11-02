"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 4000;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Fallback initial slide — pre-optimized via Cloudinary transformations
// This image is shown immediately on first paint before the API responds
const INITIAL_SLIDES = [
  {
    src: "https://res.cloudinary.com/dqmjtblih/image/upload/f_auto,q_auto:best,w_1920/v1787830145/slider/gccfzxvgpyedtqzvqcbe.jpg",
    caption: "Stowave ",
  },
];

const getMobileUrl = (url) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto:best,w_800/");
  }
  return url;
};

const getDesktopUrl = (url) => {
  if (!url) return "";
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    return url.replace("/upload/", "/upload/f_auto,q_auto:best,w_1920/");
  }
  return url;
};

export default function ImageSlider() {
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const timerRef = useRef(null);

  const total = slides.length;

  useEffect(() => {
    let isMounted = true;
    const fetchSlides = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/slider`);
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.items) && data.items.length > 0) {
          setSlides(
            data.items.map((item) => ({
              src: item.imgUrl,
              caption: item.caption,
            }))
          );
        }
      } catch (err) {
        console.error("Slider fetch error:", err);
      }
    };
    fetchSlides();
    return () => {
      isMounted = false;
    };
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

  if (total === 0) return null;

  return (
    <main className="w-full bg-transparent">
      <div
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
          {slides.map((slide, i) => {
            const mobileSrc = getMobileUrl(slide.src);
            const desktopSrc = getDesktopUrl(slide.src);
            const displaySrc = desktopSrc || slide.src;
            return (
              <div key={i} className="relative w-full h-full flex-shrink-0">
                <picture className="w-full h-full block">
                  {mobileSrc && mobileSrc !== slide.src && (
                    <source media="(max-width: 768px)" srcSet={mobileSrc} />
                  )}
                  {desktopSrc && desktopSrc !== slide.src && (
                    <source media="(min-width: 769px)" srcSet={desktopSrc} />
                  )}
                  <img
                    src={displaySrc}
                    alt={slide.caption || `Slide ${i + 1}`}
                    width={1920}
                    height={640}
                    className="w-full h-full object-cover"
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </picture>
                {slide.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 z-10">
                    <p className="text-white text-sm sm:text-base font-medium">
                      {slide.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none z-20 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none z-20 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
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