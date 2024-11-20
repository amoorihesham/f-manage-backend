import User from '../../db/models/user.model.js';
export default async function checkEmailAvailability(email) {
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) return true;

  return false;
}
