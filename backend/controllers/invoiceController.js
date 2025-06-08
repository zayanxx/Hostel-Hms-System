import { validationResult } from 'express-validator';
import Invoice from '../models/Invoice.js';
import Resident from '../models/Resident.js';

// @desc Create new invoice (Admin only)
export const createInvoice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { resident: residentId, amount, dueDate } = req.body;

  try {
    const residentDoc = await Resident.findById(residentId).populate('user');
    if (!residentDoc) {
      return res.status(404).json({ success: false, message: 'Resident not found' });
    }

    const name = residentDoc.user?.name || 'Unknown';
    const email = residentDoc.user?.email || 'Unknown';

    const invoice = await Invoice.create({
      resident: residentId,
      name,
      email,
      amount,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create invoice',
      error: error.message,
    });
  }
};

// @desc Get all invoices (Admin only)
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoices',
      error: error.message,
    });
  }
};

// @desc Get invoice by ID (Admin or owner resident)
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const isOwner = req.user.resident?._id && invoice.resident.equals(req.user.resident._id);

    if (!req.user.isAdmin && !isOwner) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invoice',
      error: error.message,
    });
  }
};

// @desc Mark invoice as paid (Admin only)
export const markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.status === 'paid') {
      return res.status(400).json({ success: false, message: 'Invoice already paid' });
    }

    invoice.status = 'paid';
    await invoice.save();

    res.status(200).json({
      success: true,
      message: 'Invoice marked as paid',
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update invoice',
      error: error.message,
    });
  }
};

// @desc Get invoices for logged-in resident
export const getMyInvoices = async (req, res) => {
  try {
    if (!req.user.resident?._id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const invoices = await Invoice.find({ resident: req.user.resident._id }).sort({ dueDate: -1 });

    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch your invoices',
      error: error.message,
    });
  }
};
