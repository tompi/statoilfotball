webapp.factory(
  'authService', 
  [
    '$http', 
    function($http) {
      var me = {};

      var promise = $http.get('/auth/account');

      me.getAccount = function(next) {
        promise.then(function(result) {
          next(result.data);
        });
      };

      me.logout = function(next) {
        $http.get('/auth/logout').then(function() {
          promise = $http.get('/auth/account');
          next();
        });
      };

      return me;
    }
  ]
);

