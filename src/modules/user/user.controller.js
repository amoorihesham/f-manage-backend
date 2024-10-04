import mongoose from 'mongoose';
import User from '../../../db/models/user.model.js';
import dbConnect from '../../../db/connection.js';
import generateUserToken from '../../utils/generateUserToken.js';
import hashPassword from '../../utils/hashPassword.js';
import verifyPassword from '../../utils/verifyPassword.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';

export const register = async (req, res) => {
  const reqData = req.body;
  try {
    await dbConnect();
    const isEmailExist = await User.findOne({ email: reqData.email });
    if (isEmailExist)
      return res.status(404).json({ success: false, message: 'Email already exists', data: {} });

    const { _id, name, email, phone, role, activated, createdAt } = await User.create({
      ...reqData,
      password: await hashPassword(reqData.password),
    });

    const token = generateUserToken({ name, email, phone, role, activated, createdAt });

    res
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json({
        success: true,
        data: { _id, name, email, phone, role, activated, createdAt, token },
        message: 'User Created successfully',
      });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await dbConnect();
    const isUserExist = await User.findOne({ email }).lean();
    if (!isUserExist)
      return res
        .status(404)
        .json({ success: false, message: 'No users with this email Address', data: {} });

    const isPasswordMatch = await verifyPassword(password, isUserExist.password);
    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: 'Incorrect Credentials',
        data: {},
      });

    const token = generateUserToken(isUserExist);
    return res
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: 'Logged in successfully',
        data: { ...isUserExist, token },
      });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const deleteAccount = async (req, res, next) => {
  const { email } = req.body;
  try {
    await dbConnect();
    const isUserExist = await User.findOneAndDelete({ email: email });
    return res
      .status(200)
      .json({ success: true, message: 'Account deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
