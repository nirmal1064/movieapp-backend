const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/home", verifyToken, userController.home);

module.exports = router;