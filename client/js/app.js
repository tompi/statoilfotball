var webapp = angular.module('webapp', ['ngRoute', '$strap.directives']);

webapp.config(
  ['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/',
             {
               templateUrl: 'home/index.html',
               controller: 'HomeCtrl'
             }).
        when('/forms',
             {
                templateUrl: 'forms/index.html',
                controller: 'FormsCtrl'
             }).
        when('/about',
             {
                templateUrl: 'about/index.html',
                //controller: 'AboutCtrl'
             }).
        otherwise(
             {
                redirectTo: '/'
             });
    }
]);

