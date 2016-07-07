const level = require('level');
const levelPath = level('database',
	{encoding: 'json', createIfMissing: true}, function (err, db) {
		if (err) return console.log('ERROR levelPath', err);
		console.log('Connected to levelDB database', db.location)
});

module.exports = levelPath