// models/Billing.js
import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  roomFee: {
    type: Number,
    required: true,
    min: 0,
  },
  utilitiesFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  additionalCharges: {
    type: Number,
    default: 0,
    min: 0,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
  },
  lateFee: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid", "partial"],
    default: "unpaid",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paidAt: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.model("Billing", billingSchema);