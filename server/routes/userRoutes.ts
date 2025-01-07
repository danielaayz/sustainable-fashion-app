import express from "express";
import {
   registerHandler,
   loginHandler,
} from "../controllers/userController.js";

//creating a router for routes (register and login )
const router = express.Router();

// Add type assertions to the route handlers
router.post("/register", registerHandler as express.RequestHandler);
router.post("/login", loginHandler as express.RequestHandler);

export default router;
