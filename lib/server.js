// Bring in our dependencies
const level = require('level');
const express = require('express');
const sublevel = require('level-sublevel');
const multilevel = require('multilevel');
const net = require('net');
// Turn on that server!

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {

	const db = level('tmp/database')
	const sub = sublevel(db);
	const users = sub.sublevel('users');

	multilevel.writeManifest(sub, __dirname + '/manifest.json');

	net.createServer(function (con) {
	 	con.pipe(multilevel.server(sub)).pipe(con);

	    /*con.on('data', function (data){
	      console.log('from client',data.toString());
	      multilevel.server(sub).write(data);
	    });
	    multilevel.server(sub).on('data',function (data){
	      console.log('multilevel.server(sub)',data.toString());
	      con.write(data);
	    });*/

	}).listen(3000);

  // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });

} else {
	const app = express();
	const routes = require('./routes/app');
	const messagesRoutes = require('./routes/messages');
	const usersRoutes = require('./routes/users');
	const bodyParser = require('body-parser');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }))

	//  Connect all our routes to our application
	// App route
	app.use('/', routes);
	// API routes
	app.use('/messages', messagesRoutes);
	app.use('/users', usersRoutes);
	app.listen(8000, () => {
	  console.log('App listening on port 8000');
	});
}