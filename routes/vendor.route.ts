import express, { NextFunction, Request, Response } from 'express';
import { Authenticate } from '../middleware/commonAuth';
import {
  updateVendorservice,
  getVendorProfile,
  updateVendorProfile,
  vendorLogin,
  addFood,
  getFoods,
  updateVendorCoverImage,
} from '../controllers';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toString() + '_' + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/login', vendorLogin);

// Authentication Required Routes
router.use(Authenticate);
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/coverimage', images, updateVendorCoverImage);
router.patch('/services', updateVendorservice);

router.post('/food', addFood);
router.get('/foods', getFoods);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send('Hello from Vendor Route');
});

export { router as VendorRoute };
