// src/app/i/t/s/a/d/m/i/n/admin/lib/chatStore.js
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'chats.json');

function ensureDb() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ chats: [] }, null, 2));
  }
}

function readDb() {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export function getAllChats() {
  const data = readDb();
  return data.chats
    .map(({ id, title, updatedAt }) => ({ id, title, updatedAt }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export function getChat(id) {
  const data = readDb();
  return data.chats.find((c) => c.id === id) || null;
}

export function createChat() {
  const data = readDb();
  const chat = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title: 'Nayi Chat',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.chats.unshift(chat);
  writeDb(data);
  return chat;
}

export function saveChat(chat) {
  const data = readDb();
  const idx = data.chats.findIndex((c) => c.id === chat.id);
  chat.updatedAt = new Date().toISOString();
  if (idx >= 0) data.chats[idx] = chat;
  else data.chats.unshift(chat);
  writeDb(data);
  return chat;
}

export function renameChat(id, title) {
  const chat = getChat(id);
  if (!chat) return null;
  chat.title = title;
  return saveChat(chat);
}

export function deleteChat(id) {
  const data = readDb();
  data.chats = data.chats.filter((c) => c.id !== id);
  writeDb(data);
}