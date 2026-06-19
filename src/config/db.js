import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import { quickEnv } from '../utils/helpers.js';

const dbUser = encodeURIComponent(quickEnv('DB_USER'));
const dbPassword = encodeURIComponent(quickEnv('DB_PASSWORD'));
const dbHost = quickEnv('DB_HOST');
const dbPort = process.env.DB_PORT || 5432;
const dbName = quickEnv('DB_NAME');

const connectionString = `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);

export default db;
