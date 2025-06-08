// controllers/maintenanceController.js
import Maintenance from '../models/MaintenanceRequest.js';
import Resident from '../models/Resident.js';
import Room from '../models/Room.js';

const handleError = (res, status, message, err = null) => {
  const payload = { success: false, message };
  if (err && process.env.NODE_ENV === 'development') payload.error = err.message;
  return res.status(status).json(payload);
};

// GET /api/maintenance
export const getAllMaintenance = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, residentId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (residentId) query.resident = residentId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Maintenance.countDocuments(query);

    const docs = await Maintenance.find(query)
      .populate('resident', 'name email')   // Better resident info
      .populate('room', 'number type status')
      .sort({ requestedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: docs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (err) {
    console.error('Error fetching maintenance:', err);
    handleError(res, 500, 'Failed to fetch maintenance records', err);
  }
};

// GET /api/maintenance/:id
export const getMaintenance = async (req, res) => {
  try {
    const doc = await Maintenance.findById(req.params.id)
      .populate('resident', 'name email')
      .populate('room', 'number type');

    if (!doc) return handleError(res, 404, 'Maintenance record not found');
    res.json({ success: true, data: doc });
  } catch (err) {
    console.error('Error fetching maintenance by ID:', err);
    handleError(res, 500, 'Failed to fetch maintenance', err);
  }
};

// POST /api/maintenance
export const createMaintenance = async (req, res) => {
  try {
    const { resident, room, description } = req.body;

    const foundResident = await Resident.findById(resident);
    if (!foundResident) return handleError(res, 400, 'Resident not found');

    if (room) {
      const foundRoom = await Room.findById(room);
      if (!foundRoom) return handleError(res, 400, 'Room not found');
    }

    const newRecord = await Maintenance.create({
      resident,
      room,
      description,
    });

    res.status(201).json({ success: true, data: newRecord });
  } catch (err) {
    console.error('Error creating maintenance:', err);
    handleError(res, 400, 'Failed to create maintenance record', err);
  }
};

// PUT /api/maintenance/:id
export const updateMaintenance = async (req, res) => {
  try {
    const update = { ...req.body };

    if (update.status === 'completed') {
      update.completedAt = new Date();
    } else if (update.status && update.status !== 'completed') {
      update.completedAt = null; // reset if status is changed from completed
    }

    const updated = await Maintenance.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!updated) return handleError(res, 404, 'Maintenance not found');
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Error updating maintenance:', err);
    handleError(res, 400, 'Failed to update maintenance', err);
  }
};

// DELETE /api/maintenance/:id
export const deleteMaintenance = async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deleted) return handleError(res, 404, 'Maintenance not found');
    res.json({ success: true, message: 'Maintenance record deleted' });
  } catch (err) {
    console.error('Error deleting maintenance:', err);
    handleError(res, 500, 'Failed to delete maintenance', err);
  }
};