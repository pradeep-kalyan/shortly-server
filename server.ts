import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import router from "./routes/Shortner";

const app = express();

// Error handler middleware with proper types
const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong!" });
};

connectDB()
  .then(() => console.log("DB connected"))
  .catch((err: Error) => console.error("DB connection error", err));

app.use(express.json());


app.use("/", router);

// Error middleware should be last
app.use(ErrorHandler);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
