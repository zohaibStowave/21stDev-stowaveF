"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from "lucide-react";

const COLLECTIONS = [
  {
    id: "stowave",
    num: "01",
    tag: "Apparel & Sweatshirts",
    badge: "Featured Drop",
    title: "Stowave",
    description: "Heavyweight custom cotton fleece sweatshirts and crewnecks tailored for everyday comfort.",
    image: "/stowaveCollection.jpeg",
    link: "/collections/stowave",
    buttonText: "Shop Sweatshirts",
    chips: ["Sweatshirts", "Crewnecks", "Fleece Warmth"],
    countBadge: "Sweatshirts",
  },
  {
    id: "ezzywalk",
    num: "02",
    tag: "Footwear & Comfort",
    badge: "Bestseller",
    title: "Ezzywalk",
    description: "Ultra-cushioned comfort slides and flip-flops engineered with ergonomic arch support for active recovery.",
    image: "/ezzywalkCollection.jpeg",
    link: "/collections/ezzywalk",
    buttonText: "Shop Ezzywalk",
    chips: ["Cloud Slides", "Athletic Flip-Flops", "Ergonomic Soles"],
    countBadge: "16+ Styles",
  },
];

export default function Collections() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 320;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < COLLECTIONS.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 320;
    scrollRef.current.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-transparent">
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>Curated Archives</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Explore Our Collections
        </h2>
        <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          From heavyweight streetwear silhouettes to cloud-cushioned casual slides, explore our signature collections crafted for every story.
        </p>
      </div>

      {/* Main Wrapper */}
      <div className="relative">
        {/* Navigation Arrows (Mobile) */}
        <button
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="md:hidden absolute -left-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-zinc-950/80 text-white backdrop-blur-md shadow-xl active:scale-90 transition-transform border border-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-zinc-950/80 text-white backdrop-blur-md shadow-xl active:scale-90 transition-transform border border-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Cards Row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-1"
        >
          {COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={col.link}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform md:hover:-translate-y-2 block h-[420px] sm:h-[480px] md:h-[500px] w-[88%] sm:w-[90%] shrink-0 md:w-full snap-center cursor-pointer border border-zinc-200/80 dark:border-zinc-800/80"
            >
              {/* Background Image */}
              <img
                src={col.image}
                alt={col.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20 group-hover:via-black/45 transition-colors duration-500 z-10" />

              {/* Top Bar on Card */}
              <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono tracking-wider shadow-sm">
                  <span className="text-red-400 font-bold">{col.num}</span>
                  <span className="text-zinc-200">{col.tag}</span>
                </div>

                <div className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  <span>{col.badge}</span>
                </div>
              </div>

              {/* Bottom Content on Card */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8 z-20 flex flex-col justify-end">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-1 block">
                  {col.countBadge}
                </span>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1.5 tracking-tight group-hover:text-zinc-100 transition-colors">
                  {col.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 mb-3.5 font-normal line-clamp-2 leading-relaxed max-w-lg">
                  {col.description}
                </p>

                {/* Subcategory Chips */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                  {col.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md border border-white/15 text-white/95 text-[10px] sm:text-[11px] font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Button CTA */}
                <div>
                  <span className="inline-flex items-center gap-2 bg-white text-zinc-950 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-xl group-hover:bg-zinc-100 transition-all duration-300">
                    <span>{col.buttonText}</span>
                    <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center group-hover:bg-red-600 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
          {COLLECTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-red-600" : "w-2 bg-zinc-300 dark:bg-zinc-700"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}