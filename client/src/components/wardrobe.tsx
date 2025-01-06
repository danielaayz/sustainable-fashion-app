import React, { useState } from 'react';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react';

interface Material {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

interface WardrobeItem {
  id: string;
  name: string;
  brand: string;
  image: string;
}

const WardrobePage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const materials: Material[] = [
    { id: 'cotton', name: 'Cotton' },
    { id: 'polyester', name: 'Polyester' },
    { id: 'linen', name: 'Linen' },
    { id: 'wool', name: 'Wool' },
  ];

  const brands: Brand[] = [
    { id: 'ecowear', name: 'EcoWear' },
    { id: 'sustainable', name: 'Sustainable Co.' },
    { id: 'green', name: 'Green Fashion' },
  ];

  const items: WardrobeItem[] = [
    { id: '1', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/src/assets/shirt.jpg' },
    { id: '2', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/src/assets/shirt.jpg' },
    { id: '3', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/src/assets/shirt.jpg' },
    { id: '4', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/src/assets/shirt.jpg' },
  ];

  const toggleMaterial = (materialId: string) => {
    setSelectedMaterials(prev =>
      prev.includes(materialId)
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedBrands([]);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-600 hover:text-gray-800"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium">Your Wardrobe</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative">
          {/* Search Section */}
          <div className="flex flex-col space-y-4">
            {/* Search Input and Buttons */}
            <div className="flex space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 border rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Filters Panel*/}
            {showFilters && (
              <div className="absolute right-0 w-64 bg-orange-200 border rounded-lg shadow-lg z-10 p-4">
                <div className="space-y-10">
                  {/* Materials */}
                  <div>
                    <h3 className="font-medium mb-3">Materials</h3>
                    <div className="space-y-2">
                      {materials.map(material => (
                        <label key={material.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedMaterials.includes(material.id)}
                            onChange={() => toggleMaterial(material.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{material.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <label key={brand.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.id)}
                            onChange={() => toggleBrand(brand.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>{brand.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 border hover:text-gray-800 flex items-center"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Items Grid */}
          <div className="mt-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {items.map(item => (
      <div key={item.id} className="flex flex-col items-center bg-white p-6 rounded-lg">
        <div className="w-full flex justify-center mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-64 h-64 object-contain"
          />
        </div>
        <h3 className="text-center font-medium">{item.name}</h3>
        <p className="text-center text-gray-600 mt-1">{item.brand}</p>
        <button 
          className="mt-4 w-32 bg-blue-600 text-white py-2 px-4 border rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => console.log('View details:', item.id)}
        >
          View Details
        </button>
      </div>
    ))}
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default WardrobePage;