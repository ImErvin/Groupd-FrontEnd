'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl',['UserFactory', '$scope', '$window',
  function (UserFactory, $scope, $window) {
    $scope.user = {
      username: "",
      password: ""
    }
    
    $scope.message = "Enter required (*) fields.";

    $scope.userLogin = function(){
      console.log("clicked");
      $scope.user.username = $scope.user.username.toLowerCase();
      UserFactory.user.login($scope.user).then(function(message){
        $scope.message = message;
        if(message == "Logged In"){
          $window.location.reload();
        }
      });
    }

  }]);
