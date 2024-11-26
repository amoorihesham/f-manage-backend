import mongoose from 'mongoose';
import dbConnect from '../../../db/connection.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Product from '../../../db/models/product.model.js';

export const getAll = async (req, res) => {
  const { _id, role } = req.userData;
  try {
    if (role === 'seller') {
      const products = await Product.find({ sellerId: _id }).populate('category', 'title _id').populate('subcategory', 'title _id');
      console.log(products);
      if (!products.length) return res.status(200).json({ success: true, message: 'Products list is empty you have no products.', data: products });

      return res.status(200).json({ success: true, message: 'Products List Returned Successfully', data: products });
    }
    const products = await Product.find().populate('category', 'title _id').populate('subCategory', 'title _id');
    return res.status(200).json({ success: true, message: 'Get all products list', data: products });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).populate('category', 'title _id').populate('subCategory', 'title _id');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found', data: {} });

    return res.status(200).json({ success: true, message: 'Get product details', data: product });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

export const addProduct = async (req, res) => {
  const newProduct = req.body;
  const { path: image } = req.file;
  try {
    const createdProduct = await Product.create({ ...newProduct, image });
    return res.status(201).json({ success: true, message: 'Product added successfully', data: createdProduct });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const updateProduct = async (req, res) => {
  const { title, description, category, subCategory, manufacturer, price, stocked, stock_quantity } = req.body;

  const _id = req.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, { title, description, category, subCategory, manufacturer, price, stocked, stock_quantity }, { new: true });
    if (updatedProduct) return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });

    return res.status(404).json({ success: false, message: 'Product not found', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const deleteProduct = async (req, res) => {
  const { _id: userId, role } = req.userData;
  const _id = req.params.id;
  try {
    if (role === 'seller') {
      const isDeleted = await Product.findOneAndDelete({ sellerId: userId });
      console.log(isDeleted);
      if (!isDeleted) return res.status(404).json({ success: false, message: 'The selected product not found.', data: {} });
      return res.status(200).json({ success: true, message: 'Product deleted successfully', data: {} });
    }
    const isDeleted = await Product.findByIdAndDelete(_id);
    if (isDeleted) return res.status(200).json({ success: true, message: 'Product Deleted successfully', data: {} });

    return res.status(404).json({ success: false, message: 'Product not found', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
