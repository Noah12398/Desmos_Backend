import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { UnreachableError, handleDbError } from "./errors.js";

/**
 * Throw an UnreachableError when a code branch that should never be executed runs
 */
export function unreachable() {
  console.error("Never supposed to reach here");
  throw new UnreachableError();
}

/**
 * Quickly read an environment variable and check if it is set
 * @param {string} name - The name of the env variable
 * @param {boolean} check - If true, throws an error if the variable is not set
 */
export function quickEnv(name, check = true) {
  const value = process.env[name];
  if (check && (typeof value !== "string" || value.length === 0)) {
    throw new Error(`Environment variable '${name}' must be set`);
  }
  return value;
}

/**
 * Helper to standardise successful JSON responses
 */
export function ok(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data: data });
}

/**
 * Helper wrapper for database actions to automatically handle and map Drizzle/Postgres errors
 */
export function dbAction(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      // If the error has a postgres error code or is a database query error, translate it
      if (error.code || error.name === 'DrizzleError') {
        handleDbError(error);
      } else {
        console.error(error);
        console.error("Unexpected non-DB error in dbAction.");
        throw error;
      }
    }
  };
}

/**
 * Format string from snake_case to Normal Case (e.g. user_id -> User Id)
 */
export function snakeToNormalCase(s) {
  if (!s || typeof s !== 'string') return '';
  const r = s.split("_").join(" ").replace(/\s+/g, " ");
  return r[0]?.toUpperCase() + r.slice(1);
}

/**
 * Generate a cryptographically secure token using native Node crypto
 */
export function generatePasswordToken(length = 12) {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

/**
 * Create a SHA-256 hex hash from a string
 */
export function hexSha256(token) {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Zod helper schema for validating coerced positive integers (like IDs)
 */
export const idLike = (error) => z.coerce.number({ invalid_type_error: error }).int({ message: error });
