
const routes = require('express').Router();
const yelp = require('./yelp');
const auth = require('./auth');

routes.use('/yelp', yelp);
routes.use('/auth', auth);
// routes.use('/cars', cars);

// routes.get('/', (req, res) => {
//   res.status(200).json({ message: 'Connected!' });
// });

module.exports = routes;

