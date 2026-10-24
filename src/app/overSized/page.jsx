"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "../components/Productcard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function OversizedPage() {
  const router = useRouter();
  const [allProducts, setAllProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/Addproducts`);
        const data = await res.json();

        if (data.success) {
          setAllProducts(data.products || []);
        } else {
          setError(data.error || "Products load nahi ho sake.");
        }
      } catch (err) {
        console.error("fetchProducts error:", err);
        setError("Can't connect to server. Is your backend live?");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading || error || allProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 py-12 sm:py-16 md:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Oversized Collection
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Relaxed streetwear fits with drop-shoulder tailoring.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              slug={product.slug || product._id}
              name={product.name}
              tagline={product.tagline}
              description={product.description}
              price={product.price}
              originalPrice={product.originalPrice}
              offerText={product.offerText}
              imageUrl={product.imageUrl}
              soldOut={product.soldOut}
              isCouponPrice={product.isCouponPrice || false}
              onClick={() => router.push(`/products/${product.slug || product._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}