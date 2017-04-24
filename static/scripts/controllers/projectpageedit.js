'use strict';

angular.module('groupdApp')
  .controller('ProjectPageEditCtrl',['ProjectFactory','$scope', '$routeParams', "$location",'UserPageFactory','AuthFactory',
      function (ProjectFactory, $scope, $routeParams, $location, UserPageFactory, AuthFactory) {
        $scope.projectFound = false;
        $scope.message = "Enter required (*) fields.";

        ProjectFactory.project.getProject($routeParams.projectId).then(function(d){
            if(d.message == "404"){
                console.log(d.message);
                $scope.projectFound = true;
                $scope.errorMessage = "This project was not found!";
            }
            else{
                if(JSON.parse(AuthFactory.auth.getAuth()).username != d.projectCreator)
                {
                    $scope.projectFound = true;
                    $scope.errorMessage = "You are not the owner of this project, you cannot edit it.";
                }else{
                    $scope.project = d;
                }
            }
        });

        $scope.editProject = function(){
            ProjectFactory.project.putProject($scope.project).then(function(d){
                console.log(d);
                window.location = "/#/project/"+$scope.project.projectId;
            })
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
