const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page"
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Column", columnSchema);