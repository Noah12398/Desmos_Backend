import { supabase } from '../config/supabase.js';
import { UnauthorizedError } from '../utils/errors.js';

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      throw new UnauthorizedError('Invalid or expired token');
    }
    const email = user.email || user.user_metadata?.email;
    if (!email) {
      throw new UnauthorizedError('Email not found in token');
    }
    req.user = {
      id: user.id,
      email
    };
    next();
  } catch (error) {
    next(error);
  }
}