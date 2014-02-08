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

var EventSchema = new Schema({
  title:String,
  year:Number,
  week:Number,
  coming: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  notComing: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maybeComing: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

var User = module.exports.User = mongoose.model('User', UserSchema);
var Event = module.exports.Event = mongoose.model('Event', EventSchema);
