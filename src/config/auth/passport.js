import LocalStrategy from "passport-local";
import Login from "../../app/models/loginModel.js";
import hasher from "../../util/hasher.js";
import User from "../../app/models/userModel.js";

function passportConfig(passport) {
    // passport session setup
    passport.serializeUser(function (user, done) {
        User.findOne({ email: user.email })
            .then(function (user) {
                done(null, { email: user.email, role: user.role });
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    // used to deserialize the user
    passport.deserializeUser(function (email, done) {
        Login.findOne({ email: email })
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    passport.use(
        new LocalStrategy(
            { usernameField: "email", passReqToCallback: true },
            (req, email, password, done) => {
                req.session.messages = [];
                Login.findOne({ email: email })
                    .then(function (user) {
                        if (user !== null) {
                            hasher(password, user.salt).then((output) => {
                                if (output.hash === user.hash) {
                                    return done(null, user);
                                } else {
                                    req.flash("messages", "Wrong password");
                                    return done(null, false);
                                }
                            });
                        } else {
                            req.flash("messages", "Wrong email");
                            return done(null, false);
                        }
                    })
                    .catch(function (err) {
                        return done(err);
                    });
            }
        )
    );
}

export default passportConfig;
