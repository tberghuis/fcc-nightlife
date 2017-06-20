const yelp = require('yelp-fusion');
const router = require('express').Router({ mergeParams: true });

router.get('/:yelpId', function (req, res, next) {
    // console.log(req.params.yelpId);

    // must be better way to cache/reuse the token, meh
    // repeating myself for the moment
    yelp.accessToken(process.env.YELPFUSION_CLIENTID, process.env.YELPFUSION_CLIENTSECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        client.business(req.params.yelpId).then(response => {
            let club = response.jsonBody;
            return res.json({
                yelpId: club.id,
                name: club.name,
                image_url: club.image_url,
                url: club.url,
                rating: club.rating,
                address: club.location.address1 + ', ' + club.location.city
            });
        }).catch(errorHandler(res));
    }).catch(errorHandler(res));
});

router.post('/', function (req, res, next) {
    // console.log(req.body.searchText);
    // now to use yelp fusion
    yelp.accessToken(process.env.YELPFUSION_CLIENTID, process.env.YELPFUSION_CLIENTSECRET).then(response => {
        const client = yelp.client(response.jsonBody.access_token);
        client.search({
            term: 'clubs',
            location: req.body.searchText,
            category_filter: 'bars',
            sort: 1
        }).then(response => {
            // console.log(response.jsonBody);
            let businesses = response.jsonBody.businesses.map((b) => {
                return {
                    yelpId: b.id,
                    name: b.name,
                    address: b.location.address1,
                    noReservations: 10
                };
            });
            // TODO populate NoReservations
            return res.json(businesses);

        }).catch(errorHandler(res));
    }).catch(errorHandler(res));
});

module.exports = router;

errorHandler = res => e => {
    console.log('error', e);
    // TODO test this
    // return next(e);
    res.status(e.status || 500);
    return res.json({
        'errors': {
            message: e.message,
            error: e
        }
    });
}
