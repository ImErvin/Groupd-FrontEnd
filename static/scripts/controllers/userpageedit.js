'use strict';

// Controller for the edit user page.
angular.module('groupdApp')
    .controller('UserPageEditCtrl', ['UserFactory', '$scope', '$routeParams', 'AuthFactory',
        function(UserFactory, $scope, $routeParams, AuthFactory) {

            // Retrieve the user to be edited.
            UserFactory.user.getUser($routeParams.username).then(function(d) {
                // If the user has not been found..
                if (!d) {
                    // Set condition for ng-show
                    $scope.userFound = true;
                    // Set message for ng-show
                    $scope.errorMessage = "User with username: '" + $routeParams.username + "' was not found.";
                } else {
                    // If the user was found but the person editing is not them
                    if (JSON.parse(AuthFactory.auth.getAuth()).username != d.username) {
                        // condition for ng-show
                        $scope.userFound = true;
                        // message for ng-show
                        $scope.errorMessage = "You are not the owner of this account, you cannot edit it.";
                    } else {
                        // Or else just set $scope.user to the data coming from the request and use it in the HTML.
                        $scope.user = d;
                    }
                }
            });

            // Function that'll call the PUT api route.
            $scope.editUser = function() {
                UserFactory.user.putUser($scope.user).then(function(d) {
                    // Change back to the users page once they have edited.
                    window.location = "/#/pages/" + $scope.user.username;
                })
            }

            // Add a skill
            $scope.addSkill = function(skill) {
                var found = false;
                // Can't add a blank skill
                if (skill == null) {
                    $scope.message = "Enter a skill";
                    return;
                } else {
                    // Can't add a skill that already exists either
                    for (var i = 0; i < $scope.user.skills.length; i++) {

                        if (skill == $scope.user.skills[i]) {
                            $scope.message = "Skill already exists";
                            found = true;
                        }
                    }
                }
                // If the skill doesn't exist, then add the skill onto the array and set it to null
                // for the next skill to be added.
                if (found == false) {
                    $scope.user.skills.push(skill);
                    $scope.skill = null;
                    $scope.message = "Enter required (*) fields.";
                }
            }

            // Simply remove the skill
            $scope.removeSkill = function(skill) {
                // Find the index of that skill and splice it from the array
                // at index i and splice of length 1.
                for (var i = 0; i < $scope.user.skills.length; i++) {
                    if (skill == $scope.user.skills[i]) {
                        $scope.user.skills.splice(i, 1)
                    }
                }
            }
        }
    ]);