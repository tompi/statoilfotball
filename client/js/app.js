var webapp = angular.module('webapp', ['ngRoute', 'restangular', '$strap.directives']);

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
        when('/mongodb',
             {
                templateUrl: 'mongodb/index.html',
                controller: 'MongodbCtrl'
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

