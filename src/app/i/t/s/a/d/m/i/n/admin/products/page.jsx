  // "use client";

  // import * as React from "react";
  // import { useRouter } from "next/navigation";

  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // // 🟢 NEW: Ezzywalk endpoint shamil kiya gaya
  // const ENDPOINTS = {
  //   oversized: "/api/Addproducts",
  //   "regular-fit": "/api/regularproducts",
  //   sweatshirt: "/api/sweatshirtproducts",
  //   ezzywalk: "/api/ezzywalkproducts",
  // };

  // const EMPTY_FORM = {
  //   productType: "oversized",
  //   name: "",
  //   tagline: "",
  //   offerText: "",
  //   price: "",
  //   originalPrice: "",
  //   description: "",
  //   imageUrl: "",
  //   saleEndTime: "",
  // };

  // export default function AdminProductUploadPage() {
  //   const router = useRouter();

  //   const [formData, setFormData] = React.useState(EMPTY_FORM);

  //   const [message, setMessage] = React.useState("");
  //   const [uploadType, setUploadType] = React.useState("link");
  //   const [products, setProducts] = React.useState([]); 
  //   const [loadingProducts, setLoadingProducts] = React.useState(true);
  //   const [submitting, setSubmitting] = React.useState(false);
  //   const [uploadingImage, setUploadingImage] = React.useState(false);
  //   const [rowActionId, setRowActionId] = React.useState(null);

  //   const [showForm, setShowForm] = React.useState(false);
  //   const [editingId, setEditingId] = React.useState(null);

  //   // 🟢 NEW: Filter tab state ("all", "oversized", "regular-fit", "sweatshirt", "ezzywalk")
  //   const [filterType, setFilterType] = React.useState("all");

  //   const formTopRef = React.useRef(null);

  //   React.useEffect(() => {
  //     loadProducts();
  //   }, []);

  //   // 🟢 NEW: Teeno aur Ezzywalk ke endpoints se products fetch karke merge karna
  //   const loadProducts = async () => {
  //     setLoadingProducts(true);
  //     try {
  //       const [oversizedRes, regularRes, sweatshirtRes, ezzywalkRes] = await Promise.all([
  //         fetch(`${API_BASE_URL}${ENDPOINTS.oversized}`),
  //         fetch(`${API_BASE_URL}${ENDPOINTS["regular-fit"]}`),
  //         fetch(`${API_BASE_URL}${ENDPOINTS.sweatshirt}`),
  //         fetch(`${API_BASE_URL}${ENDPOINTS.ezzywalk}`),
  //       ]);

  //       const oversizedData = await oversizedRes.json();
  //       const regularData = await regularRes.json();
  //       const sweatshirtData = await sweatshirtRes.json();
  //       const ezzywalkData = await ezzywalkRes.json();

  //       const oversizedProducts = oversizedData.success
  //         ? oversizedData.products.map((p) => ({ ...p, _productType: "oversized" }))
  //         : [];
  //       const regularProducts = regularData.success
  //         ? regularData.products.map((p) => ({ ...p, _productType: "regular-fit" }))
  //         : [];
  //       const sweatshirtProducts = sweatshirtData.success
  //         ? sweatshirtData.products.map((p) => ({ ...p, _productType: "sweatshirt" }))
  //         : [];
  //       const ezzywalkProducts = ezzywalkData.success
  //         ? ezzywalkData.products.map((p) => ({ ...p, _productType: "ezzywalk" }))
  //         : [];

  //       setProducts(
  //         [...oversizedProducts, ...regularProducts, ...sweatshirtProducts, ...ezzywalkProducts].sort(
  //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //         )
  //       );

  //       if (!oversizedData.success || !regularData.success || !sweatshirtData.success || !ezzywalkData.success) {
  //         setMessage("⚠️ Kuch products load nahi ho sake. Please reload karein.");
  //       }
  //     } catch (err) {
  //       console.error("loadProducts error:", err);
  //       setMessage("❌ can't connect to server. please check your internet connection or reload page!");
  //     } finally {
  //       setLoadingProducts(false);
  //     }
  //   };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   };

  //   const handleImageFileChange = async (e) => {
  //     const file = e.target.files[0];
  //     if (!file) return;

  //     if (file.size > 5 * 1024 * 1024) {
  //       setMessage("❌ Image size should minimum 5MB!");
  //       return;
  //     }

  //     const uploadData = new FormData();
  //     uploadData.append("image", file);

  //     setUploadingImage(true);
  //     setMessage("");

  //     try {
  //       const res = await fetch(`${API_BASE_URL}/api/upload`, {
  //         method: "POST",
  //         body: uploadData,
  //       });
  //       const data = await res.json();

  //       if (data.success) {
  //         setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
  //       } else {
  //         setMessage(`❌ ${data.error || "Image could not upload."}`);
  //       }
  //     } catch (err) {
  //       console.error("Image upload error:", err);
  //       setMessage("❌ Image upload failed. Please Check your internet.");
  //     } finally {
  //       setUploadingImage(false);
  //     }
  //   };

  //   const openAddForm = () => {
  //     setEditingId(null);
  //     setFormData(EMPTY_FORM);
  //     setUploadType("link");
  //     setMessage("");
  //     setShowForm(true);
  //     setTimeout(() => {
  //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 0);
  //   };

  //   const openEditForm = (product) => {
  //     setEditingId(product._id);
  //     setFormData({
  //       productType: product._productType || "oversized",
  //       name: product.name || "",
  //       tagline: product.tagline || "",
  //       offerText: product.offerText || "",
  //       price: product.price !== null && product.price !== undefined ? String(product.price) : "",
  //       originalPrice:
  //         product.originalPrice !== null && product.originalPrice !== undefined
  //           ? String(product.originalPrice)
  //           : "",
  //       description: product.description || "",
  //       imageUrl: product.imageUrl || "",
  //       saleEndTime: product.saleEndTime
  //         ? new Date(product.saleEndTime).toISOString().slice(0, 16)
  //         : "",
  //     });
  //     setUploadType("link");
  //     setMessage("");
  //     setShowForm(true);
  //     setTimeout(() => {
  //       formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  //     }, 0);
  //   };

  //   const closeForm = () => {
  //     setShowForm(false);
  //     setEditingId(null);
  //     setFormData(EMPTY_FORM);
  //     setMessage("");
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!formData.name || !formData.price || !formData.imageUrl) {
  //       setMessage("❌ Title, Price & Image are require.");
  //       return;
  //     }

  //     setSubmitting(true);
  //     setMessage("");

  //     const payload = {
  //       name: formData.name,
  //       tagline: formData.tagline,
  //       offerText: formData.offerText || null,
  //       price: formData.price,
  //       originalPrice: formData.originalPrice || null,
  //       description: formData.description,
  //       imageUrl: formData.imageUrl,
  //       saleEndTime: formData.saleEndTime || null,
  //     };

  //     const basePath = ENDPOINTS[formData.productType];

  //     try {
  //       let res;
  //       if (editingId) {
  //         res = await fetch(`${API_BASE_URL}${basePath}/${editingId}`, {
  //           method: "PUT",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(payload),
  //         });
  //       } else {
  //         res = await fetch(`${API_BASE_URL}${basePath}`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(payload),
  //         });
  //       }

  //       const data = await res.json();

  //       if (!data.success) {
  //         setMessage(`❌ ${data.error || "Something went wrong."}`);
  //         setSubmitting(false);
  //         return;
  //       }

  //       setMessage(editingId ? "✅ Your product successfully updated!" : "✅ Product has been successfully upload!");

  //       setFormData(EMPTY_FORM);
  //       setEditingId(null);
  //       setShowForm(false);

  //       await loadProducts();

  //       setTimeout(() => setMessage(""), 3000);
  //     } catch (err) {
  //       console.error("handleSubmit error:", err);
  //       setMessage("❌ Can't connect to server. Please check your internet or reload page!");
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  //   const toggleSoldOut = async (product) => {
  //     const basePath = ENDPOINTS[product._productType];
  //     setRowActionId(product._id);
  //     try {
  //       const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}/sold-out`, {
  //         method: "PATCH",
  //       });
  //       const data = await res.json();
  //       if (data.success) {
  //         setProducts((prev) =>
  //           prev.map((p) => (p._id === product._id ? { ...data.product, _productType: product._productType } : p))
  //         );
  //       } else {
  //         setMessage(`❌ ${data.error || "Could not update status."}`);
  //       }
  //     } catch (err) {
  //       console.error("toggleSoldOut error:", err);
  //       setMessage("❌ Can't connect to server.");
  //     } finally {
  //       setRowActionId(null);
  //     }
  //   };

  //   const deleteProduct = async (product) => {
  //     const basePath = ENDPOINTS[product._productType];
  //     setRowActionId(product._id);
  //     try {
  //       const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}`, {
  //         method: "DELETE",
  //       });
  //       const data = await res.json();
  //       if (data.success) {
  //         setProducts((prev) => prev.filter((p) => p._id !== product._id));
  //         if (editingId === product._id) {
  //           closeForm();
  //         }
  //       } else {
  //         setMessage(`❌ ${data.error || "Product could not deleted."}`);
  //       }
  //     } catch (err) {
  //       console.error("deleteProduct error:", err);
  //       setMessage("❌ Could not connect to server.");
  //     } finally {
  //       setRowActionId(null);
  //     }
  //   };

  //   const formatSaleEnd = (isoString) => {
  //     if (!isoString) return null;
  //     const date = new Date(isoString);
  //     return date.toLocaleString("en-PK", {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     });
  //   };

  //   const visibleProducts =
  //     filterType === "all" ? products : products.filter((p) => p._productType === filterType);

  //   // 🟢 Type badge helper (Ezzywalk ke liye alag badge color)
  //   const getTypeBadge = (type) => {
  //     switch (type) {
  //       case "regular-fit":
  //         return {
  //           label: "Regular",
  //           className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  //         };
  //       case "sweatshirt":
  //         return {
  //           label: "Sweatshirt",
  //           className: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  //         };
  //       case "ezzywalk":
  //         return {
  //           label: "Ezzywalk",
  //           className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  //         };
  //       default:
  //         return {
  //           label: "Oversized",
  //           className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  //         };
  //     }
  //   };

  //   return (
  //     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
  //       <div ref={formTopRef} className="max-w-xl mx-auto">
  //         {!showForm && (
  //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
  //             <div>
  //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
  //               <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload a new product.</p>
  //             </div>
  //             <button
  //               type="button"
  //               onClick={openAddForm}
  //               className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
  //             >
  //               + Add Product
  //             </button>
  //           </div>
  //         )}

  //         {showForm && (
  //           <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
  //             <div className="flex items-start justify-between mb-1">
  //               <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
  //                 {editingId ? "Edit Product" : "Store Dashboard"}
  //               </h2>
  //               <button
  //                 type="button"
  //                 onClick={closeForm}
  //                 className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
  //               >
  //                 Close ✕
  //               </button>
  //             </div>
  //             <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
  //               {editingId ? "Update product details." : "Upload new product."}
  //             </p>

  //             {message && (
  //               <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
  //                 {message}
  //               </div>
  //             )}

  //             <form onSubmit={handleSubmit} className="space-y-4">
  //               {/* 🟢 Product Type selector — ab Ezzywalk ka button bhi shamil hai */}
  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
  //                   Product Type *
  //                 </label>
  //                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
  //                   <button
  //                     type="button"
  //                     disabled={!!editingId}
  //                     onClick={() => setFormData((prev) => ({ ...prev, productType: "oversized" }))}
  //                     className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
  //                       formData.productType === "oversized"
  //                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
  //                         : "text-zinc-500"
  //                     }`}
  //                   >
  //                     Oversized
  //                   </button>
  //                   <button
  //                     type="button"
  //                     disabled={!!editingId}
  //                     onClick={() => setFormData((prev) => ({ ...prev, productType: "regular-fit" }))}
  //                     className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
  //                       formData.productType === "regular-fit"
  //                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
  //                         : "text-zinc-500"
  //                     }`}
  //                   >
  //                     Regular Fit
  //                   </button>
  //                   <button
  //                     type="button"
  //                     disabled={!!editingId}
  //                     onClick={() => setFormData((prev) => ({ ...prev, productType: "sweatshirt" }))}
  //                     className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
  //                       formData.productType === "sweatshirt"
  //                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
  //                         : "text-zinc-500"
  //                     }`}
  //                   >
  //                     Sweatshirt
  //                   </button>
  //                   <button
  //                     type="button"
  //                     disabled={!!editingId}
  //                     onClick={() => setFormData((prev) => ({ ...prev, productType: "ezzywalk" }))}
  //                     className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
  //                       formData.productType === "ezzywalk"
  //                         ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
  //                         : "text-zinc-500"
  //                     }`}
  //                   >
  //                     Ezzywalk
  //                   </button>
  //                 </div>
  //                 {editingId && (
  //                   <p className="text-[10px] text-zinc-400 mt-1">
  //                     Product type edit mode mein change nahi ki ja sakti.
  //                   </p>
  //                 )}
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
  //                 <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
  //                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie / Slippers" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Second Title / Tagline</label>
  //                 <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth / Soft cushioning" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //               </div>

  //               <div className="grid grid-cols-2 gap-4">
  //                 <div>
  //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
  //                   <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //                 </div>
  //                 <div>
  //                   <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
  //                   <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //                 </div>
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
  //                   sale duration? (Optional)
  //                 </label>
  //                 <input
  //                   type="datetime-local"
  //                   name="saleEndTime"
  //                   value={formData.saleEndTime}
  //                   onChange={handleChange}
  //                   className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">Image Source Selection</label>
  //                 <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
  //                   <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
  //                   <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
  //                 </div>

  //                 {uploadType === "link" ? (
  //                   <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
  //                 ) : (
  //                   <div className="flex items-center justify-center w-full">
  //                     <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
  //                       <div className="flex flex-col items-center justify-center pt-3 pb-4">
  //                         <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //                           {uploadingImage ? (
  //                             <span className="font-semibold">Uploading...</span>
  //                           ) : (
  //                             <>
  //                               <span className="font-semibold">Click to upload</span> or drag and drop
  //                             </>
  //                           )}
  //                         </p>
  //                         <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
  //                       </div>
  //                       <input
  //                         type="file"
  //                         accept="image/*"
  //                         onChange={handleImageFileChange}
  //                         disabled={uploadingImage}
  //                         className="hidden"
  //                       />
  //                     </label>
  //                   </div>
  //                 )}
  //                 {formData.imageUrl && (
  //                   <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
  //                     <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
  //                   </div>
  //                 )}
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
  //                 <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Enter product details..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
  //               </div>

  //               <div className="flex gap-3 mt-4">
  //                 <button
  //                   type="button"
  //                   onClick={closeForm}
  //                   disabled={submitting}
  //                   className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   type="submit"
  //                   disabled={submitting || uploadingImage}
  //                   className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
  //                 >
  //                   {submitting
  //                     ? editingId
  //                       ? "Updating..."
  //                       : "Uploading..."
  //                     : editingId
  //                     ? "Update Product"
  //                     : "Upload Product"}
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         )}
  //       </div>

  //       {/* Uploaded Products List Section */}
  //       <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
  //         <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
  //         <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
  //           Total {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}. Here you can edit, sold out mark or delete.
  //         </p>

  //         {/* 🟢 Filter tabs — ab Ezzywalk ke liye alag button shamil hai */}
  //         <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
  //           {[
  //             { key: "all", label: "All" },
  //             { key: "oversized", label: "Oversized" },
  //             { key: "regular-fit", label: "Regular" },
  //             { key: "sweatshirt", label: "Sweatshirt" },
  //             { key: "ezzywalk", label: "Ezzywalk" },
  //           ].map((tab) => (
  //             <button
  //               key={tab.key}
  //               type="button"
  //               onClick={() => setFilterType(tab.key)}
  //               className={`flex-1 min-w-[70px] py-1.5 text-xs font-medium rounded-lg transition-colors ${
  //                 filterType === tab.key
  //                   ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
  //                   : "text-zinc-500"
  //               }`}
  //             >
  //               {tab.label}
  //             </button>
  //           ))}
  //         </div>

  //         {!showForm && message && (
  //           <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
  //             {message}
  //           </div>
  //         )}

  //         {loadingProducts ? (
  //           <p className="text-sm text-zinc-400 text-center py-6">Products loading...</p>
  //         ) : visibleProducts.length === 0 ? (
  //           <p className="text-sm text-zinc-400 text-center py-6">There is no product uploaded yet.</p>
  //         ) : (
  //           <div className="space-y-3">
  //             {visibleProducts.map((product) => {
  //               const badge = getTypeBadge(product._productType);
  //               return (
  //                 <div
  //                   key={product._id}
  //                   className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
  //                     editingId === product._id
  //                       ? "border-zinc-900 dark:border-zinc-50"
  //                       : "border-zinc-200 dark:border-zinc-800"
  //                   }`}
  //                 >
  //                   <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
  //                     <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
  //                     {product.soldOut && (
  //                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
  //                         <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
  //                       </div>
  //                     )}
  //                   </div>

  //                   <div className="flex-1 min-w-0">
  //                     <div className="flex items-center gap-1.5">
  //                       <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
  //                       <span
  //                         className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${badge.className}`}
  //                       >
  //                         {badge.label}
  //                       </span>
  //                     </div>
  //                     <p className="text-xs text-zinc-500 dark:text-zinc-400">
  //                       Rs. {product.price}
  //                       {product.discountPercent ? ` • ${product.discountPercent}` : ""}
  //                     </p>
  //                     {product.saleEndTime && (
  //                       <p className="text-[10px] text-zinc-400 mt-0.5">
  //                         ⏳ Sale end: {formatSaleEnd(product.saleEndTime)}
  //                       </p>
  //                     )}
  //                   </div>

  //                   <div className="flex flex-col gap-1.5 shrink-0">
  //                     <button
  //                       type="button"
  //                       onClick={() => openEditForm(product)}
  //                       disabled={rowActionId === product._id}
  //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
  //                     >
  //                       Edit
  //                     </button>
  //                     <button
  //                       type="button"
  //                       onClick={() => toggleSoldOut(product)}
  //                       disabled={rowActionId === product._id}
  //                       className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
  //                         product.soldOut
  //                           ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
  //                           : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
  //                       }`}
  //                     >
  //                       {rowActionId === product._id
  //                         ? "..."
  //                         : product.soldOut
  //                         ? "Mark Available"
  //                         : "Mark Sold Out"}
  //                     </button>
  //                     <button
  //                       type="button"
  //                       onClick={() => deleteProduct(product)}
  //                       disabled={rowActionId === product._id}
  //                       className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
  //                     >
  //                       {rowActionId === product._id ? "..." : "Delete"}
  //                     </button>
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
  // }
























  "use client";

import * as React from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ENDPOINTS = {
  oversized: "/api/Addproducts",
  "regular-fit": "/api/regularproducts",
  sweatshirt: "/api/sweatshirtproducts",
  ezzywalk: "/api/ezzywalkproducts",
};

const EMPTY_FORM = {
  productType: "oversized",
  name: "",
  tagline: "",
  offerText: "",
  price: "",
  originalPrice: "",
  description: "",
  imageUrl: "",
  images: [], // 🟢 NEW: gallery images array (cover image ke ilawa extra photos)
  saleEndTime: "",
};

export default function AdminProductUploadPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState(EMPTY_FORM);

  const [message, setMessage] = React.useState("");
  const [uploadType, setUploadType] = React.useState("link");
  const [galleryUploadType, setGalleryUploadType] = React.useState("link"); // 🟢 NEW
  const [galleryLinkInput, setGalleryLinkInput] = React.useState(""); // 🟢 NEW
  const [products, setProducts] = React.useState([]);
  const [loadingProducts, setLoadingProducts] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [uploadingGallery, setUploadingGallery] = React.useState(false); // 🟢 NEW
  const [rowActionId, setRowActionId] = React.useState(null);

  const [showForm, setShowForm] = React.useState(false);
  const [editingId, setEditingId] = React.useState(null);

  const [filterType, setFilterType] = React.useState("all");

  const formTopRef = React.useRef(null);

  React.useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const [oversizedRes, regularRes, sweatshirtRes, ezzywalkRes] = await Promise.all([
        fetch(`${API_BASE_URL}${ENDPOINTS.oversized}`),
        fetch(`${API_BASE_URL}${ENDPOINTS["regular-fit"]}`),
        fetch(`${API_BASE_URL}${ENDPOINTS.sweatshirt}`),
        fetch(`${API_BASE_URL}${ENDPOINTS.ezzywalk}`),
      ]);

      const oversizedData = await oversizedRes.json();
      const regularData = await regularRes.json();
      const sweatshirtData = await sweatshirtRes.json();
      const ezzywalkData = await ezzywalkRes.json();

      const oversizedProducts = oversizedData.success
        ? oversizedData.products.map((p) => ({ ...p, _productType: "oversized" }))
        : [];
      const regularProducts = regularData.success
        ? regularData.products.map((p) => ({ ...p, _productType: "regular-fit" }))
        : [];
      const sweatshirtProducts = sweatshirtData.success
        ? sweatshirtData.products.map((p) => ({ ...p, _productType: "sweatshirt" }))
        : [];
      const ezzywalkProducts = ezzywalkData.success
        ? ezzywalkData.products.map((p) => ({ ...p, _productType: "ezzywalk" }))
        : [];

      setProducts(
        [...oversizedProducts, ...regularProducts, ...sweatshirtProducts, ...ezzywalkProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );

      if (!oversizedData.success || !regularData.success || !sweatshirtData.success || !ezzywalkData.success) {
        setMessage("⚠️ Kuch products load nahi ho sake. Please reload karein.");
      }
    } catch (err) {
      console.error("loadProducts error:", err);
      setMessage("❌ can't connect to server. please check your internet connection or reload page!");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ------- Cover image (single) -------
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage("❌ Image size should minimum 5MB!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("image", file);

    setUploadingImage(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      } else {
        setMessage(`❌ ${data.error || "Image could not upload."}`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setMessage("❌ Image upload failed. Please Check your internet.");
    } finally {
      setUploadingImage(false);
    }
  };

  // ------- 🟢 NEW: Gallery images (multiple) -------
  const handleGalleryFilesChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const tooLarge = files.find((f) => f.size > 5 * 1024 * 1024);
    if (tooLarge) {
      setMessage("❌ Har image ka size 5MB se kam hona chahiye.");
      return;
    }

    setUploadingGallery(true);
    setMessage("");

    try {
      const uploadedUrls = [];

      // Ek ek karke sab files upload karo (backend ek time pe ek file leta hai)
      for (const file of files) {
        const uploadData = new FormData();
        uploadData.append("image", file);

        const res = await fetch(`${API_BASE_URL}/api/upload`, {
          method: "POST",
          body: uploadData,
        });
        const data = await res.json();

        if (data.success) {
          uploadedUrls.push(data.imageUrl);
        } else {
          setMessage(`❌ Kuch images upload nahi ho saki: ${data.error || ""}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls],
        }));
      }
    } catch (err) {
      console.error("Gallery upload error:", err);
      setMessage("❌ Gallery images upload nahi ho sakin. Internet check karein.");
    } finally {
      setUploadingGallery(false);
      e.target.value = ""; // taake same file dobara select ho sake
    }
  };

  // 🟢 NEW: paste link se gallery mein image add karna
  const addGalleryLink = () => {
    const trimmed = galleryLinkInput.trim();
    if (!trimmed) return;

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, trimmed],
    }));
    setGalleryLinkInput("");
  };

  // 🟢 NEW: gallery se koi ek image hatana
  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setUploadType("link");
    setGalleryUploadType("link");
    setGalleryLinkInput("");
    setMessage("");
    setShowForm(true);
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const openEditForm = (product) => {
    setEditingId(product._id);
    setFormData({
      productType: product._productType || "oversized",
      name: product.name || "",
      tagline: product.tagline || "",
      offerText: product.offerText || "",
      price: product.price !== null && product.price !== undefined ? String(product.price) : "",
      originalPrice:
        product.originalPrice !== null && product.originalPrice !== undefined
          ? String(product.originalPrice)
          : "",
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      images: Array.isArray(product.images) ? product.images : [], // 🟢 NEW
      saleEndTime: product.saleEndTime
        ? new Date(product.saleEndTime).toISOString().slice(0, 16)
        : "",
    });
    setUploadType("link");
    setGalleryUploadType("link");
    setGalleryLinkInput("");
    setMessage("");
    setShowForm(true);
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setGalleryLinkInput("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.imageUrl) {
      setMessage("❌ Title, Price & Image are require.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = {
      name: formData.name,
      tagline: formData.tagline,
      offerText: formData.offerText || null,
      price: formData.price,
      originalPrice: formData.originalPrice || null,
      description: formData.description,
      imageUrl: formData.imageUrl,
      images: formData.images, // 🟢 NEW: gallery images bhi bhej rahe hain
      saleEndTime: formData.saleEndTime || null,
    };

    const basePath = ENDPOINTS[formData.productType];

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_BASE_URL}${basePath}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE_URL}${basePath}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (!data.success) {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
        setSubmitting(false);
        return;
      }

      setMessage(editingId ? "✅ Your product successfully updated!" : "✅ Product has been successfully upload!");

      setFormData(EMPTY_FORM);
      setEditingId(null);
      setShowForm(false);

      await loadProducts();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("handleSubmit error:", err);
      setMessage("❌ Can't connect to server. Please check your internet or reload page!");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSoldOut = async (product) => {
    const basePath = ENDPOINTS[product._productType];
    setRowActionId(product._id);
    try {
      const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}/sold-out`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p._id === product._id ? { ...data.product, _productType: product._productType } : p))
        );
      } else {
        setMessage(`❌ ${data.error || "Could not update status."}`);
      }
    } catch (err) {
      console.error("toggleSoldOut error:", err);
      setMessage("❌ Can't connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

  const deleteProduct = async (product) => {
    const basePath = ENDPOINTS[product._productType];
    setRowActionId(product._id);
    try {
      const res = await fetch(`${API_BASE_URL}${basePath}/${product._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== product._id));
        if (editingId === product._id) {
          closeForm();
        }
      } else {
        setMessage(`❌ ${data.error || "Product could not deleted."}`);
      }
    } catch (err) {
      console.error("deleteProduct error:", err);
      setMessage("❌ Could not connect to server.");
    } finally {
      setRowActionId(null);
    }
  };

  const formatSaleEnd = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return date.toLocaleString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const visibleProducts =
    filterType === "all" ? products : products.filter((p) => p._productType === filterType);

  const getTypeBadge = (type) => {
    switch (type) {
      case "regular-fit":
        return {
          label: "Regular",
          className: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
        };
      case "sweatshirt":
        return {
          label: "Sweatshirt",
          className: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
        };
      case "ezzywalk":
        return {
          label: "Ezzywalk",
          className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
        };
      default:
        return {
          label: "Oversized",
          className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div ref={formTopRef} className="max-w-xl mx-auto">
        {!showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Store Dashboard</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Upload a new product.</p>
            </div>
            <button
              type="button"
              onClick={openAddForm}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              + Add Product
            </button>
          </div>
        )}

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-start justify-between mb-1">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                {editingId ? "Edit Product" : "Store Dashboard"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Close ✕
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              {editingId ? "Update product details." : "Upload new product."}
            </p>

            {message && (
              <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product Type selector */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Product Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "oversized" }))}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "oversized"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Oversized
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "regular-fit" }))}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "regular-fit"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Regular Fit
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "sweatshirt" }))}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "sweatshirt"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Sweatshirt
                  </button>
                  <button
                    type="button"
                    disabled={!!editingId}
                    onClick={() => setFormData((prev) => ({ ...prev, productType: "ezzywalk" }))}
                    className={`py-1.5 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      formData.productType === "ezzywalk"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-500"
                    }`}
                  >
                    Ezzywalk
                  </button>
                </div>
                {editingId && (
                  <p className="text-[10px] text-zinc-400 mt-1">
                    Product type edit mode mein change nahi ki ja sakti.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Offer Badge / Tag (Optional)</label>
                <input type="text" name="offerText" value={formData.offerText} onChange={handleChange} placeholder="e.g. 🔥 Best Seller, Normal Routine" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Product Title *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Classic Charcoal Hoodie / Slippers" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Second Title / Tagline</label>
                <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Perfect fleece warmth / Soft cushioning" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Selling Price (PKR) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="1899" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Original Price (PKR)</label>
                  <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="2999" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  sale duration? (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="saleEndTime"
                  value={formData.saleEndTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                />
              </div>

              {/* Cover Image (single, required) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Cover Image * <span className="normal-case font-normal text-zinc-400">(catalog/card par yehi dikhegi)</span>
                </label>
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
                  <button type="button" onClick={() => setUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Link</button>
                  <button type="button" onClick={() => setUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${uploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload from Gallery</button>
                </div>

                {uploadType === "link" ? (
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Paste image link or absolute URL" className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500" />
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingImage ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
                      <div className="flex flex-col items-center justify-center pt-3 pb-4">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {uploadingImage ? (
                            <span className="font-semibold">Uploading...</span>
                          ) : (
                            <>
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">PNG, JPG up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                {formData.imageUrl && (
                  <div className="mt-3 relative w-16 h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* 🟢 NEW: Gallery Images (multiple, optional) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Gallery Images (Optional) <span className="normal-case font-normal text-zinc-400">(product page par extra photos dikhengi)</span>
                </label>
                <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-3">
                  <button type="button" onClick={() => setGalleryUploadType("link")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${galleryUploadType === "link" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Paste Image Links</button>
                  <button type="button" onClick={() => setGalleryUploadType("gallery")} className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${galleryUploadType === "gallery" ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50" : "text-zinc-500"}`}>Upload Multiple</button>
                </div>

                {galleryUploadType === "link" ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={galleryLinkInput}
                      onChange={(e) => setGalleryLinkInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addGalleryLink();
                        }
                      }}
                      placeholder="Paste image link, phir + par tap karein"
                      className="flex-1 px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={addGalleryLink}
                      className="px-4 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${uploadingGallery ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}>
                      <div className="flex flex-col items-center justify-center pt-3 pb-4">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {uploadingGallery ? (
                            <span className="font-semibold">Uploading images...</span>
                          ) : (
                            <>
                              <span className="font-semibold">Click to select multiple images</span> ya drag and drop
                            </>
                          )}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Ek se zyada select kar sakte hain, har ek 5MB tak</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryFilesChange}
                        disabled={uploadingGallery}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {/* Gallery preview grid with remove buttons */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {formData.images.map((img, index) => (
                      <div
                        key={`${img}-${index}`}
                        className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 group"
                      >
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          aria-label="Remove image"
                          className="absolute top-1 right-1 h-5 w-5 flex items-center justify-center rounded-full bg-black/70 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Full Description</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} placeholder="Enter product details..." className="w-full px-4 py-2 text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none" />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="flex-1 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage || uploadingGallery}
                  className="flex-1 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting
                    ? editingId
                      ? "Updating..."
                      : "Uploading..."
                    : editingId
                    ? "Update Product"
                    : "Upload Product"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Uploaded Products List Section */}
      <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">Uploaded Products</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Total {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}. Here you can edit, sold out mark or delete.
        </p>

        <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
          {[
            { key: "all", label: "All" },
            { key: "oversized", label: "Oversized" },
            { key: "regular-fit", label: "Regular" },
            { key: "sweatshirt", label: "Sweatshirt" },
            { key: "ezzywalk", label: "Ezzywalk" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterType(tab.key)}
              className={`flex-1 min-w-[70px] py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterType === tab.key
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-950 dark:text-zinc-50"
                  : "text-zinc-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!showForm && message && (
          <div className="p-3 mb-4 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100">
            {message}
          </div>
        )}

        {loadingProducts ? (
          <p className="text-sm text-zinc-400 text-center py-6">Products loading...</p>
        ) : visibleProducts.length === 0 ? (
          <p className="text-sm text-zinc-400 text-center py-6">There is no product uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {visibleProducts.map((product) => {
              const badge = getTypeBadge(product._productType);
              return (
                <div
                  key={product._id}
                  className={`flex items-center gap-3 p-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/50 ${
                    editingId === product._id
                      ? "border-zinc-900 dark:border-zinc-50"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white uppercase">Sold Out</span>
                      </div>
                    )}
                    {Array.isArray(product.images) && product.images.length > 0 && (
                      <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[8px] font-bold px-1 rounded-tl-md">
                        +{product.images.length}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{product.name}</p>
                      <span
                        className={`shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Rs. {product.price}
                      {product.discountPercent ? ` • ${product.discountPercent}` : ""}
                    </p>
                    {product.saleEndTime && (
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        ⏳ Sale end: {formatSaleEnd(product.saleEndTime)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditForm(product)}
                      disabled={rowActionId === product._id}
                      className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleSoldOut(product)}
                      disabled={rowActionId === product._id}
                      className={`px-3 py-1 text-[10px] font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                        product.soldOut
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                      }`}
                    >
                      {rowActionId === product._id
                        ? "..."
                        : product.soldOut
                        ? "Mark Available"
                        : "Mark Sold Out"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(product)}
                      disabled={rowActionId === product._id}
                      className="px-3 py-1 text-[10px] font-semibold rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
                    >
                      {rowActionId === product._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}