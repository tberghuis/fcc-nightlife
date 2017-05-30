const yelp = require('yelp-fusion');
const router = require('express').Router({ mergeParams: true });





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
            console.log(response.jsonBody);

            let businesses = response.jsonBody.businesses.map((b)=>{
                return {
                    yelpId: b.id,
                    name: b.name,
                    address: b.location.address1
                };
            });

            // TODO populate NoReservations


            // return res.json(response.jsonBody);
            return res.json(businesses);
            
        });
    }).catch(e => {
        console.log('error',e);

        // TODO test this
        return next(e);
    });



    // res.send({ hello: "hello" });
});

module.exports = router;






