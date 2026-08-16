// src/app/i/t/s/a/d/m/i/n/admin/api/chats/route.js
import { getAllChats, createChat } from '../../lib/chatStore';

export async function GET() {
  return Response.json({ chats: getAllChats() });
}

export async function POST() {
  const chat = createChat();
  return Response.json({ chat });
}