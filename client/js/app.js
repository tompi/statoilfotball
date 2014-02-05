var webapp = angular.module('webapp', ['ngRoute', 'restangular', '$strap.directives']);

webapp.config(
  ['$routeProvider', 'RestangularProvider',
    function($routeProvider, RestangularProvider) {
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
        when('/passport',
             {
                templateUrl: 'passport/index.html',
                controller: 'PassportCtrl'
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
      RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        return response.payload;
      });
      RestangularProvider.setRestangularFields({
        id: "_id",
      });
    }
]);

