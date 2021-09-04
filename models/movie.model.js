const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = Schema(
  {
    _id: { type: String },
    Title: { type: String },
    Year: { type: String },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Writer: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Language: { type: String },
    Country: { type: String },
    Awards: { type: String },
    Poster: { type: String },
    Ratings: { type: [Schema.Types.Mixed] },
    Metascore: { type: String },
    imdbRating: { type: String },
    imdbVotes: { type: String },
    Type: { type: String },
    DVD: { type: String },
    BoxOffice: { type: String },
    Production: { type: String },
    Website: { type: String },
    totalSeasons: { type: Number },
    Response: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
