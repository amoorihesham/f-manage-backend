import { Schema, model } from 'mongoose';

const brandSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const Brand = model('brand', brandSchema);

export default Brand;
