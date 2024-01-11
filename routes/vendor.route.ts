import express, { NextFunction, Request, Response } from 'express';
import { vendorLogin } from '../controllers';

const router = express.Router();

router.post('/login', vendorLogin);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Hello from Vendor Route');
});

export { router as VendorRoute };
