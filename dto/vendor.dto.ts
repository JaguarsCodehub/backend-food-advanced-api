export interface createVendorInput {
  name: string;
  ownerName: string;
  foodType: string;
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface editVendorInput {
  name: string;
  address: string;
  phone: string;
  foodTypes: [string];
}
export interface vendorLoginInput {
  email: string;
  password: string;
}

export interface vendorPayload {
  _id: string;
  email: string;
  name: string;
  foodTypes: [string];
}
