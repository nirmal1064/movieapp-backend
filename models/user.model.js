const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 5
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    watched: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie"
      }
    ],
    watchlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Movie"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
