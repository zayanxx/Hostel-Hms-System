import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // who submitted the suggestion
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Suggestion', suggestionSchema);