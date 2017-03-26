'use strict';

angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory','AuthFactory', '$scope',
  function (ProjectFactory, AuthFactory, $scope) {

    $scope.project = {
        projectName: null,
        projectThumb: null,
        projectCreator: AuthFactory.auth.getAuth().username,
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
