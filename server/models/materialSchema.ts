import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial {
    type: string;
    percentage: number;
}

export interface IItem extends Document {
    itemName: string;
    brand: string;
    imageUrl?: string;
    materials: IMaterial[];
    createdAt: Date;
    updatedAt: Date;
}

const MaterialSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Material type is required'],
        enum: ['cotton', 'wool', 'polyester', 'nylon', 'silk'],
    },
    percentage: {
        type: Number,
        required: [true, 'Material percentage is required'],
        min: [0, 'Percentage cannot be negative'],
        max: [100, 'Percentage cannot exceed 100'],
    }
});

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    materials: {
        type: [MaterialSchema],
        required: [true, 'Materials are required'],
        validate: {
            validator: function(materials: IMaterial[]) {
                const total = materials.reduce((sum, material) => sum + material.percentage, 0);
                return Math.abs(total - 100) <= 0.01;
            },
            message: 'Total material percentage must equal 100%'
        }
    }
}, {
    timestamps: true
});

export const Item = mongoose.model<IItem>('Item', ItemSchema);