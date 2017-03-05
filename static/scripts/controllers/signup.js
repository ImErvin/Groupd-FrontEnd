'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl',['UserFactory', '$scope', '$location',
  function (UserFactory, $scope, $location) {
    var user = {
      email: "",
      username: "",
      password: "",
      firstName: "",
      surname: "",
      bio: ""
    }

    var createUser = function(){
      UserFactory.user.create(user).then(function(d){
        $scope.message = d.data.message;
      });
    }

    $scope.createUser = createUser;
    $scope.user = user;
    $scope.message = "Enter required (*) fields.";
  }]);