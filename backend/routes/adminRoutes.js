// routes/adminRoutes.js
import express from 'express';
import {
  getAllAdmins,
  adminLogin,
  createAdmin,
  refreshToken,
  updateAdmin,
  deleteAdmin,
  getDashboardStats,
} from '../controllers/adminController.js';

import { authenticateAdmin, authorizeAdmin } from '../middleware/adminMiddleware.js';
import {
  adminLoginValidation,
  createAdminValidation,
  updateAdminValidation,
  deleteAdminValidation,
  getAllAdminsValidation,
} from '../validations/adminValidation.js';

import { validationResult } from 'express-validator';
import { isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

// Public route: admin login
router.post('/login', adminLoginValidation, validate, adminLogin);

// Authenticated routes below
router.use(authenticateAdmin);

// Admin list with pagination & filtering
router.get('/', getAllAdminsValidation, validate, authorizeAdmin('view_dashboard'), getAllAdmins);

// Create new admin
router.post('/', createAdminValidation, validate, authorizeAdmin('create_admin'), createAdmin);

// Refresh token
router.post('/refresh-token', refreshToken);

// Update admin by ID
router.put('/:id', updateAdminValidation, validate, authorizeAdmin('edit_admin'), updateAdmin);

// Delete admin by ID
router.delete('/:id', deleteAdminValidation, validate, authorizeAdmin('delete_admin'), deleteAdmin);

// Dashboard stats endpoint
router.get('/dashboard/stats', isAdmin, getDashboardStats);

export default router;