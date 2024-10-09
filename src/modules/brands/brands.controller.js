import mongoose from 'mongoose';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import dbConnect from '../../../db/connection.js';
import Brand from '../../../db/models/brand.model.js';

export const getBrands = async (req, res) => {
  try {
    await dbConnect();
    const brands = await Brand.find();
    return res.status(200).json({ success: true, message: 'Brands list retrieved', data: brands });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};
export const getSingleBrand = async (req, res) => {
  const _id = req.params.id;
  try {
    await dbConnect();
    const brand = await Brand.findById(_id);
    if (!brand)
      return res.status(404).json({ success: false, message: 'Brand not found', data: {} });
    return res.status(200).json({ success: true, message: 'Brand retrieved', data: brand });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};
export const addBrand = async (req, res) => {
  const { title } = req.body;
  const { path: image } = req.file;
  try {
    await dbConnect();
    const newBrand = await Brand.create({ title, image });
    return res
      .status(201)
      .json({ success: true, message: 'Brand created successfully', data: newBrand });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};
export const updateBrand = async (req, res) => {
  const { title } = req.body;
  const _id = req.params.id;
  try {
    await dbConnect();
    const updatedBrand = await Brand.findByIdAndUpdate(_id, { title }, { new: true });
    if (!updatedBrand)
      return res.status(404).json({ success: false, message: 'Brand not found', data: {} });
    return res
      .status(200)
      .json({ success: true, message: 'Brand updated successfully', data: updatedBrand });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};
export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    await dbConnect();
    const isBrandExist = await Brand.findById(id);
    if (!isBrandExist)
      return res.status(404).json({ success: false, message: 'Brand not found', data: {} });
    await Brand.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Brand deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
    console.log('Database connection closed');
  }
};
