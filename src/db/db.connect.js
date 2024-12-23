import mongoose from "mongoose";

export const connectTODB = () => {
  try {
    console.log("Try to connect to mongo");
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
