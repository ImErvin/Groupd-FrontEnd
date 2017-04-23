'use strict';

angular.module('groupdApp')
  .controller('ProjectPageCtrl',['ProjectFactory','$scope', '$routeParams', "$location",'UserPageFactory',
      function (ProjectFactory, $scope, $routeParams, $location, UserPageFactory) {

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
              }
          });
          $scope.project = d;
          console.log(d);
        }
    });
  }]);  
