import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase() {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error", error);
  });

  await mongoose.connect(env.MONGODB_URI);
}
