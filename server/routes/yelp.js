const yelp = require("yelp-fusion");
const router = require("express").Router({ mergeParams: true });
const Club = require("../models/club");

router.get("/:yelpId", function(req, res, next) {
  // must be better way to cache/reuse the token, meh
  // repeating myself for the moment
  yelp
    .accessToken(
      process.env.YELPFUSION_CLIENTID,
      process.env.YELPFUSION_CLIENTSECRET
    )
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token);
      client
        .business(req.params.yelpId)
        .then(response => {
          let club = response.jsonBody;
          return res.json({
            yelpId: club.id,
            name: club.name,
            image_url: club.image_url,
            url: club.url,
            rating: club.rating,
            address: club.location.address1 + ", " + club.location.city
          });
        })
        .catch(errorHandler(res));
    })
    .catch(errorHandler(res));
});

router.post("/", function(req, res, next) {
  yelp
    .accessToken(
      process.env.YELPFUSION_CLIENTID,
      process.env.YELPFUSION_CLIENTSECRET
    )
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token);
      client
        .search({
          term: "clubs",
          location: req.body.searchText,
          category_filter: "bars",
          sort: 1
        })
        .then(async response => {
          let businesses = response.jsonBody.businesses.map(b => {
            return {
              yelpId: b.id,
              name: b.name,
              address: b.location.address1,
              noReservations: null
            };
          });

          let promises = businesses.map(b => {
            // get noReservations
            return (
              Club.findOne({ yelpId: b.yelpId })
                // club could be null
                .then(club => {
                  if (!club) return 0;
                  return club.guests.length;
                })
              // should probably catch here
              // learn about error handling best practices
            );
          });
          noReservations = await Promise.all(promises);
          // console.log(noReservations);
          businesses = businesses.map((b, i) => {
            b.noReservations = noReservations[i];
            return b;
          });
          return res.json(businesses);
        })
        .catch(errorHandler(res));
    })
    .catch(errorHandler(res));
});

module.exports = router;

errorHandler = res => e => {
  console.log("error", e);
  // TODO test this
  // return next(e);
  res.status(e.status || 500);
  return res.json({
    errors: {
      message: e.message,
      error: e
    }
  });
};
