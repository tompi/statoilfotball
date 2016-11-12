
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var auth = require('./auth');
var config = require('./config');
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '../client');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use( express.cookieParser() );
  app.use(express.session({secret: config.sessionSecret}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Set up mongodb connection
var mongo = require('./mongo.js');
var mc = config.mongodb;
var  uri = process.env.MONGODB_URI;
// If environment mongo connection string is configured, use this, else use config
if (!uri) uri = 'mongodb://' + mc.user + ':' + mc.password + '@' + mc.host + '/' + mc.db;
var mongoose = require('mongoose');
mongoose.connect(uri);

// Set up SSO
var userService = require('./userService');
userService.init(mongoose);
auth.init(app, config, passport, userService);

// Custom rest endpoints:
var eventService = require('./eventService');
eventService.init(mongoose);
app.get('/event/next', function(req, res) {
  eventService.findOrCreateNextEvent(function(nextEvent) {
    res.json(nextEvent);
  });
});
function checkLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) res.json({error: 'not logged in!'});
  else next();
}
app.post('/event/changeStatus', function(req, res) {
  checkLoggedIn(req, res, function() {
    // Extract parameters
    eventService.changeStatus(
      req.user._id,
      req.body.coming,
      req.body.notComing,
      req.body.maybeComing,
      function(changedStatus) {
        res.json(changedStatus);
      });
  });
});

app.post('/event/updateDescription', function(req, res) {
  checkLoggedIn(req, res, function() {
    // Extract parameters
    eventService.updateDescription(req.body.description, function(updatedDescription) {
      res.json(updatedDescription);
    });
  });
});

var mostActiveUsers = require('./mostActiveUsers');
app.get('/event/mostActiveUsers', function(req, res) {
  mostActiveUsers.getMostActiveUsers(function(users) {
    res.json(users);
  });
});

var dumpData = require('./dumpData');
app.get('/dumpData', function(req, res) {
  dumpData.dumpData(function(data) {
    res.json(data);
  });
});

// Fire up the backend server
var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Sockets
var io = require('socket.io').listen(server);

// Forward server-side 'eventChanged' to clients
io.sockets.on('connection', function(socket) {
  eventService.on('eventChanged', function(event) {
    socket.emit('eventChanged', event);
  });
});
