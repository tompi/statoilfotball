var socket = window.io.connect();

export default {
  on: function(eventName, callback) {
    socket.on(eventName, function() {
      callback.apply(socket, arguments);
    });
  },
  emit: function(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      if (callback) {
        callback.apply(socket, arguments);
      }
    });
  }
};
