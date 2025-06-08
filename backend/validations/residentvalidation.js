import { body, param } from 'express-validator';

export const validateCreateResident = [
  body('user').isMongoId().withMessage('User ID is required and must be valid'),
  body('contactNumber')
    .notEmpty().withMessage('Contact number is required')
    .matches(/^\d{10,15}$/).withMessage('Phone must be 10-15 digits'),

  body('emergencyContact').optional().isObject().withMessage('Emergency contact must be an object'),
  body('emergencyContact.name').optional().isString().withMessage('Emergency contact name must be a string'),
  body('emergencyContact.phone')
    .optional()
    .matches(/^\d{10,15}$/).withMessage('Emergency contact phone must be valid'),

  body('room').optional().isMongoId().withMessage('Room ID must be valid'),
];

export const validateUpdateResident = [
  body('user').optional().isMongoId().withMessage('User ID must be valid'),
  body('contactNumber').optional().matches(/^\d{10,15}$/).withMessage('Phone must be 10-15 digits'),

  body('emergencyContact').optional().isObject().withMessage('Emergency contact must be an object'),
  body('emergencyContact.name').optional().isString().withMessage('Emergency contact name must be a string'),
  body('emergencyContact.phone')
    .optional()
    .matches(/^\d{10,15}$/).withMessage('Emergency contact phone must be valid'),

  body('room').optional().isMongoId().withMessage('Room ID must be valid'),
];

export const validateResidentId = [
  param('id').isMongoId().withMessage('Invalid resident ID'),
];