'use strict';

angular.module('groupdApp')
  .controller('LoginCtrl', ['UserFactory', 'AuthFactory', '$scope', '$location', 
  function (UserFactory, AuthFactory, $scope, $location) {
    var user = {
      username: "",
      password: "",
      token: false
    }

    var loginUser = function(){
      UserFactory.user.loginUser(user.username).then(function(d){
        if(d.data.username == user.username && d.data.password == user.password){
          $scope.message = "Logged In!";
          user.token = true;
          AuthFactory.setAuth(user.token);
          $location.path('/about');
        }else{
          $scope.message = "Username or Password is incorrect.";
          user.token = false;
          AuthFactory.setAuth(user.token);
        }
      });
    }

    $scope.user = user;
    $scope.loginUser = loginUser;

  }]);
