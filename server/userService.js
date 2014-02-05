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
            if (usr && usr.length) {
              // TODO: Should diff obj's and update db if changed
              next(usr);
            } else {
              // Create
              profile.email = getFirstValue(profile.emails);
              profile.photo = getFirstValue(profile.photos) || profile._json.picture;
              usr = new User(profile);
              usr.save(function(err, usr) {
                next(usr);
              });
            }
          });
  };

  return me;
};
