import { Router, Request, Response } from 'express';
import { Item } from '../models/Item';
interface MaterialEntry {
    type: string;
    percentage: number;
}
interface CreateItemRequest extends Request {
    body: {
        itemName: string;
        brand: string;
        imageUrl?: string;
        materials: MaterialEntry[];
    }
}
const router = Router();
// POST /api/items - Create a new item
router.post('/', (req: Request, res: Response) => {
    // Type assertion here
    const { itemName, brand, imageUrl, materials } = req.body as CreateItemRequest['body'];
    try {
        // Validate total percentage
        const totalPercentage = materials.reduce((sum: number, material: MaterialEntry) => 
            sum + material.percentage, 0
        );
        if (totalPercentage !== 100) {
            return res.status(400).json({
                success: false,
                error: 'Total material percentage must equal 100%'
            });
        }
        const newItem = new Item({
            itemName,
            brand,
            imageUrl,
            materials
        });
        newItem.save()
            .then(savedItem => {
                res.status(201).json({
                    success: true,
                    data: savedItem
                });
            })
            .catch(error => {
                res.status(400).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'An error occurred'
                });
            });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
});
export default router;