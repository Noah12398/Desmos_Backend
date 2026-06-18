import { ZodError } from 'zod';
import { AppError, ERROR_CODES, UnreachableError } from '../utils/errors.js';

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    console.error(error);
    return res.status(422).json({
      success: false,
      code: ERROR_CODES.validation_error,
      message: "Validation failed",
      errors: error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
        code: issue.code,
      })),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      code: error.errorCode,
      message: error.message,
      errors: error.details ? (Array.isArray(error.details) ? error.details : [error.details]) : [],
    });
  }

  if (error instanceof UnreachableError) {
    console.error(
      "Something bad happened.",
      "Check now.",
    );
    throw error;
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    code: ERROR_CODES.internal_server_error,
    message: "Something went wrong",
    errors: [],
  });
};
