import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { vendorPayload } from '../dto';
import { APP_SECRET } from '../config';
import { Request } from 'express';
import { authPayload } from '../dto/auth.dto';

export const generateSalt = async () => {
  return await bcrypt.genSalt();
};

export const generatedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const validatedPassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await generatedPassword(enteredPassword, salt)) === savedPassword;
};

export const generateSignature = (payload: vendorPayload) => {
  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
};

export const validateSignature = async (req: Request) => {
  const signature = req.get('Authorization');

  if (signature) {
    try {
      const payload = (await jwt.verify(
        signature.split(' ')[1],
        APP_SECRET
      )) as authPayload;
      req.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
