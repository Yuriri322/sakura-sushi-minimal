import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connectionString = process.env.DATABASE_URL;

// Configure connection with optimizations
export const client = postgres(connectionString, { 
  prepare: false,
  max: process.env.NODE_ENV === 'production' ? 10 : 3,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === 'development',
});