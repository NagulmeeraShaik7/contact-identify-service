import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle errors in the Express application.
 * Logs the error and returns a standardized error response.
 * @param err - The error object caught by the middleware.
 * @param _req - Express request object (unused).
 * @param res - Express response object to send the error response.
 * @param _next - Express next function (unused).
 * @returns A JSON response with a 500 status code and an error message.
 */
export default function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}