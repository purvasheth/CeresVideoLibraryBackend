require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/db");
const { fillVideosCollection } = require("./models/videos-model");
const { initializePlaylistsCollection } = require("./models/playlists-model");
const videoRouter = require("./routers/videos-router");
const playlistRouter = require("./routers/playlists-router");
const historyRouter = require("./routers/history-router");
const { errorHandler } = require("./middlewares/error-handler");
const { routeNotFound } = require("./middlewares/route-not-found");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();
// fillVideosCollection();
// initializePlaylistsCollection();

app.get("/", (req, res) => {
  res.send("APIs for Ceres Video Library");
});

app.use("/videos", videoRouter);
app.use("/playlists", playlistRouter);
app.use("/history", historyRouter);
app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Started server on ${port}!`);
});
