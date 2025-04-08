import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); // Remove deprecated options
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Failed: ${error.message}`);
    process.exit(1);
  }
};
