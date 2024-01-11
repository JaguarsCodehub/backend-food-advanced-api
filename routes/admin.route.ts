import express, { NextFunction, Request, Response } from 'express';
import { createVendor, getVendorById, getVendors } from '../controllers';

const router = express.Router();

router.post('/vendor', createVendor);
router.get('/vendors', getVendors);
router.get('/vendor/:id', getVendorById);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Hello from ADmin Route');
});

export { router as AdminRoute };
