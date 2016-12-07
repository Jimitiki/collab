angular.module('myApp', []).
controller('myController', ['$scope', '$http',
  function($scope, $http) {
    $scope.posts = [];
    $http.get('/posts-summary')
    .success(function(data, status, headers, config) {
      for (var post in data) {
        var addedPost = {
          id: post,
          title: data[post].title,
          author: data[post].author,
          imageURL: data[post].imageURL,
          numOffers: data[post].numOffers
        }
        $scope.posts.push(addedPost);
      }
    }).
    error(function(data, status, headers, config) {
      $scope.posts = [];
      $scope.error = data;
    });
  }]);
