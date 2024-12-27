import { Request, Response } from "express";
import { Document, Types } from "mongoose";

export interface MaterialProperties {
   name: string;
   category: "Natural" | "Synthetic" | "Semi-Synthetic";
   sustainabilityScore: number;
   scoreDescription: "Poor" | "Moderate" | "Good" | "Very Good" | "Excellent";
   properties: {
      pros: string[];
      cons: string[];
   };
   lastUpdated: Date;
}

export interface MaterialDocument extends MaterialProperties, Document {
   _id: Types.ObjectId;
}

export interface MaterialRequestParams {
   id: string;
}

export interface MaterialSuccessResponse {
   message: string;
   material?: MaterialDocument;
   id?: Types.ObjectId;
}

export interface MaterialErrorResponse {
   message: string;
   error: string;
}

export type MaterialResponseBody =
   | MaterialSuccessResponse
   | MaterialErrorResponse;
