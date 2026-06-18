import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import familyRoutes from './modules/family/family.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);
// Error handling middleware (must be registered last)
app.use(errorHandler);

export default app;