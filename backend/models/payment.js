import mongoose from 'mongoose';

const validMethods = ['cash', 'card', 'bank_transfer'];

const paymentSchema = new mongoose.Schema(
  {
    invoice: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Invoice', 
      required: [true, 'Invoice ID is required'] 
    },
    amount: { 
      type: Number, 
      required: [true, 'Amount is required'], 
      min: [0, 'Amount must be positive']
    },
    method: { 
      type: String, 
      enum: {
        values: validMethods,
        message: 'Method must be one of: cash, card, bank_transfer'
      },
      required: [true, 'Payment method is required'] 
    },
    paidAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
