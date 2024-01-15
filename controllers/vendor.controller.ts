import { Request, Response, NextFunction } from 'express';
import { editVendorInput, vendorLoginInput, createFoodInput } from '../dto';
import { findVendor } from './admin.controller';
import { generateSignature, validatedPassword } from '../utility/password-hash';
import { Food } from '../models';

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
      const signature = generateSignature({
        _id: existingVendor.id,
        email: existingVendor.email,
        name: existingVendor.name,
        foodTypes: existingVendor.foodType,
      });

      return res.json(signature);
    } else {
      return res.send('Password is not valid');
    }
  }

  return res.send('Login credential not valid');
};

export const getVendorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVendor = await findVendor(user._id);

    return res.json(existingVendor);
  }

  return res.json('Vendor INfomration not found');
};

export const updateVendorProfile = async (
  req: Request<{}, {}, editVendorInput>,
  res: Response,
  next: NextFunction
) => {
  const { name, address, phone, foodTypes } = req.body;

  const user = req.user;

  if (user) {
    const existingVendor = await findVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.name = name;
      existingVendor.address = address;
      existingVendor.phone = phone;
      existingVendor.foodType = foodTypes;

      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }

  return res.json('Vendor INfomration not found');
};

export const updateVendorCoverImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const vendor = await findVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);

      vendor.coverImages.push(...images);

      const saveResult = await vendor.save();

      return res.json(saveResult);
    }
  }
  return res.json({ message: 'Unable to Update vendor profile ' });
};

export const updateVendorservice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const existingVendor = await findVendor(user._id);

    if (existingVendor !== null) {
      existingVendor.serviceAvailable = !existingVendor.serviceAvailable;

      const savedResult = await existingVendor.save();
      return res.json(savedResult);
    }

    return res.json(existingVendor);
  }

  return res.json('Vendor Service not updated');
};

export const addFood = async (
  req: Request<{}, {}, createFoodInput>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const { name, description, category, foodType, readyTime, price } =
      req.body;

    const vendor = await findVendor(user._id);

    if (vendor !== null) {
      const files = req.files as [Express.Multer.File];

      const images = files.map((file: Express.Multer.File) => file.filename);
      const createdFood = await Food.create({
        vendorId: vendor._id,
        name: name,
        description: description,
        category: category,
        foodType: foodType,
        images: images,
        readyTime: readyTime,
        price: price,
        rating: 0,
      });

      vendor.foods.push(createdFood);
      const result = await vendor.save();

      return res.json(result);
    }
  }

  return res.json('Something went wrong with add Food');
};

export const getFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user) {
    const foods = await Food.find({ vendorId: user._id });

    if (foods !== null) {
      return res.json(foods);
    }
  }

  return res.json('Foods information not found');
};
