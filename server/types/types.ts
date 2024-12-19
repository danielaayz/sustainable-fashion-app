import { Request, Response } from "express";
import { Document, Types } from "mongoose";

/**
 * Interface for Material properties
 */
export interface IMaterial {
   name: string;
   category: "Natural" | "Synthetic" | "Semi-Synthetic";
   scoring: {
      goodProperties: number;
      badProperties: number;
      environmentalImpact: number;
      weightedTotal: number;
   };
   properties: {
      good: Array<{
         property: string;
         description: string;
      }>;
      bad: Array<{
         property: string;
         description: string;
      }>;
      environmental: Array<{
         impact: string;
         description: string;
      }>;
   };
   sustainability: {
      biodegradable: boolean;
      recyclable: boolean;
      organicOptionAvailable: boolean;
   };
   lastUpdated: Date;
}

/**
 * Interface for Mongoose Material Document
 */
export interface MaterialDocument extends IMaterial, Document<Types.ObjectId> {
   _id: Types.ObjectId;
   name: string;
   category: "Natural" | "Synthetic" | "Semi-Synthetic";
   scoring: {
      goodProperties: number;
      badProperties: number;
      environmentalImpact: number;
      weightedTotal: number;
   };
   properties: {
      good: Array<{
         property: string;
         description: string;
      }>;
      bad: Array<{
         property: string;
         description: string;
      }>;
      environmental: Array<{
         impact: string;
         description: string;
      }>;
   };
   sustainability: {
      biodegradable: boolean;
      recyclable: boolean;
      organicOptionAvailable: boolean;
   };
   lastUpdated: Date;
}

/**
 * Request parameters interface
 */
export interface MaterialRequestParams {
   id: string;
}

/**
 * Success response type
 */
export interface MaterialSuccessResponse {
   message: string;
   material?: MaterialDocument;
   id?: Types.ObjectId;
}

/**
 * Error response type
 */
export interface MaterialErrorResponse {
   message: string;
   error: string;
}

export type MaterialResponseBody =
   | MaterialSuccessResponse
   | MaterialErrorResponse;
