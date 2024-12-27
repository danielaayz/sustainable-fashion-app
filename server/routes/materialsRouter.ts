import { Router } from "express";
import { MaterialController } from "../controllers/materialController.js";

const router = Router();

const materialController = new MaterialController();

// POST: Create a new material
router.post("/materials", materialController.createMaterial);

// POST: Create new materials in bulk
router.post("/bulk", materialController.createManyMaterials);

// GET: Retrieve a specific material
router.get("/materials/:id", materialController.getMaterialById);

// PUT: Update a specific material
router.put("/materials/:id", materialController.updateMaterial);

// DELETE: Remove a specific material
router.delete("/materials/:id", materialController.deleteMaterial);

export default router;
