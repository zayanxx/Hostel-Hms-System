// routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", isAuthenticated, getMe);

export default router;
