import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import identifyRouter from "./apps/routers/contact.route";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", identifyRouter);
app.use(errorMiddleware);

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection failed", err));
