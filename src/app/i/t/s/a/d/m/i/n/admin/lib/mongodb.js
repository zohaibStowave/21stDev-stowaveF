// src/app/i/t/s/a/d/m/i/n/admin/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'boss_ai';

if (!uri) {
  throw new Error('MONGODB_URI environment variable is missing or empty');
}

let client;
let clientPromise;

// Serverless environments (Vercel) reuse the connection across warm invocations.
// In dev, use a global variable so HMR doesn't create a new client every reload.
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}