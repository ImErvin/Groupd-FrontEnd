'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl',['UserFactory', '$scope', '$location', '$window',
  function (UserFactory, $scope, $location, $window) {
    var user = {
      username: "",
      password: ""
    }

    var userLogin = function(){
      console.log("clicked");
      UserFactory.user.login(user.username, user.password).then(function(message){
        $scope.message = message;
        if(message == "Logged In"){
          $window.location.reload();
        }
      });
    }

    $scope.userLogin = userLogin;
    $scope.user = user;
    $scope.message = "Enter required (*) fields.";
  }]);
