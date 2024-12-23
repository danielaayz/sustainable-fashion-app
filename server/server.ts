import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/user_routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://Profile:username@localhost:27017/user_profiles?authSource=admin")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Use User routes for authentication
app.use("/api/auth", userRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});