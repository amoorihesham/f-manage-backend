import verifyJwtToken from '../utils/verifyJwtToken.js';

export default function verifyUserToken(req, res, next) {
  const authToken = req?.headers?.Authorization || req?.headers?.authorization;
  if (!authToken || !authToken.startsWith('Bearer '))
    return res
      .status(402)
      .json({ success: false, message: 'Authorization token missing or invalid', data: {} });

  const token = authToken.split(' ')[1];
  const decoded = verifyJwtToken(token);
  if (!decoded)
    return res.status(403).json({ success: false, message: 'Un Authenticated', data: {} });

  return next();
}
