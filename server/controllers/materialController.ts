import { Request, Response, NextFunction } from "express";
import { Material } from "../models/materials.js";
import {
   MaterialDocument,
   MaterialProperties,
} from "../types/materialTypes.js";

/**
 * MaterialController is reponsible for handling HTTP requests related to materials.
 * It acts as a bridge between the API layer and the Material model.
 */

export class MaterialController {
   /**
    * Determines the category of a material based on its name
    * @param name - The name of the material
    * @returns The category of the material
    */

   private determineCategory(
      name: string
   ): "Natural" | "Synthetic" | "Semi-Synthetic" {
      const synthetic = [
         "Polyester",
         "Nylon",
         "Acrylic",
         "Polyurethane",
         "Spandex",
         "Elastane",
         "Polyamide",
      ];
      const semiSynthetic = ["Modal", "Viscose", "Rayon", "Lyocell"];

      const lowerName = name.toLowerCase();

      if (synthetic.some((s) => lowerName.includes(s.toLowerCase()))) {
         return "Synthetic";
      } else if (
         semiSynthetic.some((s) => lowerName.includes(s.toLowerCase()))
      ) {
         return "Semi-Synthetic";
      }

      return "Natural";
   }

   /**
    * Creates multiple materials at once.
    * @param req - The HTTP request object containing an array of materials.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */
   createManyMaterials = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         // Validate request body structure
         if (!req.body.materials || !Array.isArray(req.body.materials)) {
            res.status(400).json({
               message: "Invalid request format",
               error: "Request body should contain a 'materials' array",
            });
            return;
         }
         // Define the type for individual material in the array
         type MaterialInput = Omit<
            MaterialProperties,
            "category" | "lastUpdated"
         >;

         // Process each material to add required fields
         const processedMaterials = req.body.materials.map(
            (material: MaterialInput) => ({
               ...material,
               category: this.determineCategory(material.name),
            })
         );

         // Insert all materials
         const newMaterials = await Material.insertMany(processedMaterials, {
            ordered: false, // Continues inserting even if some documents fail
         });

         res.status(201).json({
            message: "Materials created successfully",
            count: newMaterials.length,
            materials: newMaterials,
         });
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).json({
               message: "Error creating materials",
               error: error.message,
            });
         } else {
            res.status(400).json({
               message: "Error creating materials",
               error: String(error),
            });
         }
      }
   };

   /**
    * Creates a new material.
    * @param req - The HTTP request object containing the material data.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */
   createMaterial = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         // Add category if not provided
         const materialData = {
            ...req.body,
            category:
               req.body.category || this.determineCategory(req.body.name),
         };

         const newMaterial = await Material.create(materialData);

         res.status(201).json({
            message: "Material created successfully",
            material: newMaterial,
            id: newMaterial._id,
         });
      } catch (error) {
         if (error instanceof Error) {
            res.status(400).json({
               message: "Error creating material",
               error: error.message,
            });
         } else {
            res.status(400).json({
               message: "Error creating material",
               error: String(error),
            });
         }
      }
   };

   /**
    * Creates multiple materials at once.
    * @param req - The HTTP request object containing an array of materials.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */

   /**
    * Retrieves a specific material by ID.
    * @param req - The HTTP request object containing the material ID.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */
   getMaterialById = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const material = (await Material.findById(
            req.params.id
         )) as MaterialDocument | null;

         if (!material) {
            res.status(404).json({
               message: "Material not found",
               error: "Material not found",
            });
            return;
         }

         res.json({
            message: "Material found",
            material: material,
         });
      } catch (error: unknown) {
         if (error instanceof Error) {
            res.status(500).json({
               message: "Error fetching material",
               error: error.message,
            });
         } else {
            res.status(500).json({
               message: "Error fetching material",
               error: String(error),
            });
         }
      }
   };

   /**
    * Updates a specific material.
    * @param req - The HTTP request object containing the material ID and update data.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */
   updateMaterial = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const updatedMaterial = (await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
         )) as MaterialDocument | null;

         if (!updatedMaterial) {
            res.status(404).json({
               message: "Material not found",
               error: "Material not found",
            });
            return;
         }

         res.json({
            message: "Material updated successfully",
            material: updatedMaterial,
         });
      } catch (error: unknown) {
         if (error instanceof Error) {
            res.status(400).json({
               message: "Error updating material",
               error: error.message,
            });
         } else {
            res.status(400).json({
               message: "Error updating material",
               error: String(error),
            });
         }
      }
   };

   /**
    * Deletes a specific material.
    * @param req - The HTTP request object containing the material ID.
    * @param res - The HTTP response object.
    * @param next - The next middleware function.
    */
   deleteMaterial = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const deletedMaterial = (await Material.findByIdAndDelete(
            req.params.id
         )) as MaterialDocument | null;

         if (!deletedMaterial) {
            res.status(404).json({
               message: "Material not found",
               error: "Material not found",
            });
            return;
         }

         res.json({
            message: "Material deleted successfully",
            material: deletedMaterial,
         });
      } catch (error: unknown) {
         if (error instanceof Error) {
            res.status(500).json({
               message: "Error deleting material",
               error: error.message,
            });
         } else {
            res.status(500).json({
               message: "Error deleting material",
               error: String(error),
            });
         }
      }
   };
}
