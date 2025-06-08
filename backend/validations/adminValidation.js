// validations/adminValidation.js
import { body, param, query } from 'express-validator';

export const adminLoginValidation = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password of minimum 6 characters is required'),
];

export const createAdminValidation = [
  body('userId')
    .isMongoId()
    .withMessage('Valid userId is required'),
  body('designation')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Designation must be between 2 and 50 characters'),
  body('role')
    .isString()
    .isIn(['superadmin', 'admin', 'manager'])
    .withMessage('Role must be superadmin, admin, or manager'),
  body('department')
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Department must be between 2 and 100 characters'),
];

export const updateAdminValidation = [
  param('id')
    .isMongoId()
    .withMessage('Valid admin ID is required'),
  body('designation')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Designation must be between 2 and 50 characters'),
  body('role')
    .optional()
    .isString()
    .isIn(['superadmin', 'admin', 'manager'])
    .withMessage('Role must be superadmin, admin, or manager'),
  body('department')
    .optional()
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Department must be between 2 and 100 characters'),
];

export const deleteAdminValidation = [
  param('id')
    .isMongoId()
    .withMessage('Valid admin ID is required'),
];

export const getAllAdminsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];