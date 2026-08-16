// // 'use client';

// // import { useState } from 'react';

// // export default function Home() {
// //   const [file, setFile] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [script, setScript] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setScript('');

// //     if (!file) {
// //       setError('Pehle video file upload karein');
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const formData = new FormData();
// //       formData.append('video', file);

// //       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', {
// //         method: 'POST',
// //         body: formData,
// //       });

// //       const data = await res.json();

// //       if (!res.ok) {
// //         throw new Error(data.error || 'Kuch ghalat ho gaya');
// //       }

// //       setScript(data.script);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(script);
// //   };

// //   return (
// //     <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-4 py-12">
// //       <div className="w-full max-w-2xl">
// //         <h1 className="text-3xl font-bold mb-2 text-center">Video Script Extractor</h1>
// //         <p className="text-gray-400 text-center mb-8">
// //           Apni video upload karein — hum uski script nikaal ke de denge
// //         </p>

// //         <form
// //           onSubmit={handleSubmit}
// //           className="space-y-4 bg-gray-900 rounded-xl p-6 border border-gray-800"
// //         >
// //           <div>
// //             <label className="block text-sm mb-1 text-gray-300">Video Upload Karein</label>
// //             <input
// //               type="file"
// //               accept="video/*,audio/*"
// //               onChange={(e) => setFile(e.target.files[0])}
// //               className="w-full text-sm text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed rounded-lg py-2.5 font-medium transition"
// //           >
// //             {loading ? 'Script nikal rahe hain...' : 'Script Nikaalein'}
// //           </button>
// //         </form>

// //         {error && (
// //           <div className="mt-4 bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3">
// //             {error}
// //           </div>
// //         )}

// //         {script && (
// //           <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-6">
// //             <div className="flex items-center justify-between mb-3">
// //               <h2 className="font-semibold">Video Script:</h2>
// //               <button
// //                 onClick={handleCopy}
// //                 className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
// //               >
// //                 Copy
// //               </button>
// //             </div>
// //             <p className="whitespace-pre-wrap text-gray-200 leading-relaxed">{script}</p>
// //           </div>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }


























// // src/app/i/t/s/a/d/m/i/n/admin/textExtracor/page.jsx
// 'use client';

// import { useState, useEffect, useRef } from 'react';

// export default function Home() {
//   const [tab, setTab] = useState('chat'); // 'chat' | 'extractor'

//   // ---- Chat state ----
//   const [chats, setChats] = useState([]);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [mode, setMode] = useState('fast'); // 'fast' | 'thinking'
//   const [chatLoading, setChatLoading] = useState(false);
//   const [renamingId, setRenamingId] = useState(null);
//   const [renameValue, setRenameValue] = useState('');
//   const bottomRef = useRef(null);
  

//   // ---- Extractor state ----
//   const [file, setFile] = useState(null);
//   const [instruction, setInstruction] = useState('');
//   const [extractLoading, setExtractLoading] = useState(false);
//   const [script, setScript] = useState('');
//   const [extractError, setExtractError] = useState('');

//   useEffect(() => {
//     loadChats();
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   async function loadChats() {
//     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats');
//     const data = await res.json();
//     setChats(data.chats || []);
//   }

//   async function startNewChat() {
//     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
//     const data = await res.json();
//     setActiveChatId(data.chat.id);
//     setMessages([]);
//     loadChats();
//   }

//   async function selectChat(id) {
//     const res = await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`);
//     const data = await res.json();
//     if (data.chat) {
//       setActiveChatId(data.chat.id);
//       setMessages(data.chat.messages || []);
//     }
//   }

//   async function sendMessage(e) {
//     e.preventDefault();
//     if (!input.trim()) return;

//     let chatId = activeChatId;
//     if (!chatId) {
//       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
//       const data = await res.json();
//       chatId = data.chat.id;
//       setActiveChatId(chatId);
//     }

//     const userMsg = { role: 'user', content: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');
//     setChatLoading(true);

//     try {
//       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ chatId, message: userMsg.content, mode }),
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');

//       setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
//       loadChats();
//     } catch (err) {
//       setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ ${err.message}` }]);
//     } finally {
//       setChatLoading(false);
//     }
//   }

//   async function submitRename(id) {
//     if (!renameValue.trim()) {
//       setRenamingId(null);
//       return;
//     }
//     await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title: renameValue }),
//     });
//     setRenamingId(null);
//     loadChats();
//   }

//   async function deleteChat(id) {
//     await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, { method: 'DELETE' });
//     if (activeChatId === id) {
//       setActiveChatId(null);
//       setMessages([]);
//     }
//     loadChats();
//   }

//   async function handleExtract(e) {
//     e.preventDefault();
//     setExtractError('');
//     setScript('');

//     if (!file) {
//       setExtractError('Pehle video file upload karein');
//       return;
//     }

//     setExtractLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('video', file);
//       formData.append('instruction', instruction);

//       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', { method: 'POST', body: formData });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');

//       setScript(data.script);
//     } catch (err) {
//       setExtractError(err.message);
//     } finally {
//       setExtractLoading(false);
//     }
//   }

//   return (
//     <div className="h-screen flex bg-gray-950 text-gray-100">
//       {tab === 'chat' && (
//         <aside className="w-64 border-r border-gray-800 flex flex-col">
//           <div className="p-3 border-b border-gray-800">
//             <button
//               onClick={startNewChat}
//               className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm font-medium"
//             >
//               + Nayi Chat
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {chats.map((c) => (
//               <div
//                 key={c.id}
//                 className={`group flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-900 ${
//                   activeChatId === c.id ? 'bg-gray-900' : ''
//                 }`}
//               >
//                 {renamingId === c.id ? (
//                   <input
//                     autoFocus
//                     value={renameValue}
//                     onChange={(e) => setRenameValue(e.target.value)}
//                     onBlur={() => submitRename(c.id)}
//                     onKeyDown={(e) => e.key === 'Enter' && submitRename(c.id)}
//                     className="flex-1 bg-gray-800 text-sm px-2 py-1 rounded"
//                   />
//                 ) : (
//                   <span onClick={() => selectChat(c.id)} className="flex-1 text-sm truncate">
//                     {c.title}
//                   </span>
//                 )}
//                 <div className="hidden group-hover:flex gap-1 ml-2">
//                   <button
//                     onClick={() => {
//                       setRenamingId(c.id);
//                       setRenameValue(c.title);
//                     }}
//                     className="text-xs text-gray-400 hover:text-white"
//                     title="Rename"
//                   >
//                     ✏️
//                   </button>
//                   <button
//                     onClick={() => deleteChat(c.id)}
//                     className="text-xs text-gray-400 hover:text-red-400"
//                     title="Delete"
//                   >
//                     🗑️
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>
//       )}

//       <div className="flex-1 flex flex-col">
//         <div className="border-b border-gray-800 flex items-center px-4 py-2 gap-2">
//           <button
//             onClick={() => setTab('chat')}
//             className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
//               tab === 'chat' ? 'bg-blue-600' : 'bg-gray-900 text-gray-400'
//             }`}
//           >
//             💬 Chatbot
//           </button>
//           <button
//             onClick={() => setTab('extractor')}
//             className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
//               tab === 'extractor' ? 'bg-blue-600' : 'bg-gray-900 text-gray-400'
//             }`}
//           >
//             🎬 Text Extractor
//           </button>

//           {tab === 'chat' && (
//             <div className="ml-auto flex bg-gray-900 rounded-lg p-1">
//               <button
//                 onClick={() => setMode('fast')}
//                 className={`px-3 py-1 rounded-md text-xs font-medium ${
//                   mode === 'fast' ? 'bg-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 ⚡ Fast
//               </button>
//               <button
//                 onClick={() => setMode('thinking')}
//                 className={`px-3 py-1 rounded-md text-xs font-medium ${
//                   mode === 'thinking' ? 'bg-blue-600' : 'text-gray-400'
//                 }`}
//               >
//                 🧠 Thinking
//               </button>
//             </div>
//           )}
//         </div>

//         {tab === 'chat' && (
//           <div className="flex-1 flex flex-col overflow-hidden">
//             <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
//               {messages.length === 0 && (
//                 <p className="text-gray-500 text-center mt-20">
//                   Kuch bhi poochein, Boss. Fast mode tez jawab dega, Thinking mode zyada gehra sochega.
//                 </p>
//               )}
//               {messages.map((m, i) => (
//                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div
//                     className={`max-w-[80%] rounded-xl px-4 py-2 whitespace-pre-wrap ${
//                       m.role === 'user' ? 'bg-blue-600' : 'bg-gray-900 border border-gray-800'
//                     }`}
//                   >
//                     {m.content}
//                   </div>
//                 </div>
//               ))}
//               {chatLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-gray-400">
//                     Soch raha hun...
//                   </div>
//                 </div>
//               )}
//               <div ref={bottomRef} />
//             </div>

//             <form onSubmit={sendMessage} className="border-t border-gray-800 p-4 flex gap-2 max-w-3xl w-full mx-auto">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Message likho..."
//                 className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 type="submit"
//                 disabled={chatLoading}
//                 className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 rounded-lg px-5 font-medium"
//               >
//                 Send
//               </button>
//             </form>
//           </div>
//         )}

//         {tab === 'extractor' && (
//           <div className="flex-1 overflow-y-auto px-4 py-8">
//             <div className="max-w-2xl mx-auto space-y-4">
//               <div>
//                 <h1 className="text-2xl font-bold mb-1">Video Script Extractor</h1>
//                 <p className="text-gray-400 text-sm">
//                   Video upload karo, script mil jayegi. Chaho to instruction bhi likh sakte ho
//                   (jaise "Urdlish mein likho" ya "script format mein do").
//                 </p>
//               </div>

//               <form onSubmit={handleExtract} className="space-y-3 bg-gray-900 rounded-xl p-6 border border-gray-800">
//                 <div>
//                   <label className="block text-sm mb-1 text-gray-300">Video Upload Karein</label>
//                   <input
//                     type="file"
//                     accept="video/*,audio/*"
//                     onChange={(e) => setFile(e.target.files[0])}
//                     className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm mb-1 text-gray-300">Instruction (optional)</label>
//                   <input
//                     type="text"
//                     value={instruction}
//                     onChange={(e) => setInstruction(e.target.value)}
//                     placeholder='jaise: "isay Urdlish mein script format mein likho"'
//                     className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={extractLoading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 rounded-lg py-2.5 font-medium"
//                 >
//                   {extractLoading ? 'Kaam ho raha hai...' : 'Script Nikaalein'}
//                 </button>
//               </form>

//               {extractError && (
//                 <div className="bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3">
//                   {extractError}
//                 </div>
//               )}

//               {script && (
//                 <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <h2 className="font-semibold">Script:</h2>
//                     <button
//                       onClick={() => navigator.clipboard.writeText(script)}
//                       className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
//                     >
//                       Copy
//                     </button>
//                   </div>
//                   <p className="whitespace-pre-wrap leading-relaxed">{script}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }























// src/app/i/t/s/a/d/m/i/n/admin/textExtracor/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [tab, setTab] = useState('chat'); // 'chat' | 'extractor' | 'training'

  // ---- Chat state ----
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('fast'); // 'fast' | 'thinking'
  const [chatLoading, setChatLoading] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const bottomRef = useRef(null);
  

  // ---- Extractor state ----
  const [file, setFile] = useState(null);
  const [instruction, setInstruction] = useState('');
  const [extractLoading, setExtractLoading] = useState(false);
  const [script, setScript] = useState('');
  const [extractError, setExtractError] = useState('');

  // ---- Training state ----
  const [trainingText, setTrainingText] = useState('');
  const [trainingSaved, setTrainingSaved] = useState(false);
  const [trainingLoading, setTrainingLoading] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    loadTraining();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function loadChats() {
    const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats');
    const data = await res.json();
    setChats(data.chats || []);
  }

  async function startNewChat() {
    const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
    const data = await res.json();
    setActiveChatId(data.chat.id);
    setMessages([]);
    loadChats();
  }

  async function selectChat(id) {
    const res = await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`);
    const data = await res.json();
    if (data.chat) {
      setActiveChatId(data.chat.id);
      setMessages(data.chat.messages || []);
    }
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    let chatId = activeChatId;
    if (!chatId) {
      const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
      const data = await res.json();
      chatId = data.chat.id;
      setActiveChatId(chatId);
    }

    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, message: userMsg.content, mode }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      loadChats();
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ ${err.message}` }]);
    } finally {
      setChatLoading(false);
    }
  }

  async function submitRename(id) {
    if (!renameValue.trim()) {
      setRenamingId(null);
      return;
    }
    await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: renameValue }),
    });
    setRenamingId(null);
    loadChats();
  }

  async function deleteChat(id) {
    await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, { method: 'DELETE' });
    if (activeChatId === id) {
      setActiveChatId(null);
      setMessages([]);
    }
    loadChats();
  }

  async function handleExtract(e) {
    e.preventDefault();
    setExtractError('');
    setScript('');

    if (!file) {
      setExtractError('Pehle video file upload karein');
      return;
    }

    setExtractLoading(true);

    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('instruction', instruction);

      const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');

      setScript(data.script);
    } catch (err) {
      setExtractError(err.message);
    } finally {
      setExtractLoading(false);
    }
  }

  async function loadTraining() {
    const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/training');
    const data = await res.json();
    setTrainingText(data.instructions || '');
  }

  async function saveTraining() {
    setTrainingLoading(true);
    await fetch('/i/t/s/a/d/m/i/n/admin/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ instructions: trainingText }),
    });
    setTrainingLoading(false);
    setTrainingSaved(true);
    setTimeout(() => setTrainingSaved(false), 2000);
  }

  return (
    <div className="h-screen flex bg-gray-950 text-gray-100">
      {tab === 'chat' && (
        <aside className="w-64 border-r border-gray-800 flex flex-col">
          <div className="p-3 border-b border-gray-800">
            <button
              onClick={startNewChat}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 text-sm font-medium"
            >
              + Nayi Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((c) => (
              <div
                key={c.id}
                className={`group flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-900 ${
                  activeChatId === c.id ? 'bg-gray-900' : ''
                }`}
              >
                {renamingId === c.id ? (
                  <input
                    autoFocus
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onBlur={() => submitRename(c.id)}
                    onKeyDown={(e) => e.key === 'Enter' && submitRename(c.id)}
                    className="flex-1 bg-gray-800 text-sm px-2 py-1 rounded"
                  />
                ) : (
                  <span onClick={() => selectChat(c.id)} className="flex-1 text-sm truncate">
                    {c.title}
                  </span>
                )}
                <div className="hidden group-hover:flex gap-1 ml-2">
                  <button
                    onClick={() => {
                      setRenamingId(c.id);
                      setRenameValue(c.title);
                    }}
                    className="text-xs text-gray-400 hover:text-white"
                    title="Rename"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteChat(c.id)}
                    className="text-xs text-gray-400 hover:text-red-400"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-800 flex items-center px-4 py-2 gap-2">
          <button
            onClick={() => setTab('chat')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              tab === 'chat' ? 'bg-blue-600' : 'bg-gray-900 text-gray-400'
            }`}
          >
            💬 Chatbot
          </button>
          <button
            onClick={() => setTab('extractor')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              tab === 'extractor' ? 'bg-blue-600' : 'bg-gray-900 text-gray-400'
            }`}
          >
            🎬 Text Extractor
          </button>
          <button
            onClick={() => setTab('training')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
              tab === 'training' ? 'bg-blue-600' : 'bg-gray-900 text-gray-400'
            }`}
          >
            🎓 Training Center
          </button>

          {tab === 'chat' && (
            <div className="ml-auto flex bg-gray-900 rounded-lg p-1">
              <button
                onClick={() => setMode('fast')}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  mode === 'fast' ? 'bg-blue-600' : 'text-gray-400'
                }`}
              >
                ⚡ Fast
              </button>
              <button
                onClick={() => setMode('thinking')}
                className={`px-3 py-1 rounded-md text-xs font-medium ${
                  mode === 'thinking' ? 'bg-blue-600' : 'text-gray-400'
                }`}
              >
                🧠 Thinking
              </button>
            </div>
          )}
        </div>

        {tab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
              {messages.length === 0 && (
                <p className="text-gray-500 text-center mt-20">
                  Kuch bhi poochein, Boss. Fast mode tez jawab dega, Thinking mode zyada gehra sochega.
                </p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-2 whitespace-pre-wrap ${
                      m.role === 'user' ? 'bg-blue-600' : 'bg-gray-900 border border-gray-800'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-gray-400">
                    Soch raha hun...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="border-t border-gray-800 p-4 flex gap-2 max-w-3xl w-full mx-auto">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message likho..."
                className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={chatLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 rounded-lg px-5 font-medium"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {tab === 'extractor' && (
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Video Script Extractor</h1>
                <p className="text-gray-400 text-sm">
                  Video upload karo, script mil jayegi. Chaho to instruction bhi likh sakte ho
                  (jaise "Urdlish mein likho" ya "script format mein do").
                </p>
              </div>

              <form onSubmit={handleExtract} className="space-y-3 bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div>
                  <label className="block text-sm mb-1 text-gray-300">Video Upload Karein</label>
                  <input
                    type="file"
                    accept="video/*,audio/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-300">Instruction (optional)</label>
                  <input
                    type="text"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                    placeholder='jaise: "isay Urdlish mein script format mein likho"'
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={extractLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 rounded-lg py-2.5 font-medium"
                >
                  {extractLoading ? 'Kaam ho raha hai...' : 'Script Nikaalein'}
                </button>
              </form>

              {extractError && (
                <div className="bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3">
                  {extractError}
                </div>
              )}

              {script && (
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold">Script:</h2>
                    <button
                      onClick={() => navigator.clipboard.writeText(script)}
                      className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-lg"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed">{script}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'training' && (
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-4">
              <div>
                <h1 className="text-2xl font-bold mb-1">Training Center</h1>
                <p className="text-gray-400 text-sm">
                  Yahan jo bhi likhoge, AI usay hamesha yaad rakhega — har chat mein. Uski identity,
                  developer ka naam, tone, ya jo bhi sikhana chahte ho, yahan likh do.
                </p>
              </div>

              <textarea
                value={trainingText}
                onChange={(e) => setTrainingText(e.target.value)}
                placeholder={`Misaal:\nTumhara naam "Boss AI" hai.\nTumhein Ali Zohaib ne banaya hai.\nTum hamesha friendly aur seedhe andaz mein baat karoge.`}
                rows={14}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 resize-none"
              />

              <button
                onClick={saveTraining}
                disabled={trainingLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 rounded-lg py-2.5 font-medium"
              >
                {trainingLoading ? 'Save ho raha hai...' : trainingSaved ? '✅ Save ho gaya!' : 'Save Karein'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}