const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "movie-service" }
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.File({ filename: "movie.error.log", level: "error" })
  );
  logger.add(new transports.File({ filename: "movie.combined.log" }));
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

module.exports = logger;
