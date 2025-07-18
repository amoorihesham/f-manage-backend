import mongoose from 'mongoose';
import User from '../../../db/models/user.model.js';
import dbConnect from '../../../db/connection.js';
import generateUserToken from '../../utils/generateUserToken.js';
import hashPassword from '../../utils/hashPassword.js';
import verifyPassword from '../../utils/verifyPassword.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';
import checkEmailAvailability from '../../utils/checkEmailAvailability.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  const reqData = req.body;
  try {
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
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email }).lean();

    if (!isUserExist) return res.status(404).json({ success: false, message: 'No users with this email Address', user: null });

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

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

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: rUser,
    });
  } catch (error) {
    return serverErrorResponse(res, error);
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
    const isUserExist = await User.findOneAndDelete({ email: email });
    return res.status(200).json({ success: true, message: 'Account deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.clearCookie('token').status(200).json({ success: true, message: 'Logout successfully' });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
