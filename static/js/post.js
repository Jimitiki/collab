angular.module('project', []).
controller('postCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.offers = [];
    $scope.offerType = "";
    $scope.description = "";
      $scope.showEdit = false;
    $scope.submitOffer = function() {
      $http.post("/offer", {
        type: $scope.offerType,
        description: $scope.description
      }).then(function(response) {
        $scope.offers.push({
          id: "0000",
          type: $scope.offerType,
          description: $scope.description
        });
        $scope.offerType = "";
        $scope.description = "";
      });
    }
  }]);
