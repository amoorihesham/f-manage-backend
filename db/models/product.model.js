import { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'sub-category', required: true },
    manufacturer: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stocked: { type: Boolean, required: true },
    stock_quantity: { type: Number, required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    has_discount: { type: Boolean, default: false },
    discount_percentage: { type: Number, default: 0 },
    discount_start_date: { type: Date, default: null },
    discount_end_date: { type: Date, default: null },
  },
  { timestamps: true }
);

const Product = model('Product', productSchema);
export default Product;
