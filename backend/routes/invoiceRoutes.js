import express from 'express';
import {
  createInvoice,
  getInvoices,
  markAsPaid,
  getInvoiceById,
  getMyInvoices,
} from '../controllers/invoiceController.js';

import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { invoiceValidation } from '../validations/invoiceValidation.js';

const router = express.Router();

router.use(protect);

router.get('/', isAdmin, getInvoices);
router.get('/me', getMyInvoices); // NEW: Resident can get their own invoices
router.post('/', isAdmin, invoiceValidation, createInvoice);
router.patch('/:id/pay', isAdmin, markAsPaid);
router.get('/:id', getInvoiceById);

export default router;
