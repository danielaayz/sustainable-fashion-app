// ItemTypes.ts
import { CompositionMaterial, Material } from "./Material";

// Base item interface without sustainability analysis
export interface ItemToSave {
   itemName: string;
   brand: string;
   materials: CompositionMaterial[];
   image: string;
}

// Complete item interface including sustainability analysis
export interface Item extends ItemToSave {
   sustainabilityAnalysis: {
      sustainabilityScore: number;
      scoreDescription: string;
      environmentalImpact: string[];
      composition: {
         type: string;
         percentage: number;
         material: Material;
      }[];
   };
}

// Props for the modal component
export interface ItemModalProps {
   isOpen: boolean;
   onClose: () => void;
   item: Item; // Use the Item interface here instead of the intersection type
}
