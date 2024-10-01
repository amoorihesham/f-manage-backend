import jwt from 'jsonwebtoken'

export default function generateUserToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}
