import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

async function connectToDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    // process.exit(1);
    console.log('not connected to DB');
  }
}

export default connectToDb;
