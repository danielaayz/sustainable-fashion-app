import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connection.js";
import materialsRouter from "./routes/materialsRoutes.js";
import sustainabilityRoutes from "./routes/sustainabilityRoutes.js";
import itemRouter from "./routes/ItemRoutes.js";

// Load environment variables
dotenv.config();

// Types for Express error handling
interface ErrorResponse extends Error {
   status?: number;
}

// Express app setup
const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
   origin: [
      "http://localhost:5173", // Frontend URL
   ],
   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true,
   optionsSuccessStatus: 200,
};

// Middleware Setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Route Setup
app.use("/api/users", userRoutes);
app.use("/api/materials", materialsRouter);
app.use("/api/sustainability", sustainabilityRoutes);
app.use("/api/items", itemRouter);

// Basic route
app.get("/", (req: express.Request, res: express.Response) => {
   res.send("Api is running...");
});

// Error handling middleware
app.use(
   (
      err: ErrorResponse,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
   ) => {
      console.error(err.stack);
      const statusCode = err.status || 500;
      res.status(statusCode).json({
         success: false,
         message: err.message || "Something went wrong!",
         stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
   }
);

// Start server function
const startServer = async () => {
   try {
      // Database Connection
      await connectDB();

      // Server Setup
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
         console.log(
            `CORS is enabled for origins: ${corsOptions.origin.join(", ")}`
         );
      });
   } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
   }
};

// Handle unexpected errors
process.on("unhandledRejection", (err: Error) => {
   console.error("Unhandled Promise rejection:", err);
   // Close server & exit process
   process.exit(1);
});

// Initialize the server
startServer();
