'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl', function ($scope, APIFactory) {
    var user = {
      email: "",
      username: "",
      password: "",
      firstName: "",
      surname: "",
      bio: ""
    }

    var createUser = function(){
      APIFactory.createUser(user).then(function(d){
        $scope.message = d.data.message;
        $scope.alert = true;
      });
    }

    $scope.createUser = createUser;
    $scope.user = user;
    $scope.alert = false;
  });