import mongoose from 'mongoose';
import Resident from '../models/Resident.js';
import Room from '../models/Room.js';

export const checkResidentExists = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid resident ID' });
  }

  try {
    const resident = await Resident.findById(id);
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found' });
    }

    req.resident = resident;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkRoomAvailability = async (req, res, next) => {
  const roomId = req.body.room;

  if (!roomId) return next();

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    return res.status(400).json({ message: 'Invalid room ID' });
  }

  try {
    const room = await Room.findById(roomId).populate('occupants');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: 'Room is already full' });
    }

    req.room = room;
    next();
  } catch (error) {
    next(error);
  }
};