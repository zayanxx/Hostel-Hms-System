// controllers/billingController.js
import mongoose from "mongoose";
import Billing from "../models/Billing.js";
import Resident from "../models/Resident.js";

// Reusable error helper
const handleError = (res, status, message, err = null) => {
  const payload = { success: false, message };
  if (err && process.env.NODE_ENV === "development") payload.error = err.message;
  return res.status(status).json(payload);
};

// GET /api/billings
export const getAllBillings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, residentId } = req.query;
    const query = {};
    if (status) query.paymentStatus = status;
    if (residentId) query.resident = residentId;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Billing.countDocuments(query);

    const docs = await Billing.find(query)
      .populate("resident", "user room status")
      .sort({ dueDate: 1 })
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
    handleError(res, 500, "Failed to fetch billings", err);
  }
};

// GET /api/billings/:id
export const getBilling = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id)
      .populate("resident", "user room status");
    if (!billing) return handleError(res, 404, "Billing record not found");
    res.json({ success: true, data: billing });
  } catch (err) {
    handleError(res, 500, "Failed to fetch billing", err);
  }
};

// POST /api/billings
export const createBilling = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      resident: residentId,
      roomFee,
      utilitiesFee = 0,
      additionalCharges = 0,
      discount = 0,
      lateFee = 0,
      totalAmount,
      dueDate,
    } = req.body;

    // Ensure resident exists
    const resident = await Resident.findById(residentId).session(session);
    if (!resident) throw new Error("Resident not found");

    // Compute total if not provided
    const computedTotal = roomFee + utilitiesFee + additionalCharges + lateFee - discount;
    const finalTotal = typeof totalAmount === "number" ? totalAmount : computedTotal;

    const billing = await Billing.create([{
      resident: residentId,
      roomFee,
      utilitiesFee,
      additionalCharges,
      discount,
      lateFee,
      totalAmount: finalTotal,
      dueDate,
    }], { session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, data: billing[0] });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    handleError(res, 400, err.message || "Billing creation failed", err);
  }
};

// PUT /api/billings/:id
export const updateBilling = async (req, res) => {
  try {
    const update = { ...req.body };

    // If any charge fields changed, recompute total
    if (["roomFee","utilitiesFee","additionalCharges","discount","lateFee"].some(f=>f in update)) {
      const existing = await Billing.findById(req.params.id);
      if (!existing) return handleError(res, 404, "Billing not found");
      const data = { ...existing.toObject(), ...update };
      update.totalAmount = data.roomFee + data.utilitiesFee + data.additionalCharges + data.lateFee - data.discount;
    }

    const billing = await Billing.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
    if (!billing) return handleError(res, 404, "Billing not found");

    res.json({ success: true, data: billing });
  } catch (err) {
    handleError(res, 400, "Failed to update billing", err);
  }
};

// DELETE /api/billings/:id
export const deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndDelete(req.params.id);
    if (!billing) return handleError(res, 404, "Billing not found");
    res.json({ success: true, message: "Billing deleted" });
  } catch (err) {
    handleError(res, 500, "Failed to delete billing", err);
  }
};

// POST /api/billings/:id/pay
export const payBilling = async (req, res) => {
  try {
    const { amount } = req.body;
    if (typeof amount !== "number" || amount <= 0) {
      return handleError(res, 400, "Valid payment amount required");
    }

    const billing = await Billing.findById(req.params.id);
    if (!billing) return handleError(res, 404, "Billing not found");

    const newPaid = (billing.paidAt ? billing.totalAmount - billing.discount : 0) + amount;
    if (newPaid >= billing.totalAmount) {
      billing.paymentStatus = "paid";
      billing.paidAt = new Date();
    } else {
      billing.paymentStatus = "partial";
    }
    await billing.save();

    res.json({ success: true, data: billing });
  } catch (err) {
    handleError(res, 400, "Payment processing failed", err);
  }
};
