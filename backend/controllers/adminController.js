import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Room from "../models/Room.js";
import Resident from "../models/Resident.js";
import Invoice from "../models/Invoice.js";
import { sendEmail } from "../utils/emailHelper.js";
import { ADMIN_ROLES } from "../utils/constants.js";

// Helper: standard error response
const handleErrorResponse = (res, status, message, error = null) => {
  const response = { success: false, message };
  if (error && process.env.NODE_ENV === "development") {
    response.error = error.message;
  }
  return res.status(status).json(response);
};

// GET all admins (paginated)
export const getAllAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Admin.countDocuments();

    const admins = await Admin.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      data: admins,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      },
    });
  } catch (err) {
    handleErrorResponse(res, 500, "Failed to fetch admins", err);
  }
};

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });

    if (!user) return handleErrorResponse(res, 401, "Invalid credentials");

    // Check if user is admin
    const admin = await Admin.findOne({ user: user._id }).populate("user");
    if (!admin)
      return handleErrorResponse(res, 403, "Admin access not granted");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return handleErrorResponse(res, 401, "Invalid credentials");

    // Generate tokens
    const token = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d" }
    );

    // Set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const adminData = {
      _id: admin._id,
      name: user.name,
      email: user.email,
      role: admin.role,
      designation: admin.designation,
      department: admin.department,
      permissions: ADMIN_ROLES[admin.role]?.permissions || [],
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: adminData,
    });
  } catch (error) {
    handleErrorResponse(res, 500, "Login failed", error);
  }
};

// CREATE Admin
export const createAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { userId, designation, role, department } = req.body;
    const requestingAdmin = req.user;

    if (
      !ADMIN_ROLES[requestingAdmin.role]?.permissions.includes("create_admin")
    ) {
      return handleErrorResponse(res, 403, "Unauthorized to create admins");
    }

    if (!Object.keys(ADMIN_ROLES).includes(role)) {
      return handleErrorResponse(res, 400, "Invalid admin role");
    }

    const user = await User.findById(userId);
    if (!user) return handleErrorResponse(res, 404, "User not found");

    const existingAdmin = await Admin.findOne({ user: userId });
    if (existingAdmin)
      return handleErrorResponse(res, 400, "User is already an admin");

    // Create admin record
    const admin = await Admin.create({
      user: userId,
      designation,
      role,
      department,
      createdBy: requestingAdmin._id,
    });

    user.role = "admin";
    await user.save();

    // Send welcome email (non-blocking)
    sendEmail(
      user.email,
      "Admin Access Granted",
      `Hello ${user.name},\n\nYou have been granted admin access with the role of ${role}.\n\nRegards,\nHostel Management Team`,
      "admin_welcome"
    ).catch((err) => console.error("Failed to send welcome email:", err));

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: {
        _id: admin._id,
        userId: user._id,
        name: user.name,
        email: user.email,
        role: admin.role,
        designation: admin.designation,
        department: admin.department,
      },
    });
  } catch (error) {
    handleErrorResponse(res, 500, "Admin creation failed", error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      return handleErrorResponse(res, 401, "No refresh token provided");

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return handleErrorResponse(res, 401, "User not found");

    const admin = await Admin.findOne({ user: user._id });
    if (!admin) return handleErrorResponse(res, 403, "Admin access not found");

    const newToken = jwt.sign(
      { id: user._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return handleErrorResponse(res, 401, "Refresh token expired");
    }
    if (error.name === "JsonWebTokenError") {
      return handleErrorResponse(res, 401, "Invalid refresh token");
    }
    handleErrorResponse(res, 500, "Failed to refresh token", error);
  }
};

// UPDATE Admin details
export const updateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { id } = req.params;
    const { designation, role, department } = req.body;
    const requestingAdmin = req.user;

    if (
      !ADMIN_ROLES[requestingAdmin.role]?.permissions.includes("edit_admin")
    ) {
      return handleErrorResponse(res, 403, "Unauthorized to update admins");
    }

    const admin = await Admin.findById(id).populate("user");
    if (!admin) return handleErrorResponse(res, 404, "Admin not found");

    // Protect superadmin role (only creator can demote)
    if (
      admin.role === "superadmin" &&
      role !== "superadmin" &&
      requestingAdmin._id.toString() !== admin.createdBy?.toString()
    ) {
      return handleErrorResponse(res, 403, "Cannot demote superadmin");
    }

    if (role && !Object.keys(ADMIN_ROLES).includes(role)) {
      return handleErrorResponse(res, 400, "Invalid admin role");
    }

    admin.designation = designation ?? admin.designation;
    admin.role = role ?? admin.role;
    admin.department = department ?? admin.department;
    await admin.save();

    sendEmail(
      admin.user.email,
      "Admin Details Updated",
      `Hello ${admin.user.name},\n\nYour admin details have been updated:\nRole: ${admin.role}\nDesignation: ${admin.designation}\nDepartment: ${admin.department}\n\nRegards,\nHostel Management Team`,
      "admin_update"
    ).catch((err) => console.error("Failed to send update email:", err));

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: {
        _id: admin._id,
        userId: admin.user._id,
        name: admin.user.name,
        email: admin.user.email,
        role: admin.role,
        designation: admin.designation,
        department: admin.department,
      },
    });
  } catch (error) {
    handleErrorResponse(res, 500, "Failed to update admin", error);
  }
};

// DELETE Admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const requestingAdmin = req.user;

    if (
      !ADMIN_ROLES[requestingAdmin.role]?.permissions.includes("delete_admin")
    ) {
      return handleErrorResponse(res, 403, "Unauthorized to delete admins");
    }

    const admin = await Admin.findById(id).populate("user");
    if (!admin) return handleErrorResponse(res, 404, "Admin not found");

    // Prevent deleting self
    if (admin.user._id.toString() === requestingAdmin._id.toString()) {
      return handleErrorResponse(res, 400, "Cannot delete yourself");
    }

    // Only superadmin can delete another superadmin
    if (admin.role === "superadmin" && requestingAdmin.role !== "superadmin") {
      return handleErrorResponse(res, 403, "Cannot delete superadmin");
    }

    // Revert user role
    const user = await User.findById(admin.user._id);
    if (user) {
      user.role = "resident";
      await user.save();
    }

    await Admin.findByIdAndDelete(id);

    sendEmail(
      admin.user.email,
      "Admin Access Revoked",
      `Hello ${admin.user.name},\n\nYour admin access has been revoked.\n\nRegards,\nHostel Management Team`,
      "admin_revoked"
    ).catch((err) => console.error("Failed to send revocation email:", err));

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    handleErrorResponse(res, 500, "Failed to delete admin", error);
  }
};

// DASHBOARD STATS (simplified example)
export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalResidents,
      totalRooms,
      totalAdmins,
      maintenanceCount, // renamed here
      invoiceCount,
      invoicesByMonthRaw,
      recentInvoices,
      residentLocations,
    ] = await Promise.all([
      Resident.countDocuments(),
      Room.countDocuments(),
      Admin.countDocuments(),
      MaintenanceRequest.countDocuments(), // use correct model
      Invoice.countDocuments(),
      Invoice.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalAmount: { $sum: "$amount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
      Invoice.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("amount status createdAt"),
      Resident.find({}, { name: 1, location: 1 }), // assuming `location: { lat, lng }`
    ]);

    const invoicesByMonth = invoicesByMonthRaw.map((entry) => ({
      month: `${entry._id.year}-${String(entry._id.month).padStart(2, "0")}`,
      count: entry.count,
      totalAmount: entry.totalAmount,
    }));

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalResidents,
          totalRooms,
          totalAdmins,
          maintenanceCount,
          invoiceCount,
        },
        invoicesByMonth,
        recentInvoices,
        residentLocations,
      },
    });
  } catch (err) {
    console.error("[DashboardStats Error]", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      ...(process.env.NODE_ENV === "development" && { error: err.message }),
    });
  }
};
