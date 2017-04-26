'use strict';

angular.module('groupdApp')
  .controller('UserPageCtrl',['UserFactory','ProjectFactory', 'AuthFactory','$scope','$routeParams',
  function (UserFactory, ProjectFactory, AuthFactory, $scope, $routeParams) {
    $scope.currentUser = false;
    $scope.userFound = false;
    $scope.projects = [];

    UserFactory.user.getUser($routeParams.username).then(function(d){
        if(!d){
            $scope.errorMessage = "User with username: '"+$routeParams.username+"' was not found.";
        }else{
            $scope.user = d;
            $scope.userFound = true;
            if(AuthFactory.auth.getAuth()){
                if($scope.user.username === JSON.parse(AuthFactory.auth.getAuth()).username){
                    $scope.currentUser = true;
                }
            }
        }
    });

    ProjectFactory.project.getProjects().then(function(d){
        for(var i in d){
            for(var j in $scope.user.projects){
                if($scope.user.projects[j] == d[i].projectId){
                    $scope.projects.push(d[i]);
                }
            }
        }
    })
  }]);
