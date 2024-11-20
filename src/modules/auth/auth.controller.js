import mongoose from 'mongoose';
import User from '../../../db/models/user.model.js';
import dbConnect from '../../../db/connection.js';
import generateUserToken from '../../utils/generateUserToken.js';
import hashPassword from '../../utils/hashPassword.js';
import verifyPassword from '../../utils/verifyPassword.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import checkEmailAvailability from '../../utils/checkEmailAvailability.js';

export const register = async (req, res) => {
  const reqData = req.body;
  try {
    await dbConnect();

    if (await checkEmailAvailability(reqData.email)) {
      return res.status(404).json({ success: false, message: 'Email already exists', data: {} });
    }
    const { _id, name, email, phone, role, activated, createdAt } = await User.create({
      ...reqData,
      password: await hashPassword(reqData.password),
    });

    res.status(201).json({
      success: true,
      user: { _id, name, email, phone, role, activated, createdAt },
      message: 'User registered successfully',
    });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await dbConnect();
    const isUserExist = await User.findOne({ email }).lean();
    if (!isUserExist) return res.status(404).json({ success: false, message: 'No users with this email Address', user: null });

    const isPasswordMatch = await verifyPassword(password, isUserExist.password);
    if (!isPasswordMatch)
      return res.status(400).json({
        success: false,
        message: 'Incorrect Credentials',
        user: null,
      });
    const rUser = {
      _id: isUserExist._id,
      name: isUserExist.name,
      email: isUserExist.email,
      phone: isUserExist.phone,
      role: isUserExist.role,
      activated: isUserExist.activated,
      createdAt: isUserExist.createdAt,
    };
    const token = generateUserToken(rUser);

    return res
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: process.env.NODE_ENV !== 'production' ? true : false,
      })
      .status(200)
      .json({
        success: true,
        message: 'Logged in successfully',
        user: { ...rUser, token },
      });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};

export const initializeSession = async (req, res) => {
  const userData = req.userData;
  return res.status(200).json({
    success: true,
    message: 'Session initialized successfully',
    user: userData,
  });
};

export const deleteAccount = async (req, res, next) => {
  const { email } = req.body;
  try {
    await dbConnect();
    const isUserExist = await User.findOneAndDelete({ email: email });
    return res.status(200).json({ success: true, message: 'Account deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  } finally {
    await mongoose.disconnect();
  }
};
