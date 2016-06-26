const routes = require('express').Router();
const users = require('../models/users');

routes.get('/', (req, res, next) => {
	res.status(200).json(users);
});
routes.post('/', users.create);

module.exports = routes;