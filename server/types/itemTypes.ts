import { Document } from "mongoose";

export interface IMaterial {
   type: string;
   percentage: number;
}

export interface IItem extends Document {
   itemName: string;
   brand: string;
   imageUrl?: string;
   materials: IMaterial[];
   createdAt: Date;
   updatedAt: Date;
}
