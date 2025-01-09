import { CompositionMaterial } from "./Material";

export interface ItemToSave {
   itemName: string;
   brand: string;
   materials: CompositionMaterial[];
   image: string;
}

export interface ItemModalProps {
   isOpen: boolean;
   onClose: () => void;
   item: ItemToSave;
}
