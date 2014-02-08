webapp.controller(
  'FotballCtrl', 
  [
    '$scope', 
    'authService',
    'eventService',
    function($scope, authService, eventService) {

      $scope.loggedIn = false;

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

      function contains(userArray, id) {
        return _.contains(_.pluck(userArray, '_id'), id);
      }

      authService.getAccount(function(user) {
        $scope.user = user;
        $scope.loggedIn = user && user.id;
        updateMyStatus();
      });

      eventService.getNextEvent(function(event) {
        $scope.event = event;
        updateMyStatus();
      });

      $scope.changeStatus = function() {
        eventService.changeStatus($scope.coming, $scope.notComing, $scope.maybeComing, function(event) {
          $scope.event = event;
          updateMyStatus();
        });
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

