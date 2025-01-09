import { CompositionMaterial, Material } from "./Material";

export interface ItemToSave {
   itemName: string;
   brand: string;
   materials: CompositionMaterial[];
   image: string;
}

export interface ItemModalProps {
   isOpen: boolean;
   onClose: () => void;
   item: ItemToSave & {
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
   };
}
