import express, { NextFunction, Request, Response } from 'express';
import { createVendorInput } from '../dto';
import { Vendor } from '../models';
import { generateSalt, generatedPassword } from '../utility/password-hash';

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email });
  } else {
    return await Vendor.findById(id);
  }
};

export const createVendor = async (
  req: Request<{}, {}, createVendorInput>,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    address,
    pincode,
    phone,
    email,
    password,
  } = req.body;

  const existingVendor = await findVendor('', email);

  if (existingVendor !== null) {
    return res.send('A vendor exists with this email ID');
  }

  // generate a salt
  const salt = await generateSalt();

  // encrypt the password using the salt
  const userPassword = await generatedPassword(password, salt);

  const createdVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
    address: address,
    pincode: pincode,
    phone: phone,
    email: email,
    password: userPassword,
    salt: salt,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foods: [],
  });

  return res.json(createdVendor);
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return res.json(vendors);
  }

  return res.json({ message: 'vendors data not available' });
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;

  const vendor = await findVendor(vendorId);

  if (vendorId !== null) {
    return res.json(vendor);
  }

  return res.json({ message: 'Vendor data not available' });
};
