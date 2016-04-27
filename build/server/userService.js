var me = {};
var User;

function getFirstValue(valueArray) {
  if (valueArray && valueArray.length) {
    return valueArray[0].value;
  } else {
    return '';
  }
}

me.init = function(connection) {
  User = connection.model('User');
};

me.findOrCreateUser = function(profile, next) {
  User
  .findOne({id: profile.id, provider: profile.provider},
        function(err, usr) {
          // First add calculated email and photo attributes
          // (instead of those pesky arrays of objects...)
          profile.email = getFirstValue(profile.emails);
          profile.photo = getFirstValue(profile.photos) ||
                          profile._json.picture ||
                          '';
          profile.name.middleName = profile.name.middleName || '';
          if (usr) {
            User.findByIdAndUpdate(usr._doc._id, { $set: profile }, function(err, updatedUsr) {
              next(updatedUsr);
            });
          } else {
            // Create
            usr = new User(profile);
            usr.save(function(err, createdUsr) {
              next(createdUsr);
            });
          }
        });
};
me.findAllUsers = function(next) {
  User.find({}, function(err, users) {
    next(users);
  });
};

module.exports = me;
