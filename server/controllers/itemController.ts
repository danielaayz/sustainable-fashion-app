import { Request, Response } from "express";
import { Item } from "../models/itemSchema.js";
import { IMaterial } from "../types/itemTypes.js";

// Define type for create item request
type CreateItemRequest = Request<
   {},
   {},
   {
      itemName: string;
      brand: string;
      imageUrl?: string;
      materials: IMaterial[];
   }
>;

export const getAllItems = async (req: Request, res: Response) => {
   try {
      const items = await Item.find();
      res.json({ success: true, data: items });
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : "An error occurred",
      });
   }
};

export const getItemById = async (req: Request, res: Response) => {
   try {
      const item = await Item.findById(req.params.id);
      if (!item) {
         return res.status(404).json({
            success: false,
            error: "Item not found",
         });
      }
      res.json({ success: true, data: item });
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : "An error occurred",
      });
   }
};

export const createItem = async (req: CreateItemRequest, res: Response) => {
   try {
      const { itemName, brand, imageUrl, materials } = req.body;
      const newItem = new Item({
         itemName,
         brand,
         imageUrl,
         materials,
      });
      const savedItem = await newItem.save();
      res.status(201).json({
         success: true,
         data: savedItem,
      });
   } catch (error) {
      res.status(400).json({
         success: false,
         error: error instanceof Error ? error.message : "An error occurred",
      });
   }
};
