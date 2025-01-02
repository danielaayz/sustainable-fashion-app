import { MaterialEntry } from "./MaterialEntry";

export interface ClothingItem {
   id: string;
   name: string;
   brand: string;
   image?: string;
   materials: MaterialEntry[];
}
