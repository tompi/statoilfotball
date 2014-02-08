var eventCalculator = require('./eventCalculator');

module.exports = function(connection) {
  var me = {};
  var Event = connection.model('Event');

  me.findOrCreateNextEvent = function(next) {
    var nextEvent = eventCalculator.getNext();
    delete nextEvent.date;
    Event
      .findOne(nextEvent)
      .populate('coming maybeComing notComing')
      .exec(function(err, dbEvent) {
            if (dbEvent) {
              next(dbEvent);
            } else {
              // Create
              var newEvent = new Event(nextEvent);
              newEvent.save(function(err, newEventSaved) {
                next(newEventSaved);
              });
            }
    });
  };

  function addOrRemove(belongs, id, array) {
    if (belongs) {
      array.push(id);
    } else {
      array.remove(id);
    }
  }

  me.changeStatus = function(userId, coming, notComing, maybeComing, next) {
    me.findOrCreateNextEvent(function(event) {
      addOrRemove(coming, userId, event.coming);   
      addOrRemove(notComing, userId, event.notComing);   
      addOrRemove(maybeComing, userId, event.maybeComing);   
      event.save(function() {
        me.findOrCreateNextEvent(next);
      });
    });
  };

  return me;
};
