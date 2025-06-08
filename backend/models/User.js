import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2 },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ['resident', 'admin', 'manager'],
    default: 'resident',
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
