import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  contactNumber: { type: String, required: true },
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
  },
  checkInDate: { type: Date, default: Date.now },
  checkOutDate: { type: Date },
  status: {
    type: String,
    enum: ['checked-in', 'checked-out'],
    default: 'checked-in',
  },
}, { timestamps: true });

export default mongoose.model('Resident', residentSchema);
