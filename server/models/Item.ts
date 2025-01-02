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

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: [true, 'Item name is required'],
        trim: true
    },
    brand: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    materials: [{
        type: {
            type: String,
            required: [true, 'Material type is required'],
            enum: ['cotton', 'wool', 'polyester', 'nylon', 'silk']
        },
        percentage: {
            type: Number,
            required: [true, 'Material percentage is required'],
            min: 0,
            max: 100
        }
    }]
}, {
    timestamps: true
});

// Add validation for total percentage
ItemSchema.pre<IItem>('save', function(next) {
    const totalPercentage = this.materials.reduce((sum: number, material: IMaterial) => {
        return sum + material.percentage;
    }, 0);
    
    if (Math.abs(totalPercentage - 100) > 0.01) {
        next(new Error('Total material percentage must equal 100%'));
    } else {
        next();
    }
});

export const Item = mongoose.model<IItem>('Item', ItemSchema);