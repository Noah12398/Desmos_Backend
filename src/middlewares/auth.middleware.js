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

    if (!user.phone) {
      throw new UnauthorizedError('Phone number not found in token');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
