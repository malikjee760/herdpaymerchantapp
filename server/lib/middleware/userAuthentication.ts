import { Request, Response, NextFunction } from 'express';

const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  let user = req.session?.user || { loggedIn: false };
  if (!user.loggedIn) {
    return res.sendStatus(403);
  }
  return next();
};

const requireSession = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  let session = req.session || null;
  if (!session || session === null) {
    return res.sendStatus(403);
  }
  return next();
};

const requireLoginForPage = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return next();
};

const requireNoLogin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  let user = req.session?.user || { loggedIn: false };
  if (user.loggedIn) {
    return res.redirect('/');
  }
  next();
};

const requireFbToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-herdpay-merchant-token'] || '';
  if (token) {
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
};

export {
  requireLogin,
  requireLoginForPage,
  requireNoLogin,
  requireFbToken,
  requireSession,
};
