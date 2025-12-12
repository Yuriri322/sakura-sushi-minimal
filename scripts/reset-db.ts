import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { Pool } from 'pg';

// Load environment
config({ path: resolve(process.cwd(), '.env.dev') });

async function resetDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const sql = readFileSync(resolve(__dirname, 'reset-schema.sql'), 'utf-8');
    console.log('Executing reset script...');
    await pool.query(sql);
    console.log('✓ Database reset successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

resetDatabase();
