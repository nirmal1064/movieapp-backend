const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({msg: "Please enter all the fields"});
    }
    if (password.length < 6) {
        return res.status(400).json({msg: "Password should be atleast 6 characters"});
    }
    try {
        const existingUser = await User.findOne({username: username.toString().trim()});
        if (existingUser) {
            return res.status(409).json({msg: "Existing User. Please login"});
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = new User({
            username,
            password : hashedPassword
        });
        const user = await newUser.save();
        console.log("User created successfully");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: 86400
        });
        res.status(201).json({
            id: user._id,
            username: user.username,
            auth: true,
            token: token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.message});
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({msg: "Please enter all the fields"});
    }
    try {
        const user = await User.findOne({ username: username.toString().trim() });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: 86400
            });
            res.status(200).json({
                id: user._id,
                username: user.username,
                auth: true,
                token: token
            });
        } else {
            res.status(400).json({msg: "Username or Password wrong"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: err.message});
    }
}

const home = (req, res) => {
    res.status(200).json({msg: "Welcome Home"});
}

module.exports = { register, login, home }
