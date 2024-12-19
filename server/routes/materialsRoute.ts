import express, { Request, Response } from "express";
import { Material } from "../models/materials.js";
import {
   MaterialDocument,
   MaterialRequestParams,
   MaterialResponseBody,
} from "../types/types";

const router = express.Router();

// POST: Create a new material
router.post("/materials", async (req, res) => {
   try {
      const newMaterial = (await Material.create(req.body)) as MaterialDocument;
      res.status(201).json({
         message: "Material created successfully",
         material: newMaterial,
         id: newMaterial._id,
      });
   } catch (error: unknown) {
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
});

// GET: Retrieve a specific material
router.get("/materials/:id", async (req, res) => {
   try {
      const material = (await Material.findById(
         req.params.id
      )) as MaterialDocument | null;
      if (!material) {
         res.status(404).json({
            message: "Material not found",
            error: "Material not found",
         });
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
});

// PUT: Update a specific material
router.put("/materials/:id", async (req, res) => {
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
});

// DELETE: Remove a specific material
router.delete("/materials/:id", async (req, res) => {
   try {
      const deletedMaterial = (await Material.findByIdAndDelete(
         req.params.id
      )) as MaterialDocument | null;
      if (!deletedMaterial) {
         res.status(404).json({
            message: "Material not found",
            error: "Material not found",
         });
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
});

export default router;
