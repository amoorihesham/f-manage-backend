import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    return db
  } catch (error) {
    return error
  }
}

export default dbConnect
