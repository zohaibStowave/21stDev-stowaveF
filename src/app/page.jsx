"use client";

import React, { useState, useEffect } from 'react'
import SocialCards from './components/DailyPosts/dailyPost';
import { RadialScrollGallery } from './components/scrollGallery/scrollGallery';
import { HeroSection } from './components/slider/slider';
import { Marquee } from './components/aboutUs/aboutUs2part';
import SweatshirtPage from './sweatShirt/page';
import EzzywalkPage from './ezzywalkslipers/page';
import ImageSlider from './components/imageSlider/imageSlider';
import Collections from './components/mainCollection/collection.js'
// import DemoOne, { Component } from './components/shopNOW/shopNOW'; // Agar unused hai tou comment rehne dein

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

function Page() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
      {/* Yahan se khali div hata diya gaya hai */}

      <div className="">
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
              <div key={card._id || index} className="relative w-64 h-96 rounded-xl overflow-hidden shadow-md">
                <img
                  src={card.imgUrl}
                  alt={card.alt || `gallery-${index}`}
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
  )
}

export default Page;