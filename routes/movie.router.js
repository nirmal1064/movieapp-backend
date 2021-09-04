const {
  addMovieToWatched,
  addMovieToWatchList,
  getWatchedMovies,
  getWatchListMovies,
  removeMovieFromWatched,
  removeMovieFromWatchList
} = require("../controllers/movie.controller");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/watched/add", verifyToken, addMovieToWatched);
router.post("/watchlist/add", verifyToken, addMovieToWatchList);
router.post("/watched/remove", verifyToken, removeMovieFromWatched);
router.post("/watchlist/remove", verifyToken, removeMovieFromWatchList);
router.get("/watched", verifyToken, getWatchedMovies);
router.get("/watchlist", verifyToken, getWatchListMovies);

module.exports = router;
