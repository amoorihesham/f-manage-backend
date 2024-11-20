import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    image: String,
  },
  { timestamps: true }
);

const SubCategory = model('sub-category', subCategorySchema);

export default SubCategory;
