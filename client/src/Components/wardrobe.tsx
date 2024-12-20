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
  const [showFilters, setShowFilters] = useState(true);
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
    { id: '2', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/api/placeholder/300/400' },
    { id: '3', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/api/placeholder/300/400' },
    { id: '4', name: 'Cotton T-Shirt', brand: 'EcoWear', image: '/api/placeholder/300/400' },
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-medium">Your Wardrobe</h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="space-y-6">
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
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">{item.brand}</p>
                    <button 
                      className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => console.log(`View details for item ${item.id}`)}
                    >
                      View Details
                    </button>
                  </div>
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