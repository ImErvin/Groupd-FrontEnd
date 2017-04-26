'use strict';

angular.module('groupdApp')
  .controller('UserPageEditCtrl',['UserFactory','$scope', '$routeParams', "$location",'UserPageFactory','AuthFactory',
      function (UserFactory, $scope, $routeParams, $location, UserPageFactory, AuthFactory) {
        
        UserFactory.user.getUser($routeParams.username).then(function(d){
            console.log(d);
            if(!d){
                $scope.userFound = true;
                $scope.errorMessage = "User with username: '"+$routeParams.username+"' was not found.";
            }
            else{
                console.log("wow");
                if(JSON.parse(AuthFactory.auth.getAuth()).username != d.username)
                {
                    console.log("woop");
                    $scope.userFound = true;
                    $scope.errorMessage = "You are not the owner of this account, you cannot edit it.";
                }else{
                    $scope.user = d;
                    console.log("cool");
                }
            }
        });


        $scope.editUser = function(){
            UserFactory.user.putUser($scope.user).then(function(d){
                console.log(d);
                window.location = "/#/pages/"+$scope.user.username;
            })
        }

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
