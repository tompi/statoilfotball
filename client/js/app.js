var webapp = angular.module('webapp', ['ngRoute']);

webapp.config(
  ['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/',
             {
               templateUrl: 'fotball/index.html',
               controller: 'FotballCtrl'
             }).
        otherwise(
             {
                redirectTo: '/'
             });
    }
]);
