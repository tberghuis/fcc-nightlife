const routes = require('express').Router();
const yelp = require('./yelp');
const auth = require('./auth');

routes.use('/yelp', yelp);
routes.use('/auth', auth);

module.exports = routes;
