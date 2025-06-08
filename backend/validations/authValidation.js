// validations/authValidation.js
import { check, validationResult } from "express-validator";

const sendValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

export const validateRegister = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("A valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("role")
    .isIn(["resident", "admin", "manager"])
    .withMessage("Role must be resident, admin, or manager"),
  sendValidationErrors,
];

export const validateLogin = [
  check("email").isEmail().withMessage("A valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  sendValidationErrors,
];
