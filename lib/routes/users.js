const routes = require('express').Router();
const users = require('../models/users');

//GET
routes.get('/', users.getAll);
routes.get('/:id', users.getById);
//POST
routes.post('/', users.create);
routes.post('/:id', users.update);
//DELETE
routes.delete('/:id', users.del);

module.exports = routes;