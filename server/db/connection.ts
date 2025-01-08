import mongoose from "mongoose";

const MONGODB_URI = "mongodb://mongodb:27017/sustainability_db";

const connectDB = async (): Promise<void> => {
   try {
      console.log("Attempting to connect with URI:", MONGODB_URI);

      const conn = await mongoose.connect(MONGODB_URI);

      console.log(`MongoDB Connected:`);
      console.log(`  Host: ${conn.connection.host}`);
      console.log(`  Database: ${conn.connection.name}`);
      console.log(`  Port: ${conn.connection.port}`);

      mongoose.connection.on("error", (err) => {
         console.error("MongoDB connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
         console.log("MongoDB disconnected");
      });
   } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
   }
};

export default connectDB;