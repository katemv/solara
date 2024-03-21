const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const { JWTSecret } = require("../../../util/config");

const login = async (req, res, next) => {
    let loadedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                const error = new Error("A user with this email could not be found.");
                error.statusCode = 401;
                return next(error);
            }

            loadedUser = user;

            return bcrypt.compare(req.body.password, user.password);
        })
        .then((isEqual) => {
            if (!isEqual) {
                const error = new Error("Wrong password!");
                error.statusCode = 401;
                return next(error);
            }

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                JWTSecret,
                { expiresIn: "1h" });

            res.status(200).json({ token, userId: loadedUser._id.toString() });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

module.exports = login;
