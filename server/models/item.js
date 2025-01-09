// backend/models/Item.js
const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  type: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  brand: { type: String, required: true },
  materials: { type: [MaterialSchema], required: true },
  image: { type: String },
});

module.exports = mongoose.model("Item", ItemSchema);
