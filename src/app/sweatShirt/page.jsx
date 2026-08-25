// "use client";

// import * as React from "react";
// import { motion } from "framer-motion";

// const cn = (...classes) => classes.filter(Boolean).join(" ");

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// const ProductCard = React.forwardRef((
//   {
//     className,
//     imageUrl,
//     name,
//     tagline,
//     price,
//     currency = "pkr",
//     isCouponPrice = false,
//     originalPrice,
//     offerText,
//     ...props
//   },
//   ref
// ) => {
//   const formatPrice = (amount) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "pkr",
//       minimumFractionDigits: 0,
//     })
//       .format(amount)
//       .replace("pkr", `${currency}`);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       className={cn(
//         "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 text-center text-zinc-900 dark:text-zinc-50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-zinc-200 dark:border-zinc-800",
//         className
//       )}
//       whileHover={{ y: -5 }}
//       transition={{ type: "spring", stiffness: 300 }}
//       {...props}
//     >
//       {/* Image ab card ki full width leti hai, corners bhi card ke rounded corners ke sath match karte hain */}
//       <div className="relative w-full aspect-square overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={name}
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//       </div>

//       <div className="flex flex-grow flex-col items-center gap-2 px-6 pt-4">
//         <h3 className="font-semibold text-base">{name}</h3>
//         <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
//       </div>

//       <div className="mt-4 flex flex-col items-center gap-2 px-6 pb-6">
//         <div className="flex flex-col items-center">
//           <span className="text-2xl font-bold">{formatPrice(price)}</span>
//           {isCouponPrice && (
//             <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
//               Coupon Price
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">
//           {originalPrice && (
//             <span className="text-zinc-400 dark:text-zinc-500 line-through">
//               {formatPrice(originalPrice)}
//             </span>
//           )}
//           {offerText && (
//             <span className="font-semibold text-yellow-600 dark:text-yellow-500">
//               {offerText}
//             </span>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// ProductCard.displayName = "ProductCard";

// export default function SweatshirtPage() {
//   const [allProducts, setAllProducts] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState("");

//   React.useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         // 🟢 Sweatshirt ka apna backend endpoint
//         const res = await fetch(`${API_BASE_URL}/api/sweatshirtproducts`);
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

//   // Jab tak products load na ho jaye, ya error aaye, ya list empty ho — kuch bhi render na karo
//   if (loading || error || allProducts.length === 0) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
//           Sweatshirts Catalog
//         </h1>

//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
//           {allProducts.map((product) => (
//             <ProductCard
//               key={product._id}
//               name={product.name}
//               tagline={product.tagline}
//               price={product.price}
//               originalPrice={product.originalPrice}
//               offerText={product.offerText}
//               imageUrl={product.imageUrl}
//               isCouponPrice={product.isCouponPrice || false}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





























"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // 1. useRouter import kiya

const cn = (...classes) => classes.filter(Boolean).join(" ");

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ProductCard = React.forwardRef((
  {
    className,
    imageUrl,
    name,
    tagline,
    price,
    currency = "pkr",
    isCouponPrice = false,
    originalPrice,
    offerText,
    onClick, // 2. onClick prop add kiya
    ...props
  },
  ref
) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "pkr",
      minimumFractionDigits: 0,
    })
      .format(amount)
      .replace("pkr", `${currency}`);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick} // 3. Div par onClick lagaya
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-xl border bg-white dark:bg-zinc-900 text-center text-zinc-900 dark:text-zinc-50 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md border-zinc-200 dark:border-zinc-800 cursor-pointer", // 4. cursor-pointer add kiya
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      {...props}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-grow flex-col items-center gap-2 px-6 pt-4">
        <h3 className="font-semibold text-base">{name}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{tagline}</p>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 px-6 pb-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">{formatPrice(price)}</span>
          {isCouponPrice && (
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
              Coupon Price
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">
          {originalPrice && (
            <span className="text-zinc-400 dark:text-zinc-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {offerText && (
            <span className="font-semibold text-yellow-600 dark:text-yellow-500">
              {offerText}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = "ProductCard";

export default function SweatshirtPage() {
  const router = useRouter(); // 5. Router initialize kiya
  
  const [allProducts, setAllProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE_URL}/api/sweatshirtproducts`);
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

  if (loading || error || allProducts.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
          Sweatshirts Catalog
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              tagline={product.tagline}
              price={product.price}
              originalPrice={product.originalPrice}
              offerText={product.offerText}
              imageUrl={product.imageUrl}
              isCouponPrice={product.isCouponPrice || false}
              onClick={() => router.push(`/products/${product.slug || product._id}`)} // 6. Card par router.push laga diya
            />
          ))}
        </div>
      </div>
    </div>
  );
}