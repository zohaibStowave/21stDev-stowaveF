"use client";

import React, { useState, useEffect, useCallback } from "react";
import MorphOrb from "./MorphOrb";
import Avatar from "./AiAvatar";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://21st-dev-stowaveb.vercel.app";

export const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [liveProducts, setLiveProducts] = useState([]);
  const [bagCount, setBagCount] = useState(0);

  // 1. Fetch live active store products (Sweatshirts & Ezzywalk)
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const [sweatshirtRes, ezzywalkRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/sweatshirtproducts`).catch(() => ({ json: () => ({ success: false }) })),
          fetch(`${API_BASE_URL}/api/ezzywalkproducts`).catch(() => ({ json: () => ({ success: false }) })),
        ]);

        const sweatshirtData = await sweatshirtRes.json();
        const ezzywalkData = await ezzywalkRes.json();

        const combined = [
          ...(sweatshirtData.success ? sweatshirtData.products.map((p) => ({ ...p, category: "Sweatshirt" })) : []),
          ...(ezzywalkData.success ? ezzywalkData.products.map((p) => ({ ...p, category: "Ezzywalk Slipper" })) : []),
        ];

        setLiveProducts(combined);
      } catch (err) {
        console.error("Error fetching live products for assistant:", err);
      }
    };

    fetchLiveProducts();
  }, []);

  // 2. Track bag count from localStorage
  useEffect(() => {
    try {
      const savedBag = localStorage.getItem("bag") || localStorage.getItem("cart") || "[]";
      const parsed = JSON.parse(savedBag);
      setBagCount(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setBagCount(0);
    }
  }, [isChatOpen]);

  // 3. AI query handler
  const handleAssistantSubmit = useCallback(async (text) => {
    try {
      // First try internal high-speed Next.js route with Groq
      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          catalog: liveProducts,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          return {
            reply: data.reply,
            matchedProduct: data.matchedProduct || null,
          };
        }
      }

      // Secondary fallback to external API
      const fallbackRes = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          catalog: liveProducts,
        }),
      });

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json();
        if (fallbackData.reply) {
          let matched = liveProducts.find((p) =>
            p.name && fallbackData.reply.toLowerCase().includes(p.name.toLowerCase())
          );
          return {
            reply: fallbackData.reply,
            matchedProduct: matched || null,
          };
        }
      }

      return {
        reply: "Assalam o Alaikum! Welcome to Stowave. Hamare paas premium sweatshirts aur Ezzywalk comfort slides available hain. Aap products ya bag ke baray mein pooch sakte hain!",
        matchedProduct: null,
      };
    } catch (err) {
      console.error("Chat assistant error:", err);
      return {
        reply: "Assalam o Alaikum! Stowave shopping assistant hazir hai. Hum premium streetwear sweatshirts aur Ezzywalk footwear offer karte hain nationwide delivery ke sath.",
        matchedProduct: null,
      };
    }
  }, [liveProducts]);

  return (
    <>
      {/* ── Side-Docked Floating Chatbox (When Opened - Does not cover full screen) ── */}
      {isChatOpen && (
        <MorphOrb
          onSubmit={handleAssistantSubmit}
          onClose={() => setIsChatOpen(false)}
          liveProductsCount={liveProducts.length}
          bagCount={bagCount}
          minThinkMs={3000}
        />
      )}

      {/* ── Floating Launcher Trigger Button with Blinking AI Avatar (When Closed) ── */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsChatOpen(true)}
            aria-label="Open Stowave AI Shopping Assistant"
            className="group relative flex items-center gap-3 p-2 sm:pr-5 sm:pl-2.5 rounded-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-black text-white shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] cursor-pointer"
          >
            {/* Ambient Pulse Glow */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-500/30 to-emerald-500/30 blur-sm group-hover:opacity-100 opacity-60 transition-opacity animate-pulse pointer-events-none" />

            {/* Interactive Blinking AI Avatar from User Prompt */}
            <Avatar
              size="sm"
              color="turquoise"
              blinking={true}
              shape="circle"
              className="shadow-md"
            />

            {/* Label matching user's design */}
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold tracking-wide text-white flex items-center gap-1.5">
                Shopping Assistant
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">Ask anything & recommend</span>
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingAiAssistant;