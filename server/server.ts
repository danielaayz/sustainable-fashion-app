import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./db/connection.js";
import materialsRouter from "./routes/materialsRouter.js";

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
