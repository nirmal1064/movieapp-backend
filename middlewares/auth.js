const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) return res.status(403).send({ auth: false, msg: 'No token present' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        req.userId = decoded.id;
    } catch (err) {
        console.log(err);
        res.status(401).json({msg: "Invalid Token"});
    }
    next();
}

module.exports = {verifyToken};
