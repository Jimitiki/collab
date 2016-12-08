angular.module('project', []).
controller('postCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.offers = [];
    $scope.offerType = "";
    $scope.description = "";
      $scope.showEdit = false;
    $scope.submitOffer = function() {
        if ($scope.offerType) {
              $http.post("/offer", {
                type: $scope.offerType,
                description: $scope.description
              }).then(function(response) {
                $scope.offers.push({
                  user: response.user,
                  type: response.type,
                  description: response.description
                });
                $scope.offerType = "";
                $scope.description = "";
              });
        }
    }
  }]);
