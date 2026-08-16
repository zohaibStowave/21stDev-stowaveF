// // src/app/i/t/s/a/d/m/i/n/admin/lib/trainingStore.js
// import fs from 'fs';
// import path from 'path';

// const DB_PATH = path.join(process.cwd(), 'data', 'training.json');

// function ensureDb() {
//   const dir = path.dirname(DB_PATH);
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//   if (!fs.existsSync(DB_PATH)) {
//     fs.writeFileSync(DB_PATH, JSON.stringify({ instructions: '' }, null, 2));
//   }
// }

// export function getTraining() {
//   ensureDb();
//   const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
//   return data.instructions || '';
// }

// export function saveTraining(instructions) {
//   ensureDb();
//   fs.writeFileSync(DB_PATH, JSON.stringify({ instructions }, null, 2));
//   return instructions;
// }
















// src/app/i/t/s/a/d/m/i/n/admin/lib/trainingStore.js
import { getDb } from './mongodb';

const COLLECTION = 'training';
const DOC_ID = 'singleton'; // sirf ek hi training document rakhna hai

export async function getTraining() {
  const db = await getDb();
  const doc = await db.collection(COLLECTION).findOne({ _id: DOC_ID });
  return doc?.instructions || '';
}

export async function saveTraining(instructions) {
  const db = await getDb();
  await db
    .collection(COLLECTION)
    .updateOne(
      { _id: DOC_ID },
      { $set: { instructions, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );
  return instructions;
}