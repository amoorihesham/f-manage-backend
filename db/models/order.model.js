import { model, Schema } from 'mongoose';

const orderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'user' },
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Placed', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  payment_method: {
    type: String,
    enum: ['Cash', 'Stripe', 'Paymob'],
    required: true,
    default: 'Cash',
  },
  shipping_address: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    nearest_landmark: { type: String },
    postal_code: { type: String, required: true },
  },
  phone_number: [{ type: String, required: true }],
  is_paid: { type: Boolean, required: true, default: false },
  paid_at: { type: String },
  is_delivered: { type: Boolean, required: true, default: false },
  delivered_at: { type: String },
  deliver_by: { type: Schema.Types.ObjectId, ref: 'user' },
  is_cancelled: { type: Boolean, required: true, default: false },
  cancelled_at: { type: String },
  cancelled_by: { type: Schema.Types.ObjectId, ref: 'user' },
  sub_total: { type: Number, required: true },
  total_price: { type: Number, required: true },
});

const Order = model('order', orderSchema);

export default Order;
