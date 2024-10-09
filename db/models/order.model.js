import { model, Schema } from 'mongoose';

const orderShcema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'user' },
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  total_amount: Number,
  status: { type: String, enum: ['pending', 'processing', 'shipped'], default: 'pending' },
  payment_method: { type: String, required: true, default: 'cash-on-delivery' },
  order_number: { type: String, required: true, unique: true },
  shipping_address: { type: String, required: true },
});

const Order = model('order', orderShcema);

export default Order;
