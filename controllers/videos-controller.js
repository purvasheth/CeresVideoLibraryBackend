const { Video } = require("../models/videos-model");
const { extend } = require("lodash");

async function getVideos(res) {
  const videos = await Video.find().select(
    "id name uploadedBy avatarSrc category"
  );
  res.json(videos);
}

async function findVideoById({ req, res, next, videoId }) {
  const video = await Video.findOne({ id: videoId }).select(
    "_id id name avatarSrc uploadedBy finalNotes"
  );
  if (video) {
    req.video = video;
    next();
  } else {
    res.status(400).json({ message: "invalid video id" });
  }
}

async function updateVideoNotes(req, res) {
  let { video } = req;
  const videoUpdate = req.body;
  video = extend(video, videoUpdate);
  await video.save();
  res.status(201).json(videoUpdate);
}

module.exports = { getVideos, findVideoById, updateVideoNotes };
