// validations/billingValidation.js
import { body, param, query, validationResult } from "express-validator";

export const validateBillingId = [
  param("id").isMongoId().withMessage("Valid billing ID is required"),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });
    next();
  },
];

export const validateGetAll = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >=1"),
  query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be >=1"),
  query("status").optional().isIn(["paid","unpaid","partial"]),
  query("residentId").optional().isMongoId(),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });
    next();
  },
];

export const validateCreate = [
  body("resident").isMongoId().withMessage("Resident ID is required"),
  body("roomFee").isFloat({ min: 0 }).withMessage("roomFee must be >=0"),
  body("utilitiesFee").optional().isFloat({ min: 0 }),
  body("additionalCharges").optional().isFloat({ min: 0 }),
  body("discount").optional().isFloat({ min: 0 }),
  body("lateFee").optional().isFloat({ min: 0 }),
  body("totalAmount").optional().isFloat({ min: 0 }),
  body("dueDate").isISO8601().toDate().withMessage("Valid dueDate is required"),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });
    next();
  },
];

export const validateUpdate = [
  ...validateBillingId,
  body("roomFee").optional().isFloat({ min: 0 }),
  body("utilitiesFee").optional().isFloat({ min: 0 }),
  body("additionalCharges").optional().isFloat({ min: 0 }),
  body("discount").optional().isFloat({ min: 0 }),
  body("lateFee").optional().isFloat({ min: 0 }),
  body("dueDate").optional().isISO8601().toDate(),
  body("paymentStatus").optional().isIn(["paid","unpaid","partial"]),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });
    next();
  },
];

export const validatePayment = [
  ...validateBillingId,
  body("amount").isFloat({ gt: 0 }).withMessage("Payment amount must be >0"),
  (req, res, next) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ success: false, errors: errs.array() });
    next();
  },
];
