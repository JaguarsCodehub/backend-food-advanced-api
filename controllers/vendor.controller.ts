import { Request, Response, NextFunction } from 'express';
import { vendorLoginInput } from '../dto';
import { findVendor } from './admin.controller';
import { validatedPassword } from '../utility/password-hash';

export const vendorLogin = async (
  req: Request<{}, {}, vendorLoginInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const existingVendor = await findVendor('', email);

  if (existingVendor !== null) {
    // validation and give access

    const validation = await validatedPassword(
      password,
      existingVendor.password,
      existingVendor.salt
    );

    if (validation) {
      return res.json(existingVendor);
    } else {
      return res.send('Password is not valid');
    }
  }

  return res.send('Login credential not valid');
};
