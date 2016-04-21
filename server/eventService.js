var eventCalculator = require('./eventCalculator');
var EventEmitter = require('events').EventEmitter;

module.exports = function(connection) {
  var me = new EventEmitter();
  var Event = connection.model('Event');

  me.findOrCreateNextEvent = function(next) {
    var nextEvent = eventCalculator.getNext();
    delete nextEvent.date;
    Event
      .findOne(nextEvent)
      .populate('coming maybeComing notComing')
      .exec(function(err, dbEvent) {
            if (dbEvent) {
              if (next) next(dbEvent);
            } else {
              // Create
              var newEvent = new Event(nextEvent);
              newEvent.save(function(err, newEventSaved) {
                if (next) next(newEventSaved);
              });
            }
    });
  };

  function addOrRemove(belongs, id, array) {
    console.log("User " + (belongs ? "belongs" : "does not belong"));
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
        me.emit('eventChanged');
        me.findOrCreateNextEvent(next);
      });
    });
  };

  me.updateDescription = function(description, next) {
    me.findOrCreateNextEvent(function(event) {
      event.description = description;
      event.save(function() {
        me.emit('eventChanged');
        me.findOrCreateNextEvent(next);
      });
    });
  };

  return me;
};
