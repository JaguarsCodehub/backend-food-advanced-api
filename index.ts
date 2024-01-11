import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { AdminRoute, VendorRoute } from './routes';
import connectToDb from './utility/connectToDb';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

app.listen(8000, () => {
  console.clear();
  console.log('App is listening on port 8000');
  connectToDb();
});
