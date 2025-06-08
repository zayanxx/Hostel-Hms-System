// routes/billingRoutes.js
import express from "express";
import {
  getAllBillings,
  getBilling,
  createBilling,
  updateBilling,
  deleteBilling,
  payBilling,
} from "../controllers/BillingController.js";
// ...existing code...
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";
import {
  validateGetAll,
  validateCreate,
  validateUpdate,
  validateBillingId,
  validatePayment,
} from "../validations/billingValidation.js";

const router = express.Router();

// All routes require authentication
router.use(isAuthenticated);

// List / filter
router.get("/", validateGetAll, getAllBillings);

// Create (admins or managers)
router.post("/", isAdmin, validateCreate, createBilling);

// Single record
router.get("/:id", validateBillingId, getBilling);

// Update
router.put("/:id", isAdmin, validateUpdate, updateBilling);

// Delete
router.delete("/:id", isAdmin, validateBillingId, deleteBilling);

// Pay
router.post("/:id/pay", validatePayment, payBilling);

export default router;