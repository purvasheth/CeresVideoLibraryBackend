const express = require("express");
const { wrapWithTryCatch } = require("../utils");
const {
  getPlaylists,
  addPlaylist,
  getPlaylistById,
  updatePlaylistName,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} = require("../controllers/playlists-controller");

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    wrapWithTryCatch(
      res,
      () => {
        getPlaylists(res);
      },
      502
    );
  })
  .post(async (req, res) => {
    wrapWithTryCatch(res, () => addPlaylist(req, res));
  });

router.param("playlistId", async (req, res, next, playlistId) => {
  wrapWithTryCatch(res, () => getPlaylistById(req, res, next, playlistId));
});

router
  .route("/:playlistId")
  .post(async (req, res) => {
    wrapWithTryCatch(res, () => updatePlaylistName(req, res));
  })
  .delete(async (req, res) => {
    wrapWithTryCatch(res, () => deletePlaylist(req, res));
  });

router
  .route("/:playlistId/:videoId")
  .post(async (req, res) => {
    wrapWithTryCatch(res, () => addVideoToPlaylist(req, res));
  })
  .delete(async (req, res) => {
    wrapWithTryCatch(res, () => removeVideoFromPlaylist(req, res));
  });

module.exports = router;
