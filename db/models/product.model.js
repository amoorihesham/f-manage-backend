import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    manufacturer: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity_in_stock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('product', productSchema);
export default Product;
