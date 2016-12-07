angular.module('signupApp', [])
.controller('signUpCtrl', ['$scope', '$http',
  function($scope, $http) {

    //fields
    $scope.username = "";
    $scope.password = "";
    $scope.passwordConfirm = "";
    //icons
    $scope.usernameProgress = "";
    $scope.passwordIcon = "";
    $scope.passwordConfirmIcon = "";
    //field validation
    $scope.passwordsMatch = true;
    $scope.usernameExists = false;
    $scope.validPassword = "";
    $scope.validUsername = "";
    $scope.validPasswordConfirm = "";
    //validation messages
    $scope.usernameMessage = "";
    $scope.passwordMessage = "";
    $scope.passwordConfirmMessage = "";
    $scope.verifyConfirmWhenPasswordVerified = false;

    $scope.register = function() {
      if ($scope.usernameExists || !$scope.passwordsMatch) return;
      $http.post("/signup", {username: $scope.username, password: $scope.password})
      .then(function(response) {
        if (response.error) {
          console.log.error(error);
        } else {
          window.location = "/";
        }
      })
    }
    $scope.validateUsername = function() {
        if (!$scope.username) {
          $scope.validUsername = "invalid";
          $scope.usernameMessage = "Please enter a username";
        } else {
          $scope.checkUsername();
        }
    }
    $scope.validatePassword = function() {
      if (!$scope.password) {
        $scope.validPassword = "invalid";
        $scope.passwordMessage = "Please enter a password";
      } else {
        $scope.validPassword = "";
        $scope.passwordMessage = "";
      }
      if ($scope.verifyConfirmWhenPasswordVerified) {
        $scope.validatePasswordConfirm();
      }
    }
    $scope.validatePasswordConfirm = function() {
      if (!$scope.passwordConfirm) {
        $scope.validPasswordConfirm = "invalid";
        $scope.passwordConfirmMessage = "Please confirm your password";
      } else if ($scope.passwordConfirm !== $scope.password) {
        $scope.validPasswordConfirm = "invalid";
        $scope.passwordConfirmMessage = "Passwords do not match";
        $scope.passwordsMatch = false;
      } else {
        $scope.validPasswordConfirm = "";
        $scope.passwordConfirmMessage = "";
        $scope.passwordsMatch = true;
      }
      $scope.verifyConfirmWhenPasswordVerified = true;
    }
    $scope.checkUsername = function() {
      $scope.usernameProgress = "fa fa-circle-o-notch fa-spin fa-fw";
      $http.get("/user-exists?username=" + $scope.username).then(function(response) {
        if (response.data.exists) {
          $scope.usernameExists = true;
          $scope.usernameProgress = "fa fa-times";
          $scope.usernameMessage = "This username is in use, please choose another";
        } else {
          $scope.usernameExists = false;
          $scope.usernameProgress = "fa fa-check";
          $scope.usernameMessage = "";
          $scope.validUsername = "";
        }
      })
    }
}]);
