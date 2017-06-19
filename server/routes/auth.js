
const router = require('express').Router({ mergeParams: true });
const User = require('../models/user');
const passport = require('passport');


router.post('/register', function (req, res, next) {
    console.log('registering user');
    console.log(req.body);

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
                // res.redirect('/');
                res.json({ username: req.body.username, email: req.body.email });
            });
        });


        // console.log('user registered!');

        // res.json({ hello: "hello" });

        // send back username + email, i dont' know why....
        // just do it


    });
});

router.get('/login', function (req, res, next) {

    // TODO is this bad practice?
    // i have no idea how to use passport properly
    // following passport-local-mongoose example
    if (req.user) {
        res.json({ username: req.user.username, email: req.user.email });
    }
    // do i need else statement?
    else {
        let err = {};
        err.status = 400;
        return next(err);
    }

});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.json({ username: req.user.username, email: req.user.email });
});


// post /auth/login
router.post('/login', function (req, res, next) {

    console.log('post login');
    // ignore server side validation as i'm lazy

    console.log(req.body);

    // res.json({ hello: "hello" });

    var err = new Error('Not Found');
    err.status = 400;
    next(err);
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
