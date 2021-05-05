const { HistoryVideo } = require("../models/history-video-model");
const { extend } = require("lodash");

async function getHistoryVideos(res) {
  const videos = await HistoryVideo.find().populate(
    "video",
    "id name uploadedBy avatarSrc category"
  );
  const normalizedVideos = videos.map(
    ({ _id, video: { id, avatarSrc, uploadedBy, name }, timestamp }) => ({
      id,
      avatarSrc,
      uploadedBy,
      name,
      _id,
      timestamp,
    })
  );
  res.json(normalizedVideos);
}

async function addOrUpdateVideo(req, res) {
  const { id } = req.body;
  let historyVideo = await HistoryVideo.findOne({ video: id });
  let savedVideo;
  if (historyVideo) {
    historyVideo = extend(historyVideo, { timestamp: new Date() });
    savedVideo = await historyVideo.save();
    savedVideo.updated = true;
  } else {
    const newVideo = new HistoryVideo({
      video: id,
      timestamp: new Date(),
      updated: false,
    });
    savedVideo = await newVideo.save();
  }
  savedVideo.__v = undefined;
  res.status(201).json(savedVideo);
}

async function findVideoById(req, res, next, videoId) {
  const historyVideo = await HistoryVideo.findOne({ _id: videoId });
  if (historyVideo) {
    req.historyVideo = historyVideo;
    next();
  } else {
    res.status(400).json({ message: "invalid video id" });
  }
}

async function deleteHistoryVideo(req, res) {
  let { historyVideo } = req;
  await historyVideo.remove();
  res.status(204).json({});
}

module.exports = {
  getHistoryVideos,
  addOrUpdateVideo,
  findVideoById,
  deleteHistoryVideo,
};
