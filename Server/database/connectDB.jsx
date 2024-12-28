// connectdv.jsx
// This file will handle database connection logic.
"use server"
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://hussnain1212:oEbv61KPjJsL6FOk@cluster1.vqgrk.mongodb.net/Crypto-Tracker');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;