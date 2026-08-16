






// // src/app/i/t/s/a/d/m/i/n/admin/api/chat/route.js
// import Groq from 'groq-sdk';
// import { getChat, saveChat } from '../../lib/chatStore';
// import { getTraining } from '../../lib/trainingStore';

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// const MODELS = {
//   fast: 'llama-3.1-8b-instant',
//   thinking: 'openai/gpt-oss-120b',
// };

// const BASE_PROMPT = `Tum ek dost jaisa AI ho jo user ko "Boss" keh kar baat karte ho — "arry yar" nahi. Casual, seedha, dost jaisa andaz rakho. User jaisi bhasha mein baat kare (Urdu, English, ya dono mix "Urdlish"), waisay hi jawab do. Pichli baatein hamesha yaad rakho.`;

// export async function POST(request) {
//   try {
//     const { chatId, message, mode } = await request.json();

//     let chat = getChat(chatId);
//     if (!chat) {
//       return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
//     }

//     chat.messages.push({ role: 'user', content: message });

//     const model = MODELS[mode] || MODELS.fast;
//     const customInstructions = getTraining();

//     // User ki training instructions ko base prompt ke sath jorna — ye hamesha priority mein rahengi
//     const systemPrompt = customInstructions
//       ? `${BASE_PROMPT}\n\n--- User ki di hui khaas hidayaat (in par sabse zyada amal karo) ---\n${customInstructions}`
//       : BASE_PROMPT;

//     const completion = await groq.chat.completions.create({
//       model,
//       messages: [
//         { role: 'system', content: systemPrompt },
//         ...chat.messages.map(({ role, content }) => ({ role, content })),
//       ],
//     });

//     const reply = completion.choices[0].message.content;
//     chat.messages.push({ role: 'assistant', content: reply });

//     if (chat.messages.length === 2) {
//       chat.title = message.slice(0, 40);
//     }

//     saveChat(chat);

//     return Response.json({ reply, chat });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
//   }
// }


























// src/app/i/t/s/a/d/m/i/n/admin/api/chat/route.js
import Groq from 'groq-sdk';
import { getChat, saveChat } from '../../lib/chatStore';
import { getTraining } from '../../lib/trainingStore';

const MODELS = {
  fast: 'llama-3.1-8b-instant',
  thinking: 'openai/gpt-oss-120b',
};

const BASE_PROMPT = `Tum ek dost jaisa AI ho jo user ko "Boss" keh kar baat karte ho — "arry yar" nahi. Casual, seedha, dost jaisa andaz rakho. User jaisi bhasha mein baat kare (Urdu, English, ya dono mix "Urdlish"), waisay hi jawab do. Pichli baatein hamesha yaad rakho.`;

export async function POST(request) {
  try {
    const { chatId, message, mode } = await request.json();

    let chat = await getChat(chatId);
    if (!chat) {
      return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
    }

    chat.messages.push({ role: 'user', content: message });

    const model = MODELS[mode] || MODELS.fast;
    const customInstructions = await getTraining();

    // User ki training instructions ko base prompt ke sath jorna — ye hamesha priority mein rahengi
    const systemPrompt = customInstructions
      ? `${BASE_PROMPT}\n\n--- User ki di hui khaas hidayaat (in par sabse zyada amal karo) ---\n${customInstructions}`
      : BASE_PROMPT;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...chat.messages.map(({ role, content }) => ({ role, content })),
      ],
    });

    const reply = completion.choices[0].message.content;
    chat.messages.push({ role: 'assistant', content: reply });

    if (chat.messages.length === 2) {
      chat.title = message.slice(0, 40);
    }

    await saveChat(chat);

    return Response.json({ reply, chat });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
  }
}