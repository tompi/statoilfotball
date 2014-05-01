webapp.controller(
  'FotballCtrl', 
  [
    '$scope', 
    'authService',
    'eventService',
    'socket',
    function($scope, authService, eventService, socket) {

      $scope.loggedIn = false;

      authService.getAccount(function(user) {
        $scope.user = user;
        $scope.loggedIn = user && user.id;
        updateMyStatus();
      });

      function calculateNextEvent() {
        var event = $scope.event;
        if (event) {
          // Convert week to date
          var m = moment('1-' + event.week + '-' + event.year + '-14:00', 'E-WW-YYYY-HH:mm');
          $scope.nextEvent = m.format('HH:mm dddd Do MMM YYYY');
          $scope.nextEventFromNow = m.fromNow();
        }
      }

      window.setInterval(calculateNextEvent, 5000);

      function updateMyStatus() {
        var event = $scope.event;
        var user = $scope.user;
        var coming = false;
        var notComing = false;
        var maybeComing = false;
        if (event && user) {
          coming = contains(event.coming, user._id);
          notComing = contains(event.notComing, user._id);
          maybeComing = contains(event.maybeComing, user._id);
        }
        $scope.coming = coming;
        $scope.notComing = notComing;
        $scope.maybeComing = maybeComing;
      }

      function refreshEvent() {
        eventService.getNextEvent(function(event) {
          $scope.event = event;
          calculateNextEvent();
          updateMyStatus();
        });
      }

      refreshEvent();

      // Server-side events:
      socket.on('eventChanged', refreshEvent);

      function contains(userArray, id) {
        return _.contains(_.pluck(userArray, '_id'), id);
      }

      $scope.changeStatus = function() {
        eventService.changeStatus($scope.coming, $scope.notComing, $scope.maybeComing, function(event) {
          $scope.event = event;
          updateMyStatus();
        });
      };

      $scope.updateDescription = function() {
        eventService.updateDescription($scope.event.description);
      };

      $scope.logout = function() {
        authService.logout(function() {
          delete $scope.user;
          $scope.loggedIn = false;
        });
      };
    }
  ]
);

