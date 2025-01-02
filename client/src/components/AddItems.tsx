import { useState } from "react";
import { ChevronLeft, Minus, Plus, Upload } from 'lucide-react';
import RoundedButton from "../components/RoundedButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger, 
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MaterialEntry {
    type: string;
    percentage: number;
}

interface RoundedButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit";
    className?: string;
    children: React.ReactNode;
}

export default function AddItemForm(): JSX.Element {
    const [itemName, setItemName] = useState('');
    const [brand, setBrand] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [materials, setMaterials] = useState<MaterialEntry[]>([
        { type: "wool", percentage: 65 }
    ]);

    const RoundedButton: React.FC<RoundedButtonProps> = ({ onClick, type = "button", className, children, ...props }) => {
        return (
            <Button
                type={type}
                onClick={onClick}
                className={className}
                {...props} // Forward remaining props to the Button
            >
                {children}
            </Button>
        );
    };

    const navigateTo = (url: string) => {
        window.location.href = url; // Replace Next.js router push with window.location
    };

    const addMaterial = () => {
        setMaterials([...materials, { type: "", percentage: 0 }]);
    };

    const updateMaterial = (index: number, field: keyof MaterialEntry, value: string | number) => {
        const updatedMaterials = materials.map((material, i) => 
            i === index ? { ...material, [field]: value } : material
        );
        setMaterials(updatedMaterials);
    };

    const removeMaterial = (index: number) => {
        setMaterials(materials.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate total percentage
        const totalPercentage = materials.reduce((sum, material) => sum + material.percentage, 0);
        if (totalPercentage !== 100) {
            setError('Total material percentage must equal 100%');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itemName,
                    brand,
                    imageUrl,
                    materials,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            if (data.success) {
                navigateTo('/dashboard'); // Use navigateTo instead of router.push
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-8">
            <div>
                <a
                    href="/dashboard"
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

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
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
                                required
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
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">Material Composition</h2>
                        <RoundedButton
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                addMaterial();
                            }}
                        >
                            + Add Material
                        </RoundedButton>
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
                                        <RoundedButton
                                            onClick={(e: React.MouseEvent) => {
                                                e.preventDefault();
                                                updateMaterial(index, 'percentage', Math.max(0, material.percentage - 5));
                                            }}
                                        >
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
                                        <RoundedButton
                                            onClick={(e: React.MouseEvent) => {
                                                e.preventDefault();
                                                updateMaterial(index, 'percentage', Math.min(100, material.percentage + 5));
                                            }}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </RoundedButton>
                                        {materials.length > 1 && (
                                            <RoundedButton
                                                onClick={(e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    removeMaterial(index);
                                                }}
                                                className="text-red-500 hover:text-red-700"
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
                    <RoundedButton 
                        type="submit" 
                        className={loading ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                        {loading ? 'Adding Item...' : 'Add Item'}
                    </RoundedButton>
                </div>
            </form>
        </div>
    );
}
