import express from 'express';

// Initialize a new express router instance
const router = express.Router();

// Mock database (This will eventually be replaced with actual database query). 
const materialsDatabase = {
    cotton: {
        name: "Cotton",
        sustainabilityScore: 57,
        positiveProperties: ["Breathable", "Biodegradable", "Skin-friendly"],
        considerations: ["High water consumption", "Pesticide use in non-organic"],
        environmentalImpact: "Medium impact due to water usage and farming practices"
    },
    acrylic: {
        name: "Acrylic",
        sustainabilityScore: 38,
        positiveProperties: ["Durable", "Lightweight", "Quick-drying"],
        considerations: ["Non-biodegradable", "Synthetic production"],
        environmentalImpact: "High impact from synthetic materials"
    },
    modal: {
        name: "Modal",
        sustainabilityScore: 68,
        positiveProperties: ["Soft", "Biodegradable", "Less water usage"],
        considerations: ["Chemical processing"],
        environmentalImpact: "Moderate impact due to processing"
    },
    polyester: {
        name: "Polyester",
        sustainabilityScore: 57,
        positiveProperties: ["Durable", "Quick-drying"],
        considerations: ["Non-biodegradable", "Microplastic pollution"],
        environmentalImpact: "High impact from synthetic materials"
    },
    wool: {
        name: "Wool",
        sustainabilityScore: 65,
        positiveProperties: ["Biodegradable", "Renewable", "Warm"],
        considerations: ["Animal welfare concerns", "Water usage in processing"],
        environmentalImpact: "Moderate impact from animal farming"
    }
};

// API route to material sustainability data of a certain type.
router.get('/material/:type', (req, res) => {
    const { type } = req.params;
    const material = materialsDatabase[type.toLowerCase()];
    if (material) {
        res.json(material);
    } else {
        res.status(404).json({ message: "Material not found" });
    }
});

// API route to get all materials from the database
router.get('/materials', (req, res) => {
    res.json(materialsDatabase);
});


// API route to calculate sustainability score based on material composition
router.post('/calculate', (req, res) => {
    const { materials } = req.body;

// checks if no materials are provided or not, if not, responds 400 bad request.
    if (!materials || materials.length === 0) {
        return res.status(400).json({ message: "Materials are required for calculation" });
    }

    
    let totalScore = 0; //Initialize total score. 


//using forEach loop to iterate through the materials array. For each material in the array, it:
// Extracts the material's type (such as "cotton", "polyester", etc.).
// Looks up the material's data in the materialsDatabase (which contains the sustainability scores and other properties).
// Calculates the score contribution of that material based on its percentage in the composition.
    materials.forEach((material) => {
        const materialData = materialsDatabase[material.type.toLowerCase()];
        if (materialData) {
            totalScore += materialData.sustainabilityScore * (material.percentage / 100);
        }
    });
//After iterating through all the materials, the totalScore will be the sum of the individual material contributions.
// The score is then rounded to one decimal place using .toFixed(1) for better readability.
    return res.json({ sustainabilityScore: totalScore.toFixed(1) });
});


export default router;