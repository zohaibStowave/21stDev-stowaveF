 "use client";

import { useState } from "react";

/* ------------------------------------------------------------------
   HALLY — single file hero page (Next.js / JSX)
   Backend later: just replace the PRODUCTS array with data from your API.
   The shadow under the product is generated automatically from the image
   itself, so a shirt gets a shirt shadow and a shoe gets a shoe shadow.
------------------------------------------------------------------- */

const PRODUCTS = [
  {
    id: 1,
    name: "Crimson Oversized Tee",
    image: "/shirt-crimson.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    bg: "radial-gradient(circle at 50% 40%, #e0164f 0%, #b3053c 55%, #7d0129 100%)",
    bgDark: "radial-gradient(circle at 50% 40%, #6d0526 0%, #3d0116 55%, #16060a 100%)",
    swatch: "#c9083f",
    dark: false,
  },
  {
    id: 2,
    name: "Charcoal Oversized Tee",
    image: "/shirt-black.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    bg: "radial-gradient(circle at 50% 40%, #4a4a4a 0%, #2e2e2e 55%, #1b1b1b 100%)",
    bgDark: "radial-gradient(circle at 50% 40%, #2a2a2a 0%, #171717 55%, #0a0a0a 100%)",
    swatch: "#333333",
    dark: false,
  },
  {
    id: 3,
    name: "Cream Oversized Tee",
    image: "/shirt-cream.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    bg: "radial-gradient(circle at 50% 40%, #f4ead6 0%, #e5d8bf 55%, #cbbb9c 100%)",
    bgDark: "radial-gradient(circle at 50% 40%, #4a4132 0%, #2b261d 55%, #131110 100%)",
    swatch: "#e5d8bf",
    dark: true,
  },
  {
// name: "Olive Oversized Tee",
// // //     image: "/shirt-olive.png",
// // //     bg: "oklch(0.42 0.07 122)",
// // //     ink: "oklch(0.98 0.01 100)",

    id: 4,
    name: "White Oversized Tee",
    image: "/shirt-olive.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    // bg: "radial-gradient(circle at 50% 40%, #f6f6f6 0%, #e6e6e6 55%, #c9c9c9 100%)",
    bg: "oklch(0.42 0.07 122)",
    // bgDark: "radial-gradient(circle at 50% 40%, #43464a 0%, #26282b 55%, #101112 100%)",
    // swatch: "#ffffff",
    // ink: "oklch(0.98 0.01 100)",
    dark: true,
  },
];

export default function Productshowcase() {
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState("Xl");
  const [theme, setTheme] = useState("light"); // "light" | "dark"

  const product = PRODUCTS[index];
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];
  const isDarkTheme = theme === "dark";
  const bg = isDarkTheme ? product.bgDark : product.bg;
  const lightText = isDarkTheme ? false : product.dark;
  const fg = lightText ? "#101010" : "#ffffff";
  const soft = lightText ? "rgba(16,16,16,.72)" : "rgba(255,255,255,.78)";

  const go = (dir) =>
    setIndex((i) => (i + dir + PRODUCTS.length) % PRODUCTS.length);

  return (
    <main className="hally" style={{ background: bg, color: fg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .hally{position:relative;min-height:100vh;width:100%;overflow:hidden;
          font-family:Inter,system-ui,sans-serif;transition:background 700ms ease,color 700ms ease;}
        .hally *{box-sizing:border-box;}
        .stage{position:relative;min-height:100vh;display:grid;
          grid-template-columns:1fr minmax(320px,46%) 1fr;align-items:center;
          gap:24px;padding:64px 56px 120px;}
        .display{font-family:'Cormorant Garamond',Georgia,serif;font-weight:500;
          font-size:clamp(34px,4vw,56px);line-height:1.08;letter-spacing:-.5px;margin:0;}
        .lead{margin:22px 0 30px;max-width:330px;font-size:13.5px;line-height:1.75;}
        .cta{display:inline-flex;align-items:center;gap:10px;border:0;cursor:pointer;
          padding:12px 20px;border-radius:999px;font-size:12.5px;font-weight:600;
          transition:transform .25s ease,box-shadow .25s ease;}
        .cta:hover{transform:translateY(-2px);box-shadow:0 12px 26px rgba(0,0,0,.28);}
        .product-wrap{position:relative;display:flex;flex-direction:column;align-items:center;}
        .product{position:relative;width:100%;max-width:430px;}
        .product img.item{width:100%;display:block;position:relative;z-index:2;
          animation:float 6s ease-in-out infinite;}
        /* auto shadow: same image, flattened + blurred = matches any product shape */
        .product img.shade{position:absolute;left:0;bottom:-4%;width:100%;z-index:1;
          transform:scaleY(.1) translateY(46%);transform-origin:bottom center;
          filter:brightness(0) blur(16px);opacity:.42;pointer-events:none;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        .tagline{font-family:'Cormorant Garamond',Georgia,serif;font-size:22px;
          text-align:center;line-height:1.5;margin-top:26px;}
        .right{justify-self:end;text-align:right;}
        .price{font-size:26px;font-weight:600;letter-spacing:.5px;}
        .old{font-size:20px;font-weight:600;text-decoration:line-through;opacity:.6;margin-top:6px;}
        .choose{font-size:11px;margin:26px 0 12px;opacity:.75;}
        .sizes{display:flex;gap:10px;justify-content:flex-end;}
        .size{width:38px;height:38px;border-radius:999px;cursor:pointer;font-size:11.5px;
          font-weight:600;border:1px solid rgba(255,255,255,.25);background:#1b1b1b;color:#fff;
          transition:transform .2s ease,background .2s ease,color .2s ease;}
        .size:hover{transform:translateY(-2px);}
        .size.on{background:#fff;color:#111;}
        .arrow{position:absolute;bottom:120px;width:44px;height:44px;border-radius:999px;
          border:0;cursor:pointer;display:grid;place-items:center;font-size:16px;
          background:rgba(0,0,0,.55);color:#fff;backdrop-filter:blur(6px);
          transition:transform .25s ease,background .25s ease;}
        .arrow:hover{transform:scale(1.08);background:rgba(0,0,0,.8);}
        .arrow.prev{left:150px;} .arrow.next{right:150px;}
        .theme-toggle{position:absolute;top:34px;right:48px;z-index:5;display:inline-flex;
          align-items:center;gap:8px;padding:5px 6px 5px 14px;border-radius:999px;cursor:pointer;
          border:1px solid rgba(127,127,127,.35);background:rgba(0,0,0,.28);color:inherit;
          font-size:11.5px;font-weight:600;letter-spacing:.4px;backdrop-filter:blur(6px);
          transition:transform .25s ease,background .25s ease;}
        .theme-toggle:hover{transform:translateY(-2px);background:rgba(0,0,0,.42);}
        .track{position:relative;width:40px;height:22px;border-radius:999px;
          background:rgba(255,255,255,.25);transition:background .3s ease;}
        .track.on{background:rgba(255,255,255,.5);}
        .knob{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:999px;
          background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.35);transition:transform .3s ease;}
        .track.on .knob{transform:translateX(18px);}
        .colors{display:flex;gap:10px;justify-content:flex-end;margin-top:22px;}
        .dot{width:26px;height:26px;border-radius:999px;cursor:pointer;padding:0;
          border:1px solid rgba(127,127,127,.45);box-shadow:0 3px 8px rgba(0,0,0,.25);
          transition:transform .2s ease,box-shadow .2s ease;}
        .dot:hover{transform:translateY(-2px);}
        .dot.on{transform:scale(1.15);box-shadow:0 0 0 2px currentColor;}
        .colors-label{font-size:11px;margin:26px 0 0;opacity:.75;}
        .socials{position:absolute;left:56px;bottom:52px;display:flex;gap:18px;font-size:12px;opacity:.8;}
        .socials a{color:inherit;text-decoration:none;transition:opacity .2s ease;}
        .socials a:hover{opacity:.55;}
        .thumb{position:absolute;right:48px;bottom:34px;width:92px;cursor:pointer;
          background:none;border:0;padding:0;transition:transform .3s ease;}
        .thumb:hover{transform:translateY(-6px);}
        .thumb img{width:100%;display:block;}
        @media (max-width:1024px){
          .stage{grid-template-columns:1fr;text-align:center;padding:56px 24px 150px;}
          .right{justify-self:center;text-align:center;}
          .sizes{justify-content:center;}
          .colors{justify-content:center;}
          .theme-toggle{top:18px;right:18px;}
          .lead{margin-left:auto;margin-right:auto;}
          .arrow.prev{left:20px;} .arrow.next{right:20px;}
          .socials{left:50%;transform:translateX(-50%);bottom:24px;}
          .thumb{display:none;}
        }
      `}</style>

      <button
        className="theme-toggle"
        onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
        aria-label="Toggle dark mode"
      >
        {isDarkTheme ? "Dark" : "Light"}
        <span className={"track" + (isDarkTheme ? " on" : "")}>
          <span className="knob" />
        </span>
      </button>

      <section className="stage">
        {/* left */}
        <div>
          <h1 className="display">
            Wear Confidence
            <br />
            Define Your Style.
          </h1>
          <p className="lead" style={{ color: soft }}>
            Discover premium T-shirts, hoodies, and sweatshirts designed for
            comfort, quality, and everyday expression.
          </p>
          <button
            className="cta"
            style={{ background: lightText ? "#101010" : "#ffffff", color: lightText ? "#fff" : "#101010" }}
          >
            Get the look <span>›</span>
          </button>
        </div>

        {/* center */}
        <div className="product-wrap">
          <div className="product">
            <img className="shade" src={product.image} alt="" aria-hidden="true" />
            <img className="item" src={product.image} alt={product.name} />
          </div>
          <p className="tagline">
            Dress Better.
            <br />
            Feel Better.
          </p>
        </div>

        {/* right */}
        <div className="right">
          <div className="price">{product.price}</div>
          <div className="old">{product.oldPrice}</div>
          <div className="choose">Choose your size</div>
          <div className="sizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                className={"size" + (size === s ? " on" : "")}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="colors-label">Choose your colour</div>
          <div className="colors">
            {PRODUCTS.map((p, i) => (
              <button
                key={p.id}
                className={"dot" + (index === i ? " on" : "")}
                style={{ background: p.swatch }}
                onClick={() => setIndex(i)}
                aria-label={p.name}
              />
            ))}
          </div>
        </div>
      </section>

      <button className="arrow prev" onClick={() => go(-1)} aria-label="Previous product">
        ‹
      </button>
      <button className="arrow next" onClick={() => go(1)} aria-label="Next product">
        ›
      </button>

      <div className="socials">
        <a href="#">Instagram</a>
        <a href="#">X</a>
        <a href="#">Facebook</a>
        <a href="#">LinkedIn</a>
        <a href="#">TikTok</a>
      </div>

      <button className="thumb" onClick={() => go(1)} aria-label={"Next: " + next.name}>
        <img src={next.image} alt={next.name} />
      </button>
    </main>
  );
}






































// // // "use client";

// // // import { useState } from "react";
// // // import {
// // //   Bell,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Facebook,
// // //   Instagram,
// // //   Linkedin,
// // //   User,
// // // } from "lucide-react";

// // // /* shirt images ko public/ folder me rakho:
// // //    public/shirt-crimson.png, shirt-cream.png, shirt-black.png, shirt-olive.png */

// // // const PRODUCTS = [
// // //   {
// // //     id: "crimson",
// // //     name: "Crimson Oversized Tee",
// // //     image: "/shirt-crimson.png",
// // //     bg: "oklch(0.45 0.19 8)",
// // //     ink: "oklch(0.99 0 0)",
// // //     price: "#10,000",
// // //     oldPrice: "#15,000",
// // //   },
// // //   {
// // //     id: "cream",
// // //     name: "Cream Oversized Tee",
// // //     image: "/shirt-cream.png",
// // //     bg: "oklch(0.87 0.06 92)",
// // //     ink: "oklch(0.18 0.02 80)",
// // //     price: "#10,000",
// // //     oldPrice: "#15,000",
// // //   },
// // //   {
// // //     id: "black",
// // //     name: "Onyx Oversized Tee",
// // //     image: "/shirt-black.png",
// // //     bg: "oklch(0.22 0.01 260)",
// // //     ink: "oklch(0.98 0 0)",
// // //     price: "#12,000",
// // //     oldPrice: "#16,000",
// // //   },
// // //   {
// // //     id: "olive",
// // //     name: "Olive Oversized Tee",
// // //     image: "/shirt-olive.png",
// // //     bg: "oklch(0.42 0.07 122)",
// // //     ink: "oklch(0.98 0.01 100)",
// // //     price: "#11,000",
// // //     oldPrice: "#15,500",
// // //   },
// // // ];

// // // const SIZES = ["XL", "2XL", "3XL", "4XL"];
// // // const NAV = ["Home", "Tshirt", "Hoodies", "Sweatshirts", "About Us"];

// // // export default function ProductShowcase() {
// // //   const [index, setIndex] = useState(0);
// // //   const [size, setSize] = useState("XL");
// // //   const product = PRODUCTS[index];
// // //   const next = PRODUCTS[(index + 1) % PRODUCTS.length];

// // //   const go = (dir) =>
// // //     setIndex((i) => (i + dir + PRODUCTS.length) % PRODUCTS.length);

// // //   return (
// // //     <>
// // //       <style jsx global>{`
// // //         @import url("https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Manrope:wght@400;500;600&display=swap");

// // //         body {
// // //           margin: 0;
// // //           font-family: "Manrope", ui-sans-serif, system-ui, sans-serif;
// // //         }
// // //         .font-display {
// // //           font-family: "Sora", ui-sans-serif, system-ui, sans-serif;
// // //         }
// // //         .hero-stage {
// // //           background:
// // //             radial-gradient(120% 90% at 50% 8%, color-mix(in oklch, var(--hero-bg) 78%, white 22%) 0%, transparent 60%),
// // //             radial-gradient(100% 80% at 50% 110%, color-mix(in oklch, var(--hero-bg) 70%, black 30%) 0%, transparent 65%),
// // //             var(--hero-bg);
// // //           color: var(--hero-ink);
// // //           transition: background 700ms ease, color 700ms ease;
// // //         }
// // //         .hero-pill {
// // //           background-color: color-mix(in oklch, var(--hero-ink) 12%, transparent);
// // //           border: 1px solid color-mix(in oklch, var(--hero-ink) 22%, transparent);
// // //           color: var(--hero-ink);
// // //           transition: all 300ms ease;
// // //         }
// // //         .hero-pill:hover {
// // //           background-color: color-mix(in oklch, var(--hero-ink) 22%, transparent);
// // //         }
// // //         .hero-pill-active {
// // //           background-color: var(--hero-ink);
// // //           color: var(--hero-bg);
// // //           border-color: var(--hero-ink);
// // //         }
// // //         .hero-cta {
// // //           background-color: var(--hero-ink);
// // //           color: var(--hero-bg);
// // //           transition: transform 250ms ease, opacity 250ms ease;
// // //         }
// // //         .hero-cta:hover {
// // //           transform: translateX(2px);
// // //           opacity: 0.9;
// // //         }
// // //         .hero-muted {
// // //           color: color-mix(in oklch, var(--hero-ink) 70%, transparent);
// // //         }
// // //         .shirt-shadow {
// // //           background: radial-gradient(
// // //             50% 50% at 50% 50%,
// // //             color-mix(in oklch, black 55%, transparent) 0%,
// // //             transparent 70%
// // //           );
// // //           filter: blur(10px);
// // //           transition: width 600ms ease, opacity 600ms ease;
// // //         }
// // //         .shirt-swap {
// // //           animation: shirt-in 620ms cubic-bezier(0.22, 1, 0.36, 1);
// // //         }
// // //         @keyframes shirt-in {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateY(-18px) scale(0.96);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateY(0) scale(1);
// // //           }
// // //         }
// // //       `}</style>

// // //       <main
// // //         className="hero-stage relative flex min-h-screen flex-col overflow-hidden px-6 py-6 lg:px-12"
// // //         style={{ "--hero-bg": product.bg, "--hero-ink": product.ink }}
// // //       >
// // //         {/* Nav */}
// // //         <header className="relative z-20 flex items-center justify-between">
// // //           <div className="font-display text-lg font-bold tracking-[0.35em]">HALLY</div>

// // //           <nav className="hidden items-center gap-2 md:flex">
// // //             {NAV.map((item) => (
// // //               <a
// // //                 key={item}
// // //                 href="#"
// // //                 className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
// // //                   item === "Tshirt"
// // //                     ? "hero-pill hero-pill-active"
// // //                     : "hero-muted hover:opacity-100"
// // //                 }`}
// // //               >
// // //                 {item}
// // //               </a>
// // //             ))}
// // //           </nav>

// // //           <div className="flex items-center gap-4">
// // //             <User className="h-5 w-5" strokeWidth={1.6} />
// // //             <span className="relative">
// // //               <Bell className="h-5 w-5" strokeWidth={1.6} />
// // //               <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
// // //             </span>
// // //           </div>
// // //         </header>

// // //         {/* Hero */}
// // //         <section className="relative z-10 grid flex-1 items-center gap-8 lg:grid-cols-[1fr_minmax(0,1.1fr)_0.7fr]">
// // //           <div className="w-full max-w-[26rem]">
// // //             <h1 className="font-display text-3xl font-light leading-tight lg:whitespace-nowrap lg:text-[2.6rem]">
// // //               Wear Confidence
// // //               <br />
// // //               Define Your Style.
// // //             </h1>
// // //             <p className="hero-muted mt-5 max-w-xs text-sm leading-relaxed">
// // //               Discover premium T-shirts, hoodies, and sweatshirts designed for comfort,
// // //               quality, and everyday expression.
// // //             </p>
// // //             <button className="hero-cta mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium">
// // //               Get the look
// // //               <ChevronRight className="h-4 w-4" />
// // //             </button>
// // //           </div>

// // //           <div className="relative flex flex-col items-center justify-center">
// // //             <img
// // //               key={product.id}
// // //               src={product.image}
// // //               alt={product.name}
// // //               width={1024}
// // //               height={1024}
// // //               className="shirt-swap w-[320px] max-w-full drop-shadow-2xl lg:w-[440px]"
// // //             />
// // //             <div className="shirt-shadow -mt-1 h-8 w-[230px] opacity-80 lg:w-[320px]" />

// // //             <div className="mt-8 text-center font-display text-xl font-light leading-snug lg:text-2xl">
// // //               Dress Better.
// // //               <br />
// // //               Feel Better.
// // //             </div>
// // //           </div>

// // //           <div className="flex flex-col items-start gap-4 lg:items-end lg:text-right">
// // //             <div>
// // //               <div className="font-display text-2xl font-semibold">{product.price}</div>
// // //               <div className="hero-muted font-display text-xl line-through">
// // //                 {product.oldPrice}
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <p className="hero-muted mb-2 text-xs">Choose your size</p>
// // //               <div className="flex gap-2">
// // //                 {SIZES.map((s) => (
// // //                   <button
// // //                     key={s}
// // //                     onClick={() => setSize(s)}
// // //                     className={`hero-pill h-9 w-11 rounded-full text-xs font-medium ${
// // //                       size === s ? "hero-pill-active" : ""
// // //                     }`}
// // //                   >
// // //                     {s}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>

// // //         {/* Bottom bar */}
// // //         <footer className="relative z-20 flex items-end justify-between">
// // //           <div className="flex items-center gap-4">
// // //             {/* <Instagram className="h-4 w-4" strokeWidth={1.6} /> */}
// // //             {/* <Facebook className="h-4 w-4" strokeWidth={1.6} />
// // //             <Linkedin className="h-4 w-4" strokeWidth={1.6} /> */}
// // //           </div>

// // //           <div className="flex items-center gap-3">
// // //             <button
// // //               aria-label="Previous product"
// // //               onClick={() => go(-1)}
// // //               className="hero-pill flex h-10 w-10 items-center justify-center rounded-full"
// // //             >
// // //               <ChevronLeft className="h-4 w-4" />
// // //             </button>
// // //             <button
// // //               aria-label="Next product"
// // //               onClick={() => go(1)}
// // //               className="hero-pill flex h-10 w-10 items-center justify-center rounded-full"
// // //             >
// // //               <ChevronRight className="h-4 w-4" />
// // //             </button>
// // //           </div>

// // //           <button
// // //             onClick={() => go(1)}
// // //             aria-label={`Next: ${next.name}`}
// // //             className="hero-pill flex h-20 w-20 items-center justify-center rounded-2xl p-2"
// // //           >
// // //             <img
// // //               src={next.image}
// // //               alt={next.name}
// // //               width={1024}
// // //               height={1024}
// // //               loading="lazy"
// // //               className="h-full w-full object-contain"
// // //             />
// // //           </button>
// // //         </footer>
// // //       </main>
// // //     </>
// // //   );
// // // }






















// // "use client";

// // import { useState, useEffect, useCallback, useRef } from "react";

// // // ---------------------------------------------------------------------------
// // // Daraz-inspired hero slider — Tailwind CSS version
// // // Palette: Daraz orange #F85606, deep maroon #C4290D, golden accent #FFB800
// // // ---------------------------------------------------------------------------

// // const SLIDES = [
// //   {
// //     id: 1,
// //     tag: "Flash Sale",
// //     title: "Mobile Mega Days",
// //     subtitle: "Latest smartphones — free delivery all over Pakistan",
// //     discount: "Upto 45% Off",
// //     price: "Rs. 24,999",
// //     oldPrice: "Rs. 44,999",
// //     cta: "Shop Now",
// //     from: "from-[#F85606]",
// //     to: "to-[#C4290D]",
// //     emoji: "📱",
// //   },
// //   {
// //     id: 2,
// //     tag: "11.11 Sale",
// //     title: "Fashion Carnival",
// //     subtitle: "Winter collection ke naye rung, sirf aaj ke liye",
// //     discount: "Buy 1 Get 1",
// //     price: "Rs. 1,299",
// //     oldPrice: "Rs. 2,599",
// //     cta: "Explore",
// //     from: "from-[#FFB800]",
// //     to: "to-[#F85606]",
// //     emoji: "🧥",
// //   },
// //   {
// //     id: 3,
// //     tag: "Daraz Exclusive",
// //     title: "Home & Living",
// //     subtitle: "Apne ghar ko banayein khoobsurat — voucher ke sath",
// //     discount: "Upto 60% Off",
// //     price: "Rs. 3,499",
// //     oldPrice: "Rs. 8,999",
// //     cta: "Grab Deal",
// //     from: "from-[#C4290D]",
// //     to: "to-[#7A1204]",
// //     emoji: "🛋️",
// //   },
// //   {
// //     id: 4,
// //     tag: "Super Brand Day",
// //     title: "Beauty & Skincare",
// //     subtitle: "Trusted brands, verified sellers, cash on delivery",
// //     discount: "Free Gift",
// //     price: "Rs. 899",
// //     oldPrice: "Rs. 1,799",
// //     cta: "Shop Now",
// //     from: "from-[#F85606]",
// //     to: "to-[#FFB800]",
// //     emoji: "💄",
// //   },
// // ];

// // const AUTOPLAY_MS = 4500;

// // // Countdown target rolls forward 6 hours from first render — Daraz-style urgency
// // function useCountdown() {
// //   const targetRef = useRef(Date.now() + 6 * 60 * 60 * 1000);
// //   const [remaining, setRemaining] = useState(targetRef.current - Date.now());

// //   useEffect(() => {
// //     const id = setInterval(() => {
// //       setRemaining(Math.max(0, targetRef.current - Date.now()));
// //     }, 1000);
// //     return () => clearInterval(id);
// //   }, []);

// //   const total = Math.floor(remaining / 1000);
// //   const h = String(Math.floor(total / 3600)).padStart(2, "0");
// //   const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
// //   const s = String(total % 60).padStart(2, "0");
// //   return { h, m, s };
// // }

// // export default function Page() {
// //   const [index, setIndex] = useState(0);
// //   const [paused, setPaused] = useState(false);
// //   const touchStartX = useRef(null);
// //   const countdown = useCountdown();

// //   const goTo = useCallback((i) => {
// //     setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
// //   }, []);
// //   const next = useCallback(() => goTo(index + 1), [goTo, index]);
// //   const prev = useCallback(() => goTo(index - 1), [goTo, index]);

// //   useEffect(() => {
// //     if (paused) return;
// //     const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
// //     return () => clearInterval(id);
// //   }, [paused]);

// //   const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
// //   const onTouchEnd = (e) => {
// //     if (touchStartX.current === null) return;
// //     const delta = e.changedTouches[0].clientX - touchStartX.current;
// //     if (delta > 50) prev();
// //     else if (delta < -50) next();
// //     touchStartX.current = null;
// //   };

// //   const slide = SLIDES[index];

// //   return (
// //     <main className="min-h-screen bg-[#FFF8F3] flex items-center justify-center p-4 sm:p-6 font-sans">
// //       <section
// //         onMouseEnter={() => setPaused(true)}
// //         onMouseLeave={() => setPaused(false)}
// //         onTouchStart={onTouchStart}
// //         onTouchEnd={onTouchEnd}
// //         aria-roledescription="carousel"
// //         aria-label="Promotional deals"
// //         className={`relative w-full max-w-5xl min-h-[380px] rounded-3xl overflow-hidden
// //           bg-gradient-to-br ${slide.from} ${slide.to} transition-colors duration-500
// //           shadow-[0_20px_45px_rgba(196,41,13,0.25)] flex items-center
// //           px-6 py-12 sm:px-12 sm:py-14 text-white`}
// //       >
// //         {/* Countdown ribbon — signature element */}
// //         <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md px-3 py-1.5 text-xs font-semibold">
// //           <span className="opacity-90 tracking-wide">⚡ Deal ends in</span>
// //           <div className="flex items-center gap-0.5">
// //             <TimeBox value={countdown.h} unit="h" />
// //             <span className="opacity-70 font-bold">:</span>
// //             <TimeBox value={countdown.m} unit="m" />
// //             <span className="opacity-70 font-bold">:</span>
// //             <TimeBox value={countdown.s} unit="s" />
// //           </div>
// //         </div>

// //         {/* Slide content */}
// //         <div className="relative z-10 max-w-md sm:max-w-lg">
// //           <span className="inline-block bg-[#1A1A1A] text-[#FFB800] font-bold text-xs tracking-wide uppercase px-3.5 py-1.5 rounded-full mb-4">
// //             {slide.tag}
// //           </span>

// //           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 [text-shadow:0_2px_10px_rgba(0,0,0,0.15)]">
// //             {slide.title}
// //           </h1>

// //           <p className="text-base opacity-95 mb-6 max-w-sm">{slide.subtitle}</p>

// //           <div className="flex flex-wrap items-center gap-3 mb-7">
// //             <span className="bg-[#FFB800] text-[#1A1A1A] font-extrabold text-sm px-2.5 py-1 rounded-md">
// //               {slide.discount}
// //             </span>
// //             <span className="text-2xl font-extrabold">{slide.price}</span>
// //             <span className="text-sm font-medium opacity-75 line-through">
// //               {slide.oldPrice}
// //             </span>
// //           </div>

// //           <button
// //             type="button"
// //             className="bg-[#1A1A1A] text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl hover:bg-black transition-colors"
// //           >
// //             {slide.cta} →
// //           </button>
// //         </div>

// //         {/* Decorative emoji */}
// //         <span
// //           aria-hidden="true"
// //           className="hidden sm:block absolute right-8 bottom-0 leading-none text-[110px] md:text-[160px] opacity-90 drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]"
// //         >
// //           {slide.emoji}
// //         </span>

// //         {/* Prev / Next arrows */}
// //         <button
// //           type="button"
// //           onClick={prev}
// //           aria-label="Previous slide"
// //           className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white text-2xl leading-none flex items-center justify-center transition-colors"
// //         >
// //           ‹
// //         </button>
// //         <button
// //           type="button"
// //           onClick={next}
// //           aria-label="Next slide"
// //           className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white text-2xl leading-none flex items-center justify-center transition-colors"
// //         >
// //           ›
// //         </button>

// //         {/* Dot indicators */}
// //         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
// //           {SLIDES.map((s, i) => (
// //             <button
// //               key={s.id}
// //               type="button"
// //               onClick={() => goTo(i)}
// //               aria-label={`Go to slide ${i + 1}`}
// //               aria-current={i === index}
// //               className={`h-2 rounded-full transition-all duration-300 ${
// //                 i === index ? "w-6 bg-[#FFB800]" : "w-2 bg-white/55"
// //               }`}
// //             />
// //           ))}
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// // function TimeBox({ value, unit }) {
// //   return (
// //     <span className="bg-[#1A1A1A] text-[#FFB800] font-bold rounded px-1.5 py-0.5 text-[13px] tabular-nums">
// //       {value}
// //       <sub className="text-[9px] ml-0.5 text-white">{unit}</sub>
// //     </span>
// //   );
// // }





















// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";

// // ---------------------------------------------------------------------------
// // Daraz-inspired navbar + full-width hero slider — Tailwind CSS
// // Palette: Daraz orange #F85606, deep maroon #C4290D, golden accent #FFB800
// // ---------------------------------------------------------------------------

// const SLIDES = [
//   {
//     id: 1,
//     tag: "Flash Sale",
//     title: "Mobile Mega Days",
//     subtitle: "Latest smartphones — free delivery all over Pakistan",
//     discount: "Upto 45% Off",
//     price: "Rs. 24,999",
//     oldPrice: "Rs. 44,999",
//     cta: "Shop Now",
//     from: "from-[#F85606]",
//     to: "to-[#C4290D]",
//     emoji: "📱",
//   },
//   {
//     id: 2,
//     tag: "11.11 Sale",
//     title: "Fashion Carnival",
//     subtitle: "Winter collection ke naye rung, sirf aaj ke liye",
//     discount: "Buy 1 Get 1",
//     price: "Rs. 1,299",
//     oldPrice: "Rs. 2,599",
//     cta: "Explore",
//     from: "from-[#FFB800]",
//     to: "to-[#F85606]",
//     emoji: "🧥",
//   },
//   {
//     id: 3,
//     tag: "Daraz Exclusive",
//     title: "Home & Living",
//     subtitle: "Apne ghar ko banayein khoobsurat — voucher ke sath",
//     discount: "Upto 60% Off",
//     price: "Rs. 3,499",
//     oldPrice: "Rs. 8,999",
//     cta: "Grab Deal",
//     from: "from-[#C4290D]",
//     to: "to-[#7A1204]",
//     emoji: "🛋️",
//   },
//   {
//     id: 4,
//     tag: "Super Brand Day",
//     title: "Beauty & Skincare",
//     subtitle: "Trusted brands, verified sellers, cash on delivery",
//     discount: "Free Gift",
//     price: "Rs. 899",
//     oldPrice: "Rs. 1,799",
//     cta: "Shop Now",
//     from: "from-[#F85606]",
//     to: "to-[#FFB800]",
//     emoji: "💄",
//   },
// ];

// const NAV_LINKS = ["Electronics", "Fashion", "Home & Living", "Beauty", "Groceries", "Vouchers"];

// const AUTOPLAY_MS = 4500;

// function useCountdown() {
//   const targetRef = useRef(Date.now() + 6 * 60 * 60 * 1000);
//   const [remaining, setRemaining] = useState(targetRef.current - Date.now());

//   useEffect(() => {
//     const id = setInterval(() => {
//       setRemaining(Math.max(0, targetRef.current - Date.now()));
//     }, 1000);
//     return () => clearInterval(id);
//   }, []);

//   const total = Math.floor(remaining / 1000);
//   const h = String(Math.floor(total / 3600)).padStart(2, "0");
//   const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
//   const s = String(total % 60).padStart(2, "0");
//   return { h, m, s };
// }

// export default function Page() {
//   const [index, setIndex] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const touchStartX = useRef(null);
//   const countdown = useCountdown();

//   const goTo = useCallback((i) => {
//     setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
//   }, []);
//   const next = useCallback(() => goTo(index + 1), [goTo, index]);
//   const prev = useCallback(() => goTo(index - 1), [goTo, index]);

//   useEffect(() => {
//     if (paused) return;
//     const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
//     return () => clearInterval(id);
//   }, [paused]);

//   const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
//   const onTouchEnd = (e) => {
//     if (touchStartX.current === null) return;
//     const delta = e.changedTouches[0].clientX - touchStartX.current;
//     if (delta > 50) prev();
//     else if (delta < -50) next();
//     touchStartX.current = null;
//   };

//   const slide = SLIDES[index];

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] font-sans">
//       {/* <header className="sticky top-0 z-50 bg-[#F85606] text-white shadow-md">
//         <div className="hidden sm:flex justify-end items-center gap-5 text-xs px-6 py-1.5 bg-[#C4290D]/40">
//           <span>Sell on Daraz</span>
//           <span>Download App</span>
//           <span>PKR ▾</span>
//           <span>English ▾</span>
//         </div>

//         <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3">
//           <span className="text-2xl font-extrabold tracking-tight shrink-0">
//             daraz<span className="text-[#1A1A1A]">.</span>
//           </span>

//           <div className="flex-1 flex items-center bg-white rounded-md overflow-hidden max-w-2xl">
//             <input
//               type="text"
//               placeholder="Search in Daraz"
//               className="flex-1 px-3 py-2 text-sm text-[#1A1A1A] outline-none"
//             />
//             <button
//               type="button"
//               aria-label="Search"
//               className="bg-[#F85606] hover:bg-[#C4290D] transition-colors px-4 h-full text-white text-sm font-semibold"
//             >
//               🔍
//             </button>
//           </div>

//           <div className="hidden md:flex items-center gap-5 text-sm font-medium shrink-0">
//             <span className="cursor-pointer hover:text-[#1A1A1A]">Account ▾</span>
//             <span className="cursor-pointer hover:text-[#1A1A1A]">❤ Wishlist</span>
//             <span className="cursor-pointer hover:text-[#1A1A1A]">🛒 Cart</span>
//           </div>

//           <button
//             type="button"
//             className="md:hidden text-xl"
//             onClick={() => setMenuOpen((v) => !v)}
//             aria-label="Toggle menu"
//           >
//             ☰
//           </button>
//         </div>

//         <nav className="hidden md:flex items-center gap-6 px-6 pb-2.5 text-sm font-medium overflow-x-auto">
//           {NAV_LINKS.map((link) => (
//             <span key={link} className="cursor-pointer whitespace-nowrap hover:text-[#1A1A1A] transition-colors">
//               {link}
//             </span>
//           ))}
//         </nav>

//         {menuOpen && (
//           <nav className="md:hidden flex flex-col gap-3 px-4 pb-4 text-sm font-medium">
//             {NAV_LINKS.map((link) => (
//               <span key={link} className="cursor-pointer">
//                 {link}
//               </span>
//             ))}
//             <div className="flex gap-4 pt-2 border-t border-white/25">
//               <span>Account</span>
//               <span>Wishlist</span>
//               <span>Cart</span>
//             </div>
//           </nav>
//         )}
//       </header> */}

//       <section
//         onMouseEnter={() => setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//         onTouchStart={onTouchStart}
//         onTouchEnd={onTouchEnd}
//         aria-roledescription="carousel"
//         aria-label="Promotional deals"
//         className={`relative w-full min-h-[380px] sm:min-h-[440px] overflow-hidden
//           bg-gradient-to-br ${slide.from} ${slide.to} transition-colors duration-500
//           flex items-center px-6 py-12 sm:px-16 sm:py-16 text-white`}
//       >
//         <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md px-3 py-1.5 text-xs font-semibold">
//           <span className="opacity-90 tracking-wide">⚡ Deal ends in</span>
//           <div className="flex items-center gap-0.5">
//             <TimeBox value={countdown.h} unit="h" />
//             <span className="opacity-70 font-bold">:</span>
//             <TimeBox value={countdown.m} unit="m" />
//             <span className="opacity-70 font-bold">:</span>
//             <TimeBox value={countdown.s} unit="s" />
//           </div>
//         </div>

//         <div className="relative z-10 max-w-md sm:max-w-lg mx-auto sm:mx-0 sm:ml-4 md:ml-12">
//           <span className="inline-block bg-[#1A1A1A] text-[#FFB800] font-bold text-xs tracking-wide uppercase px-3.5 py-1.5 rounded-full mb-4">
//             {slide.tag}
//           </span>

//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-3 [text-shadow:0_2px_10px_rgba(0,0,0,0.15)]">
//             {slide.title}
//           </h1>

//           <p className="text-base opacity-95 mb-6 max-w-sm">{slide.subtitle}</p>

//           <div className="flex flex-wrap items-center gap-3 mb-7">
//             <span className="bg-[#FFB800] text-[#1A1A1A] font-extrabold text-sm px-2.5 py-1 rounded-md">
//               {slide.discount}
//             </span>
//             <span className="text-2xl font-extrabold">{slide.price}</span>
//             <span className="text-sm font-medium opacity-75 line-through">
//               {slide.oldPrice}
//             </span>
//           </div>

//           <button
//             type="button"
//             className="bg-[#1A1A1A] text-white font-bold text-sm tracking-wide px-7 py-3.5 rounded-xl hover:bg-black transition-colors"
//           >
//             {slide.cta} →
//           </button>
//         </div>

//         <span
//           aria-hidden="true"
//           className="hidden sm:block absolute right-10 md:right-20 bottom-0 leading-none text-[110px] md:text-[170px] opacity-90 drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]"
//         >
//           {slide.emoji}
//         </span>

//         <button
//           type="button"
//           onClick={prev}
//           aria-label="Previous slide"
//           className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white text-2xl leading-none flex items-center justify-center transition-colors"
//         >
//           ‹
//         </button>
//         <button
//           type="button"
//           onClick={next}
//           aria-label="Next slide"
//           className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/50 text-white text-2xl leading-none flex items-center justify-center transition-colors"
//         >
//           ›
//         </button>

//         <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
//           {SLIDES.map((s, i) => (
//             <button
//               key={s.id}
//               type="button"
//               onClick={() => goTo(i)}
//               aria-label={`Go to slide ${i + 1}`}
//               aria-current={i === index}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 i === index ? "w-6 bg-[#FFB800]" : "w-2 bg-white/55"
//               }`}
//             />
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }

// function TimeBox({ value, unit }) {
//   return (
//     <span className="bg-[#1A1A1A] text-[#FFB800] font-bold rounded px-1.5 py-0.5 text-[13px] tabular-nums">
//       {value}
//       <sub className="text-[9px] ml-0.5 text-white">{unit}</sub>
//     </span>
//   );
// }