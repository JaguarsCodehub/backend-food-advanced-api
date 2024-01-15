import { NextFunction, Request, Response } from 'express';
import { authPayload } from '../dto/auth.dto';
import { validateSignature } from '../utility/password-hash';

declare global {
  namespace Express {
    interface Request {
      user?: authPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validate = await validateSignature(req);

  if (validate) {
    next();
  } else {
    return res.json('User not Authorized');
  }
};
