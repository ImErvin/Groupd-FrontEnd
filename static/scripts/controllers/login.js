'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl', function (APIFactory, $scope) {
    var user = {
      username: "",
      password: ""
    }

    var loginUser = function(){
      APIFactory.loginUser(user.username).then(function(d){
        if(d.data.username == user.username && d.data.password == user.password){
          $scope.message = "Logged In!";
        }else{
          $scope.message = "Username or Password is incorrect."
        }
      });
    }

    $scope.user = user;
    $scope.loginUser = loginUser;

  });
