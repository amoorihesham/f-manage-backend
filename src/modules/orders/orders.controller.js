import mongoose from 'mongoose';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Order from '../../../db/models/order.model.js';
import dbConnect from '../../../db/connection.js';
import checkAvailability from '../../utils/checkProductAvailability.js';

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $addFields: {
          total_items: {
            $size: '$products',
          },
        },
      },
    ]);
    if (!orders) return res.status(404).json({ success: false, message: 'No orders found yet', data: {} });

    return res.status(200).json({ success: true, message: 'Orders retrieved successfully', orders });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const getSingleOrder = async (req, res) => {
  const { _id } = req.params;
  try {
    const order = await Order.findById(_id).populate('customer').populate('products');
    if (!order) return res.status(404).json({ success: false, message: 'Order Not Found', data: {} });

    return res.status(200).json({ success: true, message: 'Order retrieved successfully', order });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const addOrder = async (req, res) => {
  const { customer, products, payment_method, shipping_address, phone_number, deliver_by } = req.body;

  console.log(req.body);
  const isAvailable = await checkAvailability(products);
  if (!isAvailable) return res.status(400).json({ success: false, message: 'Not enough stock for the requested quantity', data: {} });

  let sub_total = products.reduce((acc, product) => acc + product.quantity * product.price, 0);
  let total_price = sub_total + 50;

  let status;
  if (payment_method === 'Cash') status = 'Placed';
  try {
    const orderPlaced = await Order.create({
      customer,
      products,
      payment_method,
      sub_total,
      total_price,
      shipping_address,
      phone_number,
      status,
      deliver_by,
    });
    return res.status(201).json({ success: true, message: 'Order was successfully added', order: orderPlaced });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const cancelOrder = async (req, res) => {
  const { _id } = req.params;
  try {
    const order = await Order.findById(_id).populate('customer').populate('products');
    if (!order) return res.status(404).json({ success: false, message: 'Order Not Found', data: {} });
    order.status = 'cancelled';
    await order.save();
    return res.status(200).json({ success: true, message: 'Order cancelled successfully', order });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

export const updateOrderStatus = async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(_id).populate('customer').populate('products');
    if (!order) return res.status(404).json({ success: false, message: 'Order Not Found', data: {} });
    order.status = status;
    await order.save();
    return res.status(200).json({ success: true, message: 'Order Updated successfully', order });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const deleteOrder = async (req, res) => {
  const { _id } = req.params;
  try {
    const order = await Order.findById(_id).populate('customer').populate('products');
    if (!order) return res.status(404).json({ success: false, message: 'Order Not Found', data: {} });
    await Order.findByIdAndDelete(_id);
    return res.status(200).json({ success: true, message: 'Order deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
