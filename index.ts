import express from 'express';
import connectToDb from './utility/connectToDb';
import App from './services/expressApp';

const StartServer = async () => {
  const app = express();

  await connectToDb();

  await App(app);

  app.listen(8000, () => {
    console.clear();
    console.log('App is listening on port 8000');
    connectToDb();
  });
};

StartServer();
