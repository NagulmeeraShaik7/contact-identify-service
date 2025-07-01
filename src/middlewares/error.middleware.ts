// middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
}
