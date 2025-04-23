import mongoose from "mongoose";

const uri: string =
  "mongodb+srv://pradeepkalyan1275:9UbiSCOfshlKQipb@urls.lqvnpc0.mongodb.net/shortly?retryWrites=true&w=majority&appName=urls";

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
