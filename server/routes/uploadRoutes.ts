// uploadRoutes.ts
import { Router } from "express";
import { UploadController, upload } from "../controllers/uploadController.js";

const router = Router();
const uploadController = new UploadController();

router.use((req, res, next) => {
   console.log("Upload route hit, method:", req.method);
   next();
});

router.post(
   "/",
   upload,
   (req, res, next) => {
      console.log("After multer middleware:", {
         file: req.file,
         files: req.files,
         body: req.body,
      });
      next();
   },
   uploadController.uploadFile
);
//router.post("/", upload, uploadController.uploadFile);
router.get("/:fileName", uploadController.getFile);
router.delete("/:fileName", uploadController.deleteFile);

export default router;
