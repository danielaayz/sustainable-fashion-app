import { Request, Response, NextFunction } from "express";
import { Material } from "../models/materialSchema.js";
import { MaterialDocument } from "../types/materialTypes.js";

interface CompositionMaterial {
   type: string;
   percentage: number;
}

export class SustainabilityController {
   /**
    * Calculates weighted sustainability score based on material composition
    * @param materials - Array of materials with their sustainability scores
    * @param composition - Array of materials with their percentages
    * @returns Calculated sustainability score
    */
   private calculateWeightedScore(
      materials: MaterialDocument[],
      composition: CompositionMaterial[]
   ): number {
      return composition.reduce((score, item) => {
         const material = materials.find(
            (m) => m.name.toLowerCase() === item.type.toLowerCase()
         );
         return (
            score +
            (material?.sustainabilityScore || 0) * (item.percentage / 100)
         );
      }, 0);
   }

   /**
    * Determines score description based on numerical score
    * @param score - Numerical sustainability score
    * @returns Description of the score
    */
   private getScoreDescription(score: number): string {
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Good";
      if (score >= 40) return "Moderate";
      return "Poor";
   }

   /**
    * Aggregates environmental impact statements from multiple materials
    * @param materials - Array of materials with their environmental impacts
    * @param composition - Array of materials with their percentages
    * @returns Combined environmental impact statements
    */
   private aggregateEnvironmentalImpact(
      materials: MaterialDocument[],
      composition: CompositionMaterial[]
   ): string[] {
      const impacts = new Set<string>();

      materials.forEach((material) => {
         material.environmentalImpact?.forEach((impact) => {
            impacts.add(impact);
         });
      });

      return Array.from(impacts);
   }

   /**
    * Calculates comprehensive sustainability analysis for a given material composition
    */
   calculateSustainability = async (
      req: Request,
      res: Response,
      next: NextFunction
   ): Promise<void> => {
      try {
         const { composition } = req.body;

         // Validate request body
         if (!composition || !Array.isArray(composition)) {
            res.status(400).json({
               message: "Invalid request format",
               error: "Request body should contain a 'composition' array",
            });
            return;
         }

         // Validate composition total equals 100%
         const totalPercentage = composition.reduce(
            (sum, item) => sum + item.percentage,
            0
         );
         if (Math.abs(totalPercentage - 100) > 0.01) {
            res.status(400).json({
               message: "Invalid composition",
               error: "Material percentages must sum to 100%",
            });
            return;
         }

         // Fetch all relevant materials
         const materialTypes = composition.map((item) => item.type);
         const materials = await Material.find({
            name: { $in: materialTypes.map((type) => new RegExp(type, "i")) },
         });

         // Check if all materials were found
         const missingMaterials = materialTypes.filter(
            (type) =>
               !materials.some(
                  (m) => m.name.toLowerCase() === type.toLowerCase()
               )
         );

         if (missingMaterials.length > 0) {
            res.status(404).json({
               message: "Some materials not found",
               error: `Missing materials: ${missingMaterials.join(", ")}`,
            });
            return;
         }

         // Calculate sustainability metrics
         const sustainabilityScore = this.calculateWeightedScore(
            materials,
            composition
         );
         const scoreDescription = this.getScoreDescription(sustainabilityScore);
         const environmentalImpact = this.aggregateEnvironmentalImpact(
            materials,
            composition
         );

         // Return comprehensive analysis
         res.json({
            message: "Sustainability analysis completed",
            analysis: {
               sustainabilityScore: parseFloat(sustainabilityScore.toFixed(2)),
               scoreDescription,
               environmentalImpact,
               composition: composition.map((item) => ({
                  ...item,
                  material: materials.find(
                     (m) => m.name.toLowerCase() === item.type.toLowerCase()
                  ),
               })),
            },
         });
      } catch (error) {
         if (error instanceof Error) {
            res.status(500).json({
               message: "Error calculating sustainability",
               error: error.message,
            });
         } else {
            res.status(500).json({
               message: "Error calculating sustainability",
               error: String(error),
            });
         }
      }
   };
}
