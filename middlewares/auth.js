const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, msg: "No token present" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: `Invalid Token ${err.message}` });
  }
  next();
};

module.exports = { verifyToken };
