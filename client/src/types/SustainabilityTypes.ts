export interface SustainabilityAnalysis {
   score: number;
   metrics: {
      carbonFootprint: number;
      waterUsage: number;
   };
}
