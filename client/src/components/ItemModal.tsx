import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// API endpoint
const API_BASE_URL = 'http://localhost:5000/api/calculate';

const ItemDetailModal = () => {
// Hardcoded data for testing. This will be replaced with dynamic user input from the add item page when the user adds.
    const [materials, setMaterials] = useState([
        { type: 'cotton', percentage: 50},
        { type: 'acrylic', percentage: 40 },
        { type: 'modal', percentage: 10 }
    ]);
    const [sustainabilityScore, setSustainabilityScore] = useState<string | null>('0.0');

    // Fetch material data and calculate the sustainability score
    const calculateSustainabilityScore = async () => {
        try {         
            // Make an API call to calculate the sustainability score based on the material data
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ materials })// Send the materials data in the request body
            });

            if (!response.ok) {// Check if the response is not okay (e.g., server error)
                console.error("Error fetching sustainability score:", response.statusText);
                return;
            }

            const data = await response.json();// // Parse the JSON response from the server
            console.log("Response from backend:", data); // Log the response from the backend

            // If the sustainability score is returned from the backend, update the state
            if (data.sustainabilityScore) {
                setSustainabilityScore(data.sustainabilityScore);
            } else {
                console.log("No sustainability score returned.");
            }
        } catch (error) { // Catch any errors that occur during the fetch request
            console.error("Error during the fetch request:", error);
        }
    };

    // Call the API whenever materials change (or on initial load)
    useEffect(() => {
        calculateSustainabilityScore();
    }, [materials]);

    // data to be replaced by users' Add Items form input/dropdown choices
    // const materialProperties = {
    //     pros: [
    //         { text: "Breathable", icon: <ThermometerSun className="w-4 h-4" /> },
    //         { text: "Biodegradable", icon: <Timer className="w-4 h-4" /> },
    //         { text: "Skin-friendly", icon: <Check className="w-4 h-4" /> }
    //     ],
    //     cons: [
    //         { text: "High water consumption", icon: <Droplets className="w-4 h-4" /> },
    //         { text: "Pesticide use in non-organic", icon: <AlertTriangle className="w-4 h-4" /> }
    //     ]
    // };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-2xl font-medium text-gray-800">Cotton T-Shirt</h2>
                            <p className="text-gray-600">EcoWear</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="text-gray-400 hover:text-gray-600"
                                aria-label="Close modal"
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
                                    <div className="space-y-4">
                                        {/* Progress Bar */}
                                        <div className="relative h-4 bg-gray-200 rounded-lg">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-[#3a5246] rounded-lg"
                                                style={{ width: `${sustainabilityScore}%` }}
                                            />
                                        </div>

                                        {/* Calculated score */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xl font-semibold text-[#3a5246]">
                                                {sustainabilityScore}/100
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm text-gray-600">
                                        This score is calculated based on material composition, production methods, and environmental impact.
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