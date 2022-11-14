import mongoose from "mongoose"
import { UserType } from "@models/users.model"

export interface ProductType extends mongoose.Document {
    user: UserType["_id"]
    title: string
    description: string
    price: number
    image: string
    createdAt: Date
    updatedAt: Date
}

const ProductSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
            unique: true,
            default: () =>
                `product_${String(Math.floor(Math.random() * 1000))}`,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<ProductType>("ProductModel", ProductSchema)
