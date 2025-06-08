import { body, validationResult } from 'express-validator';

export const suggestionValidation = [
  body('content')
    .notEmpty().withMessage('Content is required')
    .isLength({ min: 3, max: 1000 }).withMessage('Content must be between 3 and 1000 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(err => ({ field: err.param, message: err.msg })),
      });
    }
    next();
  }
];