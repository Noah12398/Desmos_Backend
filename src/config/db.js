import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import { quickEnv } from '../utils/helpers.js';

const pool = new Pool({
  connectionString: quickEnv('DATABASE_URL'),
});

export const db = drizzle(pool);

export default db;
