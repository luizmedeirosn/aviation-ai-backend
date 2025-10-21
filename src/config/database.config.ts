import 'dotenv/config';
import mongoose from 'mongoose';
import InternalServerError from '../utils/errors/InternalServerError.js';

export const connectDatabase = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI in the environment.');
    throw new InternalServerError('Database configuration missing.');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.info('MongoDB Connected!');
};
