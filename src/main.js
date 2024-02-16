import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
const app = express();
dotenv.config({
  path: './env',
});

//config
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';

//routes declaration
app.use('/api/v1/users', userRouter);
// mongodb connection

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running at port: ${process.env.PORT} `);
    });
  })
  .catch((err) => {
    console.log('Mongo db connection failed !!!', err);
  });
