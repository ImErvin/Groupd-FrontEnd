'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl',['UserFactory', '$scope', '$location', '$timeout', '$window',
  function (UserFactory, $scope, $location, $timeout, $window) {
    $scope.user = {
      email: null,
      username: null,
      password: null,
      firstName: null,
      surname: null,
      address: null,     
      skills: null,
      bio: null,
      occupation: null,
      ratings:{
        rating:{
          sumOfRates: 0,
          rateCount: 0
        },
        ratedBy:null
      },
      bookmarks: [],
      projects: []        
    }

    $scope.message = "Enter required (*) fields.";

    $scope.createUser = function(user){
      $scope.user.username = $scope.user.username.toLowerCase();
      UserFactory.user.create(user).then(function(d){
        $scope.message = d.data.message;
        if(d.data.message == "Saved"){
          console.log("waiting");
          UserFactory.user.login(user).then(function(d){
            $window.location.reload();
          });
        }
      });
    }

  }]);