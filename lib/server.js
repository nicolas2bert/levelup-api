// Bring in our dependencies
const express = require('express');
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

// Turn on that server!
app.listen(8000, () => {
  console.log('App listening on port 8000');
});
