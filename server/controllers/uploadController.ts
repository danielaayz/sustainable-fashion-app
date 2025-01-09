import { Request, Response, NextFunction } from "express";
import { bucket } from "../firebase.config.js";
import multer from "multer";

// Konfigurera Multer för att hantera uppladdningar i minnet
export const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
         cb(null, true);
      } else {
         cb(new Error("Only images are allowed"));
      }
   },
}).single("file");

export class UploadController {
   uploadFile = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      console.log("Request headers:", req.headers);
      console.log("Request files:", req.files);
      console.log("Request file:", req.file); // single file
      console.log("Request body:", req.body);

      try {
         console.log("UploadController.uploadFile called");

         if (!req.file) {
            console.log("No file in request. Full request:", {
               body: req.body,
               files: req.files,
               file: req.file,
               headers: req.headers["content-type"],
            });
            res.status(400).json({ error: "No file uploaded" });
            return;
         }

         const file = req.file;
         const fileName = `${Date.now()}_${file.originalname}`;
         console.log(`Uploading file: ${fileName}`);

         const blob = bucket.file(fileName);
         const blobStream = blob.createWriteStream({
            metadata: {
               contentType: file.mimetype,
            },
         });

         blobStream.on("error", (error) => {
            console.error("Blob stream error:", error);
            res.status(500).json({ error: "Upload failed" });
         });

         blobStream.on("finish", async () => {
            console.log(`File uploaded: ${fileName}`);
            await blob.makePublic();
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
               bucket.name
            }/o/${encodeURIComponent(blob.name)}?alt=media`;
            res.status(200).json({
               message: "Upload successful",
               url: publicUrl,
            });
         });

         blobStream.end(file.buffer);
      } catch (error) {
         console.error("Upload file error:", error);
         res.status(500).json({ error: "Server error" });
      }
   };

   getFile = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const fileName = req.params.fileName;
         const file = bucket.file(fileName);
         const [exists] = await file.exists();
         if (!exists) {
            res.status(404).json({ error: "File not found" });
            return;
         }
         const [metadata] = await file.getMetadata();
         if (!metadata.mediaLink) {
            res.status(404).json({ error: "Media link not found" });
            return;
         }
         res.redirect(metadata.mediaLink);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server error" });
      }
   };

   deleteFile = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const fileName = req.params.fileName;
         const file = bucket.file(fileName);
         const [exists] = await file.exists();
         if (!exists) {
            res.status(404).json({ error: "File not found" });
            return;
         }
         await file.delete();
         res.status(200).json({ message: "File deleted successfully" });
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: "Server error" });
      }
   };
}
