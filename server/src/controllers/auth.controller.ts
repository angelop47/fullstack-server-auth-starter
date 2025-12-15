import { Request, Response } from 'express';

export function me(req: Request, res: Response) {
  res.json({
    id: req.user?.id,
    email: req.user?.email,
    role: req.user?.app_metadata?.role ?? 'user',
  });
}
