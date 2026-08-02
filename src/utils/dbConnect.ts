import mongoose from "mongoose";

export const connectDb:() => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Db connection is established")
  } catch (error: any) {
    console.log("Error connecting to db", error.message);
  }
};
