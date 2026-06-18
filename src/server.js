import 'dotenv/config';
import app from './app.js';
import { quickEnv } from './utils/helpers.js';

// Retrieve PORT from env or default to 5000 if not set
const PORT = quickEnv('PORT', false) || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});