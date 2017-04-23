'use strict';

angular.module('groupdApp')
  .controller('ProjectPageCtrl',['ProjectFactory','$scope', '$routeParams', "$location",'UserPageFactory','AuthFactory',
      function (ProjectFactory, $scope, $routeParams, $location, UserPageFactory, AuthFactory) {

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

        $scope.edit = function(){
          $scope.editProject = true;
          $scope.projectDeets = false;
        }
  }]);  
