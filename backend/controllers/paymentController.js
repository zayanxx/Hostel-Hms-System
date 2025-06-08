import Payment from '../models/payment.js';

// Async handler utility (wraps async functions)
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find().populate('invoice');
  res.json(payments);
});

export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate('invoice');

  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.json(payment);
});

export const createPayment = asyncHandler(async (req, res) => {
  const { invoice, amount, method, paidAt } = req.body;

  const payment = new Payment({
    invoice,
    amount,
    method,
    paidAt: paidAt || Date.now(),
  });

  const createdPayment = await payment.save();
  res.status(201).json(createdPayment);
});

export const updatePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  const { invoice, amount, method, paidAt } = req.body;

  if (invoice) payment.invoice = invoice;
  if (amount) payment.amount = amount;
  if (method) payment.method = method;
  if (paidAt) payment.paidAt = paidAt;

  const updatedPayment = await payment.save();
  res.json(updatedPayment);
});

export const deletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  await payment.remove();
  res.json({ message: 'Payment removed successfully' });
});