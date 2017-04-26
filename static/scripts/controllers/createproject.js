'use strict';

//Create a project script
angular.module('groupdApp')
  .controller('CreateProjectCtrl',['ProjectFactory','UserFactory', 'AuthFactory', '$scope', '$location',
  function (ProjectFactory, UserFactory, AuthFactory, $scope, $location) {

    //Project schema match
    $scope.project = {
        projectName: null,
        projectThumb: null,
        projectCreator: JSON.parse(AuthFactory.auth.getAuth()).username,
        projectMembers: [JSON.parse(AuthFactory.auth.getAuth()).username],
        projectDelete: false,
        maxMembers: null,
        projectDesc: null,
        tags: [],
        comments: [],
        time: new Date()
    }
    $scope.tag;
    $scope.message = "Enter required (*) fields.";

    // Function to create the project
    $scope.createProject = function(){
        // Project get's add in through api request
        ProjectFactory.project.postProject($scope.project).then(function(d){
          if(d.message="Project Added"){
            // add the project to the creators projects array
            updateUser($scope.project.projectCreator, d.id);
            window.location = "/#/project/"+d.id;
          }
      });
    }
    
    // function to update user similar to the one referenced in projectpage.js
    function updateUser(username, projectId){
      UserFactory.user.getUser(username).then(function(d){
        if(!d){
        }else{
          d.projects.push(projectId);
          UserFactory.user.putUser(d).then(function(d){
          });
      }
      })
    }
    
    // Add/remove a tag same concept as adding/removing skills (referenced in userpageedit.js)
    // I'm reusing code a lot here, so you will see these functions in a couple of controllers.
    // I realized I could have made a factory for them when it was too late.
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
