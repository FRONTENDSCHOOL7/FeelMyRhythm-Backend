import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(helmet());

const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose
  .connect(mongoURI)
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.log('DB connection fail', err));

app.listen(PORT, () => {
  console.log(`connect Server ${PORT}`);
});
