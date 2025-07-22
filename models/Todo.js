const mongoose = require('mongoose');

// Schema definition
const TodoSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true, // ✅ Removes unnecessary spaces
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt fields
  }
);

// Exporting the model
module.exports = mongoose.model('Todo', TodoSchema);
