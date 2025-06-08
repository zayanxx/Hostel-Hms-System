// models/Maintenance.js
import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  requestedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
}, { timestamps: true });

export default mongoose.model('Maintenance', maintenanceSchema);
