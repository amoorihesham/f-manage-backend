import { Schema, model } from 'mongoose';
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    subCategory: { type: Schema.Types.ObjectId, ref: 'subCategory', required: true },
    manufacturer: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    stocked: { type: Boolean, required: true },
    stock_quantity: { type: Number, required: true },
    // discount: {
    //   type: Schema.Types.Map,
    //   of: new Schema({
    //     has_discount: { type: Boolean, required: true },
    //     discount_percentage: { type: Number, required: true },
    //     discount_start_date: { type: Date, required: true },
    //     discount_end_date: { type: Date, required: true },
    //   }),
    // },
  },
  { timestamps: true }
);

const Product = model('product', productSchema);
export default Product;
