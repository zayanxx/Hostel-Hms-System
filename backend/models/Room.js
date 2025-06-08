import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    building: { type: String, required: true },
    floor: { type: Number, required: true },
    type: { type: String, enum: ['single', 'double', 'suite'], default: 'single' },
    pricePerMonth: { type: Number, required: true },
    capacity: { type: Number, default: 1 },
    occupied: { type: Boolean, default: false },
    occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export default mongoose.model('Room', roomSchema);
