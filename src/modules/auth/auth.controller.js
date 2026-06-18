import { createUserSchema } from '../user/user.schema.js';

export async function signin(req, res, next) {
  try {
    // Validate request body and merge with verified phone
    const validated = createUserSchema.parse({
      ...req.body,
      phone: req.user.phone,
    });
    const user = await authService.signin(validated);
    return ok(res, user);
  } catch (error) {
    next(error);
  }
}
