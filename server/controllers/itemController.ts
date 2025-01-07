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

// Get all items with populated material information
export const getAllItems = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      // Fetch all items and populate the material references with full material data
      const items = await Item.find().populate({
         path: "materials.type",
         model: "Material",
      });
      res.json({ success: true, data: items });
   } catch (error) {
      res.status(500).json({
         success: false,
         error: error instanceof Error ? error.message : "An error occurred",
      });
   }
};

// Get a single item by ID with populated material information
export const getItemById = async (
   req: Request,
   res: Response
): Promise<void> => {
   try {
      // Find item by ID and populate material information
      const item = await Item.findById(req.params.id).populate({
         path: "materials.type",
         model: "Material",
         // You can also select specific fields if needed
         // select: 'name category sustainabilityScore'
      });

      if (!item) {
         res.status(404).json({
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

// Create a new item
export const createItem = async (
   req: CreateItemRequest,
   res: Response
): Promise<void> => {
   try {
      const { itemName, brand, imageUrl, materials } = req.body;

      // Create new item with the provided data
      const newItem = new Item({
         itemName,
         brand,
         imageUrl,
         materials,
      });

      // Save the item and populate material information in the response
      const savedItem = (await newItem.save()).populate({
         path: "materials.type",
         model: "Material",
      });

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
