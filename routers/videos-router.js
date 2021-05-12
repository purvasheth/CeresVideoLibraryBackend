const express = require("express");
const {
  getVideos,
  findVideoById,
  updateVideoNotes,
} = require("../controllers/videos-controller");
const { wrapWithTryCatch } = require("../utils");

const router = express.Router();
router.get("/", async (req, res) => {
  wrapWithTryCatch(
    res,
    () => {
      getVideos(res);
    },
    502
  );
});

router.param("videoId", async (req, res, next, videoId) => {
  wrapWithTryCatch(res, () => findVideoById({ req, res, next, videoId }), 400);
});

router
  .route("/:videoId")
  .get(async (req, res) => {
    wrapWithTryCatch(res, () => res.json(req.video));
  })
  .post(async (req, res) => {
    wrapWithTryCatch(res, () => updateVideoNotes(req, res));
  });

module.exports = router;
