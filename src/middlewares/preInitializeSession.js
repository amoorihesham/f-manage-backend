import validateJwt from '../utils/verifyJwtToken.js';

const preInitializeSession = (allowedRoles) => {
  return (req, res, next) => {
    const refreshToken = req?.cookies?.token;

    if (!refreshToken) return res.status(400).json({ success: false, message: 'Unauthenticated No Token Provided', data: {} });
    const decoded = validateJwt(refreshToken);
    if (!decoded) return res.status(401).json({ success: false, message: 'Unauthorized you must login to access this resource.', data: {} });
    if (!allowedRoles.includes(decoded.role) || !decoded.activated)
      return res.status(403).json({ success: false, message: 'Forbidden your role can not access this resource.', data: {} });

    req.userData = decoded;
    next();
  };
};

export default preInitializeSession;
