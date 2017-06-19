const router = require('express').Router({ mergeParams: true });
const User = require('../models/user');
const passport = require('passport');

router.post('/register', function (req, res, next) {
    // console.log('registering user');
    // console.log(req.body);
    User.register(new User({ username: req.body.username, email: req.body.email }), req.body.password, function (err) {
        if (err) {
            console.log('error while user register!', err);
            err.status = 400;
            return next(err);
        }
        // https://stackoverflow.com/questions/36465196/passport-local-mongoose-authenticate-user-right-after-registration
        // i'm guessing that this sets session cookie
        passport.authenticate("local")(req, res, function () {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.json({ username: req.body.username, email: req.body.email });
            });
        });
    });
});

router.get('/login', function (req, res, next) {
    // TODO is this bad practice?
    // i have no idea how to use passport properly
    // following passport-local-mongoose example
    if (req.user) {
        res.json({ username: req.user.username, email: req.user.email });
    }
    // do i need else statement? TODO test
    else {
        let err = {};
        err.status = 400;
        return next(err);
    }

});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json({ username: req.user.username, email: req.user.email });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        // TODO ???
        res.json({ loggedOut: true });
    });
});

module.exports = router;
