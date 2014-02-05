webapp.controller(
  'MongodbCtrl', 
  [
    '$scope', 
    'Restangular',
    function($scope, Restangular) {
      var todoApi = Restangular.all('api/v1/Todo');

      todoApi.getList().then(function(todos) {
        $scope.todos = todos;
      });

      $scope.delete = function(todo) {
        // remove from rest-api
        todo.remove().then(function() {
          // remove from clientside array
          $scope.todos = _.without($scope.todos, todo);
        });
      };

      $scope.save = function(todo) {
        todo.put();
      };

      $scope.create = function() {
        var newTodo = {text: $scope.newText, done: false};
        // Add to rest-api
        todoApi.post(newTodo).then(function() {
          // Add to clientside array
          $scope.todos.push(newTodo);
        });
      };
    }
  ]
);

