// routes/roomRoutes.js
import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/authMiddleware.js';
import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  allocateRoom,
  getAvailableRooms,
  getMyRoom,  // <-- add this
} from '../controllers/roomcontroller.js';

const router = express.Router();

router.use(isAuthenticated);

router.get('/', getRooms);
router.get('/available', getAvailableRooms);

// New route to get current user's room
router.get('/me', getMyRoom);

router.get('/:id', getRoomById);
router.post('/', isAdmin, createRoom);
router.put('/:id', isAdmin, updateRoom);
router.delete('/:id', isAdmin, deleteRoom);
router.patch('/:id/allocate', allocateRoom);

export default router;
