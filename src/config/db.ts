import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    mongoose.connection.on("connected", () => {
      console.log("db Connected Successfully");
    });
    mongoose.connection.on("error", (error) => {
      console.log("db Fails to Connect", error);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
