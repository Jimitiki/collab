angular.module('projectBuilder', []).
controller('projBuildCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.description = "";
    $scope.title = "";
    $scope.imageURL = "";
    $scope.submitProject = function() {
      $http.post("/project", {
        title: $scope.title,
        description: $scope.description,
          imageURL: $scope.imageURL
      }).then(function(response) {
        window.location = "/project/" + response.data.projectID;
      });
    }
  }]);
