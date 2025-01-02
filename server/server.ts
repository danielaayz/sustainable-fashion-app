import express from "express"; // to handle http requests
import mongoose from "mongoose";
import cors from "cors"; //middleware to handle cross-origin requests.
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user_routes";

dotenv.config(); // Load environment variables from the .env file.

const app = express(); // Initialize an Express application.

// Middleware Setup
// Enable CORS to allow the frontend to communicate with the backend
app.use(
   cors({
      origin: "http://localhost:5173", //frontend URL
      credentials: true,
   })
);

//Converts incoming request data (usually in JSON format) into a JavaScript object.
app.use(bodyParser.json());

// MongoDB Database Connection
// Use Mongoose to connect to a MongoDB database using the provided connection string.
mongoose
   .connect(
      "mongodb://Profile:username@localhost:27017/user_profiles?authSource=admin"
   )
   .then(() => console.log("MongoDB connected"))
   .catch((err) => console.error(err));

// Use User routes for authentication
app.use("/api/auth", userRoutes);

// This middleware will catch any errors in the application and send a response with the error message.
app.use(
   (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
   ) => {
      console.error(err.stack);
      res.status(500).json({ message: "Something went wrong!" });
   }
);

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import materialsRouter from "./routes/materialsRouter.js";

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/materials", materialsRouter);

// Basic route
app.get("/", (req, res) => {
   res.send("Api is running...");
});

// Se up the server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
