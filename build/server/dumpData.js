/* Dump all data in the mongo db */

var userService = require('./userService');
var eventService = require('./eventService');

module.exports = {
  dumpData: function(next) {
    // First get all users
    userService.findAllUsers(function(users) {
      // make hash table for easy lookup
      var usersById = {};
      users.forEach(function(user) {
        usersById[user._id] = {
          displayName: user.displayName,
          photo: user.photo,
          email: user.email,
          id: user._id,
          count: 0
        };
      });
      // Now get all events
      eventService.findAllEvents(function(err, events) {
        // Iterate over events and replace user id with actual user
        events.forEach(function(event) {
          insertUsers(event.coming, usersById);
          insertUsers(event.notComing, usersById);
          insertUsers(event.maybeComing, usersById);
        });
        // Return events
        next(events);
      });
    });
  }
};

function insertUsers(idArray, usersById) {
  for (var i = 0; i < idArray.length; i++) {
    idArray[i] = usersById[idArray[i]];
  }
}
