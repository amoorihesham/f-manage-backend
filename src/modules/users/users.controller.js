import dbConnect from '../../../db/connection.js';
import User from '../../../db/models/user.model.js';
import checkEmailAvailability from '../../utils/checkEmailAvailability.js';
import hashPassword from '../../utils/hashPassword.js';
import serverErrorResponse from '../../utils/serverErrorResponse.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, message: 'All user returned successfully', data: users });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const getUserDetails = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id, '_id name role email activated phone createdAt');
    if (!user) return res.status(404).json({ success: false, message: 'Not found a user match this id', data: {} });
    return res.status(200).json({ success: true, message: 'User returned successfully', data: user });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const createUser = async (req, res, next) => {
  const { name, email, password, phone, role, activated } = req.body;
  try {
    if (await checkEmailAvailability(email)) return res.status(404).json({ success: false, message: 'Email already exists', data: {} });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      activated,
    });
    const outputUser = await User.findById(user._id).select('-password').lean();
    return res.status(201).json({ success: true, message: 'User created successfully', data: outputUser });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const updateUser = async (req, res, next) => {
  const { _id } = req.params;
  let { name, email, password, phone, role, activated } = req.body;
  try {
    if (email) {
      if (await checkEmailAvailability(email)) {
        let hashedPassword;
        if (password) hashedPassword = await hashPassword(password);

        const user = await User.findByIdAndUpdate(_id, {
          name,
          email,
          phone,
          password: hashedPassword,
          role,
          activated,
        });
        const outputUser = await User.findById(user._id).select('-password').lean();
        return res.status(200).json({ success: true, message: 'User updated successfully', data: outputUser });
      }
    }
    return res.status(404).json({ success: false, message: 'Email Not exists', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
export const deleteUser = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found a user match this id', data: {} });
    return res.status(200).json({ success: true, message: 'User deleted successfully', data: {} });
  } catch (error) {
    return serverErrorResponse(res, error);
  }
};
