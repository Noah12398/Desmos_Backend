export const ERROR_CODES = {
  validation_error: 'VALIDATION_ERROR',
  internal_server_error: 'INTERNAL_SERVER_ERROR',
  unauthorized: 'UNAUTHORIZED',
  not_found: 'NOT_FOUND',
  bad_request: 'BAD_REQUEST',
  forbidden: 'FORBIDDEN',
  conflict: 'CONFLICT',
  already_exists: 'ALREADY_EXISTS',
  invalid_credentials: 'INVALID_CREDENTIALS',
};

// Simple helper to format database column names
export function snakeToNormalCase(str) {
  if (!str) return '';
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export class AppError extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(404, ERROR_CODES.not_found, message);
  }
}

export class ConflictError extends AppError {
  constructor(message, details = null) {
    super(409, ERROR_CODES.conflict, message);
    this.details = details;
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(403, ERROR_CODES.forbidden, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message) {
    super(401, ERROR_CODES.unauthorized, message);
  }
}

export class BadRequestError extends AppError {
  constructor(message) {
    super(400, ERROR_CODES.bad_request, message);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(422, ERROR_CODES.validation_error, message);
  }
}

export class UnreachableError extends Error {
  constructor(message = "Unreachable code path executed") {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const POSTGRESQL_ERROR_CLASSES = {
  integrity_constraint_violation: "23",
  pl_pgsql_error: "P0",
};

export const POSTGRESQL_ERROR_CODES = {
  // Class P0 -- PL/pgSQL Error
  raise_exception: "P0001",

  // Class 23 -- Integrity Constraint Violation
  restrict_violation: "23001",
  not_null_violation: "23502",
  foreign_key_violation: "23503",
  unique_violation: "23505",
  check_violation: "23514",
};

/**
 * Handle database errors thrown by Drizzle / pg (node-postgres)
 * maps postgres constraints to appropriate custom AppError subclasses
 */
export function handleDbError(error) {
  // node-postgres throws errors that have a "code" property (the Postgres SQLSTATE code)
  const pgErrorCode = error.code;
  const pgErrorClass = pgErrorCode?.slice(0, 2);

  if (pgErrorClass === POSTGRESQL_ERROR_CLASSES.integrity_constraint_violation) {
    switch (pgErrorCode) {
      case POSTGRESQL_ERROR_CODES.not_null_violation:
        if (error.column) {
          throw new ConflictError(`Value for ${snakeToNormalCase(error.column)} is missing`);
        }
        throw new ConflictError("Required database value is missing");

      case POSTGRESQL_ERROR_CODES.foreign_key_violation:
        throw new ConflictError(parseForeignKeyDetail(error.detail));

      case POSTGRESQL_ERROR_CODES.unique_violation:
        throw new ConflictError(parseUniqueViolationDetail(error.detail));

      case POSTGRESQL_ERROR_CODES.check_violation:
        throw new ConflictError("Database check constraint failed");

      default:
        throw new ConflictError("Database integrity constraint violation");
    }
  } else if (pgErrorClass === POSTGRESQL_ERROR_CLASSES.pl_pgsql_error) {
    if (pgErrorCode === POSTGRESQL_ERROR_CODES.raise_exception) {
      throw new ValidationError(error.message);
    }
  }

  // If we can't identify the database error, rethrow the original error
  throw error;
}

function parseUniqueViolationDetail(detail) {
  if (typeof detail !== "string") return "A record with this value already exists";
  const match = detail.match(/Key \((.+?)\)=\((.+?)\) already exists/);
  if (!match || typeof match[1] !== "string") return "A record with this value already exists";
  const field = match[1].replace(/_/g, " ");
  return `${snakeToNormalCase(field)} already exists`;
}

function parseForeignKeyDetail(detail) {
  if (typeof detail !== "string") return "Referenced record does not exist";
  const match = detail.match(/Key \((.+?)\)=\(.+?\) is not present in table "(.+?)"/);
  if (!match || typeof match[2] !== "string") return "Referenced record does not exist";
  const table = match[2].replace(/_/g, " ");
  return `Referenced ${snakeToNormalCase(table)} does not exist`;
}
