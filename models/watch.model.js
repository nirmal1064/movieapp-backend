const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createSchema = (collectionName) => {
  return new Schema(
    {
      userId: {
        type: String,
        ref: "User"
      },
      movies: [
        {
          type: String,
          ref: "Movie"
        }
      ]
    },
    { collection: collectionName, timestamps: true }
  );
};

const watched = mongoose.model("watched", createSchema("watched"));
const watchList = mongoose.model("watchlist", createSchema("watchlist"));

module.exports = { watched, watchList };
