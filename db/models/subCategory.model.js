import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
  },
  { timestamps: true }
);

const SubCategory = model('subCategory', subCategorySchema);

export default SubCategory;
