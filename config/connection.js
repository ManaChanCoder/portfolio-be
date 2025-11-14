import mongoose from "mongoose";

export const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection: ${conn.connection.host}`);
  } catch (error) {
    console.log(`connection failed: ${error}`);
    process.exit(1);
  }
};
