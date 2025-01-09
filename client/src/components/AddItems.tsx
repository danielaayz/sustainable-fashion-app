import React, { useState } from "react";
import { ChevronLeft, Minus, Plus, Upload } from "lucide-react";
/* shadCN library to speed up frontend work */
// import { Button } from "@/components/ui/button"
import RoundedButton from "../components/RoundedButton";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ItemToSave } from "../types/ItemTypes.js";
import ItemDetailModal from "./ItemModal";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.js";

// Define the structure for each material entry
export interface MaterialEntry {
   type: string;
   percentage: number;
}

// export interface ItemToSave {
//    itemName: string;
//    brand: string;
//    materials: MaterialEntry[];
//    image?: string;
// }

// Main component for adding a new item
export default function AddItemForm() {
   const [savedItemData, setSavedItemData] = useState<ItemToSave | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [item, setItem] = useState<ItemToSave>({
      itemName: "",
      brand: "",
      materials: [{ type: "", percentage: 0 }],
      image: "",
   });
   const [isUploading, setIsUploading] = useState(false);
   const [uploadError, setUploadError] = useState<string | null>(null);

   const handleSaveItem = (itemToSave: ItemToSave) => {
      console.log("Saving the following item:", itemToSave);
      setSavedItemData(itemToSave);
      setIsModalOpen(true);
   };

   const handleInputChange =
      (attributeName: keyof ItemToSave) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setItem({ ...item, [attributeName]: e.target.value });
      };

   const handleMaterialChange = (
      index: number,
      key: keyof MaterialEntry,
      value: any
   ) => {
      const updatedMaterials = [...item.materials];
      updatedMaterials[index] = {
         ...updatedMaterials[index],
         [key]: value, // Spread and assign dynamically
      };
      setItem({ ...item, materials: updatedMaterials });
   };
   const handleAddMaterial = () => {
      setItem({
         ...item,
         materials: [...item.materials, { type: "", percentage: 0 }],
      });
   };

   const handleRemoveMaterial = (index: number) => {
      const updatedMaterials = item.materials.filter((_, i) => i !== index);
      setItem({ ...item, materials: updatedMaterials });
   };

   const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB i bytes

   /**
    * Handles the image upload process when a user selects a file.
    *
    * Steps:
    * 1. Retrieves the selected file from the input event.
    * 2. Validates the file size against the maximum allowed limit.
    * 3. Initializes the upload process to Firebase Storage.
    * 4. Monitors the upload progress and handles success or error states.
    * 5. Upon successful upload, retrieves the download URL and updates the item state.
    */
   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      // Retrieve the first selected file from the input
      const file = e.target.files?.[0];
      if (!file) return;

      // Check if the file size exceeds the maximum allowed limit
      if (file.size > MAX_FILE_SIZE) {
         setUploadError("File size exceeds 10MB limit");
         return;
      }

      // Reset any previous upload errors and indicate that upload is starting
      setUploadError(null);
      setIsUploading(true);

      try {
         // Generate a unique file name using the current timestamp
         const fileName = `${Date.now()}_${file.name}`;

         // Create a reference to the Firebase Storage location
         const storageRef = ref(storage, "images/" + fileName);

         // Define metadata for the file, including its MIME type
         const metadata = {
            contentType: file.type,
         };

         // Start the file upload using a resumable upload task
         const uploadTask = uploadBytesResumable(storageRef, file, metadata);

         // Monitor the state changes of the upload task
         uploadTask.on(
            "state_changed",
            (snapshot) => {
               // Calculate and log the upload progress percentage
               const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               console.log("Upload is " + progress + "% done");
            },
            (error) => {
               // Handle any errors that occur during the upload
               console.error("Upload error:", error);
               setUploadError("Failed to upload image: " + error.message);
               setIsUploading(false);
            },
            async () => {
               try {
                  // Retrieve the download URL of the uploaded file
                  const downloadURL = await getDownloadURL(
                     uploadTask.snapshot.ref
                  );
                  console.log("File available at", downloadURL);

                  // Update the item's image URL in the state
                  setItem({ ...item, image: downloadURL });
                  setIsUploading(false);
               } catch (error) {
                  // Handle any unexpected errors that occur before the upload starts
                  console.error("Error getting download URL:", error);
                  setUploadError("Failed to get image URL");
                  setIsUploading(false);
               }
            }
         );
      } catch (error) {
         console.error("Error starting upload:", error);
         setUploadError("Failed to start upload");
         setIsUploading(false);
      }
   };

   return (
      <>
         {savedItemData && (
            <ItemDetailModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
               item={savedItemData}
            />
         )}

         <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
               <a
                  href="/home"
                  className="inline-flex p-2 rounded bg-soft-green items-center text-sm text-black hover:text-mossy-green">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Dashboard
               </a>
            </div>

            <div>
               <h1 className="text-2xl font-semibold text-black">
                  Add New Item
               </h1>
               <p className="mt-1 text-sm text-black">
                  Add details about your new clothing item
               </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-4">
                  <Label>Item Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center relative">
                     {isUploading ? (
                        // Loading state
                        <div className="flex flex-col items-center">
                           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-light-clay"></div>
                           <p className="mt-2 text-sm text-black">
                              Uploading...
                           </p>
                        </div>
                     ) : item.image ? (
                        // Successfully uploaded image
                        <div className="relative">
                           <img
                              src={item.image}
                              alt="Uploaded"
                              className="mx-auto max-h-40"
                           />
                           <button
                              onClick={() => setItem({ ...item, image: "" })}
                              className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                              ×
                           </button>
                        </div>
                     ) : (
                        // Upload prompt
                        <div className="flex flex-col items-center">
                           <Upload className="w-12 h-12 text-light-clay" />
                           <p className="mt-2 text-sm text-black">
                              Click to upload or drag and drop
                           </p>
                           <p className="text-xs text-gray-500">
                              PNG, JPG up to 10MB
                           </p>
                        </div>
                     )}

                     {/* Error message */}
                     {uploadError && (
                        <p className="mt-2 text-sm text-red-500">
                           {uploadError}
                        </p>
                     )}

                     <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <h2 className="text-lg font-medium">Item Details</h2>
                  <div>
                     <Label htmlFor="itemName">Item Name</Label>
                     <Input
                        id="itemName"
                        placeholder="e.g. Cotton T-Shirt"
                        value={item.itemName}
                        onChange={handleInputChange("itemName")}
                     />
                  </div>
                  <div>
                     <Label htmlFor="brand">Brand</Label>
                     <Input
                        id="brand"
                        placeholder="e.g. Sustainable Brand Co."
                        value={item.brand}
                        onChange={handleInputChange("brand")}
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h2 className="text-lg font-medium">
                        Material Composition
                     </h2>
                     <RoundedButton onClick={handleAddMaterial}>
                        + Add Material
                     </RoundedButton>
                  </div>

                  {item.materials.map((material, index) => (
                     <div key={index} className="flex gap-4 items-center">
                        <div className="flex-1">
                           <Label>Material Type</Label>
                           <Select
                              value={material.type}
                              onValueChange={(value) =>
                                 handleMaterialChange(index, "type", value)
                              }>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select material..." />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="cotton">Cotton</SelectItem>
                                 <SelectItem value="wool">Wool</SelectItem>
                                 <SelectItem value="polyester">
                                    Polyester
                                 </SelectItem>
                                 <SelectItem value="nylon">Nylon</SelectItem>
                                 <SelectItem value="silk">Silk</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="w-48">
                           <Label>Percentage</Label>
                           <div className="flex items-center gap-2">
                              <RoundedButton
                                 onClick={() =>
                                    handleMaterialChange(
                                       index,
                                       "percentage",
                                       Math.max(0, material.percentage - 1)
                                    )
                                 }>
                                 <Minus className="h-4 w-4" />
                              </RoundedButton>
                              <Input
                                 type="number"
                                 value={material.percentage}
                                 onChange={(e) =>
                                    handleMaterialChange(
                                       index,
                                       "percentage",
                                       parseInt(e.target.value) || 0
                                    )
                                 }
                                 className="w-20 text-center"
                                 min="0"
                                 max="100"
                              />
                              <RoundedButton
                                 onClick={() =>
                                    handleMaterialChange(
                                       index,
                                       "percentage",
                                       Math.min(100, material.percentage + 1)
                                    )
                                 }>
                                 <Plus className="h-4 w-4" />
                              </RoundedButton>
                              {item.materials.length > 1 && (
                                 <RoundedButton
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleRemoveMaterial(index)}>
                                    Remove
                                 </RoundedButton>
                              )}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Tips for adding items:</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                     <li>
                        Double check material types based on product composition
                     </li>
                     <li>Total material percentage should add up to 100%</li>
                     <li>
                        Clear, well-lit photos will help you identify items
                        easily
                     </li>
                  </ul>
               </div>

               <div className="flex justify-end">
                  <RoundedButton
                     onClick={(e) => {
                        e.preventDefault();
                        handleSaveItem(item);
                     }}>
                     Save Item
                  </RoundedButton>
               </div>
            </form>
         </div>
      </>
   );
}
