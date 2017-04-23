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
        tags: [],
        comments: "",
        time: new Date()
    }
    $scope.message = "Enter required (*) fields.";
    console.log($scope.project.projectCreator);
    $scope.createProject = function(){
        console.log($scope.project);
        ProjectFactory.project.postProject($scope.project);
    }
    
    $scope.tag;
    

    $scope.addTag = function(tag){
      var found = false;
      if(tag == null){
        $scope.message = "Enter a tag";
        return;
      }
      else{
        for(var i = 0; i < $scope.project.tags.length; i++){
          
          if(tag == $scope.project.tags[i]){
            $scope.message = "Tag already exists";
            found = true;
          }
        }
      }
      if(found == false){
        $scope.project.tags.push(tag);
        $scope.tag = null;
        $scope.message = "Enter required (*) fields.";
      }
    }

    $scope.removeTag = function(tag){
        for(var i = 0; i < $scope.project.tags.length; i++){
          if(tag == $scope.project.tags[i]){
            $scope.project.tags.splice(i, 1)
          }
        }
      }
  }]);
