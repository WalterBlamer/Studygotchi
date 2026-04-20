import { Request, Response, NextFunction } from 'express';

// function to check if user is logged in or not, before controllers run routes
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }
  next(); // user is logged in, continue to the controller
}

export { requireAuth };
