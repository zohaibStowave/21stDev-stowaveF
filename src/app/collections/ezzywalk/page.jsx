"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, Waves } from "lucide-react";
import EzzywalkPage from "../../ezzywalkslipers/page";
import { Marquee } from "../../components/aboutUs/aboutUs2part";

const PERKS = [
  { icon: Waves, label: "Cloud-Comfort EVA", desc: "Ultra-responsive high-density cushioning" },
  { icon: ShieldCheck, label: "Ergonomic Arch Support", desc: "Designed for all-day relaxation and recovery" },
  { icon: Truck, label: "Express Nationwide Shipping", desc: "Reliable delivery across all Pakistan cities" },
];

export default function EzzywalkCollectionPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50">
      {/* Hero Collection Header */}
      <div className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden flex items-end">
        <img
          src="/ezzywalkCollection.jpeg"
          alt="Ezzywalk Collection Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14 w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-400">Collections</span>
            <span>/</span>
            <span className="text-red-400 font-semibold">Ezzywalk Footwear</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Official Collection // 2025</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Ezzywalk Footwear
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-300 max-w-2xl leading-relaxed">
            Ultra-cushioned comfort slides engineered with ergonomic arch support, high-density EVA, and bold streetwear graphics for all-day relaxation.
          </p>
        </div>
      </div>

      {/* Perks Banner */}
      <div className="border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {PERKS.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 text-red-500">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">{perk.label}</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Catalog */}
      <EzzywalkPage />

      <Marquee pauseOnHover className="[--duration:20s] !p-0 text-white" />
    </div>
  );
}
