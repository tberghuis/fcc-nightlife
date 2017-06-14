
const router = require('express').Router({ mergeParams: true });

// post /auth/login
router.post('/login', function (req, res, next) {


// ignore server side validation as i'm lazy

    console.log(req.body);

    res.json({ hello: "hello" });
});


module.exports = router;
