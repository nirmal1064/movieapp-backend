const {
  addMovieToDb,
  addMovieToWatched,
  addMovieToWatchList
} = require("../controllers/movie.controller");

const router = require("express").Router();

router.post("/add", addMovieToDb);
router.post("/watched/add", addMovieToWatched);
router.post("/watchlist/add", addMovieToWatchList);

module.exports = router;
