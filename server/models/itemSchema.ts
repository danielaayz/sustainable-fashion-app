import mongoose, { Schema } from "mongoose";
import { IMaterial, IItem } from "../types/itemTypes.js";

// MaterialSchema defines the structure for materials in a garment
const MaterialSchema = new Schema({
   type: {
      // Changed from hardcoded string enum to reference the Material database
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material", // Links to the Material model in your material database
      required: [true, "Material reference if required"],
      // Old code commented for reference:
      // type: String,
      // required: [true, "Material type is required"],
      // enum: ["cotton", "wool", "polyester", "nylon", "silk"],
   },
   percentage: {
      type: Number,
      required: [true, "Material percentage is required"],
      min: [0, "Percentage cannot be negative"],
      max: [100, "Percentage cannot exceed 100"],
   },
});

// ItemSchema defines the structure for a garment
const ItemSchema = new Schema(
   {
      itemName: {
         type: String,
         required: [true, "Item name is required"],
         trim: true,
      },
      brand: {
         type: String,
         required: [true, "Brand name is required"],
         trim: true,
      },
      imageUrl: {
         type: String,
         required: false,
      },
      materials: {
         type: [MaterialSchema],
         required: [true, "Materials are required"],
         // Validates that material percentages sum to 100%
         validate: {
            validator: function (materials: IMaterial[]) {
               const total = materials.reduce(
                  (sum, material) => sum + material.percentage,
                  0
               );
               return Math.abs(total - 100) <= 0.01;
            },
            message: "Total material percentage must equal 100%",
         },
      },
   },
   {
      timestamps: true, // Automatically adds createdAt and updatedAt
   }
);

export const Item = mongoose.model<IItem>("Item", ItemSchema);
