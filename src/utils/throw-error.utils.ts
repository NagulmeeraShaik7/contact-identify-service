/**
 * Creates and throws a custom error with a specified message and HTTP status code.
 * @param message - The error message to include in the thrown error.
 * @param status - The HTTP status code for the error (defaults to 400).
 * @throws {Error} An error object with the specified message and status code.
 */
export default function throwError(message: string, status = 400) {
  const err: any = new Error(message);
  err.status = status;
  throw err;
}