import mongoose, { Schema, Model } from "mongoose";
import type {
   MaterialDocument,
   MaterialProperties,
} from "../types/materialTypes.js";

const materialSchema = new Schema<MaterialDocument>({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   category: {
      type: String,
      required: true,
      enum: ["Natural", "Synthetic", "Semi-Synthetic"],
   },
   sustainabilityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
   },
   scoreDescription: {
      type: String,
      required: true,
      enum: ["Poor", "Moderate", "Good", "Very Good", "Excellent"],
   },
   properties: {
      pros: {
         type: [String],
         default: [],
      },
      cons: {
         type: [String],
         default: [],
      },
   },
   environmentalImpact: {
      type: [String],
      default: [],
   },
   lastUpdated: {
      type: Date,
      default: Date.now,
   },
});

materialSchema.pre("save", function (next) {
   this.lastUpdated = new Date();
   next();
});

export const Material: Model<MaterialDocument> =
   mongoose.model<MaterialDocument>("Material", materialSchema);
