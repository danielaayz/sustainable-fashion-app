import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Filter, X, Info } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

const WardrobePage = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        materials: [],
        brands: []
    });

    interface Material {
        type: string;
        percentage: number;
    }

    interface Item {
        id: number;
        name: string;
        brand: string;
        materials: Material[];
        image: string;
        sustainabilityNote: string;
    }

    // Sample data - in real app, this would come from props or API
    const items: Item[] = [
        {
            id: 1,
            name: "Cotton T-Shirt",
            brand: "EcoWear",
            materials: [
                { type: "Organic Cotton", percentage: 95 },
                { type: "Elastane", percentage: 5 }
            ],
            image: "https://picsum.photos/200/300",
            sustainabilityNote: "Made from organic cotton, using 88% less water and 62% less energy than conventional cotton."
        },
        {
            id: 2,
            name: "Wool Sweater",
            brand: "Sustainable Co.",
            materials: [
                { type: "Wool", percentage: 100 }
            ],
            image: "https://picsum.photos/200/300",
            sustainabilityNote: "Sourced from responsible wool standard certified farms."
        }
    ];

    // filtering code, currently visual only
    const materialOptions = ["Cotton", "Polyester", "Linen", "Wool"];
    const brandOptions = ["EcoWear", "Sustainable Co.", "Green Fashion"];

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            // Search filter
            const searchMatch = searchTerm === '' ||
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.materials.some(mat =>
                    mat.type.toLowerCase().includes(searchTerm.toLowerCase())
                );
                    // Material filter
            const materialMatch = filters.materials.length === 0 ||
                item.materials.some(mat =>
                    filters.materials.some(filter =>
                        mat.type.toLowerCase().includes(filter.toLowerCase())
                    )
                );

            // Brand filter
            const brandMatch = filters.brands.length === 0 ||
                filters.brands.includes(item.brand);

            return searchMatch && materialMatch && brandMatch;
        });
    }, [items, searchTerm, filters]);

    // const handleFilterChange = (type, value) => {
    //     setFilters(prev => {
    //         const updated = { ...prev };
    //         if (updated[type].includes(value)) {
    //             updated[type] = updated[type].filter(item => item !== value);
    //         } else {
    //             updated[type] = [...updated[type], value];
    //         }
    //         return updated;
    //     });
    // };

    // const clearFilters = () => {
    //     setFilters({ materials: [], brands: [] });
    //     setSearchTerm('');
    // };

    const MaterialInfo = ({ type, percentage }) => (
        <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-700">{type}</span>
            <span className="text-sm font-medium">{percentage}%</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button className="mr-4 text-gray-600 hover:text-gray-800">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-medium text-gray-800">Your Wardrobe</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    // onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search items..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:ring-1 focus:ring-green-800"
                                />
                            </div>
                            {/* <button
                                // onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                <Filter className="w-5 h-5" />
                                {showFilters ? 'Hide' : 'Show'} Filters
                            </button> */}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    {showFilters && (
                        <div className="w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <h2 className="font-medium text-gray-800 mb-4">Filters</h2>

                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Materials</h3>
                                    <div className="space-y-2">
                                        {materialOptions.map((material) => (
                                            <label key={material} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    // checked={filters.materials.includes(material)}
                                                    // onChange={() => handleFilterChange('materials', material)}
                                                    className="rounded border-gray-300 text-green-800 focus:ring-green-800"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{material}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Brands</h3>
                                    <div className="space-y-2">
                                        {brandOptions.map((brand) => (
                                            <label key={brand} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    // checked={filters.brands.includes(brand)}
                                                    // onChange={() => handleFilterChange('brands', brand)}
                                                    className="rounded border-gray-300 text-green-800 focus:ring-green-800"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">{brand}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {(filters.materials.length > 0 || filters.brands.length > 0 || searchTerm) && (
                                    <button
                                        // onClick={clearFilters}
                                        className="text-green-800 text-sm hover:text-green-700 flex items-center gap-1"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear all filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {filteredItems.length === 0 ? (
                            <div className="bg-white rounded-lg p-8 text-center">
                                <p className="text-gray-600">No items match your filters.</p>
                                <button
                                    // onClick={clearFilters}
                                    className="mt-4 text-green-800 hover:text-green-700"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredItems.map((item) => (
                                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                        <div className="aspect-w-3 aspect-h-4 relative group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                                            <button
                                                onClick={() => setSelectedItem(item)}
                                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-md text-sm font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.brand}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Item Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-xl font-medium text-gray-800">{selectedItem.name}</h2>
                                    <p className="text-gray-600">{selectedItem.brand}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-1/2">
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.name}
                                        className="w-full h-auto rounded-lg"
                                    />
                                </div>
                                <div className="w-1/2 space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Material Composition</h3>
                                        <div className="space-y-1">
                                            {selectedItem.materials.map((material, index) => (
                                                <MaterialInfo
                                                    key={index}
                                                    type={material.type}
                                                    percentage={material.percentage}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Sustainability Impact</h3>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="flex items-start gap-2">
                                                <Info className="w-4 h-4 text-green-800 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-gray-600">
                                                    {selectedItem.sustainabilityNote}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WardrobePage;