
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, '../client')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var mongo = require('./mongo.js');
var mers = require('mers');
var mc = config.mongodb;
app.use('/api/v1', mers({
  uri: 'mongodb://' + mc.user + ':' + mc.password + '@' + mc.host + '/' + mc.db
}).rest());

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
