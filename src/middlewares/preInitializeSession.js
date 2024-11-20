import config from '../libs/configuration.js';
import validateJwt from '../utils/verifyJwtToken.js';

export default function preInitializeSession(req, res, next) {
  const refreshToken = req?.cookies?.token;

  if (!refreshToken) return res.status(403).json({ message: 'Unauthenticated' });
  const decoded = validateJwt(refreshToken);

  if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
  req.userData = decoded;
  next();
}
