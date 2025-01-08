import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import axios from "axios";
import {
   Material,
   CompositionMaterial,
   MaterialResponse,
} from "../types/Material";

// API instance with base configuration
const api = axios.create({
   baseURL: "http://localhost:5000/api",
   timeout: 5000,
});

const materialService = {
   // Fetch single material by name
   async getMaterialByName(name: string): Promise<Material | null> {
      try {
         console.log("Fetching material:", name); // Debug log
         const response = await api.get<MaterialResponse>(
            `/materials/search?name=${name}`
         );
         console.log("API Response:", response.data); // Debug log
         return response.data.material;
      } catch (error) {
         console.error("Error fetching material:", error);
         return null;
      }
   },

   // Calculate weighted sustainability score based on material composition
   calculateSustainabilityScore(
      materials: Material[],
      composition: CompositionMaterial[]
   ): number {
      return composition.reduce((score, item) => {
         const material = materials.find(
            (m) => m.name.toLowerCase() === item.type.toLowerCase()
         );
         return (
            score +
            (material?.sustainabilityScore || 0) * (item.percentage / 100)
         );
      }, 0);
   },
};

interface ItemDetailModalProps {
   isOpen: boolean;
   onClose: () => void;
   itemName: string;
   composition: CompositionMaterial[];
}

// mock data
const mockComposition = [
   { type: "cotton", percentage: 60 },
   { type: "polyester", percentage: 40 },
];

const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
   onClose,
   itemName = "Test Item", // Default value for testing
   composition = mockComposition, // Use mock data as default
}) => {
   const [materials, setMaterials] = useState<Material[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [sustainabilityScore, setSustainabilityScore] = useState<number>(0);

   // Main component logic within useEffect
   useEffect(() => {
      const fetchMaterialData = async () => {
         setIsLoading(true);
         setError(null);
         try {
            console.log("Fetching materials for:", composition); // Log input

            // Fetch all materials in parallel
            const materialPromises = composition.map((item) =>
               materialService.getMaterialByName(item.type)
            );

            // Wait for all fetches to complete
            const fetchedMaterials = await Promise.all(materialPromises);
            console.log("Fetched materials:", fetchedMaterials); // Log response

            // Filter out any null responses
            const validMaterials = fetchedMaterials.filter(
               (m): m is Material => m !== null
            );
            console.log("Valid materials:", validMaterials);
            // Log processed data

            // Update state with valid materials
            setMaterials(validMaterials);
            const score = materialService.calculateSustainabilityScore(
               validMaterials,
               composition
            );
            setSustainabilityScore(score);
         } catch (err) {
            console.error("Fetch error:", err); // Log errors
            setError(err instanceof Error ? err.message : "An error occurred");
         } finally {
            setIsLoading(false);
         }
      };

      fetchMaterialData();
   }, [composition]);

   const getScoreDescription = (score: number): string => {
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Good";
      if (score >= 40) return "Moderate";
      return "Poor";
   };

   if (error) {
      return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md">
               <h2 className="text-red-600 mb-4">Error Loading Data</h2>
               <p className="text-gray-700">{error}</p>
               <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  Close
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
               {/* Header */}
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <h2 className="text-2xl font-medium text-gray-800">
                        {itemName}
                     </h2>
                  </div>
                  <button
                     onClick={onClose}
                     className="text-gray-400 hover:text-gray-600"
                     aria-label="Close modal">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                     <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                  </div>
               ) : (
                  <div className="flex gap-8">
                     {/* Left Column */}
                     <div className="w-1/2 space-y-8">
                        {/* Material Composition */}
                        <div>
                           <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Material Composition
                           </h3>
                           <div className="space-y-3">
                              {composition.map((material, index) => (
                                 <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <span className="text-gray-700 capitalize">
                                       {material.type}
                                    </span>
                                    <span className="font-medium">
                                       {material.percentage}%
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Environmental Impact */}
                        <div>
                           <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Environmental Impact
                           </h3>
                           <div className="space-y-4">
                              {materials.map((material, index) => (
                                 <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded">
                                    <h4 className="font-medium mb-2 capitalize">
                                       {material.name}
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                       {material.environmentalImpact?.map(
                                          (impact, i) => (
                                             <li
                                                key={i}
                                                className="text-sm text-gray-600">
                                                {impact}
                                             </li>
                                          )
                                       )}
                                    </ul>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Right Column */}
                     <div className="w-1/2 space-y-8">
                        {/* Sustainability Score */}
                        <div>
                           <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Sustainability Score
                           </h3>
                           <div className="bg-[#3a5246]/5 rounded-lg p-6">
                              <div className="flex items-center justify-between mb-4">
                                 <span className="text-xl font-semibold text-[#3a5246]">
                                    {sustainabilityScore.toFixed(1)}/100
                                 </span>
                                 <div className="text-sm text-gray-600">
                                    {getScoreDescription(sustainabilityScore)}
                                 </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                 <div
                                    className="bg-[#3a5246] h-2.5 rounded-full transition-all duration-500"
                                    style={{ width: `${sustainabilityScore}%` }}
                                 />
                              </div>
                              <p className="mt-4 text-sm text-gray-600">
                                 This score is calculated based on the
                                 sustainability ratings of individual materials
                                 and their proportions in the item.
                              </p>
                           </div>
                        </div>

                        {/* Material Properties */}
                        <div>
                           <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Material Properties
                           </h3>
                           <div className="grid gap-4">
                              {materials.map((material, index) => (
                                 <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded">
                                    <h4 className="font-medium mb-2 capitalize">
                                       {material.name}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                       <div>
                                          <h5 className="text-sm font-medium text-green-800 mb-2">
                                             Pros
                                          </h5>
                                          <ul className="list-disc list-inside space-y-1">
                                             {material.properties.pros.map(
                                                (pro, i) => (
                                                   <li
                                                      key={i}
                                                      className="text-sm text-gray-600">
                                                      {pro}
                                                   </li>
                                                )
                                             )}
                                          </ul>
                                       </div>
                                       <div>
                                          <h5 className="text-sm font-medium text-red-800 mb-2">
                                             Cons
                                          </h5>
                                          <ul className="list-disc list-inside space-y-1">
                                             {material.properties.cons.map(
                                                (con, i) => (
                                                   <li
                                                      key={i}
                                                      className="text-sm text-gray-600">
                                                      {con}
                                                   </li>
                                                )
                                             )}
                                          </ul>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default ItemDetailModal;
