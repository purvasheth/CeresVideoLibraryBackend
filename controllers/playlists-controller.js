const { Playlist } = require("../models/playlists-model");
const { extend } = require("lodash");

async function getPlaylists(res) {
  const playlists = await Playlist.find()
    .select("name defaultPlaylist")
    .populate("videos", "_id id name uploadedBy avatarSrc");
  res.json(playlists);
}

async function addPlaylist(req, res) {
  const playlist = req.body;
  const newPlaylist = new Playlist(playlist);
  const savedPlaylist = await newPlaylist.save();
  savedPlaylist.__v = undefined;
  res.status(201).json(savedPlaylist);
}

async function getPlaylistById(req, res, next, playlistId) {
  const playlist = await Playlist.findById(playlistId)
    .select("name")
    .populate("videos", "id name uploadedBy avatarSrc");
  if (playlist) {
    req.playlist = playlist;
    next();
  } else {
    res.status(400).json({ message: "invalid playlist id" });
  }
}

async function updatePlaylistName(req, res) {
  let { playlist } = req;
  const playlistUpdate = req.body;
  playlist = extend(playlist, playlistUpdate);
  await playlist.save();
  res.status(201).json(playlistUpdate);
}

async function deletePlaylist(req, res) {
  let { playlist } = req;
  await playlist.remove();
  res.status(204).json({});
}

async function addVideoToPlaylist(req, res) {
  const { playlist } = req;
  const { videoId } = req.params;
  await playlist.videos.push(videoId);
  await playlist.save();
  res.status(201).json(videoId);
}

async function removeVideoFromPlaylist(req, res) {
  const { playlist } = req;
  const { videoId } = req.params;
  await playlist.videos.pull(videoId);
  await playlist.save();
  res.status(204).json({});
}

module.exports = {
  getPlaylists,
  addPlaylist,
  getPlaylistById,
  updatePlaylistName,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
};
