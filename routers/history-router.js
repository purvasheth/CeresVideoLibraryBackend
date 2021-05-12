const express = require("express");

const { wrapWithTryCatch } = require("../utils");
const {
  getHistoryVideos,
  addOrUpdateVideo,
  findVideoById,
  deleteHistoryVideo,
} = require("../controllers/history-controller");

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    wrapWithTryCatch(res, () => getHistoryVideos(res), 502);
  })
  .post(async (req, res) => {
    wrapWithTryCatch(res, () => addOrUpdateVideo(req, res));
  });

router.param("videoId", async (req, res, next, videoId) => {
  wrapWithTryCatch(res, () => findVideoById(req, res, next, videoId), 400);
});

router.delete("/:videoId", async (req, res) => {
  wrapWithTryCatch(res, () => deleteHistoryVideo(req, res));
});

module.exports = router;
