const axios = require("axios").default;
const Movie = require("../models/movie.model");
const Watched = require("../models/watch.model").watched;
const WatchList = require("../models/watch.model").watchList;

const addMovie = async (movieId) => {
  const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieId}`;
  const data = await (await axios.get(url)).data;
  if (data.Response === "False") {
    throw new Error("Movie Not found");
  }
  const movie = await Movie.create({ _id: data.imdbID, ...data });
  return movie;
};

const addMovieToWatched = async (req, res) => {
  const userId = req.body._id;
  let { movieId } = req.body;
  try {
    const user = await Watched.findOne({ userId });
    let movieFound = await Movie.findOne({ _id: movieId });
    if (!movieFound) {
      movieFound = await addMovie(movieId);
    }
    if (user) {
      // add movie to the desired collection
      if (!user.movies.includes(movieFound._id)) {
        user.movies.push(movieFound._id);
        await user.save();
        res.status(201).json(movieFound);
      } else {
        res.status(200).json({ msg: "Movie already in collection" });
      }
    } else {
      // create a watched user and add movie to the collection
      await Watched.create({ userId, movies: [movieFound._id] });
      res.status(201).json(movieFound);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const addMovieToWatchList = async (req, res) => {
  const userId = req.body._id;
  let { movieId } = req.body;
  try {
    const user = await WatchList.findOne({ userId });
    let movieFound = await Movie.findOne({ _id: movieId });
    if (!movieFound) {
      movieFound = await addMovie(movieId);
      movieId = movieFound._id;
    }
    if (user) {
      // add movie to the desired collection
      if (!user.movies.includes(movieFound._id)) {
        user.movies.push(movieFound._id);
        await user.save();
        res.status(201).json(movieFound);
      } else {
        res.status(200).json({ msg: "Movie already in collection" });
      }
    } else {
      // create a watchlist user and add movie to the collection
      await WatchList.create({ userId, movies: [movieFound._id] });
      res.status(201).json(movieFound);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const removeMovieFromWatched = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const user = await Watched.findOne({ userId });
    const movieIndex = user.movies.findIndex(movieId);
    if (movieIndex > -1) {
      user.movies.splice(movieIndex, 1);
    }
    const updateWatch = await user.save();
    res.status(201).json(updateWatch);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const removeMovieFromWatchList = async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    const user = await WatchList.findOne({ userId });
    const movieIndex = user.movies.findIndex(movieId);
    if (movieIndex > -1) {
      user.movies.splice(movieIndex, 1);
    }
    const updateWatch = await user.save();
    res.status(201).json(updateWatch);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getWatchedMovies = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Watched.findOne({ userId });
    if (user) {
      const watchedMovies = await Watched.findOne({ userId }).populate(
        "movies"
      );
      res.status(200).json(watchedMovies);
    } else {
      res.status(200).json({ movies: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ msg: error.message });
  }
};

const getWatchListMovies = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await WatchList.findOne({ userId });
    if (user) {
      const watchedMovies = await WatchList.findOne({ userId }).populate(
        "movies"
      );
      res.status(200).json(watchedMovies);
    } else {
      res.status(200).json({ movies: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(error.status).json({ msg: error.message });
  }
};

module.exports = {
  addMovieToWatched,
  addMovieToWatchList,
  removeMovieFromWatched,
  removeMovieFromWatchList,
  getWatchedMovies,
  getWatchListMovies
};
