import { createClient } from '@supabase/supabase-js';
import { quickEnv } from '../utils/helpers.js';
import 'dotenv/config';

// Include WebSocket transport for Node.js environment (required for Supabase realtime in tests)
let wsTransport = undefined;
if (process.env.NODE_ENV === 'test') {
  try {
    // Dynamically import to avoid pulling in ws in production bundles
    wsTransport = (await import('ws')).default;
  } catch (e) {
    console.warn('ws package not available, realtime may not work in tests');
  }
}

const supabaseUrl = quickEnv('SUPABASE_URL');
const supabaseAnonKey = quickEnv('SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, wsTransport ? { realtime: { transport: wsTransport } } : {});

export default supabase;
