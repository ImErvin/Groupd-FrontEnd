'use strict';

angular.module('groupdApp')
  .controller('SignupCtrl',['UserFactory', '$scope', '$location', '$timeout', '$window',
  function (UserFactory, $scope, $location, $timeout, $window) {
    $scope.user = {
      email: null,
      username: null,
      password: null,
      gender: "Male",
      firstName: null,
      surname: null,
      address: null,     
      skills: [],
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

    $scope.skill;
    

    $scope.addSkill = function(skill){
      var found = false;
      if(skill == null){
        $scope.message = "Enter a skill";
        return;
      }
      else{
        console.log($scope.user.skills.length);
        for(var i = 0; i < $scope.user.skills.length; i++){
          
          if(skill == $scope.user.skills[i]){
            $scope.message = "Skill already exists";
            found = true;
          }
        }
      }
      if(found == false){
        $scope.user.skills.push(skill);
        $scope.skill = null;
        $scope.message = "Enter required (*) fields.";
      }
    }

    $scope.removeSkill = function(skill){
        for(var i = 0; i < $scope.user.skills.length; i++){
          if(skill == $scope.user.skills[i]){
            $scope.user.skills.splice(i, 1)
          }
        }
      }
  }]);