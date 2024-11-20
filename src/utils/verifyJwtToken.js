import jwt from 'jsonwebtoken';

export default function verifyJwtToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // if (error.name == 'JsonWebTokenError') return `${error.name} || ${error.message}`;
    // if (error.name == 'TokenExpiredError') return `${error.name} || ${error.message}`;

    return false;
  }
}
