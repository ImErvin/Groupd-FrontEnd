'use strict';

angular.module('groupdApp')
  .controller('HomeCtrl',['ProjectFactory','$scope', 
  function (ProjectFactory, $scope) {
    
    ProjectFactory.project.getProjects().then(function(d){
      $scope.projects = [];
      for(var n in d){
        $scope.projects.push(d[n]);
        
      }
      $scope.projects.reverse();
    })

    $scope.Button = function(){
      console.log(1+1);
    }
    $scope.projects = [{}];
  }]);
