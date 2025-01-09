import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Define Item model
const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  materials: [{
    type: { type: String, required: true },
    percentage: { type: Number, required: true }
  }],
  image: String
});

const Item = mongoose.model('Item', itemSchema);

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/sustainability_db";

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      retryWrites: true,
      retryReads: true
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Routes
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.post('/api/items', async (req, res) => {
  try {
    const { itemName, brand, materials, image } = req.body;
    const newItem = new Item({ itemName, brand, materials, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});