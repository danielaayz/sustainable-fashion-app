import React, { useState } from 'react';
import { ArrowLeft, Upload, Plus, Minus, Save, ImageIcon } from 'lucide-react';

const AddItemPage = () => {
  const [materials, setMaterials] = useState([{ type: '', percentage: '' }]);
  const [currentImage, setCurrentImage] = useState(null);

  const addMaterial = () => {
    if (materials.length < 3) {
      setMaterials([...materials, { type: '', percentage: '' }]);
    }
  };

  const removeMaterial = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-2xl font-medium text-gray-800">Add New Item</h1>
        <p className="text-gray-600 mt-1">Add details about your new clothing item</p>
      </div>

      {/* Main Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-8">
            {/* Image Upload Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Item Image</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="flex flex-col items-center">
                  {currentImage ? (
                    <div className="relative w-full max-w-xs">
                      <img 
                        src="/api/placeholder/200/200"
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                        onClick={() => setCurrentImage(null)}
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                      <div className="text-center">
                        <button className="bg-[#3a5246] text-white px-4 py-2 rounded-md hover:bg-[#4a6256] transition-colors inline-flex items-center">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </button>
                        <p className="text-sm text-gray-500 mt-2">or drag and drop</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-800 mb-4">Item Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#3a5246] focus:ring-1 focus:ring-[#3a5246]"
                    placeholder="e.g., Cotton T-Shirt"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:border-[#3a5246] focus:ring-1 focus:ring-[#3a5246]"
                    placeholder="e.g., Sustainable Brand Co."
                  />
                </div>
              </div>
            </div>

            {/* Material Composition */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Material Composition</h2>
                {materials.length < 3 && (
                  <button
                    onClick={addMaterial}
                    className="text-[#3a5246] hover:text-[#4a6256] inline-flex items-center text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Material
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Material Type
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-[#3a5246] focus:ring-1 focus:ring-[#3a5246]"
                      >
                        <option value="">Select material...</option>
                        <option value="cotton">Cotton</option>
                        <option value="polyester">Polyester</option>
                        <option value="linen">Linen</option>
                        <option value="wool">Wool</option>
                      </select>
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="1"
                          max="100"
                          className="w-full p-2 border border-gray-300 rounded-md focus:border-[#3a5246] focus:ring-1 focus:ring-[#3a5246]"
                          placeholder="0"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                      </div>
                    </div>
                    {materials.length > 1 && (
                      <button
                        onClick={() => removeMaterial(index)}
                        className="self-end p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-[#3a5246] text-white py-3 px-4 rounded-md hover:bg-[#4a6256] transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" />
                Save Item
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-[#3a5246]/5 rounded-lg p-4">
          <h3 className="text-sm font-medium text-[#3a5246] mb-2">Tips for adding items:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check the garment's label for accurate material composition</li>
            <li>• Total material percentage should add up to 100%</li>
            <li>• Clear, well-lit photos will help you identify items easily</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;