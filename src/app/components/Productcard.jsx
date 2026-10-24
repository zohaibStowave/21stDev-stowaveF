"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export const ProductCard = React.forwardRef(function ProductCard(
  {
    id,
    _id,
    slug,
    name,
    tagline,
    description,
    price,
    originalPrice,
    offerText,
    imageUrl,
    soldOut = false,
    isCouponPrice = false,
    currency = "PKR",
    onClick,
    className = "",
    ...props
  },
  ref
) {
  const router = useRouter();

  const productTarget = slug || id || _id;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (productTarget) {
      router.push(`/products/${productTarget}`);
    }
  };

  // Clean description or tagline (single-line preview, trimmed)
  const rawDescription = tagline || description || "";
  const cleanDescription = rawDescription.replace(/\s+/g, " ").trim();

  // Price formatting
  const numPrice = Number(price);
  const formattedPrice = !isNaN(numPrice) && numPrice > 0
    ? new Intl.NumberFormat("en-PK").format(numPrice)
    : price || "0";

  const numOriginal = Number(originalPrice);
  const formattedOriginalPrice = !isNaN(numOriginal) && numOriginal > 0
    ? new Intl.NumberFormat("en-PK").format(numOriginal)
    : null;

  // Discount percentage calculation
  const discountPercent =
    numOriginal > numPrice && numOriginal > 0
      ? Math.round(((numOriginal - numPrice) / numOriginal) * 100)
      : null;

  return (
    <div
      ref={ref}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e);
        }
      }}
      className={`group relative flex flex-col h-full w-full rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer select-none ${className}`}
      {...props}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square sm:aspect-[4/5] bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name || "Product image"}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">
            No Image
          </div>
        )}

        {/* Badges on Image */}
        <div className="absolute top-2 left-2 right-2 flex items-start justify-between pointer-events-none z-10 gap-1.5">
          {offerText ? (
            <span className="bg-zinc-950/85 dark:bg-zinc-50/90 text-zinc-50 dark:text-zinc-950 text-[10px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm backdrop-blur-md uppercase tracking-wider">
              {offerText}
            </span>
          ) : discountPercent ? (
            <span className="bg-red-600/90 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-sm backdrop-blur-md">
              -{discountPercent}%
            </span>
          ) : (
            <span />
          )}

          {discountPercent && offerText && (
            <span className="bg-red-600/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm backdrop-blur-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Sold Out Overlay */}
        {soldOut && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 rounded-full bg-zinc-950/90 border border-zinc-700 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div className="space-y-1">
          {/* Product Title */}
          <h3
            className="text-xs sm:text-sm md:text-base font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1 leading-snug tracking-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
            title={name}
          >
            {name}
          </h3>

          {/* Description / Tagline - single line clamp avoids mobile stretching */}
          {cleanDescription ? (
            <p
              className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-relaxed"
              title={cleanDescription}
            >
              {cleanDescription}
            </p>
          ) : (
            <div className="h-4" aria-hidden="true" />
          )}
        </div>

        {/* Pricing */}
        <div className="mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {currency} {formattedPrice}
            </span>
            {formattedOriginalPrice && numOriginal > numPrice && (
              <span className="text-[11px] sm:text-xs text-zinc-400 dark:text-zinc-500 line-through font-normal">
                {currency} {formattedOriginalPrice}
              </span>
            )}
          </div>

          {isCouponPrice && (
            <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Coupon applied</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;