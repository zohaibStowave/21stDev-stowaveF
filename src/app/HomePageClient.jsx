"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ImageSlider from "./components/imageSlider/imageSlider";

// Marquee: dynamic to prevent its API fetch from blocking LCP
const Marquee = dynamic(
  () => import("./components/aboutUs/aboutUs2part").then((m) => m.Marquee),
  { ssr: false }
);
// Collections: below-the-fold after slider
const Collections = dynamic(() => import("./components/mainCollection/collection.js"), {
  ssr: false,
});
// Below-the-fold components dynamically loaded to maximize mobile Performance and Speed Index
const SweatshirtPage = dynamic(() => import("./sweatShirt/page"), {
  ssr: false,
});
const HeroSection = dynamic(
  () => import("./components/slider/slider").then((mod) => mod.HeroSection),
  { ssr: false }
);
const SocialCards = dynamic(() => import("./components/DailyPosts/dailyPost"), {
  ssr: false,
});
const EzzywalkPage = dynamic(() => import("./ezzywalkslipers/page"), {
  ssr: false,
});
const RadialScrollGallery = dynamic(
  () =>
    import("./components/scrollGallery/scrollGallery").then(
      (mod) => mod.RadialScrollGallery
    ),
  { ssr: false }
);

const sampleCards = [
  { imgUrl: "/IMG_4623.PNG", alt: "Post 1" },
  { imgUrl: "/IMG_4632.PNG", alt: "Post 2", linkUrl: "https://instagram.com" },
  { imgUrl: "/IMG_4824.PNG", alt: "Post 3" },
  { imgUrl: "/IMG_4909.PNG", alt: "Post 4" },
  { imgUrl: "/IMG_4916.PNG", alt: "Post 5" },
];

const heroSliderImages = [
  { src: "/IMG_4623.PNG", alt: "Slide 1" },
  { src: "/IMG_4632.PNG", alt: "Slide 2" },
  { src: "/IMG_4824.PNG", alt: "Slide 3" },
  { src: "/IMG_4909.PNG", alt: "Slide 4" },
  { src: "/IMG_4916.PNG", alt: "Slide 5" },
];

export default function HomePageClient() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_BASE_URL}/api/radialgallery`);
        const data = await response.json();

        if (data.success) {
          setGalleryItems(data.items);
        } else {
          console.error("Failed to fetch gallery items:", data.error);
        }
      } catch (error) {
        console.error("Error fetching gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div className="page-clip">
      <div>
        <ImageSlider />
        <Marquee pauseOnHover className="[--duration:20s] !p-0" />
        <Collections />
      </div>

      <Marquee pauseOnHover className="[--duration:20s] !p-0" />

      <SweatshirtPage />

      <HeroSection
        title="Crafted For Every Story"
        subtitle="Discover pieces designed to move with you, wherever the day takes you."
        images={heroSliderImages}
      />

      <SocialCards cards={sampleCards} />

      <EzzywalkPage />

      {galleryItems.length > 0 && (
        <RadialScrollGallery>
          {() =>
            galleryItems.map((card, index) => (
              <div
                key={card._id || index}
                className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src={card.imgUrl}
                  alt={card.alt || `gallery-${index}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />
              </div>
            ))
          }
        </RadialScrollGallery>
      )}

      <Marquee pauseOnHover className="[--duration:20s] !p-0" />
    </div>
  );
}
