import Suggestion from '../models/Suggestion.js';

// GET all suggestions (Admin only)
export const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().populate('user', 'name email');
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch suggestions',
      error: error.message,
    });
  }
};

// GET single suggestion by ID (Admin or Owner)
export const getSuggestionById = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id).populate('user', 'name email');

    if (!suggestion) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }

    const isOwner = suggestion.user._id.equals(req.user._id);
    if (!req.user.isAdmin && !isOwner) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving suggestion',
      error: error.message,
    });
  }
};

// CREATE new suggestion
export const createSuggestion = async (req, res) => {
  try {
    const { content } = req.body;

    const newSuggestion = await Suggestion.create({
      user: req.user._id,
      content,
    });

    res.status(201).json({
      success: true,
      message: 'Suggestion created successfully',
      data: newSuggestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create suggestion',
      error: error.message,
    });
  }
};

// UPDATE suggestion (Owner or Admin)
export const updateSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);

    if (!suggestion) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }

    const isOwner = suggestion.user._id.equals(req.user._id);
    if (!req.user.isAdmin && !isOwner) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    suggestion.content = req.body.content || suggestion.content;
    const updatedSuggestion = await suggestion.save();

    res.status(200).json({
      success: true,
      message: 'Suggestion updated successfully',
      data: updatedSuggestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update suggestion',
      error: error.message,
    });
  }
};

// DELETE suggestion (Admin only)
export const deleteSuggestion = async (req, res) => {
  try {
    const suggestion = await Suggestion.findById(req.params.id);
    if (!suggestion) {
      return res.status(404).json({ success: false, message: 'Suggestion not found' });
    }

    await suggestion.deleteOne();
    res.status(200).json({ success: true, message: 'Suggestion deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete suggestion',
      error: error.message,
    });
  }
};
