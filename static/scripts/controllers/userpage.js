'use strict';

// User page controller.
angular.module('groupdApp')
    .controller('UserPageCtrl', ['UserFactory', 'ProjectFactory', 'AuthFactory', '$scope', '$routeParams',
        function(UserFactory, ProjectFactory, AuthFactory, $scope, $routeParams) {
            $scope.currentUser = false;
            $scope.userFound = false;
            $scope.projects = [];
            $scope.bookmarks = [];

            // Retrieve the user whose page is being opened.
            UserFactory.user.getUser($routeParams.username).then(function(d) {
                // If the username passed into the URL doesn't exist
                if (!d) {
                    // Set the message
                    $scope.errorMessage = "User with username: '" + $routeParams.username + "' was not found.";
                } else {
                    // Or if they do exist.. Set the $scope.user as the data coming in
                    $scope.user = d;
                    // Condition to hide the error message box
                    $scope.userFound = true;
                    // If the user being looked at also happens to be the user saved on the cookie
                    if (AuthFactory.auth.getAuth()) {
                        if ($scope.user.username === JSON.parse(AuthFactory.auth.getAuth()).username) {
                            // Set a condition for special side menu for the profile only the user who is
                            // viewing their own page can see. [User experience]
                            $scope.currentUser = true;
                        }
                    }
                }
            });
            
            // Retrieve all the projects
            ProjectFactory.project.getProjects().then(function(d) {
                // Loop over the projects
                for (var i in d) {
                    // Loop over the projectIds the use is in
                    for (var j in $scope.user.projects) {
                        // If there's a match, add that object to a new array (for displaying purposes)
                        if ($scope.user.projects[j] == d[i].projectId) {
                            $scope.projects.push(d[i]);
                        }

                    }
                    // Same idea for bookmarks
                    for (var p in $scope.user.bookmarks) {
                        if ($scope.user.bookmarks[p] == d[i].projectId) {
                            $scope.bookmarks.push(d[i]);
                        }
                    }
                }
            })
        }
    ]);