// ... (existing imports)
import Room from '../models/Room.js';
import User from '../models/User.js';

// Create Room
export const createRoom = async (req, res, next) => {
  try {
    const { number, type, capacity, pricePerMonth, building, floor } = req.body;

    const exists = await Room.findOne({ number });
    if (exists) return res.status(400).json({ message: 'Room already exists' });

    const room = await Room.create({ number, type, capacity, pricePerMonth, building, floor });
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

// Get All Rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate('occupants', 'name email');
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

// Get Available Rooms
export const getAvailableRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find({ occupied: false });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

// Get Room By ID
export const getRoomById = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id).populate('occupants', 'name email');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    next(err);
  }
};

// Get current user's room
// controllers/roomController.js
// controllers/roomController.js
export const getMyRoom = async (req, res, next) => {
  try {
    const room = await Room.findOne({ occupants: req.user._id }).populate('occupants', 'name email');
    if (!room) return res.status(404).json({ message: 'No room allocated to you' });
    res.json(room);
  } catch (err) {
    next(err);
  }
};


// Update Room
export const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    next(err);
  }
};

// Delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Allocate Room
export const allocateRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Room not found' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (room.occupants.includes(user._id)) {
      return res.status(400).json({ message: 'User already allocated to this room' });
    }

    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: 'Room capacity full' });
    }

    room.occupants.push(user._id);
    room.occupied = room.occupants.length >= room.capacity;
    await room.save();

    res.json({ message: 'Room allocated successfully', room });
  } catch (err) {
    next(err);
  }
};
