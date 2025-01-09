import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { CompositionMaterial, Material } from "../types/Material";

// Define the structure for each material entry

interface MaterialOption {
   name: string;
   id: string;
}

interface MaterialData {
   _id: string;
   name: string;
   category: string;
   sustainabilityScore: number;
   scoreDescription: string;
   properties: {
      pros: string[];
      cons: string[];
   };
   environmentalImpact: string[];
}
export interface MaterialEntry extends CompositionMaterial {
   type: string;
   percentage: number;
   properties: {
      pros: string[];
      cons: string[];
   };
   environmentalImpact: string[];
}

interface ItemWithSustainability extends ItemToSave {
   sustainabilityAnalysis: {
      sustainabilityScore: number;
      scoreDescription: string;
      environmentalImpact: string[];
      composition: Array<{
         type: string;
         percentage: number;
         material: Material;
      }>;
   };
}

// Main component for adding a new item
export default function AddItemForm() {
   const [savedItemData, setSavedItemData] =
      useState<ItemWithSustainability | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [materials, setMaterials] = useState<MaterialOption[]>([]);
   const [item, setItem] = useState<ItemToSave>({
      itemName: "",
      brand: "",
      materials: [
         {
            type: "",
            percentage: 0,
            properties: {
               pros: [],
               cons: [],
            },
            environmentalImpact: [],
         },
      ],
      image: "",
   });
   const [isUploading, setIsUploading] = useState(false);
   const [uploadError, setUploadError] = useState<string | null>(null);

   // Fetch available materials on component mount
   useEffect(() => {
      const fetchMaterials = async () => {
         try {
            const response = await axios.get<{ materials: MaterialData[] }>(
               "http://localhost:3001/api/materials"
            );
            const materialOptions = response.data.materials.map((material) => ({
               name: material.name,
               id: material._id,
            }));
            setMaterials(materialOptions);
         } catch (error) {
            console.error("Error fetching materials:", error);
         }
      };

      fetchMaterials();
   }, []);

   // Function to fetch material properties from backend
   const fetchMaterialProperties = async (materialType: string) => {
      try {
         const response = await axios.get<{ material: MaterialData }>(
            `http://localhost:3001/api/materials/${materialType}`
         );
         const { properties, environmentalImpact } = response.data.material;
         return {
            pros: properties.pros,
            cons: properties.cons,
            environmentalImpact,
         };
      } catch (error) {
         console.error(`Error fetching properties for ${materialType}:`, error);
         return {
            pros: [],
            cons: [],
            environmentalImpact: [],
         };
      }
   };

   // const saveItemToDatabase = async (itemData: ItemWithSustainability) => {
   //    try {
   //       const response = await axios.post(
   //          "http://localhost:3001/api/items",
   //          itemData
   //       );
   //       console.log("Item saved successfully:", response.data);
   //       // You might want to redirect to a success page or show a success message
   //    } catch (error) {
   //       console.error("Error saving item:", error);
   //       // Handle error - show error message to user
   //    }
   // };

   const handleSaveItem = async (itemToSave: ItemToSave) => {
      try {
         // Calculate sustainability for the entire item
         const response = await axios.post<{
            analysis: {
               sustainabilityScore: number;
               scoreDescription: string;
               environmentalImpact: string[];
               composition: Array<{
                  type: string;
                  percentage: number;
                  material: Material;
               }>;
            };
         }>("http://localhost:3001/api/sustainability/calculate", {
            composition: itemToSave.materials,
         });

         // Find the material with the highest percentage for environmental impact
         const primaryMaterial = [...itemToSave.materials].sort(
            (a, b) => b.percentage - a.percentage
         )[0];

         const itemWithSustainability: ItemWithSustainability = {
            ...itemToSave,
            sustainabilityAnalysis: {
               ...response.data.analysis,
               environmentalImpact: primaryMaterial.environmentalImpact || [],
            },
         };

         // Save to database
         //await saveItemToDatabase(itemWithSustainability);

         console.log("Item with sustainability data:", itemWithSustainability);
         setSavedItemData(itemWithSustainability);
         setIsModalOpen(true);
         /*
         // Calculate sustainability
         const response = await axios.post(
            "http://localhost:3001/api/sustainability/calculate",
            {
               composition: itemToSave.materials,
            }
         );

         // Combine item data with sustainability data
         const itemWithSustainability = {
            ...itemToSave,
            sustainabilityAnalysis: response.data.analysis,
         };

         console.log(
            "Saving item with sustainability data:",
            itemWithSustainability
         );
         setSavedItemData(itemWithSustainability);
         setIsModalOpen(true);
         */
      } catch (error) {
         console.error("Error calculating sustainability:", error);
      }
   };

   const handleInputChange =
      (attributeName: keyof ItemToSave) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
         setItem({ ...item, [attributeName]: e.target.value });
      };

   const handleMaterialChange = async (
      index: number,
      key: keyof MaterialEntry,
      value: any
   ) => {
      const updatedMaterials = [...item.materials];
      const currentMaterial = updatedMaterials[index];

      let updatedMaterial = {
         ...currentMaterial,
         [key]: value,
      };

      if (key === "type" && typeof value === "string") {
         const materialData = await fetchMaterialProperties(value);
         updatedMaterial = {
            ...updatedMaterial,
            properties: {
               pros: materialData.pros,
               cons: materialData.cons,
            },
            environmentalImpact: materialData.environmentalImpact,
         };
      }

      updatedMaterials[index] = updatedMaterial as MaterialEntry;
      setItem({ ...item, materials: updatedMaterials });
   };

   const handleAddMaterial = () => {
      setItem({
         ...item,
         materials: [
            ...item.materials,
            {
               type: "",
               percentage: 0,
               properties: {
                  pros: [],
                  cons: [],
               },
               environmentalImpact: [],
            },
         ],
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
                                 {materials.map((mat) => (
                                    <SelectItem
                                       key={mat.id}
                                       value={mat.name.toLowerCase()}>
                                       {mat.name}
                                    </SelectItem>
                                 ))}
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
