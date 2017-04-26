'use strict';

// Controller for the signup page
angular.module('groupdApp')
    .controller('SignupCtrl', ['UserFactory', '$scope', '$location', '$timeout', '$window',
        function(UserFactory, $scope, $location, $timeout, $window) {
            // Object to match the database schema
            $scope.user = {
                email: null,
                username: null,
                password: null,
                gender: "Male",
                firstName: null,
                surname: null,
                address: null,
                skills: [],
                bio: null,
                occupation: null,
                ratings: [{}],
                bookmarks: [],
                projects: []
            }

            $scope.skill;

            // Message to be shown to the user
            $scope.message = "Enter required (*) fields.";

            // Function to create a user
            $scope.createUser = function(user) {
                // Set's the username to lowercase so when they go to log in next time,
                // they don't have to worry about caps. [User experience]
                $scope.user.username = $scope.user.username.toLowerCase();
                // Create that user in the database.
                UserFactory.user.create(user).then(function(d) {
                    // Display the message returned from the database to the user.
                    $scope.message = d.data.message;
                    console.log(d);
                    // Could have went about this a better way, but I have a unique
                    // message for different routes, realized it would have been better
                    // to just set one message for success/error so I don't have to keep referencing custom
                    // messages. Anyway if the message is "saved", the we log the user in (set their cookie)
                    // and reload the page to change the header buttons.
                    if (d.data.message == "Saved") {
                        UserFactory.user.login(user).then(function(d) {
                            $window.location.reload();
                        });
                    }
                });
            }

            // Add/remove a skill same concept as adding/removing skills (referenced in userpageedit.js)
            // I'm reusing code a lot here, so you will see these functions in a couple of controllers.
            // I realized I could have made a factory for them when it was too late.
            $scope.addSkill = function(skill) {
                var found = false;
                if (skill == null) {
                    $scope.message = "Enter a skill";
                    return;
                } else {
                    for (var i = 0; i < $scope.user.skills.length; i++) {

                        if (skill == $scope.user.skills[i]) {
                            $scope.message = "Skill already exists";
                            found = true;
                        }
                    }
                }
                if (found == false) {
                    $scope.user.skills.push(skill);
                    $scope.skill = null;
                    $scope.message = "Enter required (*) fields.";
                }
            }

            $scope.removeSkill = function(skill) {
                for (var i = 0; i < $scope.user.skills.length; i++) {
                    if (skill == $scope.user.skills[i]) {
                        $scope.user.skills.splice(i, 1)
                    }
                }
            }
        }
    ]);