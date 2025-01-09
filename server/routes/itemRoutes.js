// backend/routes/itemRoutes.js
const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// Create a new item
router.post("/", async (req, res) => {
  try {
    const { itemName, brand, materials, image } = req.body;

    if (!itemName || !brand || !materials) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newItem = new Item({ itemName, brand, materials, image });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error saving item.", error });
  }
});

module.exports = router;
