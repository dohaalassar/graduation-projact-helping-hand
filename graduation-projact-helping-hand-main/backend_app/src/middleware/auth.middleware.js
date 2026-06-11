const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Protect route: checks if user is logged in via JWT token
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token comes in the request header: "Authorization: Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please log in.',
      });
    }

    // Verify the token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the logged-in user to the request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    next(); // User is valid, continue to the route
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};

// Restrict route to specific roles only
// Usage: restrictTo('admin', 'psychologist')
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. This route is for: ${roles.join(', ')} only.`,
      });
    }
    next();
  };
};