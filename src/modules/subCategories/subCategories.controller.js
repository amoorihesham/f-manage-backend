import mongoose from 'mongoose';
import dbConnect from '../../../db/connection.js';
import SubCategory from '../../../db/models/subCategory.model.js';
import Category from '../../../db/models/category.model.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';

export const getSubCategories = async (req, res) => {
  try {
    await dbConnect();
    const subCategories = await SubCategory.find().populate('category', '_id title');

    return res
      .status(200)
      .json({ success: true, message: 'SubCategories list retrieved', data: subCategories });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const getSubCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const subCategory = await SubCategory.findById(_id).populate('category');
    if (!subCategory)
      return res.status(404).json({ success: false, message: 'Subcategory not found,data:{}' });

    return res
      .status(200)
      .json({ success: true, message: 'SubCategory details retrieved', data: subCategory });
  } catch (error) {
  } finally {
    await mongoose.disconnect();
  }
};

export const addSubCategory = async (req, res) => {
  const { title, category } = req.body;
  const { path: image } = req.file;
  try {
    await dbConnect();
    const newSubCategory = await SubCategory.create({ title, category, image });
    await Category.findByIdAndUpdate(category, {
      $push: { subCategories: newSubCategory._id },
    });
    const newFullSubCategory = await SubCategory.findById(newSubCategory._id).populate(
      'category',
      '_id title'
    );

    return res
      .status(201)
      .json({ success: true, message: 'SubCategory added successfully', data: newFullSubCategory });
  } catch (error) {
  } finally {
    await mongoose.disconnect();
  }
};

export const updateSubCategory = async (req, res) => {
  const { title } = req.body;
  const _id = req.params.id;
  try {
    await dbConnect();
    const updatedSubcategory = await SubCategory.findByIdAndUpdate(_id, { title }, { new: true });
    console.log(updatedSubcategory);
    if (!updatedSubcategory)
      return res.status(404).json({ success: false, message: 'SubCategory not found', data: {} });

    return res.status(200).json({
      success: true,
      message: 'SubCategory updated successfully',
      data: updatedSubcategory,
    });
  } catch (error) {
  } finally {
    await mongoose.disconnect();
  }
};

export const deleteSubCategory = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const deletedSubcategory = await SubCategory.findByIdAndDelete(_id);
    if (!deletedSubcategory)
      return res.status(404).json({ success: false, message: 'SubCategory not found', data: {} });

    await Category.findByIdAndUpdate(deletedSubcategory.category, {
      $pull: { subCategories: _id },
    });
    return res.status(200).json({
      success: true,
      message: 'SubCategory deleted successfully',
      data: deletedSubcategory,
    });
  } catch (error) {
  } finally {
    await mongoose.disconnect();
    console.log('db Closed');
  }
};
