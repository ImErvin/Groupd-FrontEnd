'use strict';

angular.module('groupdApp')
  .controller('HomeCtrl',['ProjectFactory','$scope', 
  function (ProjectFactory, $scope) {
    
    ProjectFactory.project.getProjects().then(function(d){
      $scope.projects = [];
      for(var n in d){
        $scope.projects.push(d[n]);
        
      }
      console.log($scope.projects);
      if($scope.projects.length == 0){
        $scope.noProjects = true;
      }
      $scope.projects.reverse();
    })

    $scope.Button = function(){
      console.log(1+1);
    }
    $scope.projects = [{}];
  }]);
