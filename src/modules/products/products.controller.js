import mongoose from 'mongoose';
import dbConnect from '../../../db/connection.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Product from '../../../db/models/product.model.js';

export const getAll = async (req, res) => {
  try {
    await dbConnect();
    const products = await Product.find().populate('category', 'title _id').populate('subCategory', 'title _id');
    return res.status(200).json({ success: true, message: 'Get all products list', data: products });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();
    const product = await Product.findOne({ _id: id }).populate('category', 'title _id').populate('subCategory', 'title _id');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found', data: {} });

    return res.status(200).json({ success: true, message: 'Get product details', data: product });
  } catch (error) {
    return serverErrorResponse(res.error);
  }
};

export const addProduct = async (req, res) => {
  const newProduct = req.body;
  const { path: image } = req.file;
  try {
    await dbConnect();
    const createdProduct = await Product.create({ ...newProduct, image });
    return res.status(201).json({ success: true, message: 'Product added successfully', data: createdProduct });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
export const updateProduct = async (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  const _id = req.params.id;

  try {
    await dbConnect();
    const updatedProduct = await Product.findByIdAndUpdate(_id, { ...newProduct }, { new: true });
    if (updatedProduct) return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });

    return res.status(404).json({ success: false, message: 'Product not found', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
export const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const isDeleted = await Product.findByIdAndDelete(_id);
    if (isDeleted) return res.status(200).json({ success: true, message: 'Product Deleted successfully', data: {} });

    return res.status(404).json({ success: false, message: 'Product not found', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
