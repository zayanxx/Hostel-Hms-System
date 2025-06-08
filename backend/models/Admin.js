import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  role: {
    type: String,
    enum: ['superadmin', 'admin', 'manager'],
    default: 'admin',
  },
  designation: { type: String, trim: true },
  department: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // optional: who created this admin
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
