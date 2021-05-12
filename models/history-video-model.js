const mongoose = require("mongoose");

const historyVideoSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
  timestamp: Date,
  updated: Boolean,
});
const HistoryVideo = mongoose.model("HistoryVideo", historyVideoSchema);

module.exports = { HistoryVideo };
