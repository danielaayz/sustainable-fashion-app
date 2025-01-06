import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connection.js";
import materialsRouter from "./routes/materialsRoutes.js";
import sustainabilityRoutes from "./routes/sustainabilityRoutes.js";

// Load environment variables
dotenv.config();
const app = express();

// Middleware Setup
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);
app.use(bodyParser.json());
app.use(express.json());

// Route Setup
app.use("/api/users", userRoutes);
app.use("/api/materials", materialsRouter);
app.use("/api/sustainability", sustainabilityRoutes);

// Basic route
app.get("/", (req, res) => {
   res.send("Api is running...");
});

// Error handling middleware
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

// Database Connection
connectDB();

// Server Setup
const PORT = process.env.PORT || 3001; // Changed default port to 3001
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
import express from 'express';
import cors from 'cors';
import connectDB from './db/connection';
import itemRouter from './routes/Item';  // Updated to match the file name

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/items', itemRouter);

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
