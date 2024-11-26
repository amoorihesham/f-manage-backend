import dbConnect from '../../../db/connection.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import Banner from '../../../db/models/banner.model.js';

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({ success: true, message: 'Banners list retrieved', data: banners });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const getSingleBanner = async (req, res) => {
  const _id = req.params.id;
  try {
    const banner = await Banner.findById(_id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    return res.status(200).json({ success: true, message: 'Banner retrieved', data: banner });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const addBanner = async (req, res) => {
  const { title } = req.body;
  const { path: image } = req.file;
  try {
    const createdBanner = await Banner.create({ title, image });
    return res.status(201).json({
      success: true,
      message: 'Banner added successfully',
      data: createdBanner,
    });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const deleteBanner = async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedBanner = await Banner.findByIdAndDelete(_id);
    if (!deletedBanner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    return res.status(200).json({ success: true, message: 'Banner deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
