require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./routes/user.router");
const movieRouter = require("./routes/movie.router");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/movie", movieRouter);

module.exports = app;
