webapp.controller(
  'MongodbCtrl', 
  [
    '$scope', 
    'Restangular',
    function($scope, Restangular) {
      var api = Restangular.all('api/v1/Todo');
      api.post({text:'Fix api', done: false});
    }
  ]
);

