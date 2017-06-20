const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const mongoose = require('mongoose');
const Club = require('../models/club'); //clubs??
//const Club = mongoose.model('clubs');
const User = require('../models/user');



router.post('/', function (req, res, next) {
    console.log(req);

    if (!req.user) {
        var err = new Error('not authenticated');
        err.status = 400;
        return next(err);
    }

    // assume req.body.yelpId

    Club.find({ yelpId: req.body.yelpId }, function (err, clubs) {
        if (err) {
            console.log('err', err);
            handleError(err);
        }
        // clubs is an array

        console.log('clubs', clubs);

        // if empty create new club
        if (clubs.length === 0) {
            //console.log(req.user);
            var club = new Club({
                yelpId: req.body.yelpId,
                guests: [req.user.id]
            });
            club.save(function (err) {
                if (err) return handleError(err);
                // saved!
                res.json({ ok: 'ok' });
            });
        } else if (clubs[0].guests.indexOf(req.user.id) === -1) {
            clubs[0].guests.push(req.user.id);
            clubs[0].save(function (err) {
                if (err) return handleError(err);
                // saved!
                res.json({ ok: 'ok' });
            });
        }
        else {
            //handleError(new Error('somethings wrong'));

            // probably already made a reservation
            res.json({ ok: 'ok' });
        }

    });
    // req.body.yelpId

    // res.json({});
});


router.get('/:yelpId', function (req, res, next) {
    console.log(req);
    // if(!req.params.yelpId){
    //     handleError(new Error('wheres the param'));
    // }
    Club.findOne({ yelpId: req.params.yelpId }, function (err, club) {
        if (err) {
            console.log('err', err);
            handleError(err);
        }
        console.log('club', club);
        // User.find();
        User.find({
            '_id': {
                $in: club.guests.map(guest => mongoose.Types.ObjectId(guest))
            }
        }, function (err, users) {
            console.log('users', users);
            var usernames = users.map(user => user.username);
            console.log('usernames', usernames);
            res.json({ usernames });
        });
    });

});



module.exports = router;

//TODO send json from here
function handleError(err, status, message) {
    err.status = 400;
    return next(err);
}
