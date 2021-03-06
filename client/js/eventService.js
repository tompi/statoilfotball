webapp.factory(
  'eventService', 
  [
    '$http', 
    function($http) {
      var me = {};

      me.getNextEvent = function(next) {
        var promise = $http.get('/event/next');
        promise.then(function(event) {
          next(event.data);
        });
      };

      me.changeStatus = function(coming, notComing, maybeComing, next) {
        var promise = $http.post('/event/changeStatus', {
                                coming: coming,
                                notComing: notComing,
                                maybeComing: maybeComing
        });
        promise.then(function(event) {
          next(event.data);
        });
      };
      me.updateDescription = function(description, next) {
        var promise = $http.post('/event/updateDescription', {
                                description: description
        });
        promise.then(function(event) {
          if (next) next(event.data);
        });
      };

      return me;
    }
  ]
);

