import mongoose from 'mongoose';
import dbConnect from '../../../db/connection.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Category from '../../../db/models/category.model.js';
import SubCategory from '../../../db/models/subCategory.model.js';

export const getCategories = async (req, res) => {
  try {
    await dbConnect();
    const categories = await Category.find().populate('subCategories');
    return res
      .status(200)
      .json({ success: true, message: 'Categories list retrieved', data: categories });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const getSingleCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const category = await Category.findById(_id).populate('subCategories');
    if (!category)
      return res.status(404).json({ success: false, message: 'Category not found', data: {} });
    return res.status(200).json({ success: true, message: 'Category details', data: category });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const addCategory = async (req, res) => {
  const { title } = req.body;
  const { path: image } = req.file;

  try {
    await dbConnect();
    const createCategory = await Category.create({ title, image });

    return res
      .status(201)
      .json({ success: true, message: 'Category added successfully', data: createCategory });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const updateCategory = async (req, res) => {
  const newCategory = req.body;
  console.log(newCategory);
  const _id = req.params.id;
  try {
    await dbConnect();
    const isCategoryExist = await Category.findByIdAndUpdate(_id, newCategory, { new: true });
    if (!isCategoryExist)
      return res.status(404).json({ success: false, message: 'Category not found', data: {} });
    return res
      .status(200)
      .json({ success: true, message: 'Category updated successfully', data: isCategoryExist });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const deleteCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    await SubCategory.deleteMany({ category: _id });
    const isCategoryExist = await Category.findByIdAndDelete(_id);
    if (!isCategoryExist)
      return res.status(404).json({ success: false, message: 'Category not found', data: {} });
    return res
      .status(200)
      .json({ success: true, message: 'Category deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
