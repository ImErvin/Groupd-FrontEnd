'use strict';

// Project page controller
angular.module('groupdApp')
    .controller('ProjectPageCtrl', ['UserFactory', 'ProjectFactory', '$scope', '$routeParams', "$location", 'AuthFactory', '$window',
        function(UserFactory, ProjectFactory, $scope, $routeParams, $location, AuthFactory, $window) {

            $scope.searchUsername;
            $scope.searchmessage = "No results to show!";
            $scope.projectFound = false;
            $scope.errorMessage;
            $scope.vacancies;
            $scope.placeholder = "Write a comment..";

            // Retrieve the project that is to be viewed
            ProjectFactory.project.getProject($routeParams.projectId).then(function(d) {
                // If that project doesn't exist, let the user know
                if (d.message == "404") {
                    $scope.projectFound = true;
                    $scope.errorMessage = "This project was not found!";
                } else {
                    // Populate the project creators card by retrieving details of the project creator
                    UserFactory.user.getUser(d.projectCreator).then(function(data) {
                        if (!data) {
                            alert("ERROR");
                        } else {
                            // Set's their picture to one of the two defaults (future implementation will allow you to add images to db)
                            $scope.user = data;
                            if ($scope.user.gender == "Male") {
                                $scope.picture = "male.jpg";
                            } else {
                                $scope.picture = "female.jpg";
                            }
                            // If it happens to be the current user, provide a special side menu to interact with the project with admin controls
                            if (AuthFactory.auth.getAuth()) {
                                if ($scope.user.username === JSON.parse(AuthFactory.auth.getAuth()).username) {
                                    $scope.currentUser = true;
                                }
                            }
                        }
                    });
                    // Set the $scope variable to display data
                    $scope.project = d;
                    $scope.vacancies = $scope.project.maxMembers - $scope.project.projectMembers.length;
                }
            });

            // Removes a member
            $scope.removeMember = function(member) {
                // Loop over the members
                for (var i in $scope.project.projectMembers) {
                    // If you're found
                    if (member == $scope.project.projectMembers[i]) {
                        // and they're the owner, error! can't delete the owner of the project
                        if (member == $scope.project.projectCreator) {
                            $scope.showError = true;
                            $scope.showErrorMessage = "You're the project owner, you can't delete yourself.";
                        } else {
                            // Or else delete the user and update project to remove that user from the array of users
                            // and update the user to remove them from their array of projects
                            $scope.showError = false;
                            $scope.project.projectMembers.splice(i, 1);
                            updateProject();
                            updateUser(member, 1);
                        }
                    }
                }
            }

            // Function to add a comment to the project
            $scope.addComment = function(comment) {
                // Can't add a comment, if there is non
                if (comment == null) {
                    $scope.placeholder = "You haven't written a comment..";
                } else {
                    // Push that comment onto an array of comments and add values for schema
                    $scope.project.comments.push({
                        username: JSON.parse(AuthFactory.auth.getAuth()).username,
                        comment: comment,
                        time: new Date()
                    });
                    // Update the project
                    ProjectFactory.project.putProject($scope.project).then(function(d) {
                        $scope.comment = "";
                    });
                }

            }

            // Function to bookmark the project
            $scope.bookmarkProject = function() {
                // Find user with username that's saved in cookie
                UserFactory.user.getUser(JSON.parse(AuthFactory.auth.getAuth()).username).then(function(d) {
                    var found = false;
                    // If that bookmark already exists, set found to true
                    for (var i in d.bookmarks) {
                        if ($scope.project.projectId == d.bookmarks[i]) {
                            found = true;
                        }
                    }

                    // If found is false, add that bookmark to the users account by updating the user
                    if (found == false) {
                        d.bookmarks.push($scope.project.projectId);
                        UserFactory.user.putUser(d).then(function(d) {})
                    }

                });
            }

            // Function to add a member to the project
            $scope.addMember = function() {
                // If there are too many members already, don't let them add more
                if ($scope.project.projectMembers.length >= $scope.project.maxMembers) {
                    $scope.searchmessage = "Your team looks full! Edit the project to accomodate more members!";
                } else {
                    var alreadyMember = false;

                    // Loop over each member and check if they're already in the list, if so, don't let them add them again
                    for (var i = 0; i < $scope.project.projectMembers.length; i++) {
                        if ($scope.searchuser.username == $scope.project.projectMembers[i]) {
                            $scope.searchmessage = "They're already part of your team!";
                            alreadyMember = true;
                        }
                    }

                    // If they're not already part of the team, add them and update the project and user
                    if (alreadyMember == false) {
                        $scope.project.projectMembers.push($scope.searchuser.username);
                        $scope.searchmessage = $scope.searchuser.username + " was added to the team!";

                        updateProject();
                        updateUser($scope.searchuser.username, 2);
                        
                    }
                }
            }

            // A function to search for a member to add to the project
            $scope.search = function() {
                $scope.userfound = false;

                // Get the user using the search condition
                UserFactory.user.getUser($scope.searchUsername.toLowerCase()).then(function(d) {
                    // If they don't exist, let the user know
                    if (!d) {
                        $scope.searchmessage = "Coud not find " + $scope.username + ", check your spelling!";
                    } else {
                        // else display them 
                        $scope.userfound = true;
                        $scope.searchuser = d;
                        $scope.searchmessage = "Found Them!";

                        if ($scope.searchuser.gender == "Male") {
                            $scope.searchpicture = "male.jpg";
                        } else {
                            $scope.searchpicture = "female.jpg";
                        }
                    }
                });
            }

            // Delete the project
            $scope.delete = function() {
                ProjectFactory.project.deleteProject($scope.project).then(function(d) {
                    setTimeout(function() {
                        window.location = "/#/home"
                    }, 1000);
                })
            }

            // Reusable function to update the project
            function updateProject() {
                ProjectFactory.project.putProject($scope.project).then(function(d) {});
                $scope.vacancies = $scope.project.maxMembers - $scope.project.projectMembers.length;

            }

            // Reusable function to update the user
            function updateUser(username, condition) {
                UserFactory.user.getUser(username).then(function(d) {
                    if (!d) {} else {
                        // If the condition is 1, then delete a project from their projects
                        if (condition == 1) {
                            for (var i = 0; i < d.projects.length; i++) {
                                if (d.projects[i] == $scope.project.projectId) {
                                    d.projects.splice(i, 1);
                                    UserFactory.user.putUser(d).then(function(d) {});
                                }
                            }
                        } else {
                            // or else add a project to their projects
                            d.projects.push($scope.project.projectId);
                            UserFactory.user.putUser(d).then(function(d) {});
                        }
                    }
                })
            }
        }
    ]);