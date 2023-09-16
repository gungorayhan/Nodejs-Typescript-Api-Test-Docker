import mongoose from "mongoose"
import { customAlphabet } from "nanoid"
import { UserDocument } from "./user.model"

const nanoid = customAlphabet('abcdefghijklmnoprstuvyz123456789', 10);

export interface ProductInput {
    user: UserDocument["_id"];
    title: string;
    description: string;
    price: number;
    image: string;
  }

export interface ProductDocument extends ProductInput,mongoose.Document {
    createdAt: Date
    updatedAt: Date
}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        require: true,
        unique: true,
        default: () => `product_${nanoid}`
    },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    title:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:Number,require:true},
    image:{type:String,require:true}
    },
    {
        timestamps: true
})

const ProductModel = mongoose.model<ProductDocument>("Product",productSchema)

export default ProductModel
