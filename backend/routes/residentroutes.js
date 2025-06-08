import express from 'express';
import {
  getAllResidents,
  getResidentById,
  createResident,
  updateResident,
  deleteResident,
} from '../controllers/residentcontroller.js';

import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import {
  validateCreateResident,
  validateUpdateResident,
  validateResidentId,
} from '../validations/residentvalidation.js';

import {
  checkResidentExists,
  checkRoomAvailability,
} from '../middleware/residentmiddleware.js';

import handleValidationErrors from '../middleware/handleValidationErrors.js'; // Ensure this exists

const router = express.Router();

router.get('/', isAuthenticated, getAllResidents);

router.get(
  '/:id',
  isAuthenticated,
  validateResidentId,
  handleValidationErrors,
  checkResidentExists,
  getResidentById
);

router.post(
  '/',
  isAuthenticated,
  isAdmin,
  validateCreateResident,
  handleValidationErrors,
  checkRoomAvailability,
  createResident
);

router.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  validateResidentId,
  validateUpdateResident,
  handleValidationErrors,
  checkResidentExists,
  checkRoomAvailability,
  updateResident
);

router.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  validateResidentId,
  handleValidationErrors,
  checkResidentExists,
  deleteResident
);

export default router;
