import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI =
   process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability_db";

const connectDB = async (): Promise<void> => {
   try {
      // Attempt to connect to the MongoDB database using the MONGODB_URI
      const conn = await mongoose.connect(MONGODB_URI);

      // Log a successful connection message, including the database host
      console.log(`MongoDB Connected:`);
      console.log(`  Host: ${conn.connection.host}`);
      console.log(`  Database: ${conn.connection.name}`);
      console.log(`  Port: ${conn.connection.port}`);

      // Set up an event listener for errors that may occur after initial connection
      mongoose.connection.on("error", (err) => {
         // Log the connection error
         console.error("MongoDB connection error:", err);
      });

      // Set up an event listener for when the database connection is disconnected
      mongoose.connection.on("disconnected", () => {
         // Log that the database has been disconnected
         console.log("MongoDB disconnected");
      });

      // Handle graceful shutdown when the application process receives a SIGINT signal
      process.on("SIGINT", async () => {
         // Close the MongoDB connection to avoid potential resource leaks
         await mongoose.connection.close();
         console.log("MongoDB connection close through app termination");
         process.exit(0);
      });
   } catch (error) {
      // If the connection attempt fails, log the error and terminate the process
      console.error("Error connecting to MongoDB, error");
      process.exit(1);
   }
};

export default connectDB;