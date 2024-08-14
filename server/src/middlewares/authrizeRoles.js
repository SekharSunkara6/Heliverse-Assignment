// Role-based access control middleware
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
      if (!req.user || !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access forbidden' });
      }
      next();
    };
  };

  export default authorizeRoles;