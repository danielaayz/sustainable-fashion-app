import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// const MONGODB_URI =
//    process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability_db";

// MongoDB connection URI with fallback options
const MONGODB_URI =
   process.env.MONGODB_URI ||
   // "mongodb://admin:your_secure_password@mongodb:27017/sustainability_db?authSource=admin";
   "mongodb://admin:Zl2dL0YDl9OL@mongodb:27017/sustainability_db?authSource=admin";

/**
 * Establishes connection to MongoDB and sets up event listeners
 * for monitoring connection status
 */
const connectDB = async (): Promise<void> => {
   try {
      // Establish connection to MongoDB
      const conn = await mongoose.connect(MONGODB_URI);

      // Log successful connection details
      console.log(`MongoDB Connected:`);
      console.log(`  Host: ${conn.connection.host}`);
      console.log(`  Database: ${conn.connection.name}`);
      console.log(`  Port: ${conn.connection.port}`);

      // Set up MongoDB connection event listeners
      mongoose.connection.on("error", (err) => {
         console.error("MongoDB connection error:", err); // Added error logging here
      });

      mongoose.connection.on("disconnected", () => {
         console.log("MongoDB disconnected");
      });

      // Handle application termination
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
