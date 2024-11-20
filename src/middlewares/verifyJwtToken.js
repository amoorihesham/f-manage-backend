import validateJwt from '../utils/verifyJwtToken.js';

export default function verifyJwtToken(req, res, next) {
  const authToken = req?.cookies?.token;
  if (!authToken) return res.status(403).json({ success: false, message: 'Authorization token missing or invalid', data: {} });
  const decoded = validateJwt(authToken);
  if (!decoded)
    return res.status(403).json({
      success: false,
      message: 'Un authenticated token may be expired login again',
      data: {},
    });

  req.userInfo = decoded;

  return next();
}
