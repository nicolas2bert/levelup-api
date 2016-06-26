const routes = require('express').Router();
const messages = require('../models/messages');

routes.get('/', (req, res, next) => {
	res.status(200).json(messages);
});

routes.post('/', (req, res, next) => {
	if(!req.body.hasOwnProperty('content') || 
     !req.body.hasOwnProperty('userId')) {
		res.statusCode = 400;
    	return res.send('Error 400: Post syntax incorrect.');
	}
	const messageId = Object.keys(messages).length+1;
	const message = {
		id : messageId,
		content : req.body.content,
		userId : req.body.userId
	};
	messages.push(message);
	res.json(messages);
});

module.exports = routes;