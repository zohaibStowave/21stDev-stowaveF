// // "use client";

// // import { useState, useCallback } from "react";
// // import Cropper from "react-easy-crop";
// // import { UploadCloud, X, Loader2, Check, ImagePlus } from "lucide-react";

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // async function getCroppedImg(imageSrc, croppedAreaPixels) {
// //   const image = await new Promise((resolve, reject) => {
// //     const img = new Image();
// //     img.crossOrigin = "anonymous";
// //     img.onload = () => resolve(img);
// //     img.onerror = reject;
// //     img.src = imageSrc;
// //   });

// //   const canvas = document.createElement("canvas");
// //   canvas.width = croppedAreaPixels.width;
// //   canvas.height = croppedAreaPixels.height;
// //   const ctx = canvas.getContext("2d");

// //   ctx.drawImage(
// //     image,
// //     croppedAreaPixels.x,
// //     croppedAreaPixels.y,
// //     croppedAreaPixels.width,
// //     croppedAreaPixels.height,
// //     0,
// //     0,
// //     croppedAreaPixels.width,
// //     croppedAreaPixels.height
// //   );

// //   return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
// // }

// // export default function SliderUpload({ onUploaded }) {
// //   const [imageSrc, setImageSrc] = useState(null);
// //   const [crop, setCrop] = useState({ x: 0, y: 0 });
// //   const [zoom, setZoom] = useState(1);
// //   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
// //   const [caption, setCaption] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   const onFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => setImageSrc(reader.result);
// //     reader.readAsDataURL(file);
// //   };

// //   const onDrop = (e) => {
// //     e.preventDefault();
// //     const file = e.dataTransfer.files[0];
// //     if (!file || !file.type.startsWith("image/")) return;
// //     const reader = new FileReader();
// //     reader.onload = () => setImageSrc(reader.result);
// //     reader.readAsDataURL(file);
// //   };

// //   const onCropComplete = useCallback((_, pixels) => {
// //     setCroppedAreaPixels(pixels);
// //   }, []);

// //   const reset = () => {
// //     setImageSrc(null);
// //     setCrop({ x: 0, y: 0 });
// //     setZoom(1);
// //     setCaption("");
// //   };

// //   const handleUpload = async () => {
// //     if (!imageSrc || !croppedAreaPixels) return;
// //     setLoading(true);
// //     try {
// //       const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
// //       const formData = new FormData();
// //       formData.append("image", blob, "slider.jpg");
// //       formData.append("caption", caption);

// //       const res = await fetch(`${API_BASE_URL}/api/slider`, {
// //         method: "POST",
// //         body: formData,
// //       });
// //       const data = await res.json();

// //       if (data.success) {
// //         setSuccess(true);
// //         onUploaded?.(data.item);
// //         setTimeout(() => {
// //           setSuccess(false);
// //           reset();
// //         }, 1200);
// //       } else {
// //         alert(data.error || "Upload nahi ho saka");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Kuch ghalat ho gaya, dobara koshish karein");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur  py-[50px] mt-30 sm:p-8 shadow-xl">
// //       <div className="flex items-center gap-3 mb-6">
// //         <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
// //           <ImagePlus size={20} />
// //         </div>
// //         <div>
// //           <h2 className="text-white font-semibold text-lg">Slider Image Upload</h2>
// //           <p className="text-neutral-400 text-sm">Crop area wahi hai jo banner mein show hoga</p>
// //         </div>
// //       </div>

// //       {!imageSrc ? (
// //         <label
// //           onDrop={onDrop}
// //           onDragOver={(e) => e.preventDefault()}
// //           className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-700 hover:border-blue-500/60 rounded-xl p-10 cursor-pointer transition-colors"
// //         >
// //           <UploadCloud className="text-neutral-500" size={36} />
// //           <div className="text-center">
// //             <p className="text-neutral-300 text-sm font-medium">
// //               Image yahan drag karein ya click kar ke select karein
// //             </p>
// //             <p className="text-neutral-500 text-xs mt-1">PNG, JPG — max 8MB</p>
// //           </div>
// //           <input
// //             type="file"
// //             accept="image/*"
// //             onChange={onFileChange}
// //             className="hidden"
// //           />
// //         </label>
// //       ) : (
// //         <>
// //           <div className="relative w-full aspect-[16/9] bg-black rounded-xl overflow-hidden border border-white/10">
// //             <Cropper
// //               image={imageSrc}
// //               crop={crop}
// //               zoom={zoom}
// //               aspect={16 / 9}
// //               onCropChange={setCrop}
// //               onZoomChange={setZoom}
// //               onCropComplete={onCropComplete}
// //             />
// //             <button
// //               onClick={reset}
// //               className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
// //               aria-label="Cancel"
// //             >
// //               <X size={16} />
// //             </button>
// //           </div>

// //           <div className="flex items-center gap-3 mt-4">
// //             <span className="text-xs text-neutral-400 w-12">Zoom</span>
// //             <input
// //               type="range"
// //               min={1}
// //               max={3}
// //               step={0.05}
// //               value={zoom}
// //               onChange={(e) => setZoom(Number(e.target.value))}
// //               className="flex-1 accent-blue-500"
// //             />
// //           </div>

// //           <input
// //             type="text"
// //             placeholder="Caption likhein (optional)"
// //             value={caption}
// //             onChange={(e) => setCaption(e.target.value)}
// //             className="w-full mt-4 px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 outline-none focus:border-blue-500/60 transition-colors"
// //           />

// //           <div className="flex gap-3 mt-5">
// //             <button
// //               onClick={reset}
// //               className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               onClick={handleUpload}
// //               disabled={loading || success}
// //               className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium transition-colors"
// //             >
// //               {loading ? (
// //                 <>
// //                   <Loader2 size={16} className="animate-spin" /> Upload ho raha hai...
// //                 </>
// //               ) : success ? (
// //                 <>
// //                   <Check size={16} /> Ho gaya!
// //                 </>
// //               ) : (
// //                 "Upload Karein"
// //               )}
// //             </button>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }























// // "use client";

// // import { useState, useCallback, useEffect } from "react";
// // import Cropper from "react-easy-crop";
// // import {
// //   UploadCloud,
// //   X,
// //   Loader2,
// //   Check,
// //   ImagePlus,
// //   Pencil,
// //   Trash2,
// //   ImageOff,
// // } from "lucide-react";

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// // async function getCroppedImg(imageSrc, croppedAreaPixels) {
// //   const image = await new Promise((resolve, reject) => {
// //     const img = new Image();
// //     img.crossOrigin = "anonymous";
// //     img.onload = () => resolve(img);
// //     img.onerror = reject;
// //     img.src = imageSrc;
// //   });

// //   const canvas = document.createElement("canvas");
// //   canvas.width = croppedAreaPixels.width;
// //   canvas.height = croppedAreaPixels.height;
// //   const ctx = canvas.getContext("2d");

// //   ctx.drawImage(
// //     image,
// //     croppedAreaPixels.x,
// //     croppedAreaPixels.y,
// //     croppedAreaPixels.width,
// //     croppedAreaPixels.height,
// //     0,
// //     0,
// //     croppedAreaPixels.width,
// //     croppedAreaPixels.height
// //   );

// //   return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
// // }

// // export default function SliderUpload() {
// //   // Upload form state
// //   const [imageSrc, setImageSrc] = useState(null);
// //   const [crop, setCrop] = useState({ x: 0, y: 0 });
// //   const [zoom, setZoom] = useState(1);
// //   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
// //   const [caption, setCaption] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   // Edit mode: null = naya upload, ID string = existing item edit ho raha hai
// //   const [editingId, setEditingId] = useState(null);
// //   const [replaceImage, setReplaceImage] = useState(false); // edit mein image badalni hai ya sirf caption

// //   // Existing items list
// //   const [items, setItems] = useState([]);
// //   const [listLoading, setListLoading] = useState(true);
// //   const [deletingId, setDeletingId] = useState(null);

// //   const fetchItems = async () => {
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/slider`);
// //       const data = await res.json();
// //       if (data.success) setItems(data.items);
// //     } catch (err) {
// //       console.error("Fetch error:", err);
// //     } finally {
// //       setListLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchItems();
// //   }, []);

// //   const onFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       setImageSrc(reader.result);
// //       setReplaceImage(true);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const onDrop = (e) => {
// //     e.preventDefault();
// //     const file = e.dataTransfer.files[0];
// //     if (!file || !file.type.startsWith("image/")) return;
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       setImageSrc(reader.result);
// //       setReplaceImage(true);
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const onCropComplete = useCallback((_, pixels) => {
// //     setCroppedAreaPixels(pixels);
// //   }, []);

// //   const reset = () => {
// //     setImageSrc(null);
// //     setCrop({ x: 0, y: 0 });
// //     setZoom(1);
// //     setCaption("");
// //     setEditingId(null);
// //     setReplaceImage(false);
// //   };

// //   // Edit button dabane par existing image ko cropper mein load karna
// //   const startEdit = (item) => {
// //     setEditingId(item._id);
// //     setCaption(item.caption || "");
// //     setImageSrc(item.imgUrl); // existing Cloudinary image cropper mein dikhegi
// //     setCrop({ x: 0, y: 0 });
// //     setZoom(1);
// //     setReplaceImage(false); // pehle sirf caption edit; nayi file select karein to true ho jayega
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   };

// //   const handleSave = async () => {
// //     setLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append("caption", caption);

// //       // Sirf tab image cloudinary ko bhejein jab nayi file replace ki gayi ho
// //       if (replaceImage && croppedAreaPixels) {
// //         const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
// //         formData.append("image", blob, "slider.jpg");
// //       }

// //       const url = editingId
// //         ? `${API_BASE_URL}/api/slider/${editingId}`
// //         : `${API_BASE_URL}/api/slider`;
// //       const method = editingId ? "PUT" : "POST";

// //       const res = await fetch(url, { method, body: formData });
// //       const data = await res.json();

// //       if (data.success) {
// //         setSuccess(true);
// //         if (editingId) {
// //           setItems((prev) =>
// //             prev.map((it) => (it._id === editingId ? data.item : it))
// //           );
// //         } else {
// //           setItems((prev) => [data.item, ...prev]);
// //         }
// //         setTimeout(() => {
// //           setSuccess(false);
// //           reset();
// //         }, 1000);
// //       } else {
// //         alert(data.error || "Save nahi ho saka");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Kuch ghalat ho gaya, dobara koshish karein");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!confirm("Ye slider image delete karni hai?")) return;
// //     setDeletingId(id);
// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/slider/${id}`, {
// //         method: "DELETE",
// //       });
// //       const data = await res.json();
// //       if (data.success) {
// //         setItems((prev) => prev.filter((it) => it._id !== id));
// //         if (editingId === id) reset();
// //       } else {
// //         alert(data.error || "Delete nahi ho saka");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       alert("Delete nahi ho saka");
// //     } finally {
// //       setDeletingId(null);
// //     }
// //   };

// //   const canSave =
// //     !loading && !success && (editingId ? caption.trim() !== "" || replaceImage || true : croppedAreaPixels);

// //   return (
// //     <div className="w-full max-w-2xl mx-auto py-10 space-y-8">
// //       {/* ---------- Upload / Edit Form ---------- */}
// //       <div className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur py-[50px] px-6 sm:px-8 shadow-xl">
// //         <div className="flex items-center gap-3 mb-6">
// //           <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
// //             {editingId ? <Pencil size={20} /> : <ImagePlus size={20} />}
// //           </div>
// //           <div>
// //             <h2 className="text-white font-semibold text-lg">
// //               {editingId ? "Slider Image Edit Karein" : "Slider Image Upload"}
// //             </h2>
// //             <p className="text-neutral-400 text-sm">
// //               Crop area wahi hai jo banner mein show hoga
// //             </p>
// //           </div>
// //         </div>

// //         {!imageSrc ? (
// //           <label
// //             onDrop={onDrop}
// //             onDragOver={(e) => e.preventDefault()}
// //             className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-700 hover:border-blue-500/60 rounded-xl p-10 cursor-pointer transition-colors"
// //           >
// //             <UploadCloud className="text-neutral-500" size={36} />
// //             <div className="text-center">
// //               <p className="text-neutral-300 text-sm font-medium">
// //                 Image yahan drag karein ya click kar ke select karein
// //               </p>
// //               <p className="text-neutral-500 text-xs mt-1">PNG, JPG — max 8MB</p>
// //             </div>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={onFileChange}
// //               className="hidden"
// //             />
// //           </label>
// //         ) : (
// //           <>
// //             <div className="relative w-full aspect-[21/9] bg-black rounded-xl overflow-hidden border border-white/10">
// //               <Cropper
// //                 image={imageSrc}
// //                 crop={crop}
// //                 zoom={zoom}
// //                 aspect={21 / 9}
// //                 onCropChange={setCrop}
// //                 onZoomChange={setZoom}
// //                 onCropComplete={onCropComplete}
// //               />
// //               <button
// //                 onClick={reset}
// //                 className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
// //                 aria-label="Cancel"
// //               >
// //                 <X size={16} />
// //               </button>
// //             </div>

// //             {editingId && !replaceImage && (
// //               <label className="mt-3 inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
// //                 <UploadCloud size={14} />
// //                 Image badalne ke liye yahan click karein
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   onChange={onFileChange}
// //                   className="hidden"
// //                 />
// //               </label>
// //             )}

// //             <div className="flex items-center gap-3 mt-4">
// //               <span className="text-xs text-neutral-400 w-12">Zoom</span>
// //               <input
// //                 type="range"
// //                 min={1}
// //                 max={3}
// //                 step={0.05}
// //                 value={zoom}
// //                 onChange={(e) => setZoom(Number(e.target.value))}
// //                 className="flex-1 accent-blue-500"
// //               />
// //             </div>

// //             <input
// //               type="text"
// //               placeholder="Caption likhein (optional)"
// //               value={caption}
// //               onChange={(e) => setCaption(e.target.value)}
// //               className="w-full mt-4 px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 outline-none focus:border-blue-500/60 transition-colors"
// //             />

// //             <div className="flex gap-3 mt-5">
// //               <button
// //                 onClick={reset}
// //                 className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleSave}
// //                 disabled={!canSave}
// //                 className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium transition-colors"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <Loader2 size={16} className="animate-spin" />
// //                     {editingId ? "Update ho raha hai..." : "Upload ho raha hai..."}
// //                   </>
// //                 ) : success ? (
// //                   <>
// //                     <Check size={16} /> Ho gaya!
// //                   </>
// //                 ) : editingId ? (
// //                   "Update Karein"
// //                 ) : (
// //                   "Upload Karein"
// //                 )}
// //               </button>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //       {/* ---------- Existing Sliders List ---------- */}
// //       <div>
// //         <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide text-neutral-400">
// //           Current Sliders ({items.length})
// //         </h3>

// //         {listLoading ? (
// //           <p className="text-neutral-500 text-sm">Load ho raha hai...</p>
// //         ) : items.length === 0 ? (
// //           <div className="flex flex-col items-center justify-center gap-2 py-12 border border-dashed border-neutral-800 rounded-xl">
// //             <ImageOff className="text-neutral-600" size={28} />
// //             <p className="text-neutral-500 text-sm">Abhi koi image upload nahi hui</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //             {items.map((item) => (
// //               <div
// //                 key={item._id}
// //                 className={`group relative rounded-xl overflow-hidden border aspect-[21/9] bg-neutral-900 transition-colors ${
// //                   editingId === item._id
// //                     ? "border-blue-500"
// //                     : "border-white/10"
// //                 }`}
// //               >
// //                 {/* <img
// //                   src={item.imgUrl}
// //                   alt={item.caption || "Slider image"}
// //                   className="w-full h-full object-cover"
// //                 /> */}
// //                 <img
// //   src={item.imgUrl}
// //   alt={item.caption || "Slider image"}
// //   className="w-full h-full object-contain"
// // />
// //                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

// //                 {item.caption && (
// //                   <p className="absolute bottom-2 left-3 text-white text-xs font-medium drop-shadow max-w-[75%] truncate">
// //                     {item.caption}
// //                   </p>
// //                 )}

// //                 <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                   <button
// //                     onClick={() => startEdit(item)}
// //                     className="bg-blue-600/90 hover:bg-blue-500 text-white p-2 rounded-full"
// //                     aria-label="Edit image"
// //                   >
// //                     <Pencil size={14} />
// //                   </button>
// //                   <button
// //                     onClick={() => handleDelete(item._id)}
// //                     disabled={deletingId === item._id}
// //                     className="bg-red-600/90 hover:bg-red-500 disabled:opacity-50 text-white p-2 rounded-full"
// //                     aria-label="Delete image"
// //                   >
// //                     {deletingId === item._id ? (
// //                       <Loader2 size={14} className="animate-spin" />
// //                     ) : (
// //                       <Trash2 size={14} />
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }






























// // Admin Panel: SliderUpload.jsx
// "use client";

// import { useState, useCallback, useEffect } from "react";
// import Cropper from "react-easy-crop";
// import {
//   UploadCloud,
//   X,
//   Loader2,
//   Check,
//   ImagePlus,
//   Pencil,
//   Trash2,
//   ImageOff,
// } from "lucide-react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// async function getCroppedImg(imageSrc, croppedAreaPixels) {
//   const image = await new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = imageSrc;
//   });

//   const canvas = document.createElement("canvas");
//   canvas.width = croppedAreaPixels.width;
//   canvas.height = croppedAreaPixels.height;
//   const ctx = canvas.getContext("2d");

//   ctx.drawImage(
//     image,
//     croppedAreaPixels.x,
//     croppedAreaPixels.y,
//     croppedAreaPixels.width,
//     croppedAreaPixels.height,
//     0,
//     0,
//     croppedAreaPixels.width,
//     croppedAreaPixels.height
//   );

//   return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
// }

// export default function SliderUpload() {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const [editingId, setEditingId] = useState(null);
//   const [replaceImage, setReplaceImage] = useState(false);

//   const [items, setItems] = useState([]);
//   const [listLoading, setListLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   const fetchItems = async () => {
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/slider`);
//       const data = await res.json();
//       if (data.success) setItems(data.items);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     } finally {
//       setListLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const onFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageSrc(reader.result);
//       setReplaceImage(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   const onDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (!file || !file.type.startsWith("image/")) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageSrc(reader.result);
//       setReplaceImage(true);
//     };
//     reader.readAsDataURL(file);
//   };

//   const onCropComplete = useCallback((_, pixels) => {
//     setCroppedAreaPixels(pixels);
//   }, []);

//   const reset = () => {
//     setImageSrc(null);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setCaption("");
//     setEditingId(null);
//     setReplaceImage(false);
//   };

//   const startEdit = (item) => {
//     setEditingId(item._id);
//     setCaption(item.caption || "");
//     setImageSrc(item.imgUrl);
//     setCrop({ x: 0, y: 0 });
//     setZoom(1);
//     setReplaceImage(false);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("caption", caption);

//       if (replaceImage && croppedAreaPixels) {
//         const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
//         formData.append("image", blob, "slider.jpg");
//       }

//       const url = editingId
//         ? `${API_BASE_URL}/api/slider/${editingId}`
//         : `${API_BASE_URL}/api/slider`;
//       const method = editingId ? "PUT" : "POST";

//       const res = await fetch(url, { method, body: formData });
//       const data = await res.json();

//       if (data.success) {
//         setSuccess(true);
//         if (editingId) {
//           setItems((prev) =>
//             prev.map((it) => (it._id === editingId ? data.item : it))
//           );
//         } else {
//           setItems((prev) => [data.item, ...prev]);
//         }
//         setTimeout(() => {
//           setSuccess(false);
//           reset();
//         }, 1000);
//       } else {
//         alert(data.error || "Save nahi ho saka");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Kuch ghalat ho gaya, dobara koshish karein");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Ye slider image delete karni hai?")) return;
//     setDeletingId(id);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/slider/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         setItems((prev) => prev.filter((it) => it._id !== id));
//         if (editingId === id) reset();
//       } else {
//         alert(data.error || "Delete nahi ho saka");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Delete nahi ho saka");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const canSave =
//     !loading && !success && (editingId ? caption.trim() !== "" || replaceImage || true : croppedAreaPixels);

//   return (
//     <div className="w-full max-w-2xl mx-auto py-10 space-y-8">
//       <div className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur py-[50px] px-6 sm:px-8 shadow-xl">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
//             {editingId ? <Pencil size={20} /> : <ImagePlus size={20} />}
//           </div>
//           <div>
//             <h2 className="text-white font-semibold text-lg">
//               {editingId ? "Slider Image Edit Karein" : "Slider Image Upload"}
//             </h2>
//             <p className="text-neutral-400 text-sm">
//               Crop area wahi hai jo banner mein show hoga
//             </p>
//           </div>
//         </div>

//         {!imageSrc ? (
//           <label
//             onDrop={onDrop}
//             onDragOver={(e) => e.preventDefault()}
//             className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-700 hover:border-blue-500/60 rounded-xl p-10 cursor-pointer transition-colors"
//           >
//             <UploadCloud className="text-neutral-500" size={36} />
//             <div className="text-center">
//               <p className="text-neutral-300 text-sm font-medium">
//                 Image yahan drag karein ya click kar ke select karein
//               </p>
//               <p className="text-neutral-500 text-xs mt-1">PNG, JPG — max 8MB</p>
//             </div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={onFileChange}
//               className="hidden"
//             />
//           </label>
//         ) : (
//           <>
//             {/* Cropper ko 2.5 / 1 (Hush Puppies style) par set kar diya */}
//             <div className="relative w-full aspect-[2.5/1] bg-black rounded-xl overflow-hidden border border-white/10">
//               <Cropper
//                 image={imageSrc}
//                 crop={crop}
//                 zoom={zoom}
//                 aspect={2.5 / 1}
//                 onCropChange={setCrop}
//                 onZoomChange={setZoom}
//                 onCropComplete={onCropComplete}
//               />
//               <button
//                 onClick={reset}
//                 className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
//                 aria-label="Cancel"
//               >
//                 <X size={16} />
//               </button>
//             </div>

//             {editingId && !replaceImage && (
//               <label className="mt-3 inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
//                 <UploadCloud size={14} />
//                 Image badalne ke liye yahan click karein
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={onFileChange}
//                   className="hidden"
//                 />
//               </label>
//             )}

//             <div className="flex items-center gap-3 mt-4">
//               <span className="text-xs text-neutral-400 w-12">Zoom</span>
//               <input
//                 type="range"
//                 min={1}
//                 max={3}
//                 step={0.05}
//                 value={zoom}
//                 onChange={(e) => setZoom(Number(e.target.value))}
//                 className="flex-1 accent-blue-500"
//               />
//             </div>

//             <input
//               type="text"
//               placeholder="Caption likhein (optional)"
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               className="w-full mt-4 px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 outline-none focus:border-blue-500/60 transition-colors"
//             />

//             <div className="flex gap-3 mt-5">
//               <button
//                 onClick={reset}
//                 className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={!canSave}
//                 className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium transition-colors"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     {editingId ? "Update ho raha hai..." : "Upload ho raha hai..."}
//                   </>
//                 ) : success ? (
//                   <>
//                     <Check size={16} /> Ho gaya!
//                   </>
//                 ) : editingId ? (
//                   "Update Karein"
//                 ) : (
//                   "Upload Karein"
//                 )}
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       <div>
//         <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide text-neutral-400">
//           Current Sliders ({items.length})
//         </h3>

//         {listLoading ? (
//           <p className="text-neutral-500 text-sm">Load ho raha hai...</p>
//         ) : items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center gap-2 py-12 border border-dashed border-neutral-800 rounded-xl">
//             <ImageOff className="text-neutral-600" size={28} />
//             <p className="text-neutral-500 text-sm">Abhi koi image upload nahi hui</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {items.map((item) => (
//               <div
//                 key={item._id}
//                 className={`group relative rounded-xl overflow-hidden border aspect-[2.5/1] bg-neutral-900 transition-colors ${
//                   editingId === item._id
//                     ? "border-blue-500"
//                     : "border-white/10"
//                 }`}
//               >
//                 <img
//                   src={item.imgUrl}
//                   alt={item.caption || "Slider image"}
//                   className="w-full h-full object-contain"
//                 />
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

//                 {item.caption && (
//                   <p className="absolute bottom-2 left-3 text-white text-xs font-medium drop-shadow max-w-[75%] truncate">
//                     {item.caption}
//                   </p>
//                 )}

//                 <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <button
//                     onClick={() => startEdit(item)}
//                     className="bg-blue-600/90 hover:bg-blue-500 text-white p-2 rounded-full"
//                     aria-label="Edit image"
//                   >
//                     <Pencil size={14} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     disabled={deletingId === item._id}
//                     className="bg-red-600/90 hover:bg-red-500 disabled:opacity-50 text-white p-2 rounded-full"
//                     aria-label="Delete image"
//                   >
//                     {deletingId === item._id ? (
//                       <Loader2 size={14} className="animate-spin" />
//                     ) : (
//                       <Trash2 size={14} />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }























// Admin Panel: SliderUpload.jsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import {
  UploadCloud,
  X,
  Loader2,
  Check,
  ImagePlus,
  Pencil,
  Trash2,
  ImageOff,
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
}

export default function SliderUpload() {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [replaceImage, setReplaceImage] = useState(false);

  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/slider`);
      const data = await res.json();
      if (data.success) setItems(data.items);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setReplaceImage(true);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setReplaceImage(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const reset = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCaption("");
    setEditingId(null);
    setReplaceImage(false);
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setCaption(item.caption || "");
    setImageSrc(item.imgUrl);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setReplaceImage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);

      if (replaceImage && croppedAreaPixels) {
        const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
        formData.append("image", blob, "slider.jpg");
      }

      const url = editingId
        ? `${API_BASE_URL}/api/slider/${editingId}`
        : `${API_BASE_URL}/api/slider`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        if (editingId) {
          setItems((prev) =>
            prev.map((it) => (it._id === editingId ? data.item : it))
          );
        } else {
          setItems((prev) => [data.item, ...prev]);
        }
        setTimeout(() => {
          setSuccess(false);
          reset();
        }, 1000);
      } else {
        alert(data.error || "Save nahi ho saka");
      }
    } catch (err) {
      console.error(err);
      alert("Kuch ghalat ho gaya, dobara koshish karein");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Ye slider image delete karni hai?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/api/slider/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setItems((prev) => prev.filter((it) => it._id !== id));
        if (editingId === id) reset();
      } else {
        alert(data.error || "Delete nahi ho saka");
      }
    } catch (err) {
      console.error(err);
      alert("Delete nahi ho saka");
    } finally {
      setDeletingId(null);
    }
  };

  const canSave =
    !loading && !success && (editingId ? caption.trim() !== "" || replaceImage || true : croppedAreaPixels);

  return (
    <div className="w-full max-w-2xl mx-auto py-10 space-y-8">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur py-[50px] px-6 sm:px-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            {editingId ? <Pencil size={20} /> : <ImagePlus size={20} />}
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">
              {editingId ? "Slider Image Edit Karein" : "Slider Image Upload"}
            </h2>
            <p className="text-neutral-400 text-sm">
              Crop area wahi hai jo banner mein show hoga
            </p>
          </div>
        </div>

        {!imageSrc ? (
          <label
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-700 hover:border-blue-500/60 rounded-xl p-10 cursor-pointer transition-colors"
          >
            <UploadCloud className="text-neutral-500" size={36} />
            <div className="text-center">
              <p className="text-neutral-300 text-sm font-medium">
                Image yahan drag karein ya click kar ke select karein
              </p>
              <p className="text-neutral-500 text-xs mt-1">PNG, JPG — max 8MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </label>
        ) : (
          <>
            {/* Cropper ko 3/1 par set kar diya */}
            <div className="relative w-full aspect-[3/1] bg-black rounded-xl overflow-hidden border border-white/10">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3 / 1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <button
                onClick={reset}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                aria-label="Cancel"
              >
                <X size={16} />
              </button>
            </div>

            {editingId && !replaceImage && (
              <label className="mt-3 inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 cursor-pointer">
                <UploadCloud size={14} />
                Image badalne ke liye yahan click karein
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  className="hidden"
                />
              </label>
            )}

            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs text-neutral-400 w-12">Zoom</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-blue-500"
              />
            </div>

            <input
              type="text"
              placeholder="Caption likhein (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full mt-4 px-4 py-2.5 rounded-lg bg-neutral-800 border border-white/10 text-white text-sm placeholder:text-neutral-500 outline-none focus:border-blue-500/60 transition-colors"
            />

            <div className="flex gap-3 mt-5">
              <button
                onClick={reset}
                className="flex-1 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {editingId ? "Update ho raha hai..." : "Upload ho raha hai..."}
                  </>
                ) : success ? (
                  <>
                    <Check size={16} /> Ho gaya!
                  </>
                ) : editingId ? (
                  "Update Karein"
                ) : (
                  "Upload Karein"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <div>
        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide text-neutral-400">
          Current Sliders ({items.length})
        </h3>

        {listLoading ? (
          <p className="text-neutral-500 text-sm">Load ho raha hai...</p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-12 border border-dashed border-neutral-800 rounded-xl">
            <ImageOff className="text-neutral-600" size={28} />
            <p className="text-neutral-500 text-sm">Abhi koi image upload nahi hui</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className={`group relative rounded-xl overflow-hidden border aspect-[3/1] bg-neutral-900 transition-colors ${
                  editingId === item._id
                    ? "border-blue-500"
                    : "border-white/10"
                }`}
              >
                <img
                  src={item.imgUrl}
                  alt={item.caption || "Slider image"}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                {item.caption && (
                  <p className="absolute bottom-2 left-3 text-white text-xs font-medium drop-shadow max-w-[75%] truncate">
                    {item.caption}
                  </p>
                )}

                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(item)}
                    className="bg-blue-600/90 hover:bg-blue-500 text-white p-2 rounded-full"
                    aria-label="Edit image"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="bg-red-600/90 hover:bg-red-500 disabled:opacity-50 text-white p-2 rounded-full"
                    aria-label="Delete image"
                  >
                    {deletingId === item._id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}