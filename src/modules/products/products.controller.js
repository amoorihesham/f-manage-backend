import mongoose from 'mongoose';
import dbConnect from '../../../db/connection.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Products from '../../../db/models/product.model.js';

export const getAll = async (req, res) => {
  try {
    await dbConnect();
    const products = await Products.find();
    return res
      .status(200)
      .json({ success: true, message: 'Get all products list', data: products });
  } catch (error) {
    return serverErrorResponse(res.error);
  }
};
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();
    const product = await Products.findOne({ _id: id });
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found', data: {} });

    return res.status(200).json({ success: true, message: 'Get product details', data: product });
  } catch (error) {
    return serverErrorResponse(res.error);
  }
};

export const addProduct = async (req, res) => {
  const newProduct = req.body;
  try {
    await dbConnect();
    const createProduct = await Products.create(newProduct);
    return res
      .status(201)
      .json({ success: true, message: 'Product added successfully', data: createProduct });
  } catch (error) {
    return serverErrorResponse(res.error);
  } finally {
    await mongoose.disconnect();
  }
};
export const updateProduct = async (req, res) => {
  const newProduct = req.body;
  const _id = req.params.id;
  try {
    await dbConnect();
    const updatedProduct = await Products.findByIdAndUpdate(_id, newProduct);
    if (updatedProduct)
      return res
        .status(200)
        .json({ success: true, message: 'Product updated successfully', data: updatedProduct });

    return res.status(404).json({ success: false, message: 'Product not foun', data: {} });
  } catch (error) {
    return serverErrorResponse(res.error);
  } finally {
    await mongoose.disconnect();
  }
};
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const isDeleted = await Products.findByIdAndDelete(_id);

    if (isDeleted)
      return res
        .status(200)
        .json({ success: true, message: 'Product Deleted successfully', data: {} });

    return res.status(404).json({ success: false, message: 'Product not found', data: {} });
  } catch (error) {
    return serverErrorResponse(res.error);
  } finally {
    await mongoose.disconnect();
  }
};
