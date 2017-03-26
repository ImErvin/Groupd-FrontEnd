'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl',['UserFactory', '$scope', '$location', '$window',
  function (UserFactory, $scope, $location, $window) {
    $scope.user = {
      username: "",
      password: ""
    }
    
    $scope.message = "Enter required (*) fields.";

    $scope.userLogin = function(){
      console.log("clicked");
      UserFactory.user.login(user.username, user.password).then(function(message){
        $scope.message = message;
        if(message == "Logged In"){
          $window.location.reload();
        }
      });
    }

  }]);
