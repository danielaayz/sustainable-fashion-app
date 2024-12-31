import { useState } from "react";
import { ChevronLeft, Minus, Plus, Upload } from 'lucide-react';
/* shadCN library to speed up frontend work */
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

// Define the type for the material entry
interface MaterialEntry {
    type: string;
    percentage: number;
}

// Define the type for the item being saved
interface ItemToSave {
    itemName: string;
    brand: string;
    materials: MaterialEntry[];
    image?: string;
}

export default function AddItemForm() {
    const [itemName, setItemName] = useState('');
    const [brand, setBrand] = useState('');
    const [materials, setMaterials] = useState<MaterialEntry[]>([
        { type: "wool", percentage: 65 }
    ]);

    const addMaterial = () => {
        setMaterials([...materials, { type: '', percentage: 0 }]);
    };

    const removeMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    const updateMaterial = (index: number, field: 'type' | 'percentage', value: string | number) => {
        const updatedMaterials = [...materials];
        updatedMaterials[index] = {
            ...updatedMaterials[index],
            [field]: value
        };
        setMaterials(updatedMaterials);
    };

    const handleSaveItem = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate total percentage
        const totalPercentage = materials.reduce((sum, mat) => sum + Number(mat.percentage), 0);
        if (totalPercentage !== 100) {
            alert('Total percentage must equal 100%');
            return;
        }

        const itemData: ItemToSave = {
            itemName,
            brand,
            materials,
            // Add image handling logic here if needed
        };

        console.log("Saving the following item:", itemData);

        // Placeholder for submitting the form data (e.g., to an API)
        setTimeout(() => {
            console.log("Item saved:", itemData);
            alert('Item saved successfully!');
        }, 1000);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
                <a
                    href="/home"
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

            <form onSubmit={handleSaveItem} className="space-y-8">
                <div className="space-y-4">
                    <Label>Item Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                        <div className="mx-auto w-12 h-12 text-light-clay">
                            <Upload className="w-12 h-12" />
                        </div>
                        <p className="mt-2 text-sm text-black">or drag and drop</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium">Item Details</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="itemName">Item Name</Label>
                            <Input
                                id="itemName"
                                placeholder="e.g. Cotton T-Shirt"
                                className="mt-1"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="brand">Brand</Label>
                            <Input
                                id="brand"
                                placeholder="e.g. Sustainable Brand Co."
                                className="mt-1"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">Material Composition</h2>
                        <RoundedButton onClick={addMaterial}>+ Add Material</RoundedButton>
                    </div>

                    <div className="space-y-4">
                        {materials.map((material, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <Label>Material Type</Label>
                                    <Select
                                        value={material.type}
                                        onValueChange={(value) => updateMaterial(index, 'type', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select material..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cotton">Cotton</SelectItem>
                                            <SelectItem value="wool">Wool</SelectItem>
                                            <SelectItem value="polyester">Polyester</SelectItem>
                                            <SelectItem value="nylon">Nylon</SelectItem>
                                            <SelectItem value="silk">Silk</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="w-48">
                                    <Label>Percentage</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <RoundedButton onClick={() => updateMaterial(index, 'percentage', material.percentage - 1)}>
                                            <Minus className="h-4 w-4" />
                                        </RoundedButton>
                                        <Input
                                            type="number"
                                            value={material.percentage}
                                            onChange={(e) => updateMaterial(index, 'percentage', Number(e.target.value))}
                                            className="w-20 text-center"
                                            min="0"
                                            max="100"
                                        />
                                        <RoundedButton onClick={() => updateMaterial(index, 'percentage', material.percentage + 1)}>
                                            <Plus className="h-4 w-4" />
                                        </RoundedButton>
                                        {materials.length > 1 && (
                                            <RoundedButton
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => removeMaterial(index)}
                                            >
                                                Remove
                                            </RoundedButton>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                    <RoundedButton type="submit">Save Item</RoundedButton>
                </div>
            </form>
        </div>
    );
}