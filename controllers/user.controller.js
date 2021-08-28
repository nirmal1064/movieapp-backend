const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({msg: "Please enter all the fields"});
    } else if (password.length < 6) {
        res.status(400).json({msg: "Password should be atleast 6 characters"});
    } else {
        User.findOne({username}, (err, user) => {
            if (err) res.status(500).send({ msg: "Some error occured" });
            else if(user) res.status(409).json({msg: "Existing User. Please login"});
            else {
                const hashedPassword = bcrypt.hashSync(password, 8);
                const newUser = new User({
                    username,
                    password : hashedPassword
                });
                newUser.save((err, user) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({msg: err.message});
                    } else {
                        jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                            expiresIn: 86400
                        }, (err, token) => {
                            if (err) res.status(500).json({msg: "Some Error occured"});
                            res.status(201).json({
                                id: user._id,
                                username: user.username,
                                auth: true,
                                token: token
                            });
                        });
                    }
                });        
            }
        });
    }
}

module.exports = { register }
