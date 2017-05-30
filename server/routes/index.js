
const routes = require('express').Router();
const yelp = require('./yelp');
// const cars = require('./cars');

routes.use('/yelp', yelp);
// routes.use('/cars', cars);

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });

module.exports = routes;

