'use strict';

angular.module('groupdApp')
  .controller('HomeCtrl',['ProjectFactory','$scope','$cookies', 
  function (ProjectFactory, $scope, $cookies) {
    
    //var logProjects = function(){
    ProjectFactory.project.all().then(function(d){
      $scope.projects = [];
      for(var n in d){
        $scope.projects.push(d[n]);
      }
    })
   // }

    $scope.username = JSON.parse($cookies.get('userCookie')).firstName;

    //$scope.logProjects = logProjects;

    $scope.projects = [{}];
  }]);
