// routes/maintenanceRoutes.js
import express from 'express';
import {
  getAllMaintenance,
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance
} from '../controllers/maintenanceController.js';

import {
  validateCreateMaintenance,
  validateUpdateMaintenance,
  validateMaintenanceId,
  validateGetAllMaintenance
} from '../validations/maintenanceValidation.js';

import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth required
router.use(isAuthenticated);

// List/filter
router.get('/', validateGetAllMaintenance, getAllMaintenance);

// Get one
router.get('/:id', validateMaintenanceId, getMaintenance);

// Create
router.post('/', validateCreateMaintenance, createMaintenance);

// Update
router.put('/:id', validateUpdateMaintenance, updateMaintenance);

// Delete (admin only)
router.delete('/:id', isAdmin, validateMaintenanceId, deleteMaintenance);

export default router;