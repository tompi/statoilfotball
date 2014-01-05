var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

// Passports unified user schema
var UserSchema = new Schema({
  provider:String,
  displayName:String,
  name:{familyName:String,givenName:String,middleName:String},
  emails:[{value:String,type:String}],
  photos:[{value:String}]
});

var TodoSchema = new Schema({
  text:String,
  done:Boolean
});

var User = module.exports.User = mongoose.model('User', UserSchema);
var Todo = module.exports.Todo = mongoose.model('Todo', TodoSchema);
