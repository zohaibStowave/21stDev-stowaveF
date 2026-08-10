// 'use client';
// import { useState, useEffect, useRef } from 'react';

// export default function ChatAssistant() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Auto-scroll ke liye ref layer
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const savedChats = localStorage.getItem('ecom_chat_history');
//     if (savedChats) {
//       setMessages(JSON.parse(savedChats));
//     }
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages, loading]);

//   const saveToCache = (updatedMessages) => {
//     setMessages(updatedMessages);
//     localStorage.setItem('ecom_chat_history', JSON.stringify(updatedMessages));
//   };

//   const sendMessage = async () => {
//     if (!input.trim() || loading) return;
    
//     const userMsg = { role: 'user', text: input };
//     const newMessagesWithUser = [...messages, userMsg];
//     saveToCache(newMessagesWithUser);
    
//     setInput('');
//     setLoading(true);

//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       const res = await fetch(`${API_URL}/api/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           message: input,
//           history: messages 
//         }),
//       });
      
//       const data = await res.json();
      
//       if (data.reply) {
//         const aiMsg = { role: 'model', text: data.reply };
//         saveToCache([...newMessagesWithUser, aiMsg]);
//       } else if (data.error) {
//         console.error("Backend Error Response:", data.error);
//       }
//     } catch (err) {
//       console.error("Chat Connection Error to Backend:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) {
//     return (
//       <button
//         onClick={() => setIsOpen(true)}
//         aria-label="Open shopping assistant"
//         className="fixed bottom-5 right-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white pl-3 pr-4 py-3 rounded-xl shadow-2xl z-50 transition-transform hover:scale-105"
//       >
//         <span className="relative flex items-center justify-center w-7 h-7 bg-white/15 rounded-lg shrink-0">
//           <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
//           <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full"></span>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
//             <path d="M4 4h16v11H7l-3 3V4z" />
//             <path d="M8 9h8M8 12h5" />
//           </svg>
//         </span>
//         <span className="text-sm font-medium">Shopping Assistant</span>
//       </button>
//     );
//   }

//   return (
//     <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl p-4 border border-gray-200 z-50 text-black">
//       {/* Chat Header */}
//       <div className="flex justify-between items-center mb-3 pb-2 border-b">
//         <div className="flex items-center gap-2">
//           <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
//           <h3 className="font-bold text-sm text-blue-600">Shopping Assistant</h3>
//         </div>
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => { localStorage.removeItem('ecom_chat_history'); setMessages([]); }}
//             className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
//           >
//             Clear Chat
//           </button>
//           <button
//             onClick={() => setIsOpen(false)}
//             aria-label="Close chat"
//             className="text-gray-400 hover:text-gray-700 transition-colors"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
//               <path d="M18 6 6 18" />
//               <path d="M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Chat Messages Box */}
//       <div className="h-64 overflow-y-auto mb-4 p-2 space-y-2 bg-gray-50 rounded-lg scrollbar-thin">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`p-2 rounded-lg text-xs max-w-[80%] break-words ${
//               msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
//             }`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
        
//         {/* Loading State */}
//         {loading && (
//           <div className="flex justify-start">
//             <div className="bg-gray-200 p-2 rounded-lg text-xs text-gray-500 italic animate-pulse">
//               typing...
//             </div>
//           </div>
//         )}

//         {/* Dummy div for auto-scrolling execution */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input Field */}
//       <div className="flex gap-2">
//         <input 
//           type="text"
//           value={input} 
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//           className="border border-gray-300 p-2 w-full rounded-lg text-xs bg-white text-black focus:outline-none focus:border-blue-500 placeholder-gray-400" 
//           placeholder="Ask about products, delivery..."
//         />
//         <button 
//           onClick={sendMessage} 
//           disabled={loading}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium disabled:opacity-50 transition-colors"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
































// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Paperclip, Link, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export const FloatingAiAssistant = () => {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [charCount, setCharCount] = useState(0);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [liveProducts, setLiveProducts] = useState([]);
  
//   const maxChars = 2000;
//   const chatRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // 🟢 Store ke sare live MongoDB endpoints se real-time products fetch karna
//   useEffect(() => {
//     const fetchAllLiveStoreProducts = async () => {
//       try {
//         const [oversizedRes, regularRes, sweatshirtRes, ezzywalkRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/Addproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/regularproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/sweatshirtproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/ezzywalkproducts`).catch(() => ({ json: () => ({ success: false }) })),
//         ]);

//         const oversizedData = await oversizedRes.json();
//         const regularData = await regularRes.json();
//         const sweatshirtData = await sweatshirtRes.json();
//         const ezzywalkData = await ezzywalkRes.json();

//         // Sare products ko combine karke unki category/type ke sath store kar lo
//         const combinedProducts = [
//           ...(oversizedData.success ? oversizedData.products.map(p => ({ ...p, category: 'Oversized' })) : []),
//           ...(regularData.success ? regularData.products.map(p => ({ ...p, category: 'Regular Fit' })) : []),
//           ...(sweatshirtData.success ? sweatshirtData.products.map(p => ({ ...p, category: 'Sweatshirt' })) : []),
//           ...(ezzywalkData.success ? ezzywalkData.products.map(p => ({ ...p, category: 'Ezzywalk Slipper' })) : []),
//         ];

//         setLiveProducts(combinedProducts);
//       } catch (err) {
//         console.error("Error fetching live database products:", err);
//       }
//     };

//     fetchAllLiveStoreProducts();
//   }, []);

//   // Load chat history from cache
//   useEffect(() => {
//     const savedChats = localStorage.getItem('stowave_chat_history');
//     if (savedChats) {
//       setMessages(JSON.parse(savedChats));
//     }
//   }, []);

//   // Auto-scroll to latest message
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages, loading]);

//   const saveToCache = (updatedMessages) => {
//     setMessages(updatedMessages);
//     localStorage.setItem('stowave_chat_history', JSON.stringify(updatedMessages));
//   };
  
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setMessage(value);
//     setCharCount(value.length);
//   };

//   const handleSend = async () => {
//     if (!message.trim() || loading) return;
    
//     const userText = message;
//     const userMsg = { role: 'user', text: userText };
//     const newMessagesWithUser = [...messages, userMsg];
//     saveToCache(newMessagesWithUser);
    
//     setMessage('');
//     setCharCount(0);
//     setLoading(true);

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           message: userText,
//           history: messages,
//           // 🟢 Yeh raha aapka real-time database products ka catalog jo AI ko batayega kya stock mein hai ya nahi
//           catalog: liveProducts,
//           instruction: "Aap Stowave clothing brand ke smart shopping assistant hain. Upar diye gaye live database catalog (products list) ko check karein. Agar koi product is list mein maujood hai toh uske baare mein details dein (price, category, tagline). Agar koi product is list mein nahi hai, toh saaf keh dein ke yeh product abhi hamare paas available nahi hai ya stock mein nahi hai. User jis zabaan (Urdu/Hindi) mein baat kare, usi zabaan mein jawab dein."
//         }),
//       });
      
//       const data = await res.json();
      
//       if (data.reply) {
//         const aiMsg = { role: 'model', text: data.reply };
//         saveToCache([...newMessagesWithUser, aiMsg]);
//       } else {
//         const errorMsg = { role: 'model', text: "Maazrat, abhi system mein kuch masla hai." };
//         saveToCache([...newMessagesWithUser, errorMsg]);
//       }
//     } catch (err) {
//       console.error("Chat Connection Error:", err);
//       const errorMsg = { role: 'model', text: "Server se connection nahi ho pa raha." };
//       saveToCache([...newMessagesWithUser, errorMsg]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   // Close chat when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (chatRef.current && !chatRef.current.contains(event.target)) {
//         if (!event.target.closest('.floating-ai-button')) {
//           setIsChatOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {/* Floating 3D Glowing AI Logo */}
//       <button 
//         className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
//           isChatOpen ? 'rotate-90' : 'rotate-0'
//         }`}
//         onClick={() => setIsChatOpen(!isChatOpen)}
//         style={{
//           background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
//           boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
//           border: '2px solid rgba(255, 255, 255, 0.2)',
//         }}
//       >
//         <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
//         <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
//         <div className="relative z-10">
//           {isChatOpen ? <X className="text-white w-6 h-6" /> : <Bot className="w-8 h-8 text-white" />}
//         </div>
//         <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
//       </button>

//       {/* Chat Interface */}
//       {isChatOpen && (
//         <div 
//           ref={chatRef}
//           className="absolute bottom-20 right-0 w-[350px] sm:w-[420px] transition-all duration-300 origin-bottom-right"
//           style={{ animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
//         >
//           <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/95 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden text-zinc-100">
            
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-zinc-700/40">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                 <span className="text-xs font-semibold text-zinc-300">Stowave Live Assistant</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => { localStorage.removeItem('stowave_chat_history'); setMessages([]); }}
//                   className="text-[10px] text-zinc-400 hover:text-red-400 font-medium transition-colors uppercase tracking-wider px-1"
//                 >
//                   Clear
//                 </button>
//                 <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
//                   Live DB
//                 </span>
//                 <button 
//                   onClick={() => setIsChatOpen(false)}
//                   className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
//                 >
//                   <X className="w-4 h-4 text-zinc-400" />
//                 </button>
//               </div>
//             </div>

//             {/* Messages Display Box */}
//             <div className="h-64 overflow-y-auto px-5 py-3 space-y-3 bg-zinc-950/40 scrollbar-thin">
//               {messages.length === 0 && (
//                 <div className="h-full flex flex-col items-center justify-center text-center p-2 text-zinc-400 text-xs">
//                   <p className="font-medium text-zinc-300 mb-1">Welcome to Stowave!</p>
//                   <p>Database se {liveProducts.length} live products sync ho chuke hain. Aap kisi bhi product ya stock ke baray mein pooch sakte hain!</p>
//                 </div>
//               )}

//               {messages.map((msg, i) => (
//                 <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed break-words ${
//                     msg.role === 'user' 
//                       ? 'bg-red-600 text-white rounded-br-sm' 
//                       : 'bg-zinc-800 text-zinc-200 border border-zinc-700/50 rounded-bl-sm'
//                   }`}>
//                     {msg.text}
//                   </div>
//                 </div>
//               ))}
              
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-zinc-800 border border-zinc-700/50 px-3 py-2 rounded-2xl text-xs text-zinc-400 italic flex items-center gap-1.5">
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Section */}
//             <div className="relative overflow-hidden border-t border-zinc-700/40">
//               <textarea
//                 value={message}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 rows={3}
//                 className="w-full px-5 py-3 bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-zinc-100 placeholder-zinc-500"
//                 placeholder="Ask if a product is available in Urdu/Hindi..."
//               />
//             </div>

//             {/* Controls Section */}
//             <div className="px-4 pb-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1 p-1 bg-zinc-800/40 rounded-xl border border-zinc-700/50">
//                     <button className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-lg transition-all"><Paperclip className="w-3.5 h-3.5" /></button>
//                     <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 rounded-lg transition-all"><Link className="w-3.5 h-3.5" /></button>
//                     <button className="p-2 text-zinc-500 hover:text-green-400 hover:bg-zinc-800/80 rounded-lg transition-all"><Code className="w-3.5 h-3.5" /></button>
//                   </div>
//                   <button className="p-2.5 border border-zinc-700/30 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-all"><Mic className="w-3.5 h-3.5" /></button>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="text-xs font-medium text-zinc-500">
//                     <span>{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
//                   </div>
//                   <button 
//                     onClick={handleSend}
//                     disabled={loading}
//                     className="p-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Footer Info */}
//               <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-[11px] text-zinc-500">
//                 <div className="flex items-center gap-1.5">
//                   <Info className="w-3 h-3" />
//                   <span>Press <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px]">Shift + Enter</kbd> for newline</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                   <span>{liveProducts.length} Items in Stock</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
      
//       <style jsx>{`
//         @keyframes popIn {
//           0% { opacity: 0; transform: scale(0.8) translateY(20px); }
//           100% { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .floating-ai-button:hover { transform: scale(1.1) rotate(5deg); }
//       `}</style>
//     </div>
//   );
// };

// export default FloatingAiAssistant;






















// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Paperclip, Link, Code, Mic, Send, Info, Bot, X, ShoppingBag } from 'lucide-react';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// export const FloatingAiAssistant = () => {
//   const router = useRouter();
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [message, setMessage] = useState('');
//   const [charCount, setCharCount] = useState(0);
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [liveProducts, setLiveProducts] = useState([]);
//   const [bagItems, setBagItems] = useState([]);
//   const [baseUrl, setBaseUrl] = useState('');
  
//   const maxChars = 2000;
//   const chatRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // 🟢 Dynamic Base URL (Localhost ya Live Domain khud detect karega)
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setBaseUrl(window.location.origin);
//     }
//   }, []);

//   // 1. Live products fetch karna
//   useEffect(() => {
//     const fetchAllLiveStoreProducts = async () => {
//       try {
//         const [oversizedRes, regularRes, sweatshirtRes, ezzywalkRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/api/Addproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/regularproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/sweatshirtproducts`).catch(() => ({ json: () => ({ success: false }) })),
//           fetch(`${API_BASE_URL}/api/ezzywalkproducts`).catch(() => ({ json: () => ({ success: false }) })),
//         ]);

//         const oversizedData = await oversizedRes.json();
//         const regularData = await regularRes.json();
//         const sweatshirtData = await sweatshirtRes.json();
//         const ezzywalkData = await ezzywalkRes.json();

//         const combinedProducts = [
//           ...(oversizedData.success ? oversizedData.products.map(p => ({ ...p, category: 'Oversized' })) : []),
//           ...(regularData.success ? regularData.products.map(p => ({ ...p, category: 'Regular Fit' })) : []),
//           ...(sweatshirtData.success ? sweatshirtData.products.map(p => ({ ...p, category: 'Sweatshirt' })) : []),
//           ...(ezzywalkData.success ? ezzywalkData.products.map(p => ({ ...p, category: 'Ezzywalk Slipper' })) : []),
//         ];

//         setLiveProducts(combinedProducts);
//       } catch (err) {
//         console.error("Error fetching live products:", err);
//       }
//     };

//     fetchAllLiveStoreProducts();
//   }, []);

//   // 2. Bag / Cart items load karna
//   useEffect(() => {
//     try {
//       const savedBag = localStorage.getItem('bag') || localStorage.getItem('cart') || '[]';
//       setBagItems(JSON.parse(savedBag));
//     } catch {
//       setBagItems([]);
//     }
//   }, [isChatOpen]);

//   useEffect(() => {
//     const savedChats = localStorage.getItem('stowave_chat_history');
//     if (savedChats) {
//       setMessages(JSON.parse(savedChats));
//     }
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages, loading]);

//   const saveToCache = (updatedMessages) => {
//     setMessages(updatedMessages);
//     localStorage.setItem('stowave_chat_history', JSON.stringify(updatedMessages));
//   };
  
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setMessage(value);
//     setCharCount(value.length);
//   };

//   const handleSend = async () => {
//     if (!message.trim() || loading) return;
    
//     const userText = message;
//     const userMsg = { role: 'user', text: userText };
//     const newMessagesWithUser = [...messages, userMsg];
//     saveToCache(newMessagesWithUser);
    
//     setMessage('');
//     setCharCount(0);
//     setLoading(true);

//     const lowerMsg = userText.toLowerCase();

//     // Bag / Cart Query Handler
//     if (lowerMsg.includes('bag') || lowerMsg.includes('cart') || lowerMsg.includes('mera saman')) {
//       let replyText = "";
//       let showBagCard = false;

//       if (bagItems.length === 0) {
//         replyText = "Aapka bag bilkul empty (khali) hai!";
//       } else {
//         replyText = `Aapke bag mein yeh products mojood hain (${bagItems.length} items):`;
//         showBagCard = true;
//       }

//       const aiMsg = { 
//         role: 'model', 
//         text: replyText,
//         isBagQuery: showBagCard,
//         items: bagItems
//       };
//       saveToCache([...newMessagesWithUser, aiMsg]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://stowave.com';

//       const res = await fetch(`${API_BASE_URL}/api/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           message: userText,
//           history: messages,
//           catalog: liveProducts,
//           instruction: `Aap Stowave clothing brand ke official smart shopping assistant hain. 
//           STRICT RULES:
//           1. NEVER say "Namaste" or use any Hindi script/words (Devanagari). Always communicate in professional Roman Urdu/English style only, keeping a respectful Islamic/cultural tone (like Assalam o Alaikum).
//           2. Brand Details: Stowave (${currentOrigin}) | Quality Wear Everyday.
//           3. 5 Co-founders: Ali Zohaib (Creator & Software Engineer), Waqar Hassan, Ali Husnain, Saif-ul-Rehman.
//           4. Ezzywalk: Ek alag company hai jis ke sath Stowave ki collaboration hai. Ezzywalk ke founder Ali Husnain hain aur website ezzywalk.co hai.
//           5. Helpline Number: 03290010909 | Email: stowave.store@gmail.com
          
//           Important Links (Use ${currentOrigin} as base domain):
//           - About Us/Team: ${currentOrigin}/team
//           - Careers: ${currentOrigin}/careers
//           - Help: ${currentOrigin}/help
//           - Privacy Policy: ${currentOrigin}/privacy-policy
//           - Returns: ${currentOrigin}/return-policy
//           - Terms and Conditions: ${currentOrigin}/terms-and-conditions
//           - Pricing: ${currentOrigin}/pricing
//           - Marketplace: ${currentOrigin}/marketplace
//           - Features: ${currentOrigin}/features
//           - Blog: ${currentOrigin}/blog
//           - Bag / Cart: ${currentOrigin}/bag

//           Live Catalog ko check karein aur agar koi product maangay toh details dein.`
//         }),
//       });
      
//       const data = await res.json();
      
//       if (data.reply) {
//         let replyText = data.reply;
//         let matchedProduct = null;

//         liveProducts.forEach(p => {
//           if (replyText.toLowerCase().includes(p.name.toLowerCase()) || replyText.includes(p._id)) {
//             matchedProduct = p;
//           }
//         });

//         const aiMsg = { 
//           role: 'model', 
//           text: replyText,
//           productCard: matchedProduct 
//         };
//         saveToCache([...newMessagesWithUser, aiMsg]);
//       } else {
//         const errorMsg = { role: 'model', text: "Maazrat, abhi system mein kuch masla hai." };
//         saveToCache([...newMessagesWithUser, errorMsg]);
//       }
//     } catch (err) {
//       console.error("Chat Connection Error:", err);
//       const errorMsg = { role: 'model', text: "Server se connection nahi ho pa raha." };
//       saveToCache([...newMessagesWithUser, errorMsg]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (chatRef.current && !chatRef.current.contains(event.target)) {
//         if (!event.target.closest('.floating-ai-button')) {
//           setIsChatOpen(false);
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <button 
//         className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
//           isChatOpen ? 'rotate-90' : 'rotate-0'
//         }`}
//         onClick={() => setIsChatOpen(!isChatOpen)}
//         style={{
//           background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
//           boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
//           border: '2px solid rgba(255, 255, 255, 0.2)',
//         }}
//       >
//         <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
//         <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
//         <div className="relative z-10">
//           {isChatOpen ? <X className="text-white w-6 h-6" /> : <Bot className="w-8 h-8 text-white" />}
//         </div>
//         <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
//       </button>

//       {isChatOpen && (
//         <div 
//           ref={chatRef}
//           className="absolute bottom-20 right-0 w-[350px] sm:w-[420px] transition-all duration-300 origin-bottom-right"
//           style={{ animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
//         >
//           <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/95 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden text-zinc-100">
            
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-zinc-700/40">
//               <div className="flex items-center gap-1.5">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                 <span className="text-xs font-semibold text-zinc-300">Stowave Official Assistant</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => router.push('/bag')}
//                   className="flex items-center gap-1 text-[10px] text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-full transition-colors font-medium"
//                 >
//                   <ShoppingBag className="w-3 h-3" /> Bag ({bagItems.length})
//                 </button>
//                 <button 
//                   onClick={() => setIsChatOpen(false)}
//                   className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
//                 >
//                   <X className="w-4 h-4 text-zinc-400" />
//                 </button>
//               </div>
//             </div>

//             {/* Messages Display Box */}
//             <div className="h-72 overflow-y-auto px-5 py-3 space-y-3 bg-zinc-950/40 scrollbar-thin">
//               {messages.length === 0 && (
//                 <div className="h-full flex flex-col items-center justify-center text-center p-2 text-zinc-400 text-xs">
//                   <p className="font-medium text-zinc-300 mb-1">Assalam o Alaikum! Welcome to Stowave</p>
//                   <p>Aap mujhse products, founders, policies ya apne Bag ke baray mein pooch sakte hain!</p>
//                 </div>
//               )}

//               {messages.map((msg, i) => (
//                 <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
//                   <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed break-words ${
//                     msg.role === 'user' 
//                       ? 'bg-red-600 text-white rounded-br-sm' 
//                       : 'bg-zinc-800 text-zinc-200 border border-zinc-700/50 rounded-bl-sm'
//                   }`}>
//                     {msg.text}
//                   </div>

//                   {/* Product Card / Image */}
//                   {msg.productCard && (
//                     <div 
//                       onClick={() => router.push(`/products/${msg.productCard.slug || msg.productCard._id}`)}
//                       className="mt-2 flex items-center gap-3 p-2 bg-zinc-900/90 border border-zinc-700/60 rounded-xl cursor-pointer hover:border-red-500 transition-all max-w-[85%] group"
//                     >
//                       <img 
//                         src={msg.productCard.imageUrl} 
//                         alt={msg.productCard.name} 
//                         className="w-12 h-12 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
//                       />
//                       <div className="min-w-0">
//                         <p className="text-xs font-semibold text-zinc-100 truncate">{msg.productCard.name}</p>
//                         <p className="text-[10px] text-zinc-400">Rs. {msg.productCard.price} • <span className="text-red-400 font-medium underline">Buy Now</span></p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Bag Items Preview Card */}
//                   {msg.isBagQuery && msg.items && msg.items.length > 0 && (
//                     <div 
//                       onClick={() => router.push('/bag')}
//                       className="mt-2 flex flex-col gap-2 p-2.5 bg-zinc-900/90 border border-zinc-700/60 rounded-xl cursor-pointer hover:border-red-500 transition-all max-w-[85%] w-full"
//                     >
//                       {msg.items.map((item, idx) => (
//                         <div key={idx} className="flex items-center gap-2 border-b border-zinc-800 pb-1.5 last:border-none last:pb-0">
//                           <img src={item.imageUrl} alt={item.name} className="w-9 h-9 object-cover rounded-md shrink-0" />
//                           <div className="min-w-0 flex-1">
//                             <p className="text-xs font-medium text-zinc-100 truncate">{item.name}</p>
//                             <p className="text-[10px] text-zinc-400">Qty: {item.quantity || 1} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}</p>
//                           </div>
//                         </div>
//                       ))}
//                       <div className="text-center pt-1">
//                         <span className="text-[10px] text-red-400 font-semibold underline">View full bag →</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
              
//               {loading && (
//                 <div className="flex justify-start">
//                   <div className="bg-zinc-800 border border-zinc-700/50 px-3 py-2 rounded-2xl text-xs text-zinc-400 italic flex items-center gap-1.5">
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
//                     <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Section */}
//             <div className="relative overflow-hidden border-t border-zinc-700/40">
//               <textarea
//                 value={message}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 rows={3}
//                 className="w-full px-5 py-3 bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-zinc-100 placeholder-zinc-500"
//                 placeholder="Ask about bag, founders, policies..."
//               />
//             </div>

//             {/* Controls Section */}
//             <div className="px-4 pb-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1 p-1 bg-zinc-800/40 rounded-xl border border-zinc-700/50">
//                     <button className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-lg transition-all"><Paperclip className="w-3.5 h-3.5" /></button>
//                     <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 rounded-lg transition-all"><Link className="w-3.5 h-3.5" /></button>
//                     <button className="p-2 text-zinc-500 hover:text-green-400 hover:bg-zinc-800/80 rounded-lg transition-all"><Code className="w-3.5 h-3.5" /></button>
//                   </div>
//                   <button className="p-2.5 border border-zinc-700/30 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-all"><Mic className="w-3.5 h-3.5" /></button>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <div className="text-xs font-medium text-zinc-500">
//                     <span>{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
//                   </div>
//                   <button 
//                     onClick={handleSend}
//                     disabled={loading}
//                     className="p-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50"
//                   >
//                     <Send className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Footer Info */}
//               <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-[11px] text-zinc-500">
//                 <div className="flex items-center gap-1.5">
//                   <Info className="w-3 h-3" />
//                   <span>Press <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px]">Shift + Enter</kbd></span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                   <span>{liveProducts.length} Items Live</span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       )}
      
//       <style jsx>{`
//         @keyframes popIn {
//           0% { opacity: 0; transform: scale(0.8) translateY(20px); }
//           100% { opacity: 1; transform: scale(1) translateY(0); }
//         }
//         .floating-ai-button:hover { transform: scale(1.1) rotate(5deg); }
//       `}</style>
//     </div>
//   );
// };

// export default FloatingAiAssistant;



'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Paperclip, Link, Trash2, Mic, Send, Info, Bot, X, ShoppingBag } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const FloatingAiAssistant = () => {
  const router = useRouter();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liveProducts, setLiveProducts] = useState([]);
  const [bagItems, setBagItems] = useState([]);
  
  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Dynamic Base URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.location.origin;
    }
  }, []);

  // 1. Live products fetch karna
  useEffect(() => {
    const fetchAllLiveStoreProducts = async () => {
      try {
        const [oversizedRes, regularRes, sweatshirtRes, ezzywalkRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/Addproducts`).catch(() => ({ json: () => ({ success: false }) })),
          fetch(`${API_BASE_URL}/api/regularproducts`).catch(() => ({ json: () => ({ success: false }) })),
          fetch(`${API_BASE_URL}/api/sweatshirtproducts`).catch(() => ({ json: () => ({ success: false }) })),
          fetch(`${API_BASE_URL}/api/ezzywalkproducts`).catch(() => ({ json: () => ({ success: false }) })),
        ]);

        const oversizedData = await oversizedRes.json();
        const regularData = await regularRes.json();
        const sweatshirtData = await sweatshirtRes.json();
        const ezzywalkData = await ezzywalkRes.json();

        const combinedProducts = [
          ...(oversizedData.success ? oversizedData.products.map(p => ({ ...p, category: 'Oversized' })) : []),
          ...(regularData.success ? regularData.products.map(p => ({ ...p, category: 'Regular Fit' })) : []),
          ...(sweatshirtData.success ? sweatshirtData.products.map(p => ({ ...p, category: 'Sweatshirt' })) : []),
          ...(ezzywalkData.success ? ezzywalkData.products.map(p => ({ ...p, category: 'Ezzywalk Slipper' })) : []),
        ];

        setLiveProducts(combinedProducts);
      } catch (err) {
        console.error("Error fetching live products:", err);
      }
    };

    fetchAllLiveStoreProducts();
  }, []);

  // 2. Bag / Cart items load karna
  useEffect(() => {
    try {
      const savedBag = localStorage.getItem('bag') || localStorage.getItem('cart') || '[]';
      setBagItems(JSON.parse(savedBag));
    } catch {
      setBagItems([]);
    }
  }, [isChatOpen]);

  useEffect(() => {
    const savedChats = localStorage.getItem('stowave_chat_history');
    if (savedChats) {
      setMessages(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const saveToCache = (updatedMessages) => {
    setMessages(updatedMessages);
    localStorage.setItem('stowave_chat_history', JSON.stringify(updatedMessages));
  };
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = async () => {
    if (!message.trim() || loading) return;
    
    const userText = message;
    const userMsg = { role: 'user', text: userText };
    const newMessagesWithUser = [...messages, userMsg];
    saveToCache(newMessagesWithUser);
    
    setMessage('');
    setCharCount(0);
    setLoading(true);

    const lowerMsg = userText.toLowerCase();

    if (lowerMsg.includes('bag') || lowerMsg.includes('cart') || lowerMsg.includes('mera saman')) {
      let replyText = "";
      let showBagCard = false;

      if (bagItems.length === 0) {
        replyText = "Aapka bag bilkul empty (khali) hai!";
      } else {
        replyText = `Aapke bag mein yeh products mojood hain (${bagItems.length} items):`;
        showBagCard = true;
      }

      const aiMsg = { 
        role: 'model', 
        text: replyText,
        isBagQuery: showBagCard,
        items: bagItems
      };
      saveToCache([...newMessagesWithUser, aiMsg]);
      setLoading(false);
      return;
    }

    try {
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://stowave.com';

      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userText,
          history: messages,
          catalog: liveProducts,
          instruction: `Aap Stowave clothing brand ke official smart shopping assistant hain. 
          STRICT RULES:
          1. NEVER say "Namaste" or use any Hindi script/words (Devanagari). Always communicate in professional Roman Urdu/English style only, keeping a respectful Islamic/cultural tone (like Assalam o Alaikum).
          2. Brand Details: Stowave (${currentOrigin}) | Quality Wear Everyday.
          3. 5 Co-founders: Ali Zohaib (Creator & Software Engineer), Waqar Hassan, Ali Husnain, Saif-ul-Rehman.
          4. Ezzywalk: Ek alag company hai jis ke sath Stowave ki collaboration hai. Ezzywalk ke founder Ali Husnain hain aur website ezzywalk.co hai.
          5. Helpline Number: 03290010909 | Email: stowave.store@gmail.com
          
          Important Links (Use ${currentOrigin} as base domain):
          - About Us/Team: ${currentOrigin}/team
          - Careers: ${currentOrigin}/careers
          - Help: ${currentOrigin}/help
          - Privacy Policy: ${currentOrigin}/privacy-policy
          - Returns: ${currentOrigin}/return-policy
          - Terms and Conditions: ${currentOrigin}/terms-and-conditions
          - Pricing: ${currentOrigin}/pricing
          - Marketplace: ${currentOrigin}/marketplace
          - Features: ${currentOrigin}/features
          - Blog: ${currentOrigin}/blogs
          - Bag / Cart: ${currentOrigin}/bag

          Live Catalog ko check karein aur agar koi product maangay toh details dein.`
        }),
      });
      
      const data = await res.json();
      
      if (data.reply) {
        let replyText = data.reply;
        let matchedProduct = null;

        liveProducts.forEach(p => {
          if (replyText.toLowerCase().includes(p.name.toLowerCase()) || replyText.includes(p._id)) {
            matchedProduct = p;
          }
        });

        const aiMsg = { 
          role: 'model', 
          text: replyText,
          productCard: matchedProduct 
        };
        saveToCache([...newMessagesWithUser, aiMsg]);
      } else {
        const errorMsg = { role: 'model', text: "Maazrat, abhi system mein kuch masla hai." };
        saveToCache([...newMessagesWithUser, errorMsg]);
      }
    } catch (err) {
      console.error("Chat Connection Error:", err);
      const errorMsg = { role: 'model', text: "Server se connection nahi ho pa raha." };
      saveToCache([...newMessagesWithUser, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        if (!event.target.closest('.floating-ai-button')) {
          setIsChatOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
          isChatOpen ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <div className="relative z-10">
          {isChatOpen ? <X className="text-white w-6 h-6" /> : <Bot className="w-8 h-8 text-white" />}
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
      </button>

      {isChatOpen && (
        <div 
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[350px] sm:w-[420px] transition-all duration-300 origin-bottom-right"
          style={{ animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}
        >
          <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/90 to-zinc-900/95 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden text-zinc-100">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-zinc-700/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-semibold text-zinc-300">Stowave Official Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => router.push('/bag')}
                  className="flex items-center gap-1 text-[10px] text-zinc-300 bg-zinc-800 hover:bg-zinc-700 px-2 py-1 rounded-full transition-colors font-medium"
                >
                  <ShoppingBag className="w-3 h-3" /> Bag ({bagItems.length})
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Messages Display Box */}
            <div className="h-72 overflow-y-auto px-5 py-3 space-y-3 bg-zinc-950/40 scrollbar-thin">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-2 text-zinc-400 text-xs">
                  <p className="font-medium text-zinc-300 mb-1">Assalam o Alaikum! Welcome to Stowave</p>
                  <p>Aap mujhse products, founders, policies ya apne Bag ke baray mein pooch sakte hain!</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed break-words ${
                    msg.role === 'user' 
                      ? 'bg-red-600 text-white rounded-br-sm' 
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700/50 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Product Card / Image */}
                  {msg.productCard && (
                    <div 
                      onClick={() => router.push(`/products/${msg.productCard.slug || msg.productCard._id}`)}
                      className="mt-2 flex items-center gap-3 p-2 bg-zinc-900/90 border border-zinc-700/60 rounded-xl cursor-pointer hover:border-red-500 transition-all max-w-[85%] group"
                    >
                      <img 
                        src={msg.productCard.imageUrl} 
                        alt={msg.productCard.name} 
                        className="w-12 h-12 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-zinc-100 truncate">{msg.productCard.name}</p>
                        <p className="text-[10px] text-zinc-400">Rs. {msg.productCard.price} • <span className="text-red-400 font-medium underline">Buy Now</span></p>
                      </div>
                    </div>
                  )}

                  {/* Bag Items Preview Card */}
                  {msg.isBagQuery && msg.items && msg.items.length > 0 && (
                    <div 
                      onClick={() => router.push('/bag')}
                      className="mt-2 flex flex-col gap-2 p-2.5 bg-zinc-900/90 border border-zinc-700/60 rounded-xl cursor-pointer hover:border-red-500 transition-all max-w-[85%] w-full"
                    >
                      {msg.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 border-b border-zinc-800 pb-1.5 last:border-none last:pb-0">
                          <img src={item.imageUrl} alt={item.name} className="w-9 h-9 object-cover rounded-md shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-zinc-100 truncate">{item.name}</p>
                            <p className="text-[10px] text-zinc-400">Qty: {item.quantity || 1} {item.selectedSize ? `| Size: ${item.selectedSize}` : ''}</p>
                          </div>
                        </div>
                      ))}
                      <div className="text-center pt-1">
                        <span className="text-[10px] text-red-400 font-semibold underline">View full bag →</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 border border-zinc-700/50 px-3 py-2 rounded-2xl text-xs text-zinc-400 italic flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="relative overflow-hidden border-t border-zinc-700/40">
              <textarea
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full px-5 py-3 bg-transparent border-none outline-none resize-none text-sm leading-relaxed text-zinc-100 placeholder-zinc-500"
                placeholder="Ask about bag, founders, policies..."
              />
            </div>

            {/* Controls Section */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 bg-zinc-800/40 rounded-xl border border-zinc-700/50">
                    <button className="p-2 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-lg transition-all"><Paperclip className="w-3.5 h-3.5" /></button>
                    <button className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 rounded-lg transition-all"><Link className="w-3.5 h-3.5" /></button>
                    
                    {/* 🟢 Clear / Trash Icon with Hover Tooltip */}
                    <button 
                      onClick={() => { localStorage.removeItem('stowave_chat_history'); setMessages([]); }}
                      className="group relative p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 rounded-lg transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2.5 py-1 bg-zinc-900 text-zinc-200 text-[10px] rounded-md whitespace-nowrap opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 shadow-md border border-zinc-700">
                        Clear chat
                      </div>
                    </button>
                  </div>

                  <button className="p-2.5 border border-zinc-700/30 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-all"><Mic className="w-3.5 h-3.5" /></button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium text-zinc-500">
                    <span>{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
                  </div>
                  <button 
                    onClick={handleSend}
                    disabled={loading}
                    className="p-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/50 text-[11px] text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3 h-3" />
                  <span>Press <kbd className="px-1 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px]">Shift + Enter</kbd></span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>{liveProducts.length} Items Live</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .floating-ai-button:hover { transform: scale(1.1) rotate(5deg); }
      `}</style>
    </div>
  );
};

export default FloatingAiAssistant;