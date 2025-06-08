import { body } from 'express-validator';

export const invoiceValidation = [
  body('resident')
    .notEmpty().withMessage('Resident ID is required')
    .isMongoId().withMessage('Invalid resident ID'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('dueDate')
    .notEmpty().withMessage('Due date is required')
    .isISO8601().withMessage('Due date must be a valid date')
    .toDate(),
];
