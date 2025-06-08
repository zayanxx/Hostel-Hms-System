import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'Resident', required: true },
  name: { type: String, required: true }, // store resident's name for denormalization
  email: { type: String, required: true }, // store resident's email
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['unpaid', 'paid', 'overdue'],
    default: 'unpaid',
  },
  issuedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
