
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


var mongo = require('./mongo.js');
//var mers = require('mers');
var mc = config.mongodb;

//app.use('/api/v1', mers({
var  uri = process.env.MONGOHQ_URL;
if (!uri) uri = 'mongodb://' + mc.user + ':' + mc.password + '@' + mc.host + '/' + mc.db;
var mongoose = require('mongoose');
mongoose.connect(uri);
//}).rest());
  //
  //var 

var userService = require('./userService')(mongoose);
auth.init(app, config, passport, userService);

// Custom rest endpoints:
var eventService = require('./eventService')(mongoose);
app.get('/event/next', function(req, res) {
  eventService.findOrCreateNextEvent(function(event) {
    res.json(event);
  });
});
app.post('/event/changeStatus', function(req, res) {
  if (!req.isAuthenticated()) res.json({error: 'not logged in!'});
  else {
    // Extract parameters
    eventService.changeStatus(
      req.user._id,
      req.body.coming,
      req.body.notComing,
      req.body.maybeComing,
      function(event) {
        res.json(event);
      });
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
