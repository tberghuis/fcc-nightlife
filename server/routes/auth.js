
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
        passport.authenticate("local")(req, res, function () {
            
            res.json({ username: req.body.username, email: req.body.email });
        });


        // console.log('user registered!');

        // res.json({ hello: "hello" });

        // send back username + email, i dont' know why....
        // just do it


    });
});



// post /auth/login
router.post('/login', function (req, res, next) {


    // ignore server side validation as i'm lazy

    console.log(req.body);

    res.json({ hello: "hello" });
});


module.exports = router;
