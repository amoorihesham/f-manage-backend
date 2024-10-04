import { Schema, model } from 'mongoose';

const bannerSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
});

const Banner = model('banner', bannerSchema);

export default Banner;
