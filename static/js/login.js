angular.module('loginApp', [])
.controller('loginCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.username = "";
    $scope.password = "";
    $scope.message = "";
    $scope.login = function() {
      $http.post("/login", {username: $scope.username, password: $scope.password})
      .then(function(response) {
        if (response.data.success) {
          window.location = "/";
        } else {
          $scope.message = response.data.message;
        }
      })
    }
}]);
