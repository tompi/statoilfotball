webapp.controller(
  'FotballCtrl', 
  [
    '$scope', 
    '$http',
    'authService',
    function($scope, $http, authService) {

      $scope.loggedIn = false;

      authService.getAccount(function(account) {
        $scope.account = account;
        $scope.loggedIn = account && account.id;
      });

      $scope.logout = function() {
        authService.logout(function() {
          delete $scope.account;
          $scope.loggedIn = false;
        });
      };
    }
  ]
);

