// // src/app/i/t/s/a/d/m/i/n/admin/api/chat/route.js
// import Groq from 'groq-sdk';
// import { getChat, saveChat } from '../../lib/chatStore';
// import { getTraining } from '../../lib/trainingStore';

// const MODELS = {
//   fast: 'llama-3.1-8b-instant',
//   thinking: 'openai/gpt-oss-120b',
// };

// const BASE_PROMPT = `Tum ek dost jaisa AI ho jo user ko "Boss" keh kar baat karte ho — "arry yar" nahi. Casual, seedha, dost jaisa andaz rakho. User jaisi bhasha mein baat kare (Urdu, English, ya dono mix "Urdlish"), waisay hi jawab do. Pichli baatein hamesha yaad rakho.`;

// export async function POST(request) {
//   try {
//     const { chatId, message, mode } = await request.json();

//     let chat = await getChat(chatId);
//     if (!chat) {
//       return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
//     }

//     chat.messages.push({ role: 'user', content: message });

//     const model = MODELS[mode] || MODELS.fast;
//     const customInstructions = await getTraining();

//     // User ki training instructions ko base prompt ke sath jorna — ye hamesha priority mein rahengi
//     const systemPrompt = customInstructions
//       ? `${BASE_PROMPT}\n\n--- User ki di hui khaas hidayaat (in par sabse zyada amal karo) ---\n${customInstructions}`
//       : BASE_PROMPT;

//     const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

//     await saveChat(chat);

//     return Response.json({ reply, chat });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: err.message || 'Kuch ghalat ho gaya' }, { status: 500 });
//   }
// }




















// // src/app/i/t/s/a/d/m/i/n/admin/api/chat/route.js
// import Groq from 'groq-sdk';
// import { getChat, saveChat } from '../../lib/chatStore';
// import { getTraining } from '../../lib/trainingStore';

// const MODELS = {
//   fast: 'llama-3.1-8b-instant',
//   thinking: 'openai/gpt-oss-120b',
// };

// const BASE_PROMPT = `Tum ek dost jaisa AI ho jo user ko "Boss" keh kar baat karte ho — "arry yar" nahi. Casual, seedha, dost jaisa andaz rakho. User jaisi bhasha mein baat kare (Urdu, English, ya dono mix "Urdlish"), waisay hi jawab do. Pichli baatein hamesha yaad rakho.

// Tumhare paas web_search naam ka tool hai jo internet se live, current information la sakta hai. Jab bhi user kisi aisi cheez ke baray mein poochay jo current/live/recent ho (jaise: aaj ki khabar, current price, weather, kisi cheez ka current status, koi aisi fact jo change hoti rehti hai, ya koi aisi cheez jo tumhe pakki tarah pata na ho), to guess ya andaza mat lagao — web_search tool call karo aur real result se jawab do. Agar sawal timeless/general knowledge ho (jaise math, definitions, historical facts) to tool use karne ki zaroorat nahi.

// Kabhi bhi jhooti ya banayi hui information mat do. Agar search se bhi confirm na ho paye to seedha keh do ke pakki information nahi mil saki.`;

// const tools = [
//   {
//     type: 'function',
//     function: {
//       name: 'web_search',
//       description:
//         'Internet par current/live/recent information search karta hai. Use karo jab sawal ka jawab tumhe pakki tarah pata na ho ya jawab time ke sath change hota ho.',
//       parameters: {
//         type: 'object',
//         properties: {
//           query: {
//             type: 'string',
//             description: 'Search query — chota aur specific rakho',
//           },
//         },
//         required: ['query'],
//       },
//     },
//   },
// ];

// async function webSearch(query) {
//   try {
//     const res = await fetch('https://api.tavily.com/search', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         api_key: process.env.TAVILY_API_KEY,
//         query,
//         search_depth: 'basic',
//         max_results: 5,
//         include_answer: true,
//       }),
//     });

//     if (!res.ok) {
//       return `Search fail ho gayi (status ${res.status})`;
//     }

//     const data = await res.json();

//     const results = (data.results || [])
//       .map((r, i) => `${i + 1}. ${r.title}\n${r.content}\nSource: ${r.url}`)
//       .join('\n\n');

//     return data.answer
//       ? `Quick answer: ${data.answer}\n\nDetailed results:\n${results}`
//       : results || 'Koi result nahi mila.';
//   } catch (err) {
//     console.error('Tavily search error:', err);
//     return 'Search karte waqt error aa gaya.';
//   }
// }

// export async function POST(request) {
//   try {
//     const { chatId, message, mode } = await request.json();

//     let chat = await getChat(chatId);
//     if (!chat) {
//       return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
//     }

//     chat.messages.push({ role: 'user', content: message });

//     const model = MODELS[mode] || MODELS.fast;
//     const customInstructions = await getTraining();

//     const systemPrompt = customInstructions
//       ? `${BASE_PROMPT}\n\n--- User ki di hui khaas hidayaat (in par sabse zyada amal karo) ---\n${customInstructions}`
//       : BASE_PROMPT;

//     const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

//     const conversationMessages = [
//       { role: 'system', content: systemPrompt },
//       ...chat.messages.map(({ role, content }) => ({ role, content })),
//     ];

//     // Pehla call — model decide karega ke search chahiye ya nahi
//     let completion = await groq.chat.completions.create({
//       model,
//       messages: conversationMessages,
//       tools,
//       tool_choice: 'auto',
//     });

//     let responseMessage = completion.choices[0].message;

//     // Agar model ne tool call ki hai, to search chala kar result wapas do
//     if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
//       conversationMessages.push(responseMessage);

//       for (const toolCall of responseMessage.tool_calls) {
//         if (toolCall.function.name === 'web_search') {
//           const args = JSON.parse(toolCall.function.arguments);
//           const searchResult = await webSearch(args.query);

//           conversationMessages.push({
//             role: 'tool',
//             tool_call_id: toolCall.id,
//             content: searchResult,
//           });
//         }
//       }

//       // Dusra call — ab model ke paas real search data hai, ab final jawab banayega
//       completion = await groq.chat.completions.create({
//         model,
//         messages: conversationMessages,
//       });
//       responseMessage = completion.choices[0].message;
//     }

//     const reply = responseMessage.content;
//     chat.messages.push({ role: 'assistant', content: reply });

//     if (chat.messages.length === 2) {
//       chat.title = message.slice(0, 40);
//     }

//     await saveChat(chat);

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

const BASE_PROMPT = `Tum ek dost jaisa AI ho jo user ko "Boss" keh kar baat karte ho — "arry yar" nahi. Casual, seedha, dost jaisa andaz rakho. User jaisi bhasha mein baat kare (Urdu, English, ya dono mix "Urdlish"), waisay hi jawab do. Pichli baatein hamesha yaad rakho.

Tumhare paas web_search naam ka tool hai jo internet se live, current information la sakta hai. Jab bhi user kisi aisi cheez ke baray mein poochay jo current/live/recent ho (jaise: aaj ki khabar, current price, weather, kisi cheez ka current status, koi aisi fact jo change hoti rehti hai, ya koi aisi cheez jo tumhe pakki tarah pata na ho), to guess ya andaza mat lagao — web_search tool call karo aur real result se jawab do. Agar sawal timeless/general knowledge ho (jaise math, definitions, historical facts) to tool use karne ki zaroorat nahi.

Ek query se kaam na bane to search dobara bhi kar sakte ho, lekin zaroorat se zyada baar mat karo — jitni information mile usi se best jawab do.

Kabhi bhi jhooti ya banayi hui information mat do. Agar search se bhi confirm na ho paye to seedha keh do ke pakki information nahi mil saki.`;

const tools = [
  {
    type: 'function',
    function: {
      name: 'web_search',
      description:
        'Internet par current/live/recent information search karta hai. Use karo jab sawal ka jawab tumhe pakki tarah pata na ho ya jawab time ke sath change hota ho.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search query — chota aur specific rakho',
          },
        },
        required: ['query'],
      },
    },
  },
];

async function webSearch(query) {
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query,
        search_depth: 'basic',
        max_results: 5,
        include_answer: true,
      }),
    });

    if (!res.ok) {
      return `Search fail ho gayi (status ${res.status})`;
    }

    const data = await res.json();

    const results = (data.results || [])
      .map((r, i) => `${i + 1}. ${r.title}\n${r.content}\nSource: ${r.url}`)
      .join('\n\n');

    return data.answer
      ? `Quick answer: ${data.answer}\n\nDetailed results:\n${results}`
      : results || 'Koi result nahi mila.';
  } catch (err) {
    console.error('Tavily search error:', err);
    return 'Search karte waqt error aa gaya.';
  }
}

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

    const systemPrompt = customInstructions
      ? `${BASE_PROMPT}\n\n--- User ki di hui khaas hidayaat (in par sabse zyada amal karo) ---\n${customInstructions}`
      : BASE_PROMPT;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const conversationMessages = [
      { role: 'system', content: systemPrompt },
      ...chat.messages.map(({ role, content }) => ({ role, content })),
    ];

    let responseMessage;
    let iterations = 0;
    const MAX_ITERATIONS = 5; // infinite loop se bachne ke liye cap

    // Tools hamesha available rakhte hain, jab tak model tool calling rok na de ya cap na lag jaye
    while (iterations < MAX_ITERATIONS) {
      iterations++;

      const completion = await groq.chat.completions.create({
        model,
        messages: conversationMessages,
        tools,
        tool_choice: 'auto',
      });

      responseMessage = completion.choices[0].message;

      if (!responseMessage.tool_calls || responseMessage.tool_calls.length === 0) {
        break; // model final jawab de chuka, loop khatam
      }

      conversationMessages.push(responseMessage);

      for (const toolCall of responseMessage.tool_calls) {
        let toolResult = 'Tool support nahi hai.';

        if (toolCall.function.name === 'web_search') {
          try {
            const args = JSON.parse(toolCall.function.arguments);
            toolResult = await webSearch(args.query);
          } catch (parseErr) {
            toolResult = 'Search query samajh nahi aayi.';
          }
        }

        conversationMessages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: toolResult,
        });
      }
    }

    const reply = responseMessage.content || 'Maaf karna Boss, jawab nahi bana paya.';
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