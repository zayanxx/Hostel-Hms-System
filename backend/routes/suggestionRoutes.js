import express from 'express';
import {
  getAllSuggestions,
  getSuggestionById,
  createSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from '../controllers/suggestionController.js';

import { suggestionValidation } from '../validations/suggestionValidation.js';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Authenticated routes
router.use(isAuthenticated);

router.get('/', isAdmin, getAllSuggestions); // Admin only
router.get('/:id', getSuggestionById); // Admin or owner
router.post('/', suggestionValidation, createSuggestion); // User
router.put('/:id', suggestionValidation, updateSuggestion); // Admin or owner
router.delete('/:id', isAdmin, deleteSuggestion); // Admin only

export default router;