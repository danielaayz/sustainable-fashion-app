import { X } from "lucide-react";
// import {
//    Material,
//    CompositionMaterial,
//    MaterialResponse,
// } from "../types/Material.js";
import { ItemModalProps } from "../types/ItemTypes.js";

const ItemDetailModal: React.FC<ItemModalProps> = ({
   isOpen,
   onClose,
   item,
}) => {
   // Destructurering utan konflikt
   const { sustainabilityScore, environmentalImpact } =
      item.sustainabilityAnalysis;

   // Funktion för att få beskrivning baserat på score
   const getScoreDescription = (score: number): string => {
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Good";
      if (score >= 40) return "Moderate";
      return "Poor";
   };

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <div className="p-6">
               {/* Header */}
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <h2 className="text-2xl font-medium text-gray-800">
                        {item.itemName}
                     </h2>
                  </div>
                  <button
                     onClick={onClose}
                     className="text-gray-400 hover:text-gray-600"
                     aria-label="Close modal">
                     <X className="w-6 h-6" />
                  </button>
               </div>

               {/* Image section */}
               {item.image && (
                  <div className="mb-8">
                     <img
                        src={item.image}
                        alt={item.itemName}
                        className="max-w-md mx-auto rounded-lg shadow-lg"
                     />
                  </div>
               )}

               <div className="flex gap-8">
                  {/* Left Column */}
                  <div className="w-1/2 space-y-8">
                     {/* Material Composition */}
                     <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                           Material Composition
                        </h3>
                        <div className="space-y-3">
                           {item.materials.map((material, index) => (
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
                     {environmentalImpact && environmentalImpact.length > 0 && (
                        <div>
                           <h3 className="text-lg font-medium text-gray-800 mb-4">
                              Environmental Impact
                           </h3>
                           <div className="space-y-4">
                              {environmentalImpact.map((impact, index) => (
                                 <div
                                    key={index}
                                    className="bg-gray-50 p-4 rounded">
                                    <p className="text-sm text-gray-600">
                                       {impact}
                                    </p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
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
                              sustainability ratings of individual materials and
                              their proportions in the item.
                           </p>
                        </div>
                     </div>

                     {/* Material Properties */}
                     <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                           Material Properties
                        </h3>
                        <div className="grid gap-4">
                           {item.materials.map((material, index) => (
                              <div
                                 key={index}
                                 className="bg-gray-50 p-4 rounded">
                                 <h4 className="font-medium mb-2 capitalize">
                                    {material.type}
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
            </div>
         </div>
      </div>
   );
};

export default ItemDetailModal;
