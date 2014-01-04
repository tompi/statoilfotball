var webapp = angular.module('webapp', ['ngRoute']);

webapp.config(
  ['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'home/index.html',
          controller: 'HomeCtrl'
      }).
        when('/about', {
          templateUrl: 'about/index.html',
          //controller: 'AboutCtrl'
      }).
        otherwise({
          redirectTo: '/'
      });
    }
]);

