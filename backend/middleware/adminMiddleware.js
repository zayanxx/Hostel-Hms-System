// middleware/adminMiddleware.js
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';
import { ADMIN_ROLES } from '../utils/constants.js';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token: user not found' });
    }

    // Check if user is admin in Admin collection
    const admin = await Admin.findOne({ user: user._id });
    if (!admin) {
      return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    // Attach user and admin info to request
    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      adminId: admin._id,
      adminRole: admin.role,
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    return res.status(500).json({ success: false, message: 'Authentication failed', error: err.message });
  }
};

// Middleware to check required permission
export const authorizeAdmin = (requiredPermission) => (req, res, next) => {
  const adminRole = req.user.adminRole;

  if (!ADMIN_ROLES[adminRole]) {
    return res.status(403).json({ success: false, message: 'Role not recognized' });
  }

  if (!ADMIN_ROLES[adminRole].permissions.includes(requiredPermission)) {
    return res.status(403).json({ success: false, message: 'Permission denied' });
  }

  next();
};