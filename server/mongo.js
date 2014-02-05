var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;

// Passports unified user schema
var UserSchema = new Schema({
  id: String,
  provider:String,
  displayName:String,
  name:{familyName:String,givenName:String,middleName:String},
  email:String,
  photo:String
});

var TodoSchema = new Schema({
  text:String,
  done:Boolean
});

var User = module.exports.User = mongoose.model('User', UserSchema);
var Todo = module.exports.Todo = mongoose.model('Todo', TodoSchema);
