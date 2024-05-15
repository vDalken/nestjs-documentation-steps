import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `timestamp:[${new Date().toISOString()}] verb:${req.method} domain:${req.url.substring(1)}`,
  );
  next();
}
