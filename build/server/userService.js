module.exports = function(connection) {
  var me = {};
  // get MERS connection and reuse it...
  var User = connection.model('User');

  function getFirstValue(valueArray) {
    if (valueArray && valueArray.length) {
      return valueArray[0].value;
    } else {
      return '';
    }
  }

  me.findOrCreateUser = function(profile, next) {
    User
    .find({id: profile.id, provider: profile.provider},
          function(err, usr) {
            // First add calculated email and photo attributes
            // (instead of those pesky arrays of objects...)
            profile.email = getFirstValue(profile.emails);
            profile.photo = getFirstValue(profile.photos) || profile._json.picture;
            if (usr && usr.length) {
              User.findByIdAndUpdate(usr[0]._id, { $set: profile }, function(err, updatedUsr) {
                next(updatedUsr);
              });
            } else {
              // Create
              usr = new User(profile);
              usr.save(function(err, usr) {
                next(usr);
              });
            }
          });
  };
  return me;
};
