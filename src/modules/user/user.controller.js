import User from '../../../db/models/user.model.js'
import dbConnection from '../../../db/connection.js'
import generateUserToken from '../../utils/generateUserToken.js'
import mongoose from 'mongoose'

export const register = async (req, res) => {
  const reqBody = req.body
  try {
    await dbConnection()
    const isEmailExist = await User.findOne({ email: reqBody.email })
    if (isEmailExist)
      return res
        .status(404)
        .json({ success: false, message: 'Email already exists', data: {} })

    const createdUser = await User.create(reqBody)
    const token = generateUserToken({ ...createdUser._doc })

    return res
      .status(201)
      .json({
        success: true,
        data: { ...createdUser._doc, token },
        message: 'User Created successfully',
      })
      .cookie('token', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      })
  } catch (error) {
    console.log(error)
  } finally {
    await mongoose.disconnect()
  }
}
