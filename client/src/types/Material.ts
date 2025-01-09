export interface Material {
   name: string;
   category: "Natural" | "Synthetic" | "Semi-Synthetic";
   sustainabilityScore: number;
   scoreDescription: string;
   properties: {
      pros: string[];
      cons: string[];
   };
   environmentalImpact: string[];
}

export interface CompositionMaterial {
   type: string;
   percentage: number;
   properties: {
      pros: string[];
      cons: string[];
   };
}

export interface MaterialResponse {
   material: Material;
}
