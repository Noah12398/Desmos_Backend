import { createClient } from '@supabase/supabase-js';
import { quickEnv } from '../utils/helpers.js';
import 'dotenv/config';

const supabaseUrl = quickEnv('SUPABASE_URL');
const supabaseAnonKey = quickEnv('SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
