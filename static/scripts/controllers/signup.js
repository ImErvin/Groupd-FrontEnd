'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl',['UserFactory', '$scope', '$location', '$timeout',
  function (UserFactory, $scope, $location, $timeout) {
    var user = {
      email: "",
      username: "",
      password: "",
      firstName: "",
      surname: "",
      job: "",
      bio: ""
    }

    var createUser = function(){
      user.username.toLowerCase();
      UserFactory.user.create(user).then(function(d){
        $scope.message = d.data.message;
        if(d.data.message == "Saved"){
          console.log("waiting");
          $timeout(function(){$location.path('/login')}, 2000);
        }
      });
    }

    $scope.createUser = createUser;
    $scope.user = user;
    $scope.message = "Enter required (*) fields.";
  }]);