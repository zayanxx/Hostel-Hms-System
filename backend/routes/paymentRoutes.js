import express from 'express';
import {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controllers/paymentController.js';
import { validatePaymentInput } from '../middleware/validateMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPayments)
  .post(validatePaymentInput, createPayment);

router.route('/:id')
  .get(getPaymentById)
  .put(validatePaymentInput, updatePayment)
  .delete(deletePayment);

export default router;