// Get all users with a count of how many events they have attended

var userService = require('./userService');
var eventService = require('./eventService');
var NodeCache = require( "node-cache" );
var cache = new NodeCache();
var cacheKey = 'activeUsers';

module.exports = {
  getMostActiveUsers: function(next) {
    var cachedResult = cache.get(cacheKey);
    // Return cached result
    if (cachedResult) next(cachedResult);
    else {
      // Not cached result, get it from db
      // First get all users
      userService.findAllUsers(function(users) {
        // make hash table for easy lookup
        var usersById = {};
        users.forEach(function(user) {
          usersById[user._id] = {
            displayName: user.displayName,
            email: user.email,
            photo : user.photo,
            id: user._id,
            count: 0
          };
        });
        // Now get all events
        eventService.findAllEvents(function(err, events) {
          // Iterate over events and increment users attendance count
          events.forEach(function(event) {
            // We only count attendance
            event.coming.forEach(function(userId) {
              usersById[userId].count++;
            });
          });
          // Convert to array
          var usersArray = [];
          for (var userId in usersById) {
            var user = usersById[userId];
            // Only include ppl that have attended at some time
            if (user.count > 0) usersArray.push(user);
          }
          // Now sort users by count descending
          cachedResult = usersArray.sort(function(a, b) {
            return b.count - a.count;
          });
          // Insert into cache
          cache.set(cacheKey, cachedResult);
          // Return cached result
          next(cachedResult);
        });
      });
    }
  }
};
