'use strict';

angular.module('groupdApp')
  .controller('ProjectPageCtrl',['UserFactory', 'ProjectFactory','$scope', '$routeParams', "$location",'UserPageFactory','AuthFactory', '$window',
      function (UserFactory, ProjectFactory, $scope, $routeParams, $location, UserPageFactory, AuthFactory, $window){
        
        $scope.searchUsername;
        $scope.searchmessage = "No results to show!";
        $scope.projectFound = false;
        $scope.errorMessage;

        ProjectFactory.project.getProject($routeParams.projectId).then(function(d){
          if(d.message == "404"){
              console.log(d.message);
              $scope.projectFound = true;
              $scope.errorMessage = "This project was not found!";
          }else{
            UserPageFactory.user.getUser(d.projectCreator).then(function(data){
                if(!data){
                  console.log(data);
                    alert("ERROR");
                }else{
                    $scope.user = data;
                    if($scope.user.gender == "Male"){
                        $scope.picture = "male.jpg";
                    }else{
                        $scope.picture = "female.jpg";
                    }
                    if(AuthFactory.auth.getAuth()){
                      if($scope.user.username === JSON.parse(AuthFactory.auth.getAuth()).username){
                          $scope.currentUser = true;
                      }
                  }
                }
                });
                $scope.project = d;
                console.log(d);
          }
        });

        $scope.removeMember = function(member){
        for(var i = 0; i < $scope.project.projectMembers.length; i++){
          if(member == $scope.project.projectMembers[i]){
            if(member == $scope.project.projectCreator)
            {
              $scope.showError = true;
              $scope.showErrorMessage = "You're the project owner, you can't delete yourself.";
            }else{
              $scope.showError = false;
              $scope.project.projectMembers.splice(i, 1);
              updateProject();
            }
          }
        }
      }

      function updateProject(){
        ProjectFactory.project.putProject($scope.project).then(function(d){
          console.log(d);
        });
      }

        $scope.addMember = function(){
          if($scope.project.projectMembers.length >= $scope.project.maxMembers)
          {
             $scope.searchmessage = "Your team looks full! Edit the project to accomodate more members!";
          }else{
            var alreadyMember = false;
            for(var i = 0; i < $scope.project.projectMembers.length; i++){
              if($scope.searchuser.username == $scope.project.projectMembers[i]){
                $scope.searchmessage = "They're already part of your team!";
                alreadyMember = true;
              }
            }

            if(alreadyMember == false)
            {
              $scope.project.projectMembers.push($scope.searchuser.username);
              $scope.searchmessage = $scope.searchuser.username + " was added to the team!";
              updateProject();
            }
          }
        }

        $scope.search = function(){
            $scope.userfound = false;
            
            UserFactory.user.getUser($scope.searchUsername.toLowerCase()).then(function(d){
              if(!d){
                $scope.searchmessage = "Coud not find " + $scope.username + ", check your spelling!";
              }else{
                $scope.userfound = true;
                $scope.searchuser = d;
                $scope.searchmessage = "Found Them!";

                if($scope.searchuser.gender == "Male"){
                    $scope.searchpicture = "male.jpg";
                }else{
                    $scope.searchpicture = "female.jpg";
                }
                console.log($scope.searchuser);
              }
            });
        }

        $scope.delete = function(){
          ProjectFactory.project.deleteProject($scope.project).then(function(d){
            console.log(d);
            setTimeout(function(){window.location = "/#/home"}, 1500);
          })
        }
  }]);  
