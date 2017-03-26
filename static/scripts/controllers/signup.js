'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl',['UserFactory', '$scope', '$location', '$timeout',
  function (UserFactory, $scope, $location, $timeout) {
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

    $scope.createUser = function(){
      user.username.toLowerCase();
      UserFactory.user.create($scope.user).then(function(d){
        $scope.message = d.data.message;
        if(d.data.message == "Saved"){
          console.log("waiting");
          $cookies.put()
          $timeout(function(){$location.path('/login')}, 2000);
        }
      });
    }

  }]);