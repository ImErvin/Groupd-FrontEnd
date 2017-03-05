'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl',['UserFactory', '$scope', '$location',
  function (UserFactory, $scope, $location) {
    var user = {
      username: "",
      password: ""
    }

    var userLogin = function(){
      console.log("clicked");
      UserFactory.user.login(user.username, user.password).then(function(message){
        $scope.message = message;
        if(message == "Logged In"){
          $location.path("/home");
        }
      });
    }

    $scope.userLogin = userLogin;
    $scope.user = user;
    $scope.message = "Enter required (*) fields.";
  }]);
