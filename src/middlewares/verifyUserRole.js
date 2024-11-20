const verifyUserRole = (allowedRoles) => {
  return (req, res, next) => {
    const { role } = req.userInfo;
    if (!allowedRoles.includes(role))
      return res.status(403).json({
        success: false,
        message: `Un Authorized allowed roles: ${allowedRoles} `,
        data: {},
      });
    return next();
  };
};

export default verifyUserRole;
