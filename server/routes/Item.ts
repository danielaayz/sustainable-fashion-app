import { Router, Request, Response } from 'express';
import { Item, IItem, IMaterial } from '../models/materialSchema';

interface CreateItemRequest extends Request {
    body: {
        itemName: string;
        brand: string;
        imageUrl?: string;
        materials: IMaterial[];
    }
}

const router = Router();

// GET all items
router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
});

// GET single item by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
});

// POST new item
router.post('/', async (req: CreateItemRequest, res: Response) => {
    try {
        const { itemName, brand, imageUrl, materials } = req.body;
        
        const newItem = new Item({
            itemName,
            brand,
            imageUrl,
            materials
        });

        const savedItem = await newItem.save();
        res.status(201).json({
            success: true,
            data: savedItem
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred'
        });
    }
});

export default router;