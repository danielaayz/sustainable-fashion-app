import React, { useState } from 'react';
import { X, Check, AlertTriangle, ThermometerSun, Droplets, Timer } from 'lucide-react';
import { ItemToSave } from './AddItems';

export interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ItemToSave | null;
}

const ItemDetailModal: React.FC<ItemModalProps> = ({ isOpen, onClose, item }) => {

    // don't render modal if not open
    if (!isOpen || !item) return null;
    const [materials, setMaterials] = useState([{ type: '', percentage: '' }]);

    // data to be replaced by users' Add Items form input/dropdown choices
    const materialProperties = {
        pros: [
            { text: "Breathable", icon: <ThermometerSun className="w-4 h-4" /> },
            { text: "Biodegradable", icon: <Timer className="w-4 h-4" /> },
            { text: "Skin-friendly", icon: <Check className="w-4 h-4" /> }
        ],
        cons: [
            { text: "High water consumption", icon: <Droplets className="w-4 h-4" /> },
            { text: "Pesticide use in non-organic", icon: <AlertTriangle className="w-4 h-4" /> }
        ]
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-8">
                        {/* item name and brand */}
                        <div>
                            <h2 className="text-2xl font-medium text-gray-800">Cotton T-Shirt</h2>
                            <p className="text-gray-600">EcoWear</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Close modal"
                                onClick={onClose}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="w-1/2">
                            <img
                                src="https://picsum.photos/200/300"
                                alt="Item"
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div className="w-1/2 space-y-8">
                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Material Composition</h3>
                                <div className="space-y-3">
                                    {materials.map((material, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <span className="text-gray-700">{material.type}</span>
                                            <span className="font-medium">{material.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Sustainability Score</h3>
                                <div className="bg-[#3a5246]/5 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        {/* score and "very good" to be replaced with calculation */}
                                        <span className="text-xl font-semibold text-[#3a5246]">78/100</span>
                                        <div className="text-sm text-gray-600">Very Good</div>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600">
                                        This score is calculated based on material composition, production methods and environmental impact.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Material Properties</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-light-green rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-mossy-green mb-3">Positive Properties</h4>
                                        <div className="space-y-2">
                                            {materialProperties.pros.map((prop, index) => (
                                                <div key={index} className="flex items-center gap-2 text-mossy-green">
                                                    {prop.icon}
                                                    <span className="text-sm">{prop.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-light-red rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-red mb-3">Considerations</h4>
                                        <div className="space-y-2">
                                            {materialProperties.cons.map((prop, index) => (
                                                <div key={index} className="flex items-center gap-2 text-red">
                                                    {prop.icon}
                                                    <span className="text-sm">{prop.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Environmental Impact</h3>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <p className="text-sm text-blue-800">
                                        Environmental impact data goes here
                                    </p>
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