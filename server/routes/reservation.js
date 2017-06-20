const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const mongoose = require('mongoose');
const Club = require('../models/club'); //clubs??
//const Club = mongoose.model('clubs');
const User = require('../models/user');

// this code is so ugly

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
            handleError(res, err);
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
                if (err) return handleError(res, err);
                // saved!
                res.json({ ok: 'ok' });
            });
        } else if (clubs[0].guests.indexOf(req.user.id) === -1) {
            clubs[0].guests.push(req.user.id);
            clubs[0].save(function (err) {
                if (err) return handleError(res, err);
                // saved!
                res.json({ ok: 'ok' });
            });
        }
        else {
            //handleError(res,new Error('somethings wrong'));

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
    //     handleError(res,new Error('wheres the param'));
    // }
    Club.findOne({ yelpId: req.params.yelpId }, function (err, club) {
        if (err) {
            console.log('err', err);
            handleError(res, err);
        }
        console.log('club', club);
        // User.find();

        if (!club) {
            return handleError(res, new Error('club not exist in app'));
        }


        var guests = club.guests.map(guest => mongoose.Types.ObjectId(guest));

        User.find({
            '_id': {
                $in: guests
            }
        }, function (err, users) {
            console.log('users', users);
            var usernames = users.map(user => user.username);
            console.log('usernames', usernames);
            var canRemove = false;
            if (req.user && club.guests.indexOf(req.user.id) > -1) {
                console.log('req.user', req.user);
                canRemove = true;
            }
            res.json({ usernames, canRemove });
        });
    });

});



router.get('/:yelpId/remove', function (req, res, next) {
    //    console.log(req);
    if (!req.user) {
        handleError(res, new Error('got to be logged in'));
    }
    console.log(req.user);

    Club.findOne({ yelpId: req.params.yelpId }, function (err, club) {
        if (err) {
            console.log('err', err);
            handleError(res, err);
        }
        console.log('club', club);
        // User.find();

        // club.guests.indexOf(req.user.id)
        console.log(club.guests.indexOf(req.user.id));
        //club.guests = club.guests.splice(club.guests.indexOf(req.user.id),1);
        club.guests.splice(club.guests.indexOf(req.user.id), 1);
        club.markModified('guests');
        console.log('club', club);
        club.save(function (err) {
            if (err) return handleError(res, err);
            // saved!
            res.json({ ok: 'ok' });
        });


    });


});

module.exports = router;

//TODO send json from here
function handleError(res, err, status, message) {
    err.status = 400;
    res.json({
        'errors': {
            message: err.message,
            error: err
        }
    });
}
