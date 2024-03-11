import mongoose from "mongoose";

export const connection = async () => {
  try {
    const mongoDBUrl = process.env.MONGODB_URL;
    if (!mongoDBUrl) {
      throw new Error("MongoDB URL is not defined in environment variables");
    }
    await mongoose.connect(mongoDBUrl);
    console.log("Connection successful with MongoDB");
  } catch (err) {
    console.error("Connection failed with MongoDB:", err);
  }
};