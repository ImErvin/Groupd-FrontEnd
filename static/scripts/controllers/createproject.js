'use strict';

angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory','AuthFactory', '$scope',
  function (ProjectFactory, AuthFactory, $scope) {

    $scope.project = {
        projectName: null,
        projectThumb: null,
        projectCreator: JSON.parse(AuthFactory.auth.getAuth()).username,
        projectMembers: [],
        projectDelete: false,
        maxMembers: null,
        projectDesc: null,
        comments: "",
        time: new Date()
    }
    $scope.message = "Enter required (*) fields.";
    console.log($scope.project.projectCreator);
    $scope.createProject = function(){
        console.log($scope.project);
        ProjectFactory.project.postProject($scope.project);
    }
  }]);
