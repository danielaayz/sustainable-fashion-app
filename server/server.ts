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
