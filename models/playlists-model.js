const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});
const Playlist = mongoose.model("Playlist", playlistSchema);

const defaultPlaylists = ["History", "Liked Videos", "Watch Later"];

async function initializePlaylistsCollection() {
  try {
    defaultPlaylists.forEach(async (name) => {
      const newPlaylist = new Playlist({ name, videos: [] });
      await newPlaylist.save();
      console.log(`playlist ${name} created`);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Playlist, initializePlaylistsCollection };
