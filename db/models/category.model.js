import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    image: String,
    subCategories: [{ type: Schema.Types.ObjectId, ref: 'subCategory' }],
  },
  { timestamps: true }
);

const Category = model('category', categorySchema);

export default Category;
