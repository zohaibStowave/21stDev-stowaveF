// // src/app/i/t/s/a/d/m/i/n/admin/api/chats/route.js
// import { getAllChats, createChat } from '../../lib/chatStore';

// export async function GET() {
//   return Response.json({ chats: getAllChats() });
// }

// export async function POST() {
//   const chat = createChat();
//   return Response.json({ chat });
// }













// src/app/i/t/s/a/d/m/i/n/admin/api/chats/route.js
import { getAllChats, createChat } from '../../lib/chatStore';

export async function GET() {
  const chats = await getAllChats();
  return Response.json({ chats });
}

export async function POST() {
  const chat = await createChat();
  return Response.json({ chat });
}