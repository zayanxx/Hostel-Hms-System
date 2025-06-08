import Resident from "../models/Resident.js";

// Get all residents
export const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find().populate('user room');
    res.status(200).json({ success: true, data: residents });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get resident by ID
export const getResidentById = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: req.resident });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch resident", error: error.message });
  }
};

// Create a new resident
export const createResident = async (req, res) => {
  try {
    const newResident = new Resident(req.body);
    await newResident.validate();
    const savedResident = await newResident.save();
    res.status(201).json({ success: true, data: savedResident });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create resident", error: error.message });
  }
};

// Update an existing resident
export const updateResident = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedResident = await Resident.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedResident) {
      return res.status(404).json({ success: false, message: "Resident not found" });
    }

    res.status(200).json({ success: true, data: updatedResident });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update resident", error: error.message });
  }
};

// Delete resident
export const deleteResident = async (req, res) => {
  try {
    await req.resident.deleteOne();
    res.status(200).json({ success: true, message: "Resident deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete resident", error: error.message });
  }
};