// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { motion, AnimatePresence } from 'motion/react'; // npm i motion
// // import {
// //   MessageSquare, Clapperboard, GraduationCap, Plus, Pencil, Trash2,
// //   Send, Zap, Brain, Copy, Check, Upload, AlertTriangle, Sparkle,
// // } from 'lucide-react';

// // const TABS = [
// //   { id: 'chat', label: 'Chatbot', icon: MessageSquare },
// //   { id: 'extractor', label: 'Text Extractor', icon: Clapperboard },
// //   { id: 'training', label: 'Training Center', icon: GraduationCap },
// // ];

// // function AuraBackdrop() {
// //   return (
// //     <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aura-bg">
// //       <motion.div
// //         className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
// //         animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
// //         transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
// //       />
// //       <motion.div
// //         className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl"
// //         animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
// //         transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
// //       />
// //       <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
// //     </div>
// //   );
// // }

// // function TypingDots() {
// //   return (
// //     <span className="inline-flex items-center gap-1">
// //       {[0, 1, 2].map((i) => (
// //         <motion.span
// //           key={i}
// //           className="h-1.5 w-1.5 rounded-full bg-primary"
// //           animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
// //           transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
// //         />
// //       ))}
// //     </span>
// //   );
// // }

// // export default function BossConsole({ showSidebar = true, embedded = false }) {
// //   const [tab, setTab] = useState('chat');

// //   // ---- Chat state ----
// //   const [chats, setChats] = useState([]);
// //   const [activeChatId, setActiveChatId] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [mode, setMode] = useState('fast');
// //   const [chatLoading, setChatLoading] = useState(false);
// //   const [renamingId, setRenamingId] = useState(null);
// //   const [renameValue, setRenameValue] = useState('');
// //   const bottomRef = useRef(null);

// //   // ---- Extractor state ----
// //   const [file, setFile] = useState(null);
// //   const [instruction, setInstruction] = useState('');
// //   const [extractLoading, setExtractLoading] = useState(false);
// //   const [script, setScript] = useState('');
// //   const [extractError, setExtractError] = useState('');
// //   const [copied, setCopied] = useState(false);

// //   // ---- Training state ----
// //   const [trainingText, setTrainingText] = useState('');
// //   const [trainingSaved, setTrainingSaved] = useState(false);
// //   const [trainingLoading, setTrainingLoading] = useState(false);

// //   useEffect(() => { loadChats(); }, []);
// //   useEffect(() => { loadTraining(); }, []);
// //   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

// //   async function loadChats() {
// //     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats');
// //     const data = await res.json();
// //     setChats(data.chats || []);
// //   }

// //   async function startNewChat() {
// //     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
// //     const data = await res.json();
// //     setActiveChatId(data.chat.id);
// //     setMessages([]);
// //     loadChats();
// //   }

// //   async function selectChat(id) {
// //     const res = await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`);
// //     const data = await res.json();
// //     if (data.chat) {
// //       setActiveChatId(data.chat.id);
// //       setMessages(data.chat.messages || []);
// //     }
// //   }

// //   async function sendMessage(e) {
// //     e.preventDefault();
// //     if (!input.trim()) return;

// //     let chatId = activeChatId;
// //     if (!chatId) {
// //       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chats', { method: 'POST' });
// //       const data = await res.json();
// //       chatId = data.chat.id;
// //       setActiveChatId(chatId);
// //     }

// //     const userMsg = { role: 'user', content: input };
// //     setMessages((prev) => [...prev, userMsg]);
// //     setInput('');
// //     setChatLoading(true);

// //     try {
// //       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/chat', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ chatId, message: userMsg.content, mode }),
// //       });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');
// //       setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
// //       loadChats();
// //     } catch (err) {
// //       setMessages((prev) => [...prev, { role: 'assistant', content: `⚠️ ${err.message}` }]);
// //     } finally {
// //       setChatLoading(false);
// //     }
// //   }

// //   async function submitRename(id) {
// //     if (!renameValue.trim()) { setRenamingId(null); return; }
// //     await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, {
// //       method: 'PATCH',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ title: renameValue }),
// //     });
// //     setRenamingId(null);
// //     loadChats();
// //   }

// //   async function deleteChat(id) {
// //     await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`, { method: 'DELETE' });
// //     if (activeChatId === id) { setActiveChatId(null); setMessages([]); }
// //     loadChats();
// //   }

// //   async function handleExtract(e) {
// //     e.preventDefault();
// //     setExtractError('');
// //     setScript('');
// //     if (!file) { setExtractError('Pehle video file upload karein'); return; }
// //     setExtractLoading(true);
// //     try {
// //       const formData = new FormData();
// //       formData.append('video', file);
// //       formData.append('instruction', instruction);
// //       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', { method: 'POST', body: formData });
// //       const data = await res.json();
// //       if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');
// //       setScript(data.script);
// //     } catch (err) {
// //       setExtractError(err.message);
// //     } finally {
// //       setExtractLoading(false);
// //     }
// //   }

// //   async function loadTraining() {
// //     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/training');
// //     const data = await res.json();
// //     setTrainingText(data.instructions || '');
// //   }

// //   async function saveTraining() {
// //     setTrainingLoading(true);
// //     await fetch('/i/t/s/a/d/m/i/n/admin/api/training', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ instructions: trainingText }),
// //     });
// //     setTrainingLoading(false);
// //     setTrainingSaved(true);
// //     setTimeout(() => setTrainingSaved(false), 2000);
// //   }

// //   function copyScript() {
// //     navigator.clipboard.writeText(script);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 1600);
// //   }

// //   return (
// //     <div
// //       className={`relative flex overflow-hidden bg-background text-foreground ${
// //         embedded ? 'h-full min-h-[600px] rounded-3xl border border-border' : 'h-screen'
// //       }`}
// //     >
// //       {!embedded && <AuraBackdrop />}

// //       {/* Internal sidebar — showSidebar={false} se off */}
// //       <AnimatePresence initial={false}>
// //         {showSidebar && tab === 'chat' && (
// //           <motion.aside
// //             initial={{ x: -300, opacity: 0 }}
// //             animate={{ x: 0, opacity: 1 }}
// //             exit={{ x: -300, opacity: 0 }}
// //             transition={{ type: 'spring', stiffness: 260, damping: 30 }}
// //             className="hidden w-72 shrink-0 flex-col border-r border-border bg-sidebar/70 backdrop-blur-xl md:flex"
// //           >
// //             <div className="flex items-center gap-3 px-5 py-5">
// //               <motion.div
// //                 className="grid h-10 w-10 place-items-center rounded-xl brand-gradient glow"
// //                 animate={{ rotate: [0, 6, -6, 0] }}
// //                 transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
// //               >
// //                 <Sparkle className="h-5 w-5 text-primary-foreground" />
// //               </motion.div>
// //               <div>
// //                 <p className="font-display text-sm font-semibold tracking-tight">Boss Console</p>
// //                 <p className="text-xs text-muted-foreground">AI workspace</p>
// //               </div>
// //             </div>

// //             <div className="px-4 pb-4">
// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.97 }}
// //                 onClick={startNewChat}
// //                 className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground panel-shadow"
// //               >
// //                 <Plus className="h-4 w-4" /> Nayi Chat
// //               </motion.button>
// //             </div>

// //             <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
// //               <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
// //                 Recent
// //               </p>
// //               <AnimatePresence initial={false}>
// //                 {chats.map((c) => (
// //                   <motion.div
// //                     layout
// //                     key={c.id}
// //                     initial={{ opacity: 0, y: 8 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, x: -20 }}
// //                     className={`group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors ${
// //                       activeChatId === c.id
// //                         ? 'bg-sidebar-accent text-sidebar-accent-foreground'
// //                         : 'hover:bg-sidebar-accent/60'
// //                     }`}
// //                   >
// //                     {activeChatId === c.id && (
// //                       <motion.span
// //                         layoutId="chat-active"
// //                         className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full brand-gradient"
// //                       />
// //                     )}
// //                     {renamingId === c.id ? (
// //                       <input
// //                         autoFocus
// //                         value={renameValue}
// //                         onChange={(e) => setRenameValue(e.target.value)}
// //                         onBlur={() => submitRename(c.id)}
// //                         onKeyDown={(e) => e.key === 'Enter' && submitRename(c.id)}
// //                         className="w-full rounded-lg border border-border bg-input/40 px-2 py-1 text-sm outline-none focus:border-primary"
// //                       />
// //                     ) : (
// //                       <button onClick={() => selectChat(c.id)} className="flex-1 truncate text-left text-sm">
// //                         {c.title}
// //                       </button>
// //                     )}
// //                     <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
// //                       <button
// //                         onClick={() => { setRenamingId(c.id); setRenameValue(c.title); }}
// //                         title="Rename"
// //                         className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
// //                       >
// //                         <Pencil className="h-3.5 w-3.5" />
// //                       </button>
// //                       <button
// //                         onClick={() => deleteChat(c.id)}
// //                         title="Delete"
// //                         className="rounded-md p-1 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
// //                       >
// //                         <Trash2 className="h-3.5 w-3.5" />
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>
// //               {chats.length === 0 && (
// //                 <p className="px-2 py-6 text-xs text-muted-foreground">
// //                   Abhi koi chat nahi. Nayi chat shuru karein.
// //                 </p>
// //               )}
// //             </div>
// //           </motion.aside>
// //         )}
// //       </AnimatePresence>

// //       {/* Main */}
// //       <div className="flex min-w-0 flex-1 flex-col">
// //         <header className="flex flex-wrap items-center gap-2 border-b border-border bg-background/40 px-4 py-3 backdrop-blur-xl">
// //           <nav className="flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
// //             {TABS.map(({ id, label, icon: Icon }) => (
// //               <button
// //                 key={id}
// //                 onClick={() => setTab(id)}
// //                 className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
// //                   tab === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
// //                 }`}
// //               >
// //                 {tab === id && (
// //                   <motion.span
// //                     layoutId="tab-pill"
// //                     className="absolute inset-0 rounded-xl brand-gradient"
// //                     transition={{ type: 'spring', stiffness: 380, damping: 32 }}
// //                   />
// //                 )}
// //                 <Icon className="relative z-10 h-4 w-4" />
// //                 <span className="relative z-10 hidden sm:inline">{label}</span>
// //               </button>
// //             ))}
// //           </nav>

// //           {tab === 'chat' && (
// //             <div className="ml-auto flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
// //               {[{ id: 'fast', label: 'Fast', icon: Zap }, { id: 'thinking', label: 'Thinking', icon: Brain }].map(
// //                 ({ id, label, icon: Icon }) => (
// //                   <button
// //                     key={id}
// //                     onClick={() => setMode(id)}
// //                     className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
// //                       mode === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
// //                     }`}
// //                   >
// //                     {mode === id && (
// //                       <motion.span
// //                         layoutId="mode-pill"
// //                         className="absolute inset-0 rounded-xl brand-gradient"
// //                         transition={{ type: 'spring', stiffness: 380, damping: 32 }}
// //                       />
// //                     )}
// //                     <Icon className="relative z-10 h-3.5 w-3.5" />
// //                     <span className="relative z-10">{label}</span>
// //                   </button>
// //                 ),
// //               )}
// //             </div>
// //           )}
// //         </header>

// //         <AnimatePresence mode="wait">
// //           {/* CHAT */}
// //           {tab === 'chat' && (
// //             <motion.section
// //               key="chat"
// //               initial={{ opacity: 0, y: 12 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -12 }}
// //               transition={{ duration: 0.25 }}
// //               className="flex min-h-0 flex-1 flex-col"
// //             >
// //               <div className="mx-auto w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-4 py-8">
// //                 {messages.length === 0 && (
// //                   <motion.div
// //                     initial={{ opacity: 0, scale: 0.96 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     className="mt-16 text-center"
// //                   >
// //                     <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl brand-gradient glow animate-float-slow">
// //                       <Sparkle className="h-7 w-7 text-primary-foreground" />
// //                     </div>
// //                     <h1 className="mt-6 text-2xl font-semibold text-gradient">Kuch bhi poochein, Boss</h1>
// //                     <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
// //                       Fast mode tez jawab dega, Thinking mode zyada gehra sochega.
// //                     </p>
// //                   </motion.div>
// //                 )}

// //                 {messages.map((m, i) => (
// //                   <motion.div
// //                     key={i}
// //                     initial={{ opacity: 0, y: 14, scale: 0.98 }}
// //                     animate={{ opacity: 1, y: 0, scale: 1 }}
// //                     transition={{ type: 'spring', stiffness: 300, damping: 26 }}
// //                     className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
// //                   >
// //                     <div
// //                       className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
// //                         m.role === 'user'
// //                           ? 'brand-gradient text-primary-foreground panel-shadow'
// //                           : 'border border-border bg-card/70 text-card-foreground backdrop-blur'
// //                       }`}
// //                     >
// //                       {m.content}
// //                     </div>
// //                   </motion.div>
// //                 ))}

// //                 {chatLoading && (
// //                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
// //                     <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm backdrop-blur">
// //                       <TypingDots />
// //                       <span className="shimmer-text font-medium">Soch raha hun...</span>
// //                     </div>
// //                   </motion.div>
// //                 )}
// //                 <div ref={bottomRef} />
// //               </div>

// //               <form onSubmit={sendMessage} className="mx-auto w-full max-w-3xl px-4 pb-6">
// //                 <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl panel-shadow focus-within:border-primary/60">
// //                   <input
// //                     value={input}
// //                     onChange={(e) => setInput(e.target.value)}
// //                     placeholder="Message likho..."
// //                     className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
// //                   />
// //                   <motion.button
// //                     type="submit"
// //                     disabled={chatLoading}
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.94 }}
// //                     className="grid h-10 w-10 shrink-0 place-items-center rounded-xl brand-gradient text-primary-foreground disabled:opacity-50"
// //                   >
// //                     <Send className="h-4 w-4" />
// //                   </motion.button>
// //                 </div>
// //               </form>
// //             </motion.section>
// //           )}

// //           {/* EXTRACTOR */}
// //           {tab === 'extractor' && (
// //             <motion.section
// //               key="extractor"
// //               initial={{ opacity: 0, y: 12 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -12 }}
// //               transition={{ duration: 0.25 }}
// //               className="flex-1 overflow-y-auto px-4 py-10"
// //             >
// //               <div className="mx-auto max-w-2xl space-y-6">
// //                 <div>
// //                   <h1 className="text-3xl font-bold text-gradient">Video Script Extractor</h1>
// //                   <p className="mt-2 text-sm text-muted-foreground">
// //                     Video upload karo, script mil jayegi. Chaho to instruction bhi likh sakte ho
// //                     (jaise &quot;Urdlish mein likho&quot; ya &quot;script format mein do&quot;).
// //                   </p>
// //                 </div>

// //                 <motion.form
// //                   onSubmit={handleExtract}
// //                   initial={{ opacity: 0, y: 16 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   className="space-y-5 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
// //                 >
// //                   <div>
// //                     <label className="mb-2 block text-sm font-medium">Video Upload Karein</label>
// //                     <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-input/20 px-4 py-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/5">
// //                       <motion.span
// //                         className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"
// //                         whileHover={{ y: -3 }}
// //                       >
// //                         <Upload className="h-5 w-5" />
// //                       </motion.span>
// //                       <span className="text-sm">{file ? file.name : 'Click karein ya file yahan chunein'}</span>
// //                       <span className="text-xs text-muted-foreground">Video ya audio file</span>
// //                       <input
// //                         type="file"
// //                         accept="video/*,audio/*"
// //                         onChange={(e) => setFile(e.target.files[0])}
// //                         className="hidden"
// //                       />
// //                     </label>
// //                   </div>

// //                   <div>
// //                     <label className="mb-2 block text-sm font-medium">Instruction (optional)</label>
// //                     <input
// //                       type="text"
// //                       value={instruction}
// //                       onChange={(e) => setInstruction(e.target.value)}
// //                       placeholder='jaise: "isay Urdlish mein script format mein likho"'
// //                       className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
// //                     />
// //                   </div>

// //                   <motion.button
// //                     type="submit"
// //                     disabled={extractLoading}
// //                     whileHover={{ scale: 1.01 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
// //                   >
// //                     {extractLoading ? 'Kaam ho raha hai...' : 'Script Nikaalein'}
// //                   </motion.button>
// //                 </motion.form>

// //                 <AnimatePresence>
// //                   {extractError && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -8 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0 }}
// //                       className="flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
// //                     >
// //                       <AlertTriangle className="h-4 w-4 shrink-0" />
// //                       {extractError}
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>

// //                 <AnimatePresence>
// //                   {script && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 16 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       exit={{ opacity: 0 }}
// //                       className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
// //                     >
// //                       <div className="mb-4 flex items-center justify-between">
// //                         <h2 className="font-display text-lg font-semibold">Script</h2>
// //                         <button
// //                           onClick={copyScript}
// //                           className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50"
// //                         >
// //                           {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
// //                           {copied ? 'Copied' : 'Copy'}
// //                         </button>
// //                       </div>
// //                       <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{script}</p>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>
// //             </motion.section>
// //           )}

// //           {/* TRAINING */}
// //           {tab === 'training' && (
// //             <motion.section
// //               key="training"
// //               initial={{ opacity: 0, y: 12 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -12 }}
// //               transition={{ duration: 0.25 }}
// //               className="flex-1 overflow-y-auto px-4 py-10"
// //             >
// //               <div className="mx-auto max-w-2xl space-y-6">
// //                 <div>
// //                   <h1 className="text-3xl font-bold text-gradient">Training Center</h1>
// //                   <p className="mt-2 text-sm text-muted-foreground">
// //                     Yahan jo bhi likhoge, AI usay hamesha yaad rakhega — har chat mein. Uski identity,
// //                     developer ka naam, tone, ya jo bhi sikhana chahte ho, yahan likh do.
// //                   </p>
// //                 </div>

// //                 <motion.div
// //                   initial={{ opacity: 0, y: 16 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
// //                 >
// //                   <textarea
// //                     value={trainingText}
// //                     onChange={(e) => setTrainingText(e.target.value)}
// //                     placeholder={`Misaal:\nTumhara naam "Boss AI" hai.\nTumhein Ali Zohaib ne banaya hai.\nTum hamesha friendly aur seedhe andaz mein baat karoge.`}
// //                     rows={14}
// //                     className="w-full resize-none rounded-2xl border border-border bg-input/25 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-primary"
// //                   />

// //                   <motion.button
// //                     onClick={saveTraining}
// //                     disabled={trainingLoading}
// //                     whileHover={{ scale: 1.01 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="mt-4 w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
// //                   >
// //                     {trainingLoading ? 'Save ho raha hai...' : trainingSaved ? '✅ Save ho gaya!' : 'Save Karein'}
// //                   </motion.button>
// //                 </motion.div>
// //               </div>
// //             </motion.section>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // }



















// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'motion/react'; // npm i motion
// import {
//   MessageSquare, Clapperboard, GraduationCap, Plus, Pencil, Trash2,
//   Send, Zap, Brain, Copy, Check, Upload, AlertTriangle, Sparkle,
// } from 'lucide-react';

// const TABS = [
//   { id: 'chat', label: 'Chatbot', icon: MessageSquare },
//   { id: 'extractor', label: 'Text Extractor', icon: Clapperboard },
//   { id: 'training', label: 'Training Center', icon: GraduationCap },
// ];

// function AuraBackdrop() {
//   return (
//     <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aura-bg">
//       <motion.div
//         className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
//         animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
//         transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <motion.div
//         className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl"
//         animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
//         transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
//       />
//       <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
//     </div>
//   );
// }

// function TypingDots() {
//   return (
//     <span className="inline-flex items-center gap-1">
//       {[0, 1, 2].map((i) => (
//         <motion.span
//           key={i}
//           className="h-1.5 w-1.5 rounded-full bg-primary"
//           animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
//           transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
//         />
//       ))}
//     </span>
//   );
// }

// export default function BossConsole({ showSidebar = true, embedded = false }) {
//   const [tab, setTab] = useState('chat');

//   // ---- Chat state ----
//   const [chats, setChats] = useState([]);
//   const [activeChatId, setActiveChatId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [mode, setMode] = useState('fast');
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
//   const [copied, setCopied] = useState(false);

//   // ---- Training state ----
//   const [trainingText, setTrainingText] = useState('');
//   const [trainingSaved, setTrainingSaved] = useState(false);
//   const [trainingLoading, setTrainingLoading] = useState(false);

//   useEffect(() => { loadChats(); }, []);
//   useEffect(() => { loadTraining(); }, []);
//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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
//     if (!renameValue.trim()) { setRenamingId(null); return; }
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
//     if (activeChatId === id) { setActiveChatId(null); setMessages([]); }
//     loadChats();
//   }

//   // ---- UPDATED: Cloudinary ke through upload karta hai, taake bari video files
//   // Vercel ke 4.5MB serverless body-limit se na takrayein (413 error fix) ----
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
//       // Step 1: Signed upload credentials lo
//       const sigRes = await fetch('/i/t/s/a/d/m/i/n/admin/api/upload-signature');
//       const sigData = await sigRes.json();
//       if (!sigRes.ok) throw new Error(sigData.error || 'Signature nahi mili');

//       // Step 2: Video seedha Cloudinary pe upload karo (Vercel body-limit bypass)
//       const cloudForm = new FormData();
//       cloudForm.append('file', file);
//       cloudForm.append('api_key', sigData.apiKey);
//       cloudForm.append('timestamp', sigData.timestamp);
//       cloudForm.append('signature', sigData.signature);

//       const cloudRes = await fetch(
//         `https://api.cloudinary.com/v1_1/${sigData.cloudName}/video/upload`,
//         { method: 'POST', body: cloudForm }
//       );
//       const cloudData = await cloudRes.json();
//       if (!cloudRes.ok) throw new Error(cloudData.error?.message || 'Cloudinary upload fail ho gaya');

//       // Step 3: Video ka URL apne transcribe API ko bhejo
//       const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ videoUrl: cloudData.secure_url, instruction }),
//       });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || 'Kuch ghalat ho gaya');

//       setScript(data.script);
//     } catch (err) {
//       setExtractError(err.message);
//     } finally {
//       setExtractLoading(false);
//     }
//   }

//   async function loadTraining() {
//     const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/training');
//     const data = await res.json();
//     setTrainingText(data.instructions || '');
//   }

//   async function saveTraining() {
//     setTrainingLoading(true);
//     await fetch('/i/t/s/a/d/m/i/n/admin/api/training', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ instructions: trainingText }),
//     });
//     setTrainingLoading(false);
//     setTrainingSaved(true);
//     setTimeout(() => setTrainingSaved(false), 2000);
//   }

//   function copyScript() {
//     navigator.clipboard.writeText(script);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1600);
//   }

//   return (
//     <div
//       className={`relative flex overflow-hidden bg-background text-foreground ${
//         embedded ? 'h-full min-h-[600px] rounded-3xl border border-border' : 'h-screen'
//       }`}
//     >
//       {!embedded && <AuraBackdrop />}

//       {/* Internal sidebar — showSidebar={false} se off */}
//       <AnimatePresence initial={false}>
//         {showSidebar && tab === 'chat' && (
//           <motion.aside
//             initial={{ x: -300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -300, opacity: 0 }}
//             transition={{ type: 'spring', stiffness: 260, damping: 30 }}
//             className="hidden w-72 shrink-0 flex-col border-r border-border bg-sidebar/70 backdrop-blur-xl md:flex"
//           >
//             <div className="flex items-center gap-3 px-5 py-5">
//               <motion.div
//                 className="grid h-10 w-10 place-items-center rounded-xl brand-gradient glow"
//                 animate={{ rotate: [0, 6, -6, 0] }}
//                 transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
//               >
//                 <Sparkle className="h-5 w-5 text-primary-foreground" />
//               </motion.div>
//               <div>
//                 <p className="font-display text-sm font-semibold tracking-tight">Boss Console</p>
//                 <p className="text-xs text-muted-foreground">AI workspace</p>
//               </div>
//             </div>

//             <div className="px-4 pb-4">
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 onClick={startNewChat}
//                 className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground panel-shadow"
//               >
//                 <Plus className="h-4 w-4" /> Nayi Chat
//               </motion.button>
//             </div>

//             <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
//               <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
//                 Recent
//               </p>
//               <AnimatePresence initial={false}>
//                 {chats.map((c) => (
//                   <motion.div
//                     layout
//                     key={c.id}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -20 }}
//                     className={`group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors ${
//                       activeChatId === c.id
//                         ? 'bg-sidebar-accent text-sidebar-accent-foreground'
//                         : 'hover:bg-sidebar-accent/60'
//                     }`}
//                   >
//                     {activeChatId === c.id && (
//                       <motion.span
//                         layoutId="chat-active"
//                         className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full brand-gradient"
//                       />
//                     )}
//                     {renamingId === c.id ? (
//                       <input
//                         autoFocus
//                         value={renameValue}
//                         onChange={(e) => setRenameValue(e.target.value)}
//                         onBlur={() => submitRename(c.id)}
//                         onKeyDown={(e) => e.key === 'Enter' && submitRename(c.id)}
//                         className="w-full rounded-lg border border-border bg-input/40 px-2 py-1 text-sm outline-none focus:border-primary"
//                       />
//                     ) : (
//                       <button onClick={() => selectChat(c.id)} className="flex-1 truncate text-left text-sm">
//                         {c.title}
//                       </button>
//                     )}
//                     <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
//                       <button
//                         onClick={() => { setRenamingId(c.id); setRenameValue(c.title); }}
//                         title="Rename"
//                         className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
//                       >
//                         <Pencil className="h-3.5 w-3.5" />
//                       </button>
//                       <button
//                         onClick={() => deleteChat(c.id)}
//                         title="Delete"
//                         className="rounded-md p-1 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
//                       >
//                         <Trash2 className="h-3.5 w-3.5" />
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//               {chats.length === 0 && (
//                 <p className="px-2 py-6 text-xs text-muted-foreground">
//                   Abhi koi chat nahi. Nayi chat shuru karein.
//                 </p>
//               )}
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Main */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         <header className="flex flex-wrap items-center gap-2 border-b border-border bg-background/40 px-4 py-3 backdrop-blur-xl">
//           <nav className="flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
//             {TABS.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 onClick={() => setTab(id)}
//                 className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
//                   tab === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
//                 }`}
//               >
//                 {tab === id && (
//                   <motion.span
//                     layoutId="tab-pill"
//                     className="absolute inset-0 rounded-xl brand-gradient"
//                     transition={{ type: 'spring', stiffness: 380, damping: 32 }}
//                   />
//                 )}
//                 <Icon className="relative z-10 h-4 w-4" />
//                 <span className="relative z-10 hidden sm:inline">{label}</span>
//               </button>
//             ))}
//           </nav>

//           {tab === 'chat' && (
//             <div className="ml-auto flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
//               {[{ id: 'fast', label: 'Fast', icon: Zap }, { id: 'thinking', label: 'Thinking', icon: Brain }].map(
//                 ({ id, label, icon: Icon }) => (
//                   <button
//                     key={id}
//                     onClick={() => setMode(id)}
//                     className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
//                       mode === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
//                     }`}
//                   >
//                     {mode === id && (
//                       <motion.span
//                         layoutId="mode-pill"
//                         className="absolute inset-0 rounded-xl brand-gradient"
//                         transition={{ type: 'spring', stiffness: 380, damping: 32 }}
//                       />
//                     )}
//                     <Icon className="relative z-10 h-3.5 w-3.5" />
//                     <span className="relative z-10">{label}</span>
//                   </button>
//                 ),
//               )}
//             </div>
//           )}
//         </header>

//         <AnimatePresence mode="wait">
//           {/* CHAT */}
//           {tab === 'chat' && (
//             <motion.section
//               key="chat"
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.25 }}
//               className="flex min-h-0 flex-1 flex-col"
//             >
//               <div className="mx-auto w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-4 py-8">
//                 {messages.length === 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.96 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="mt-16 text-center"
//                   >
//                     <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl brand-gradient glow animate-float-slow">
//                       <Sparkle className="h-7 w-7 text-primary-foreground" />
//                     </div>
//                     <h1 className="mt-6 text-2xl font-semibold text-gradient">Kuch bhi poochein, Boss</h1>
//                     <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
//                       Fast mode tez jawab dega, Thinking mode zyada gehra sochega.
//                     </p>
//                   </motion.div>
//                 )}

//                 {messages.map((m, i) => (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 14, scale: 0.98 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     transition={{ type: 'spring', stiffness: 300, damping: 26 }}
//                     className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
//                   >
//                     <div
//                       className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
//                         m.role === 'user'
//                           ? 'brand-gradient text-primary-foreground panel-shadow'
//                           : 'border border-border bg-card/70 text-card-foreground backdrop-blur'
//                       }`}
//                     >
//                       {m.content}
//                     </div>
//                   </motion.div>
//                 ))}

//                 {chatLoading && (
//                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
//                     <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm backdrop-blur">
//                       <TypingDots />
//                       <span className="shimmer-text font-medium">Soch raha hun...</span>
//                     </div>
//                   </motion.div>
//                 )}
//                 <div ref={bottomRef} />
//               </div>

//               <form onSubmit={sendMessage} className="mx-auto w-full max-w-3xl px-4 pb-6">
//                 <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl panel-shadow focus-within:border-primary/60">
//                   <input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Message likho..."
//                     className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
//                   />
//                   <motion.button
//                     type="submit"
//                     disabled={chatLoading}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.94 }}
//                     className="grid h-10 w-10 shrink-0 place-items-center rounded-xl brand-gradient text-primary-foreground disabled:opacity-50"
//                   >
//                     <Send className="h-4 w-4" />
//                   </motion.button>
//                 </div>
//               </form>
//             </motion.section>
//           )}

//           {/* EXTRACTOR */}
//           {tab === 'extractor' && (
//             <motion.section
//               key="extractor"
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.25 }}
//               className="flex-1 overflow-y-auto px-4 py-10"
//             >
//               <div className="mx-auto max-w-2xl space-y-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gradient">Video Script Extractor</h1>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Video upload karo, script mil jayegi. Chaho to instruction bhi likh sakte ho
//                     (jaise &quot;Urdlish mein likho&quot; ya &quot;script format mein do&quot;).
//                   </p>
//                 </div>

//                 <motion.form
//                   onSubmit={handleExtract}
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="space-y-5 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
//                 >
//                   <div>
//                     <label className="mb-2 block text-sm font-medium">Video Upload Karein</label>
//                     <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-input/20 px-4 py-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/5">
//                       <motion.span
//                         className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"
//                         whileHover={{ y: -3 }}
//                       >
//                         <Upload className="h-5 w-5" />
//                       </motion.span>
//                       <span className="text-sm">{file ? file.name : 'Click karein ya file yahan chunein'}</span>
//                       <span className="text-xs text-muted-foreground">Video ya audio file</span>
//                       <input
//                         type="file"
//                         accept="video/*,audio/*"
//                         onChange={(e) => setFile(e.target.files[0])}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>

//                   <div>
//                     <label className="mb-2 block text-sm font-medium">Instruction (optional)</label>
//                     <input
//                       type="text"
//                       value={instruction}
//                       onChange={(e) => setInstruction(e.target.value)}
//                       placeholder='jaise: "isay Urdlish mein script format mein likho"'
//                       className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
//                     />
//                   </div>

//                   <motion.button
//                     type="submit"
//                     disabled={extractLoading}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
//                   >
//                     {extractLoading ? 'Kaam ho raha hai...' : 'Script Nikaalein'}
//                   </motion.button>
//                 </motion.form>

//                 <AnimatePresence>
//                   {extractError && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -8 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
//                     >
//                       <AlertTriangle className="h-4 w-4 shrink-0" />
//                       {extractError}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 <AnimatePresence>
//                   {script && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 16 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
//                     >
//                       <div className="mb-4 flex items-center justify-between">
//                         <h2 className="font-display text-lg font-semibold">Script</h2>
//                         <button
//                           onClick={copyScript}
//                           className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50"
//                         >
//                           {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
//                           {copied ? 'Copied' : 'Copy'}
//                         </button>
//                       </div>
//                       <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{script}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </motion.section>
//           )}

//           {/* TRAINING */}
//           {tab === 'training' && (
//             <motion.section
//               key="training"
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.25 }}
//               className="flex-1 overflow-y-auto px-4 py-10"
//             >
//               <div className="mx-auto max-w-2xl space-y-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gradient">Training Center</h1>
//                   <p className="mt-2 text-sm text-muted-foreground">
//                     Yahan jo bhi likhoge, AI usay hamesha yaad rakhega — har chat mein. Uski identity,
//                     developer ka naam, tone, ya jo bhi sikhana chahte ho, yahan likh do.
//                   </p>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
//                 >
//                   <textarea
//                     value={trainingText}
//                     onChange={(e) => setTrainingText(e.target.value)}
//                     placeholder={`Misaal:\nTumhara naam "Boss AI" hai.\nTumhein Ali Zohaib ne banaya hai.\nTum hamesha friendly aur seedhe andaz mein baat karoge.`}
//                     rows={14}
//                     className="w-full resize-none rounded-2xl border border-border bg-input/25 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-primary"
//                   />

//                   <motion.button
//                     onClick={saveTraining}
//                     disabled={trainingLoading}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="mt-4 w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
//                   >
//                     {trainingLoading ? 'Save ho raha hai...' : trainingSaved ? '✅ Save ho gaya!' : 'Save Karein'}
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.section>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }








































'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // npm i motion
import {
  MessageSquare, Clapperboard, GraduationCap, Plus, Pencil, Trash2,
  Send, Zap, Brain, Copy, Check, Upload, AlertTriangle, Sparkle, Menu, X,
} from 'lucide-react';

const TABS = [
  { id: 'chat', label: 'Chatbot', icon: MessageSquare },
  { id: 'extractor', label: 'Text Extractor', icon: Clapperboard },
  { id: 'training', label: 'Training Center', icon: GraduationCap },
];

function AuraBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden aura-bg">
      <motion.div
        className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

export default function BossConsole({ showSidebar = true, embedded = false }) {
  const [tab, setTab] = useState('chat');

  // ---- Chat state ----
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('fast');
  const [chatLoading, setChatLoading] = useState(false);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // NAYA: chote screens ke liye
  const bottomRef = useRef(null);

  // ---- Extractor state ----
  const [file, setFile] = useState(null);
  const [instruction, setInstruction] = useState('');
  const [extractLoading, setExtractLoading] = useState(false);
  const [script, setScript] = useState('');
  const [extractError, setExtractError] = useState('');
  const [copied, setCopied] = useState(false);

  // ---- Training state ----
  const [trainingText, setTrainingText] = useState('');
  const [trainingSaved, setTrainingSaved] = useState(false);
  const [trainingLoading, setTrainingLoading] = useState(false);

  useEffect(() => { loadChats(); }, []);
  useEffect(() => { loadTraining(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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
    setMobileSidebarOpen(false); // NAYA: mobile pe chat select karte hi drawer band ho jaye
  }

  async function selectChat(id) {
    const res = await fetch(`/i/t/s/a/d/m/i/n/admin/api/chats/${id}`);
    const data = await res.json();
    if (data.chat) {
      setActiveChatId(data.chat.id);
      setMessages(data.chat.messages || []);
    }
    setMobileSidebarOpen(false); // NAYA
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
    if (!renameValue.trim()) { setRenamingId(null); return; }
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
    if (activeChatId === id) { setActiveChatId(null); setMessages([]); }
    loadChats();
  }

  // ---- Cloudinary ke through upload karta hai, taake bari video files
  // Vercel ke 4.5MB serverless body-limit se na takrayein (413 error fix) ----
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
      const sigRes = await fetch('/i/t/s/a/d/m/i/n/admin/api/upload-signature');
      const sigData = await sigRes.json();
      if (!sigRes.ok) throw new Error(sigData.error || 'Signature nahi mili');

      const cloudForm = new FormData();
      cloudForm.append('file', file);
      cloudForm.append('api_key', sigData.apiKey);
      cloudForm.append('timestamp', sigData.timestamp);
      cloudForm.append('signature', sigData.signature);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/video/upload`,
        { method: 'POST', body: cloudForm }
      );
      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) throw new Error(cloudData.error?.message || 'Cloudinary upload fail ho gaya');

      const res = await fetch('/i/t/s/a/d/m/i/n/admin/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: cloudData.secure_url, instruction }),
      });
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

  function copyScript() {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const sidebarVisible = showSidebar && tab === 'chat';

  return (
    <div
      className={`relative flex overflow-hidden bg-background text-foreground ${
        embedded ? 'h-full min-h-[600px] rounded-3xl border border-border' : 'h-screen'
      }`}
    >
      {!embedded && <AuraBackdrop />}

      {/* Mobile backdrop — sidebar khuli ho to peeche dark overlay, tap karke band ho */}
      <AnimatePresence>
        {sidebarVisible && mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar — desktop pe hamesha visible (md:flex), mobile pe drawer jo toggle se khulta hai */}
      <AnimatePresence initial={false}>
        {sidebarVisible && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-border bg-sidebar/95 backdrop-blur-xl transition-transform duration-200 md:static md:z-auto md:bg-sidebar/70 md:translate-x-0 ${
              mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
          >
            <div className="flex items-center gap-3 px-5 py-5">
              <motion.div
                className="grid h-10 w-10 place-items-center rounded-xl brand-gradient glow"
                animate={{ rotate: [0, 6, -6, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkle className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="font-display text-sm font-semibold tracking-tight">Boss Console</p>
                <p className="text-xs text-muted-foreground">AI workspace</p>
              </div>
              {/* Mobile close button */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="ml-auto rounded-lg p-1.5 text-muted-foreground hover:bg-secondary md:hidden"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 pb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={startNewChat}
                className="flex w-full items-center justify-center gap-2 rounded-xl brand-gradient px-4 py-2.5 text-sm font-semibold text-primary-foreground panel-shadow"
              >
                <Plus className="h-4 w-4" /> Nayi Chat
              </motion.button>
            </div>

            <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
              <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Recent
              </p>
              <AnimatePresence initial={false}>
                {chats.map((c) => (
                  <motion.div
                    layout
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`group relative flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors ${
                      activeChatId === c.id
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent/60'
                    }`}
                  >
                    {activeChatId === c.id && (
                      <motion.span
                        layoutId="chat-active"
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full brand-gradient"
                      />
                    )}
                    {renamingId === c.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => submitRename(c.id)}
                        onKeyDown={(e) => e.key === 'Enter' && submitRename(c.id)}
                        className="w-full rounded-lg border border-border bg-input/40 px-2 py-1 text-sm outline-none focus:border-primary"
                      />
                    ) : (
                      <button onClick={() => selectChat(c.id)} className="flex-1 truncate text-left text-sm">
                        {c.title}
                      </button>
                    )}
                    {/* Rename/Delete icons: mobile pe hamesha visible, desktop pe hover se */}
                    <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                      <button
                        onClick={() => { setRenamingId(c.id); setRenameValue(c.title); }}
                        title="Rename"
                        className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => deleteChat(c.id)}
                        title="Delete"
                        className="rounded-md p-1 text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {chats.length === 0 && (
                <p className="px-2 py-6 text-xs text-muted-foreground">
                  Abhi koi chat nahi. Nayi chat shuru karein.
                </p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center gap-2 border-b border-border bg-background/40 px-4 py-3 backdrop-blur-xl">
          {/* Mobile hamburger — sirf chat tab pe aur sirf chote screens pe dikhega */}
          {sidebarVisible && (
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-xl border border-border bg-card/50 p-2 text-muted-foreground hover:text-foreground md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          <nav className="flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  tab === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-xl brand-gradient"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10 hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>

          {tab === 'chat' && (
            <div className="ml-auto flex items-center gap-1 rounded-2xl border border-border bg-card/50 p-1">
              {[{ id: 'fast', label: 'Fast', icon: Zap }, { id: 'thinking', label: 'Thinking', icon: Brain }].map(
                ({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                      mode === id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {mode === id && (
                      <motion.span
                        layoutId="mode-pill"
                        className="absolute inset-0 rounded-xl brand-gradient"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className="relative z-10 h-3.5 w-3.5" />
                    <span className="relative z-10">{label}</span>
                  </button>
                ),
              )}
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {/* CHAT */}
          {tab === 'chat' && (
            <motion.section
              key="chat"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="mx-auto w-full max-w-3xl flex-1 space-y-4 overflow-y-auto px-4 py-8">
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-16 text-center"
                  >
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl brand-gradient glow animate-float-slow">
                      <Sparkle className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="mt-6 text-2xl font-semibold text-gradient">Kuch bhi poochein, Boss</h1>
                    <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                      Fast mode tez jawab dega, Thinking mode zyada gehra sochega.
                    </p>
                  </motion.div>
                )}

                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'brand-gradient text-primary-foreground panel-shadow'
                          : 'border border-border bg-card/70 text-card-foreground backdrop-blur'
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {chatLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 text-sm backdrop-blur">
                      <TypingDots />
                      <span className="shimmer-text font-medium">Soch raha hun...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={sendMessage} className="mx-auto w-full max-w-3xl px-4 pb-6">
                <div className="flex items-end gap-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl panel-shadow focus-within:border-primary/60">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message likho..."
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <motion.button
                    type="submit"
                    disabled={chatLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.94 }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl brand-gradient text-primary-foreground disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </form>
            </motion.section>
          )}

          {/* EXTRACTOR */}
          {tab === 'extractor' && (
            <motion.section
              key="extractor"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto px-4 py-10"
            >
              <div className="mx-auto max-w-2xl space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gradient">Video Script Extractor</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Video upload karo, script mil jayegi. Chaho to instruction bhi likh sakte ho
                    (jaise &quot;Urdlish mein likho&quot; ya &quot;script format mein do&quot;).
                  </p>
                </div>

                <motion.form
                  onSubmit={handleExtract}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-5 rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium">Video Upload Karein</label>
                    <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-input/20 px-4 py-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/5">
                      <motion.span
                        className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary"
                        whileHover={{ y: -3 }}
                      >
                        <Upload className="h-5 w-5" />
                      </motion.span>
                      <span className="text-sm">{file ? file.name : 'Click karein ya file yahan chunein'}</span>
                      <span className="text-xs text-muted-foreground">Video ya audio file</span>
                      <input
                        type="file"
                        accept="video/*,audio/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Instruction (optional)</label>
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                      placeholder='jaise: "isay Urdlish mein script format mein likho"'
                      className="w-full rounded-xl border border-border bg-input/30 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={extractLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    {extractLoading ? 'Kaam ho raha hai...' : 'Script Nikaalein'}
                  </motion.button>
                </motion.form>

                <AnimatePresence>
                  {extractError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                    >
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      {extractError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {script && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-display text-lg font-semibold">Script</h2>
                        <button
                          onClick={copyScript}
                          className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50"
                        >
                          {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                          {copied ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{script}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.section>
          )}

          {/* TRAINING */}
          {tab === 'training' && (
            <motion.section
              key="training"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto px-4 py-10"
            >
              <div className="mx-auto max-w-2xl space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gradient">Training Center</h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Yahan jo bhi likhoge, AI usay hamesha yaad rakhega — har chat mein. Uski identity,
                    developer ka naam, tone, ya jo bhi sikhana chahte ho, yahan likh do.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-xl panel-shadow"
                >
                  <textarea
                    value={trainingText}
                    onChange={(e) => setTrainingText(e.target.value)}
                    placeholder={`Misaal:\nTumhara naam "Boss AI" hai.\nTumhein Ali Zohaib ne banaya hai.\nTum hamesha friendly aur seedhe andaz mein baat karoge.`}
                    rows={14}
                    className="w-full resize-none rounded-2xl border border-border bg-input/25 p-4 text-sm leading-relaxed outline-none transition-colors focus:border-primary"
                  />

                  <motion.button
                    onClick={saveTraining}
                    disabled={trainingLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full rounded-xl brand-gradient py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    {trainingLoading ? 'Save ho raha hai...' : trainingSaved ? '✅ Save ho gaya!' : 'Save Karein'}
                  </motion.button>
                </motion.div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}