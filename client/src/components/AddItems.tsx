import React, { useState, useEffect } from "react";
import { ChevronLeft, Key, Minus, Plus, Upload } from "lucide-react";
/* shadCN library to speed up frontend work */
// import { Button } from "@/components/ui/button"
import RoundedButton from "../components/RoundedButton";
import { Input } from "@/components/ui/input";
import { LoaderFunctionArgs, useLoaderData, useParams, useNavigate } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ItemDetailModal from "./ItemModal";
import { materials, mockItems } from "./WardrobePage";

export interface MaterialEntry {
  type: string;
  percentage: number;
};

export interface ItemToSave {
  id?: number;
  itemName: string;
  brand: string;
  materials: MaterialEntry[];
  image?: string;
};

interface AddItemFormProps {
  initialItem?: ItemToSave;
  onSave: (item: ItemToSave) => void;
  onCancel: () => void;
};

// taken from React Router loader function
export async function loader({ params }: LoaderFunctionArgs) {
  const wardrobeItem: ItemToSave = {
    id: 3,
    itemName: "Test shirt",
    brand: "Best brand",
    materials: [{ type: "Cotton", percentage: 100 }],

  }
  return wardrobeItem;
}

export default function AddItemForm() {
  const navigate = useNavigate();
  const [savedItemData, setSavedItemData] = useState<ItemToSave | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState<ItemToSave>({
    itemName: "",
    brand: "",
    materials: [{ type: "", percentage: 0 }] // Initialize with one empty material
  });  const params = useParams()

  // const wardrobeItem = useLoaderData<Awaited<ReturnType<typeof loader>>>();
  // console.log(wardrobeItem)

  useEffect(() => {
    // use fetch("backend-endpoint-url") to fetch data
    const wardrobeItem: ItemToSave | undefined = mockItems.find(({id}) => id.toString() === params.id)
    if (wardrobeItem) {
      setItem(wardrobeItem)
    }
  }, [])
  console.log(item)

  // save item data and open Modal
  const handleSaveItem = () => {
    if (!item) {
      return
    }
    const totalPercentage = item.materials.reduce(
      (sum, material) => sum + material.percentage, 0
    );
    if (totalPercentage !== 100) {
      alert("Total material percentage must be 100%!");
      return;
    }

    console.log("Saving the following item:", item);
    setSavedItemData(item);
    setIsModalOpen(true);
  };


  const handleInputChange =
    (attributeName: keyof ItemToSave) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!item) {
        return
      }
      setItem({ ...item, [attributeName]: e.target.value });
    };

  const handleMaterialChange = (index: number, key: keyof MaterialEntry, value: any) => {
    if (!item) {
      return
    }
    const updatedMaterials = [...item.materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [key]: value, // Spread and assign dynamically
    };
    setItem({ ...item, materials: updatedMaterials });
  };

  const handleAddMaterial = () => {
    if (!item) {
      return
    }
    setItem({
      ...item,
      materials: [...item.materials, { type: "", percentage: 0 }],
    });
  };

  const handleRemoveMaterial = (index: number) => {
    if (!item) {
      return
    }
    const updatedMaterials = item.materials.filter((_, i) => i !== index);
    setItem({ ...item, materials: updatedMaterials });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!item) {
      return
    }
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setItem({ ...item, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {isModalOpen && savedItemData && (
        <ItemDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          itemName={savedItemData.itemName}
          composition={savedItemData.materials}
        />
      )}

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div>
          <a
            href="/profile"
            className="inline-flex p-2 rounded bg-soft-green items-center text-sm text-black hover:text-mossy-green"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </a>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-black">Add New Item</h1>
          <p className="mt-1 text-sm text-black">Add details about your new clothing item</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Label>Item Image</Label>
            <div className="border-2 border-dashed rounded-lg p-12 text-center relative">
              {item && item.image ? (
                <img src={item.image} alt="Uploaded" className="mx-auto max-h-40" />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-light-clay" />
                  <p className="mt-2 text-sm text-black">or drag and drop</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
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
                value={item?.itemName || ""}
                onChange={handleInputChange("itemName")}
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                placeholder="e.g. Sustainable Brand Co."
                value={item?.brand || ""}
                onChange={handleInputChange("brand")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Material Composition</h2>
              <RoundedButton onClick={handleAddMaterial}>+ Add Material</RoundedButton>
            </div>

            {item?.materials?.map((material, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <Label>Material Type</Label>
                  <Select
                    value={material.type}
                    onValueChange={(value) => handleMaterialChange(index, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(materials.entries()).map(
                        ([key, value]) => <SelectItem key={key} value={key}>{value}</SelectItem>
                      )}
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
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </RoundedButton>
                    <Input
                      type="number"
                      value={material.percentage}
                      onChange={(e) =>
                        handleMaterialChange(index, "percentage", parseInt(e.target.value) || 0)
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
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </RoundedButton>
                    {item.materials.length > 1 && (
                      <RoundedButton
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveMaterial(index)}
                      >
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
              <li>Double check material types based on product composition</li>
              <li>Total material percentage should add up to 100%</li>
              <li>Clear, well-lit photos will help you identify items easily</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <RoundedButton
              type="button"
              onClick={handleSaveItem}
            >
              Save Item
            </RoundedButton>
          </div>
        </form>
      </div>
    </>
  );
}
