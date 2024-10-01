import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: { type: Date, default: Date.now },
  activated: Boolean,
})

const User = mongoose.model('User', userSchema)
export default User
