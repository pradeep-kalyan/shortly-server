import mongoose from "mongoose";

const uri: any = process.env.DB_URL;

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error while connecting to MongoDB.");
    }
    process.exit(1);
  }
};

export default connectDB;
