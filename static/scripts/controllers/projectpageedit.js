'use strict';

//
angular.module('groupdApp')
    .controller('ProjectPageEditCtrl', ['ProjectFactory', '$scope', '$routeParams', 'AuthFactory',
        function(ProjectFactory, $scope, $routeParams, AuthFactory) {
            $scope.projectFound = false;
            $scope.message = "Enter required (*) fields.";
            $scope.tag;

            // Retrieve the project that is to be edited.
            ProjectFactory.project.getProject($routeParams.projectId).then(function(d) {
                // If the project doesn't exist, send the user a message
                if (d.message == "404") {
                    $scope.projectFound = true;
                    $scope.errorMessage = "This project was not found!";
                } else {
                    // If the project does exist, but the person trying to edit it is not the owner,
                    // send the user a message.
                    if (JSON.parse(AuthFactory.auth.getAuth()).username != d.projectCreator) {
                        $scope.projectFound = true;
                        $scope.errorMessage = "You are not the owner of this project, you cannot edit it.";
                    } else {
                        // Or else just set project as data flow to use and display the data in HTML
                        $scope.project = d;
                    }
                }
            });

            // Function to update the project
            $scope.editProject = function() {
                // If the project contains more members than they are trying to set, give them an error message
                if ($scope.project.maxMembers < $scope.project.projectMembers.length) {
                    $scope.message = "There are more members than you've set!";
                    $scope.project.maxMembers = $scope.project.projectMembers.length;
                } else {
                    // or else just update the project.
                    ProjectFactory.project.putProject($scope.project).then(function(d) {
                        // return back to the project page.
                        window.location = "/#/project/" + $scope.project.projectId;
                    })
                }
            }

            // Add/remove a tag same concept as adding/removing skills (referenced in userpageedit.js)
            // I'm reusing code a lot here, so you will see these functions in a couple of controllers.
            // I realized I could have made a factory for them when it was too late.
            $scope.addTag = function(tag) {
                var found = false;
                if (tag == null) {
                    $scope.message = "Enter a tag";
                    return;
                } else {
                    for (var i = 0; i < $scope.project.tags.length; i++) {

                        if (tag == $scope.project.tags[i]) {
                            $scope.message = "Tag already exists";
                            found = true;
                        }
                    }
                }
                if (found == false) {
                    $scope.project.tags.push(tag);
                    $scope.tag = null;
                    $scope.message = "Enter required (*) fields.";
                }
            }

            $scope.removeTag = function(tag) {
                for (var i = 0; i < $scope.project.tags.length; i++) {
                    if (tag == $scope.project.tags[i]) {
                        $scope.project.tags.splice(i, 1)
                    }
                }
            }
        }
    ]);