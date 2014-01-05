webapp.controller(
  'FormsCtrl', 
  [
    '$scope', 
    '$http',
    function($scope, $http) {
      $scope.birthDate = new Date(1975, 0, 29);
      $scope.firstName = 'Thomas';
      $scope.lastName = 'Haukland';
      $scope.email = 'thomas.haukland@gmail.com';
      $scope.sex = 'male';
    }
  ]
);

