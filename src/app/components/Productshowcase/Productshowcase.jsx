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
    image: "/tee-pink.png",
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
    image: "/tee-black.png",
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
    image: "/tee-cream.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    bg: "radial-gradient(circle at 50% 40%, #f4ead6 0%, #e5d8bf 55%, #cbbb9c 100%)",
    bgDark: "radial-gradient(circle at 50% 40%, #4a4132 0%, #2b261d 55%, #131110 100%)",
    swatch: "#e5d8bf",
    dark: true,
  },
  {
    id: 4,
    name: "White Oversized Tee",
    image: "/tee-white.png",
    price: "#10,000",
    oldPrice: "#15,000",
    sizes: ["Xl", "2XL", "3XL", "4XL"],
    bg: "radial-gradient(circle at 50% 40%, #f6f6f6 0%, #e6e6e6 55%, #c9c9c9 100%)",
    bgDark: "radial-gradient(circle at 50% 40%, #43464a 0%, #26282b 55%, #101112 100%)",
    swatch: "#ffffff",
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
