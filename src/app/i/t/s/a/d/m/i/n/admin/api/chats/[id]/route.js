// // src/app/i/t/s/a/d/m/i/n/admin/api/chats/[id]/route.js
// import { getChat, renameChat, deleteChat } from '../../../lib/chatStore';

// export async function GET(request, { params }) {
//   const chat = getChat(params.id);
//   if (!chat) return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
//   return Response.json({ chat });
// }

// export async function PATCH(request, { params }) {
//   const { title } = await request.json();
//   const chat = renameChat(params.id, title);
//   if (!chat) return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
//   return Response.json({ chat });
// }

// export async function DELETE(request, { params }) {
//   deleteChat(params.id);
//   return Response.json({ success: true });
// }















// src/app/i/t/s/a/d/m/i/n/admin/api/chats/[id]/route.js
import { getChat, renameChat, deleteChat } from '../../../lib/chatStore';

export async function GET(request, { params }) {
  const { id } = await params;
  const chat = await getChat(id);
  if (!chat) return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
  return Response.json({ chat });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const { title } = await request.json();
  const chat = await renameChat(id, title);
  if (!chat) return Response.json({ error: 'Chat nahi mili' }, { status: 404 });
  return Response.json({ chat });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await deleteChat(id);
  return Response.json({ success: true });
}