import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default Product;
export type { IProduct };