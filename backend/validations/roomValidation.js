import { body, validationResult } from 'express-validator';

export const roomValidation = [
  body('number').notEmpty().withMessage('Room number is required'),
  body('type').isIn(['single', 'double', 'suite']).withMessage('Invalid room type'),
  body('pricePerMonth').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('building').notEmpty().withMessage('Building is required'),
  body('floor').isInt({ min: 0 }).withMessage('Floor must be a valid number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
      });
    }
    next();
  },
];