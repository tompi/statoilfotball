var webapp = angular.module('webapp', ['ngRoute', 'restangular', '$strap.directives']);

webapp.config(
  ['$routeProvider', 'RestangularProvider',
    function($routeProvider, RestangularProvider) {
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
      RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        return response.payload;
      });
      RestangularProvider.setRestangularFields({
        id: "_id",
      });
    }
]);

