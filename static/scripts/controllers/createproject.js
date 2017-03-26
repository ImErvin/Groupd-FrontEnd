'use strict';

angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory', '$scope', '$cookies',
  function (ProjectFactory, $scope, $cookies) {
    
    $scope.project = {
        projectName: null,
        projectThumb: null,
        projectCreator: JSON.parse($cookies.get('userCookie')).username,
        projectMembers: [],
        projectDelete: false,
        maxMembers: null,
        projectDesc: null,
        comments: "",
        time: new Date()
    }

    $scope.createProject = function(){
      ProjectFactory.project.postProject($scope.project);
    }
  }]);
