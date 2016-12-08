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
		console.log(response);
                $scope.offers.push({
                  user: response.data.user,
                  type: response.data.type,
                  description: response.data.content
                });
                $scope.offerType = "";
                $scope.description = "";
              });
        }
    }
  }]);
