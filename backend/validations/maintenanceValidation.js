// validations/maintenanceValidation.js
import { body, param, query, validationResult } from 'express-validator';

const validate = validations => [
  ...validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validateMaintenanceId = validate([
  param('id').isMongoId().withMessage('Valid maintenance ID required'),
]);

export const validateCreateMaintenance = validate([
  body('resident').isMongoId().withMessage('Valid resident ID required'),
  body('room').optional().isMongoId().withMessage('Invalid room ID'),
  body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 chars'),
]);

export const validateUpdateMaintenance = validate([
  param('id').isMongoId(),
  body('status').optional().isIn(['pending', 'in_progress', 'completed']),
  body('description').optional().isString(),
  body('room').optional().isMongoId(),
]);

export const validateGetAllMaintenance = validate([
  query('status').optional().isIn(['pending', 'in_progress', 'completed']),
  query('residentId').optional().isMongoId(),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1 }),
]);
