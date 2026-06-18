import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import familyRoutes from './modules/family/family.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { db } from './config/db.js';
import { sql } from 'drizzle-orm';

const app = express();

app.use(cors());
app.use(express.json());

// Health check — confirms server + Supabase DB are reachable
app.get('/health', async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    return res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    return res.status(500).json({ status: 'error', database: 'disconnected', message: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);
// Error handling middleware (must be registered last)
app.use(errorHandler);

export default app;
