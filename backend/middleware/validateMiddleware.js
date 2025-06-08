// middleware/validateMiddleware.js

// Generic request body validation middleware using Joi schema
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};

export const validatePaymentInput = (req, res, next) => {
  const { invoice, amount, method } = req.body;
  const validMethods = ['cash', 'card', 'bank_transfer'];

  if (!invoice) return res.status(400).json({ message: 'Invoice is required' });
  if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: 'Amount must be a positive number' });
  if (!validMethods.includes(method)) return res.status(400).json({ message: `Method must be one of ${validMethods.join(', ')}` });

  next();
};