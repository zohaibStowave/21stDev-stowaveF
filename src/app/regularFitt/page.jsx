// "use client";

// import * as React from "react";
// import { ProductCard } from "../components/Productcard";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export default function RegularFitPage() {
//   const [allProducts, setAllProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState("");

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // 🟢 Regular Fit ka apna backend endpoint
//         const res = await fetch(`${API_BASE_URL}/api/regularproducts`);
//         const data = await res.json();

//         if (data.success) {
//           setAllProducts(data.products);
//         } else {
//           setError(data.error || "Products load nahi ho sake.");
//         }
//       } catch (err) {
//         console.error("fetchProducts error:", err);
//         setError("Can't connect to server. Is your backend live?");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
//           Regular Fit Collection
//         </h1>

//         {loading ? (
//           <p className="text-sm text-zinc-400 text-center py-10">
//             Products is loading...
//           </p>
//         ) : error ? (
//           <p className="text-sm text-red-500 text-center py-10">{error}</p>
//         ) : allProducts.length === 0 ? (
//           <p className="text-sm text-zinc-400 text-center py-10">
//             There is no product uploaded yet!
//           </p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
//             {allProducts.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 id={product._id} // 🟢 Pass ID explicitly
//                 slug={product.slug || product._id} // 🟢 Slug na milay to _id use hoga
//                 name={product.name}
//                 tagline={product.tagline}
//                 price={product.price}
//                 originalPrice={product.originalPrice}
//                 offerText={product.offerText}
//                 imageUrl={product.imageUrl}
//                 isCouponPrice={product.isCouponPrice || false}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




























"use client";

import * as React from "react";
import { ProductCard } from "../components/Productcard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RegularFitPage() {
  const [allProducts, setAllProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // 🟢 Regular Fit ka apna backend endpoint
        const res = await fetch(`${API_BASE_URL}/api/regularproducts`);
        const data = await res.json();

        if (data.success) {
          setAllProducts(data.products);
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

  // Jab tak products load na ho jaye, ya error aaye, ya list empty ho — kuch bhi render na karo
  if (loading || error || allProducts.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
          Regular Fit Collection
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id} // 🟢 Pass ID explicitly
              slug={product.slug || product._id} // 🟢 Slug na milay to _id use hoga
              name={product.name}
              tagline={product.tagline}
              price={product.price}
              originalPrice={product.originalPrice}
              offerText={product.offerText}
              imageUrl={product.imageUrl}
              isCouponPrice={product.isCouponPrice || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}