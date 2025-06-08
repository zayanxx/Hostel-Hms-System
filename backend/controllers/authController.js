import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/User.js";
import Resident from "../models/Resident.js";
import Admin from "../models/Admin.js";
import Room from "../models/Room.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const register = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      name,
      email,
      password,
      role,
      room,
      contactNumber,
      emergencyContact,
      designation,
      department,
    } = req.body;

    if (!name || !email || !password || !role) {
      throw new Error(
        "Missing required fields: name, email, password, and role"
      );
    }

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [createdUser] = await User.create(
      [{ name, email, password: hashedPassword, role }],
      { session }
    );

    if (role === "resident") {
      if (!room || !contactNumber) {
        throw new Error("Room and contact number are required for residents");
      }

      const roomDoc = await Room.findOne({ number: room }).session(session);
      if (!roomDoc) throw new Error(`Room with number "${room}" not found`);

      await Resident.create(
        [
          {
            user: createdUser._id,
            room: roomDoc._id,
            contactNumber,
            emergencyContact,
          },
        ],
        { session }
      );

      roomDoc.occupants.push(createdUser._id);
      if (roomDoc.occupants.length >= roomDoc.capacity) {
        roomDoc.occupied = true;
      }
      await roomDoc.save({ session });
    } else if (role === "admin" || role === "manager") {
      if (!designation || !department) {
        throw new Error(
          "Designation and department are required for admin/manager"
        );
      }

      await Admin.create(
        [
          {
            user: createdUser._id,
            role,
            designation,
            department,
          },
        ],
        { session }
      );
    } else {
      throw new Error("Invalid role specified");
    }

    await session.commitTransaction();
    session.endSession();

    sendTokenResponse(createdUser, 201, res);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Registration Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = { ...user.toObject() };

    if (user.role === "resident") {
      const resident = await Resident.findOne({ user: user._id })
        .populate("room")
        .lean();
      profile.residentDetails = resident;
    } else if (["admin", "manager"].includes(user.role)) {
      const admin = await Admin.findOne({ user: user._id }).lean();
      profile.adminDetails = admin;
    }

    res.status(200).json({ success: true, user: profile });
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
