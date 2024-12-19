import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI =
   process.env.MONGODB_URI || "mongodb://localhost:27017/materials_db";

const connectDB = async (): Promise<void> => {
   try {
      const conn = await mongoose.connect(MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);

      // Error handling after initial connection
      mongoose.connection.on("error", (err) => {
         console.error("MongoDB connection error:", err);
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
      console.error("Error connecting to MongoDB, error");
      process.exit(1);
   }
};

export default connectDB;
