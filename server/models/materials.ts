import mongoose, { Schema, Document, Model } from "mongoose";
import type { IMaterial } from "../types/types.ts";

export interface MaterialDocument extends IMaterial, Document {}

const materialSchema = new Schema<MaterialDocument>({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   category: {
      type: String,
      enum: ["Natural", "Synthetic", "Semi-Synthetic"],
      required: true,
   },
   scoring: {
      goodProperties: Number,
      badProperties: Number,
      environmentalImpact: Number,
      weightedTotal: Number,
   },
   properties: {
      good: [
         {
            property: String,
            description: String,
         },
      ],
      bad: [
         {
            property: String,
            description: String,
         },
      ],
      environmental: [
         {
            impact: String,
            description: String,
         },
      ],
   },
   sustainability: {
      biodegradable: Boolean,
      recyclable: Boolean,
      organicOptionAvailable: Boolean,
   },
   lastUpdated: {
      type: Date,
      default: Date.now,
   },
});

export const Material: Model<MaterialDocument> =
   mongoose.model<MaterialDocument>("Material", materialSchema);
