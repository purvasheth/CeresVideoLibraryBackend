const mongoose = require("mongoose");
require("mongoose-type-url");
const videoData = require("./data");

const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  uploadedBy: String,
  avatarSrc: mongoose.SchemaTypes.Url,
  finalNotes: String,
});
const Video = mongoose.model("Video", videoSchema);

function fillVideosCollection() {
  try {
    videoData.forEach(async (video) => {
      const newVideo = new Video(video);
      const savedVideo = await newVideo.save();
      console.log(savedVideo);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Video, fillVideosCollection };
