webapp.controller(
  'HomeCtrl', 
  [
    '$scope', 
    '$http',
    function($scope, $http) {
      function toArray(obj) {
        var ret = [];
        if (obj) {
          for (var key in obj) {
            ret.push({name: key, value: obj[key]});
          }
        }
        return ret;
      }
      $http.get('home/package.json').success(function(data) {        
        data.dependencies = toArray(data.dependencies);
        data.devDependencies = toArray(data.devDependencies);
        $scope.server = data;
      });
      $http.get('home/bower.json').success(function(data) {
        data.dependencies = toArray(data.dependencies);
        data.devDependencies = toArray(data.devDependencies);
        $scope.client = data;
      });
    }
  ]
);

