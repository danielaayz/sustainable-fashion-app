import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// const MONGODB_URI =
//    process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability_db";

const MONGODB_URI =
   process.env.MONGODB_URI ||
   // "mongodb://admin:your_secure_password@mongodb:27017/sustainability_db?authSource=admin";
   "mongodb://admin:Zl2dL0YDl9OL@mongodb:27017/sustainability_db?authSource=admin";


   const connectDB = async (): Promise<void> => {
      try {
         const conn = await mongoose.connect(MONGODB_URI);
         console.log(`MongoDB Connected:`);
         console.log(`  Host: ${conn.connection.host}`);
         console.log(`  Database: ${conn.connection.name}`);
         console.log(`  Port: ${conn.connection.port}`);
   
         mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err); // Added error logging here
         });
   
         mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
         });
   
         process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB connection close through app termination");
            process.exit(0);
         });
      } catch (error) {
         console.error("Error connecting to MongoDB:", error); // Log the error here
         process.exit(1);
      }
   };

export default connectDB;
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability_db";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
