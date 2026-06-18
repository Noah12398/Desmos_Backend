import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import { quickEnv } from '../utils/helpers.js';

const pool = new Pool({
  connectionString: quickEnv('SUPABASE_URL'),
});

export const db = drizzle(pool);

export default db;
