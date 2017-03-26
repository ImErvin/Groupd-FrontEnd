'use strict';

angular.module('groupdApp')
  .controller('HomeCtrl',['ProjectFactory','$scope', 
  function (ProjectFactory, $scope) {
    
    //var logProjects = function(){
    ProjectFactory.project.getProjects().then(function(d){
      $scope.projects = [];
      for(var n in d){
        $scope.projects.push(d[n]);
      }
    })

   // }

    $scope.projects = [{}];
  }]);
