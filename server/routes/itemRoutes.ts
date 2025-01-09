import { Router } from "express";
import {
   getAllItems,
   getItemById,
   createItem,
} from "../controllers/itemController.js";

const router = Router();

// Define routes with explicit Router methods
router.route("/").get(getAllItems).post(createItem);

router.route("/:id").get(getItemById);

export default router;
