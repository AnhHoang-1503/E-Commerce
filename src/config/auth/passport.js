import passport from "passport";
import LocalStrategy from "passport-local";
import Login from "../../app/models/loginModel.js";
import hasher from "../../util/hasher.js";

function passportConfig(passport) {
    // passport session setup
    passport.serializeUser(function (user, done) {
        done(null, user.email);
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
                                }
                            });
                        } else {
                            return done(null, false, {
                                message: "Sai thông tin username hoặc password",
                            });
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
