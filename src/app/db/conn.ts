import mongoose from "mongoose";

export const connection = async() => {
  try {
    await mongoose.connect(`Aca-va-la-URL-a-tu-MongoDB-Atlas`, {
    });
    console.log("Connection successful with MongoDB");
  } catch (err) {
    console.error("Connection failed with MongoDB:", err);
  }
};

