const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserController {
    getAllUsers = (req, res) => {
        User.find()
            .then((allUsers) => {
                res.json({ results: allUsers });
            })
            .catch((err) =>
                res.json({ message: "Something went wrong", error: err })
            );
    };
    register = (req, res) => {
        User.find({ email: req.body.email }).then((dupeEmail) => {
            if (dupeEmail.length === 0) {
                User.create(req.body)
                    .then((user) => {
                        const userToken = jwt.sign(
                            {
                                id: user._id,
                            },
                            process.env.SECRET_KEY
                        );
                        res.cookie(
                            "usertoken",
                            userToken,
                            proess.env.SECRET_KEY,
                            {
                                httpOnly: true,
                            }
                        ).json({ msg: "success!", user: user });
                    })
                    .catch((err) => res.json(err));
            } else {
                res.json({errors: {email:{message:"Email is taken!"}}})
            }
        });
    };
    login = async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user === null) {
            return res.json({error: "User not found."});
        }
        const correctPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!correctPassword) {
            return res.json({error: "Password is incorrect."})
        }
        const userToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY
        );
        res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true,
        }).json({ msg: "success!" });
    };
    getLoggedInUser = (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        User.findOne({_id: decodedJWT.payload.id })
            .then(foundUser=>{
                res.json({results: foundUser})
            })
            .catch(err=>{
                res.json(err)
            })
    }
    logout = (req, res) => {
        res.clearCookie("usertoken");
        res.sendStatus(200);
    };
}

module.exports = new UserController();
