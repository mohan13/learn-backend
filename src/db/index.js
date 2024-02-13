import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://user-mohan:mohan123@cluster0.y8fctqr.mongodb.net/${DB_NAME}`
    );
    // to check where i connected
    console.log(`\n Connected at ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('monogdb connection error', error);
    process.exit(1);
  }
};

export default connectDB;
