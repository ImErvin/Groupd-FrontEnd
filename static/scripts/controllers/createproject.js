'use strict';

angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory', '$scope',
  function (ProjectFactory, $scope) {
    $scope.project = {
      projectName: "",
      projectDesc: "",
      projectDelete: false,
      projectCompleted: false,
      projectCreatedDate: new Date()
    }

    $scope.createProject = function(){
      ProjectFactory.project.create($scope.project);
    }
  }]);
